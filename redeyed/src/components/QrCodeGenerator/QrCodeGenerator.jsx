
    import React from 'react'
import QRCode from "qrcode"


const QrCodeGenerator = ({setResult}) => {
    const [textToGenerate, setTextToGenerate] = React.useState('');
    const [generatedQrcodeImageUrl, setGeneratedQrcodeImageUrl] = React.useState();


    async function generateQrCode(text){
        try {
            const response = await  QRCode.toDataURL(text)
            setGeneratedQrcodeImageUrl(response)
            console.log(response)
            if(setResult){
                setResult(response)
            }
        } catch (error) {
            console.error(error)
        }
    }



  return (
    <>
        <div>
            <div className="filter-form-holder mt-10 flex flex-wrap items-center">
                <div className="mb-4 w-full md:w-1/2 pr-2 pl-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Link</label>
                    <input
                    type="text"
                    placeholder="http://www.google.com"
                    onChange={(e)=>setTextToGenerate(e.target.value)}
                    className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="search-buttons pl-2">
                    <button
                        onClick={()=>generateQrCode(textToGenerate)}
                        className="mr-2 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                        Generate QR code
                    </button>          
                { generatedQrcodeImageUrl && 
                        <a href={generatedQrcodeImageUrl} download>
                                <button
                                    className="mr-2 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                                    Download
                                </button>
                            </a>  
                    }        
                </div>
            </div>
            {generatedQrcodeImageUrl && <img src={generatedQrcodeImageUrl} alt="Qr Code" width="300" height="300" />}
        </div>           
    </>
  );
}

export default QrCodeGenerator
