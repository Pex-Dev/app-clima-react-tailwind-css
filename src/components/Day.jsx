import {nombreDia, diaNumero} from '../helpers/FormatearFechas';
import usePronostico from '../hooks/usePronostico';

export default function Day({data}) {    
    const {handleCambioDia} = usePronostico();


  return (
    <li className="w-full flex flex-col md:flex-row items-center bg-indigo-950 bg-opacity-40 rounded-xl p-1 px-2 md:px-6 min-w-16 md:min-w-20
        transition-colors hover:bg-indigo-900 hover:bg-opacity-40 hover:cursor-pointer hover:shadow-lg"
        onClick={() =>{
            handleCambioDia(data.indice)
        } }
    >  
        <div className="flex w-full gap-2 md:block md:w-auto">
            <p className="text-white text-lg md:text-2xl font-rubik"> { nombreDia(data.fecha) } </p>
            <p className="text-cyan-300 text-lg font-rubik"> { diaNumero(data.fecha) } </p>    
        </div>     
        <div className="flex justify-between w-full items-center">
            <img 
                className="w-12 md:w-20"
                src={data.icon}
                alt={data.resumen}
            />      
            <div>
                <p className="text-white text-lg md:text-2xl font-rubik"> {data.tempMin}° </p>
                <p className="text-cyan-300 text-lg font-rubik">Min</p>
            </div> 
            <div>
                <p className="text-white text-lg md:text-2xl font-rubik"> {data.tempMax}° </p>
                <p className="text-cyan-300 text-lg font-rubik">Max</p>
            </div> 
            <div>
                <p className="text-white text-lg md:text-2xl font-rubik"> {data.lluvia}<span className="text-cyan-300 text-lg "> mm </span> </p>
                <p className="text-cyan-300 text-lg font-rubik">Lluvia</p>
            </div> 
            <div>
                <p className="text-white text-lg md:text-2xl font-rubik"> {data.viento}<span className="text-cyan-300 text-lg ">km/h</span> </p>
                <p className="text-cyan-300 text-lg font-rubik">Viento</p>
            </div> 
        </div>        
    </li>
  )
}
