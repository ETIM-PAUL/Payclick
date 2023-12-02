

import React from "react";

const ImagePreviewModal = ({ file, handleFileUpload, cancelFileUpload }) => {
    const [imageSrc, setImageSrc] = React.useState()

    React.useEffect(() => {
        if (file.length > 0) {
            setImageSrc(URL.createObjectURL(file[0]))
        }
    }, [file])


    return (
        <>
            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div
                    className="fixed inset-0 w-full h-full bg-black opacity-40"
                    onClick={cancelFileUpload}
                ></div>
                <div className="flex items-center min-h-screen px-4 py-8">
                    <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                        <div className="mt-3 sm:flex">
                            <div className="mt-2 text-center sm:ml-4 sm:text-left">
                                <h4 className="text-lg font-medium text-gray-800">
                                    Send Image{file.length > 1 && 's'}
                                </h4>
                                <img className="block" src={imageSrc} />
                                <div className="items-center gap-2 mt-3 sm:flex">
                                    <button
                                        className="w-full mt-2 p-2.5 flex-1 mr-4 text-white bg-blue-600 whitespace-nowrap rounded-md outline-none ring-offset-2 ring-blue-600 focus:ring-2"
                                        onClick={handleFileUpload}
                                    >
                                        Send Message
                                    </button>
                                    <button
                                        className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                                        onClick={cancelFileUpload}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ImagePreviewModal


