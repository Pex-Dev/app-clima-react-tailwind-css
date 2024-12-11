import { useState } from "react";
import usePronostico from "../hooks/usePronostico"

export default function SearchBard(props) {    
    const {HandleSearchLocation} = usePronostico();

    const [valorInput,setValorInput] = useState('');

    const handleSubmit = e =>{
        e.preventDefault();        
        if(valorInput.length>0){
            HandleSearchLocation(valorInput);  
        }      
    }

    const handleInputChange = e =>{
        setValorInput(e.target.value);
    }

    return (
        <form 
            className={`flex rounded-[50px] w-full overflow-hidden ${props.styles}`}
            onSubmit={handleSubmit}
        >
            <input 
                className="w-full h-12 px-5 text-xl bg-white  md:h-14 font-rubik"
                type="text" 
                name="search" 
                value={valorInput}
                onChange={handleInputChange}
                placeholder="Ej: Santiago de chile"
            />

            <button
                type="submit"
                className="w-14 h-12 md:h-14 flex justify-center items-center bg-black p-2 text-white hover:bg-gray-900 transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>

            </button>
        </form>
    )
}
