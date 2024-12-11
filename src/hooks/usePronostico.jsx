import { useContext } from "react";
import PronosticoContext from "../Provider/PronosticoProvider";

const usePronostico = () =>{
    return useContext(PronosticoContext);
}

export default usePronostico;