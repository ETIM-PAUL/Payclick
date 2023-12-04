
    import React,{useRef} from 'react'
import QrScanner from "qr-scanner"

const QrCodeReader = ({setResult}) => {
    const [scannedQrFile, setScannedQrFile] = React.useState('');
    const fileRef = useRef(null)

    function handleScanFileBtn(){
        fileRef.current.click()
    }

    async function handleChangeScanFileBtn(e){
        const file = e.target.files[0];
        try{
            const result = await QrScanner.scanImage(file, {returnDetailedScanResult: true})
            await setScannedQrFile(result.data)
            console.log(result)
            if(setResult){
                setResult(result.data)
            }
        }catch(err){
            setScannedQrFile(err)
            console.log(err)
        } 
        
    }

  return (
    <div>
        <div className="filter-form-holder mt-10 flex-column flex-wrap justify-center">
                 <div className="search-buttons pl-2">
                     <button
                         onClick={()=>{handleScanFileBtn()}}
                         className="mr-2 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                        <span>Scan QR Code</span>
                        <input type="file"
                            ref={fileRef}
                            onChange={handleChangeScanFileBtn}
                            accept=".png, .jpg, .jpeg" className="opacity-0 hidden"/> 
                     </button>          
                 </div>
                 <h4>Scanned Code Result: {scannedQrFile && scannedQrFile}</h4>
             </div> 
    </div>
  )
}

export default QrCodeReader;
