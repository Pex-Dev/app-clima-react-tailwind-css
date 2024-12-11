import Hour from "./Hour"
import BloqueVacio from "./BloqueVacio";
import usePronostico from "../hooks/usePronostico"
import {esHoy, nombreDia, diaNumero} from '../helpers/FormatearFechas';

export default function Hours(props) {
  //Obtiene el pronostico para las horas del días seleccionado
  const {forecastHours} = usePronostico();

  const formatearHora = hora =>{
    return hora.split(' ')[1];
  }
  
  if(!forecastHours){
    return <BloqueVacio styles={'h-[217px] mt-3 md:h-[249px] md:mt-5'} />;
  }

  return (
    <div className={`bg-indigo-950 bg-opacity-40 p-4 md:p-6 rounded-xl border-t-2 border-white border-opacity-10 ${props.styles}`}>
        <h3 className="text-white text-xl font-rubik"> { esHoy(forecastHours[0].time)? 'Clima hoy' : nombreDia(forecastHours[0].time)+' '+diaNumero(forecastHours[0].time) } </h3>
            <ul className="flex gap-2 py-3 md:gap-3  overflow-x-scroll scrollbar-thin scrollbar-thumb-indigo-900 scrollbar-track-indigo-950">
                {forecastHours.map(hora => (
                  <Hour 
                    data={{
                      hour: formatearHora(hora.time),
                      temp: Math.round(hora.temp_c),
                      icon: hora.condition.icon.replace('64x64','128x128'),
                      resumen: hora.condition.text
                    }} 
                    key={hora.time}
                  />
                ))}
            </ul>        
    </div>
  )
}
