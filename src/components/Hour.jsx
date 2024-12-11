export default function Hour({data}) {
  return (
    <li className="inline-flex flex-col items-center bg-indigo-950 bg-opacity-40 rounded-xl p-1 min-w-16 md:min-w-20">
        <p className="text-cyan-300 text-lg font-rubik"> {data.hour} </p>
        <img 
            className="w-14 md:w-24"
            src={data.icon} 
            alt={data.resumen} 
        />
        <p className="text-cyan-300 text-lg font-rubik"> {data.temp}°</p>
    </li>
  )
}
