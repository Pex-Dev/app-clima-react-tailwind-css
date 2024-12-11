import Day from "./Day"
import BloqueVacio from "./BloqueVacio";
import usePronostico from "../hooks/usePronostico"

export default function Days(props) {
  //Obtiene el pronostico para los 3 días
  const {forecastDays} = usePronostico();
  
  //Si no hay un pronostico retorna nada xd
  if(!forecastDays){
    return <BloqueVacio styles={'h-[386px] mt-3 md:mt-5'} />;
  }

  return (
    <div className={`bg-indigo-950 bg-opacity-40 p-4 md:p-6 rounded-xl border-t-2 border-white border-opacity-10 ${props.styles}`}>
        <p className="text-white text-xl font-rubik">Pronostico 3 días</p>
        <ul className="flex flex-col gap-4 mt-3">
          {
            forecastDays.map((day, index) => (
              <Day data={{
                  fecha: day.date,
                  tempMin: Math.round(day.day.mintemp_c),
                  tempMax: Math.round(day.day.maxtemp_c),
                  lluvia: Math.round(day.day.totalprecip_mm),
                  viento: Math.round(day.day.maxwind_kph),
                  icon: day.day.condition.icon.replace('64x64','128x128'),
                  resumen: day.day.condition.text,
                  indice: index
                }}
                key={day.date} 
              />
            ))
          }           
        </ul>
    </div>
  )
}