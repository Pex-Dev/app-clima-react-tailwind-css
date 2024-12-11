import usePronostico from "../hooks/usePronostico";
export default function Resultado(props) {
    const data = props.data;
    
    const {handleModalState, setLocation} = usePronostico();

    const handleClickResultado = () =>{        
        setLocation(data.lon,data.lat,data.name)
        handleModalState()
    }

    return (
        <div 
            className="bg-indigo-950 bg-opacity-90 rounded shadow px-2 py-3 transition-colors hover:bg-indigo-900 hover:bg-opacity-90 hover:cursor-pointer hover:shadow-lg"
            onClick={() =>{
                handleClickResultado()
            }}
        >
           <p className="text-white font-rubik">{data.display_name}</p> 
        </div>
    )
}
