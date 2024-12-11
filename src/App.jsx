import MainInfo from "./components/MainInfo"
import SearchBard from "./components/SearchBard"
import Hours from "./components/Hours"
import Days from "./components/Days"
import LocalizeButton from "./components/LocalizeButton"
import ReactModal from "react-modal"
import usePronostico from "./hooks/usePronostico"
import Modal from "./components/Modal"


function App() {

    ReactModal.setAppElement('#root');
    const {modal} = usePronostico();

    return (
      <div className="container mx-auto max-w-[1000px] p-3 md:p-5 ">
        <div className="flex justify-between gap-3">
          <SearchBard styles={'mb-3 md:mb-5'} />
          <LocalizeButton />
        </div>      
        <MainInfo />
        <Hours styles={'mt-3 md:mt-5'} />
        <Days styles={'mt-3 md:mt-5'} />
        <ReactModal 
          isOpen={modal} 
          className={'bg-indigo-950 bg-opacity-85 rounded-xl border-t border-indigo-200 border-opacity-50 p-4 outline-none shadow-2xl max-w-[500px]'}
          overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-70 flex justify-center items-center z-5" 
        >
          <Modal />
        </ReactModal >
      </div>
    )
}

export default App
