import {nombreDia, diaNumero} from '../helpers/FormatearFechas';
import BloqueVacio from './BloqueVacio';
import Info from './Info';
import usePronostico from '../hooks/usePronostico';

export default function MainInfo() {
    //Obtener pronostico para el día actial
    const {currentForecast} = usePronostico();   
    
    //Retornar nada si no se ha obtenido el pronostico
    if(!currentForecast){      
        return <BloqueVacio styles={'h-[391px] md:h-[338px]'} />;
    }
    
    const ciudad = currentForecast.ciudad;
    const diaActual = currentForecast.diaActual;
    const tempActual = currentForecast.tempActual;
    const tempMax = currentForecast.tempMax;
    const tempMin = currentForecast.tempMin;
    const resumen = currentForecast.resumen;
    const viento = currentForecast.viento;
    const uv = currentForecast.uv;
    const lluvia = currentForecast.lluvia;
    const humedad = currentForecast.humedad;
    const icon = currentForecast.icon

  return (
    <div className="bg-indigo-950 bg-opacity-40 p-4 md:p-6 rounded-xl border-t-2 border-white border-opacity-10">       
        <div className="flex flex-col md:flex-row md:justify-between divide-y md:divide-x md:divide-y-0">
          <div className='md:w-1/2'>
            <h1 className="text-white text-4xl md:text-5xl font-rubik"> {ciudad} </h1>
            <h2 className="text-cyan-300 md:text-xl md:mt-3 font-rubik"> { nombreDia(diaActual)} {diaNumero(diaActual)} </h2>
            <div className="flex items-center md:justify-start">
              <img className="w-32 md:w-[200px] font-rubik" src={icon} alt={resumen} />
              <div>
                <h3 className="text-8xl text-white font-light font-rubik"> {tempActual}° </h3>
                <p className="text-cyan-300 text-xl font-rubik"> {resumen} </p>
              </div>
            </div>
          </div>    
          <div className='grid grid-cols-3 gap-3 mt-4 pt-4 md:border-t-0  md:gap-8 md:w-1/2 md:pl-10'>
            <Info data={{value: tempMax+'°',simbolo: '', text: 'Max'}} />
            <Info data={{value: tempMin+'°', simbolo: '', text: 'Min'}} />
            <Info data={{value: viento, simbolo: 'km/h', text: 'Viento'}} />
            <Info data={{value: uv, simbolo: '',text: 'UV'}} />
            <Info data={{value: humedad, simbolo: '%', text: 'Humedad'}} />
            <Info data={{value: lluvia, simbolo: 'mm', text: 'LLuvia'}} />
          </div>
        </div>
    </div>
  )
}
//6e93dbf52d60a209a35b3e420e90ee3d