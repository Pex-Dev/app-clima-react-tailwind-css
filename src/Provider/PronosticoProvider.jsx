import { split } from "postcss/lib/list";
import { createContext, useState, useEffect } from "react";
import clienteAxios from '../helpers/ClienteAxios';

const PronosticoContext = createContext();

const PronosticoProvider = ({children}) =>{

    const [lon,setLon] = useState(null);
    const [lat,setLat] = useState(null);
    const [currentForecast,setCurrentForecast] = useState(null);
    const [forecastHours,setForecastHours] = useState(null);
    const [forecastDays,setForecastDays] = useState(null);
    const [locationName,setLocationName] = useState(null)
    const [modal,setModal] = useState(false);
    const [modalContenido,setModalContenido] = useState(null);

    const getWeatherInfo = async () =>{    
        if(!lat && !lon){
            return;
        }      

        try{
            const response = await clienteAxios.post('getWeatherData.php',{
                latitud: lat,
                longitud: lon
            });
            if(response.status=200){
                const datos = response.data;               
                const datosActuales = {
                    ciudad: locationName ? locationName : datos.location.name,
                    diaActual: datos.forecast.forecastday[0].date,
                    tempActual: Math.round(datos.current.temp_c),
                    tempMax: Math.round(datos.forecast.forecastday[0].day.maxtemp_c),
                    tempMin: Math.round(datos.forecast.forecastday[0].day.mintemp_c),
                    resumen: datos.current.condition.text,
                    viento: Math.round(datos.current.wind_kph),
                    uv: datos.current.uv,
                    lluvia: datos.current.precip_mm,
                    humedad: datos.current.humidity,
                    icon: datos.current.condition.icon.replace('64x64','128x128'),
                    esDia: datos.current.is_day
                }; 
                //Establecer el pronostico actual
                setCurrentForecast(datosActuales)

                //Establecer pronostico para las horas para el día actual [0]
                const datosHoras = datos.forecast.forecastday[0].hour;       
                setForecastHours(datosHoras);

                //Establecer pornostico para los 3 días
                const datosDias = datos.forecast.forecastday;
                setForecastDays(datosDias);   
            }            
        }catch(error){
            console.log(error);
        }
    }

    //Buscar una lozalización por texto
    const HandleSearchLocation = async (location) =>{        
        let url = 'https://nominatim.openstreetmap.org/search?format=json&q=' + encodeURIComponent(location);
        const request = await fetch(url);
        if(request.status==200){            
            const response = await request.json();                                    
            try {               
                if(response.length>1){
                    mostrarModalResultados(response);
                }else{
                    setLocation(response[0].lon,response[0].lat,response[0].name)
                }                
            } catch (error) {
                mostrarModalAlerta('No se pudo encontrar la localización ingresada');          
            }            
        }       
    }

    function setLocation(lon,lat,nombre = null){
        setLon(lon);
        setLat(lat);            
        //Esto establece el nombre del lugar que se busco     
        setLocationName(nombre)
    }

    function isGeolocationSupported() {
        return "geolocation" in navigator;
    }

    const handleGetCurrentLocation = () =>{
          if (isGeolocationSupported()) {            
            getCoordinates(
            (coords) => {                
                setLocation(coords.longitude,coords.latitude)
            },
            (error) => {
                handleGeolocationError(error);
            }
            );
        } else {
            mostrarModalAlerta('La geolocalización no es soportada por este navegador')
        }
    }

    // Método para obtener las coordenadas
    function getCoordinates(onSuccess, onError) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                onSuccess({ latitude, longitude });
            },
            (error) => {
                onError(error);
            }
        );
    }

    //Manejar errores con la geolocalización del navegador
    function handleGeolocationError(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                mostrarModalAlerta('El usuario denegó el permiso para la geolocalización');
                break;
            case error.POSITION_UNAVAILABLE:
                mostrarModalAlerta('La ubicación no está disponible');
                break;
            case error.TIMEOUT:
                mostrarModalAlerta('Se agotó el tiempo para obtener la ubicación');
                break;
            default:
                mostrarModalAlerta('Ocurrió un error desconocido');
                break;
        }
    }

    //Cambia el día
    const handleCambioDia = indice =>{              
        const datosHoras = forecastDays[indice].hour;  
        setForecastHours(datosHoras);        
    }

    const handleModalState = () =>{
        setModal(!modal);
    }

    function mostrarModalAlerta(mensaje){
        const modalData = {
            tipo: 'alerta',
            mensaje: mensaje
        }
        setModalContenido(modalData)
        setModal(true)   
    }

    function mostrarModalResultados(resultadosBusqueda){
        const modalData = {
            tipo: 'resultados',
            resultados: resultadosBusqueda
        }
        setModalContenido(modalData)
        setModal(true)  
    }

    //Obtiene la información del usuario al iniciar el componente
    useEffect(() =>{    
        const userInfo = async () =>{
            try {
                const response = await clienteAxios('getUserData.php');
                if(response.status==200){
                    const data = response.data;
                    const lon = parseFloat(split(data.loc , ',')[1]);
                    const lat = parseFloat(split(data.loc , ',')[0]);   
                    setLocation(lon,lat);      
                }else{
                    //Si no se pudieron cargar los datos de la ip del usuario se muestra Santiago de Chile por defecto 
                    setLocation(-70.673676,-33.447487);  
                }
            } catch (error) {
                mostrarModalAlerta('Ha ocurrido un error. Intente más tarde.');
                console.log(error);                
            }                    
        } 
        userInfo();

    },[])

    //Se obtendrá el pronostico del clima cuando se detecte un cambio en lat y lon
    useEffect(() =>{  
        getWeatherInfo();
    },[lon,lat])

    
    return (
        //Provee la la información
        <PronosticoContext.Provider
            value={{
                currentForecast,
                forecastHours,
                forecastDays,
                handleCambioDia,
                HandleSearchLocation,
                handleGetCurrentLocation,
                modal,
                handleModalState,
                modalContenido,
                setLocation
            }}
        >
            {children}
        </PronosticoContext.Provider>
    )
}

export {
    PronosticoProvider
}

export default PronosticoContext;