
const nombreDia = (fechaString) =>{
    const fecha = new Date(fechaString.replace(' ', 'T'));
    const dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const diaDeLaSemana = dias[fecha.getUTCDay()];
    return diaDeLaSemana;
}

const diaNumero = (fechaString) =>{
    const fecha = new Date(fechaString.replace(' ', 'T'));
    const diaDelMes = fecha.getUTCDate();
    return diaDelMes;
}

const esHoy = (fechaString) => {
    const fecha = new Date(fechaString.replace(' ', 'T'));
    const hoy = new Date();
    return fecha.getFullYear() === hoy.getFullYear() &&
                fecha.getMonth() === hoy.getMonth() &&
                fecha.getDate() === hoy.getDate();
}

export {nombreDia, diaNumero, esHoy};