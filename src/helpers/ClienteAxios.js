import axios from "axios";

const clienteAxios = axios.create({
    baseURL : './php/'
})

export default clienteAxios;