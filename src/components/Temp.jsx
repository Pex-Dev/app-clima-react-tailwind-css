export default function Temp({temp}) {
    
  return (
    <div className="flex flex-col gap-1">
        <p className="text-white text-4xl"> {temp}° </p>
        <p className="text-cyan-300"> Min </p>
    </div>
  )
}
