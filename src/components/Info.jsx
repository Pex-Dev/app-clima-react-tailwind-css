export default function Info({data}) {
    
    return (
      <div className="flex flex-col justify-end">
          <p className="text-white text-3xl md:text-5xl font-rubik"> {data.value} <span className="text-cyan-300 text-lg "> {data.simbolo} </span> </p>
          <p className="text-cyan-300 text-base md:mt-1 md:text-lg font-rubik"> {data.text} </p>
          <p> {data.temp} </p>
      </div>
    )
  }
  