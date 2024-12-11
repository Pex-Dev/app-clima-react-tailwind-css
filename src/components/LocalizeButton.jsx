import usePronostico from "../hooks/usePronostico"
export default function LocalizeButton() {
    const {handleGetCurrentLocation} = usePronostico();

    return (
        <div className="group relative">
            <button
                className="flex justify-center items-center rounded-full bg-green-700 hover:bg-green-600 transition-colors text-white min-h-12 h-12 min-w-12 w-12 md:h-14 md:w-14"
                onClick={handleGetCurrentLocation}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 md:w-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
            </button>
            <div className="hidden group-hover:block absolute
                bg-cyan-950 bg-opacity-90 border-t border-cyan-800 text-white w-56 rounded-lg shadow-lg p-2 mt-3  -left-44 md:-left-16"
            >
                <p>Obten el pronóstico para tu ubicación actual</p>
            </div>
        </div>    
    )
}
