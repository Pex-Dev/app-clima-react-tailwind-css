import usePronostico from "../hooks/usePronostico"
import Resultado from "./Resultado";

export default function Modal() {
    const {handleModalState, modalContenido} = usePronostico();
    if(modalContenido.tipo=='alerta'){
        return (
            <div>
                <img 
                    src="/img/warning.png" 
                    alt="Alerta" 
                    className="w-20 mx-auto mb-7"
                />
                <p className="mb-5 text-white font-rubik"> {modalContenido.mensaje} </p>
                <button 
                    className="bg-blue-700 bg-opacity-40 px-4 py-2 w-full rounded text-white uppercase hover:bg-blue-500 hover:bg-opacity-50 transition-colors"
                    onClick={handleModalState}
                >
                    Cerrar
                </button>
            </div>
        )
    }else if(modalContenido.tipo=='resultados'){
        const resultados = modalContenido.resultados;
        return (
            <div>
                <h2 className="h1 mb-5 font-semibold text-2xl text-white font-rubik"> Resultados</h2>
                <ul className='flex flex-col gap-2 mb-3 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-900 scrollbar-track-indigo-950'>
                    {
                        resultados.map((resultado,indice) =>( <Resultado data={resultado}  key={indice}/>) )
                    }
                </ul>           
                <button 
                    className="bg-blue-700 bg-opacity-40 px-4 py-2 w-full rounded text-white uppercase hover:bg-blue-500 hover:bg-opacity-50 transition-colors"
                    onClick={handleModalState}
                >
                    Cerrar
                </button>
            </div>
        )
    }

    
}
