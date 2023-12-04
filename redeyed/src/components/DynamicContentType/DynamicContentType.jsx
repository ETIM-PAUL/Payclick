
  
import React from "react";
import MkdSDK from "Utils/MkdSDK";
import {empty} from "Utils/utils";

const sdk = new MkdSDK();
const defaultImage = 'https://via.placeholder.com/150?text=%20';
const DynamicContentType = ({contentType, contentValue, setContentValue}) => {
    const [previewUrl, setPreviewUrl] = React.useState(defaultImage);
    const handleImageChange = async (e) => {
        const formData = new FormData();
        formData.append('file', e.target.files[0]);
        try {
            const result = await sdk.uploadImage(formData);
            setPreviewUrl(result.url);
            setContentValue(result.url);
        }catch(err) {
            console.error(err);
        }

    }
    switch (contentType) {
      case "text":
        return (
        <>
            <textarea  className={`shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`} 
                rows={15} 
                placeholder="Content"
                onChange={e => setContentValue(e.target.value)}
                defaultValue={contentValue}
            ></textarea>
        </>
        )

      case "image":
        return (
            <>
            <img src={empty(contentValue) ? previewUrl : contentValue }  alt="preview" height={150} width={150} />
            <input 
                type="file"
                onChange={handleImageChange}
                className={`shadow appearance-none border block  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`} 
                />
            </>
        )

      case "number":
        return (
            <input 
                type="number"
                className={`shadow appearance-none border block  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}   
                onChange={e => setContentValue(e.target.value)}
                defaultValue={contentValue}
            />
        )

      case "team-list":
        return (
            <TeamList setContentValue={setContentValue} contentValue={contentValue} />
        )

      case "image-list":
        return (
            <ImageList setContentValue={setContentValue} contentValue={contentValue} />
        )

      case "captioned-image-list":
        return (
            <CaptionedImageList setContentValue={setContentValue} contentValue={contentValue} />
        )

      case "kvp":
        return (
            <KeyValuePair setContentValue={setContentValue} contentValue={contentValue} />
        )
    
      default:
        break;
    }
}

export default DynamicContentType;

const ImageList = ({contentValue, setContentValue}) => {
    let itemsObj = [
        {key: '', value_type: 'image', value: null}
    ];
    if (!empty(contentValue)) {
        itemsObj = JSON.parse(contentValue);
    }
    const [items, setItems] = React.useState(itemsObj);


    const handleImageChange = async (e) => {
        const listKey = e.target.getAttribute('listkey');
        const formData = new FormData();
        formData.append('file', e.target.files[0]);
        try {
            const result = await sdk.uploadImage(formData);
            setItems(oldItems => {
                let updatedItems = oldItems.map((item, index) => { 
                    if (index == listKey) { 
                        item.value = result.url;
                        return item;
                    }
                    return item;
                });
                return updatedItems;
            })
            setContentValue(JSON.stringify(items))
        }catch(err) {
            console.error(err);
        }
    }

    const handleKeyChange = (e) => {
        const listKey = e.target.getAttribute('listkey');
        setItems(oldItems => {
            let updatedItems = oldItems.map((item, index) => { 
                if (index == listKey) { 
                    item.key = e.target.value;
                    return item;
                }
                return item;
            });
            return updatedItems;
        })
        setContentValue(JSON.stringify(items))
        
    }

    return (
        <div className="block">
        {items.map( (item, index) => <div key={index*0.23}>
                            <img src={item.value !== null ? item.value : defaultImage} alt="preview" height={150} width={150} />
                            <div className="flex">
                                <input 
                                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
                                    type="text" placeholder="key" listkey={index} onChange={handleKeyChange}  defaultValue={item.key} />
                                <input 
                                    listkey={index} 
                                    type="file" 
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
                                    />
                            </div>
                           
                          </div>)
        }
        <button 
            type="button"
            className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-1 px-2 my-4 rounded focus:outline-none focus:shadow-outline"
            onClick={ e => setItems(old => [...old, {key: '', value_type: 'image', value: null}])}>
                +
        </button>
        </div>
        
    )
}
  
const CaptionedImageList = ({setContentValue, contentValue}) => {
    let itemsObj = [
        {key: '', value_type: 'image', value: null, caption: ''}
    ]

    if (!empty(contentValue)) {
        itemsObj = JSON.parse(contentValue);
    }
    const [items, setItems] = React.useState(itemsObj);

    const handleImageChange = async (e) => {
        const listKey = e.target.getAttribute('listkey');
        const formData = new FormData();
        formData.append('file', e.target.files[0]);
        try {
            const result = await sdk.uploadImage(formData);
            setItems(oldItems => {
                let updatedItems = oldItems.map((item, index) => { 
                    if (index == listKey) { 
                        item.value = result.url;
                        return item;
                    }
                    return item;
                });
                return updatedItems;
            })
            setContentValue(JSON.stringify(items))
        }catch(err) {
            console.error(err);
        }
    }

    const handleKeyChange = (e) => {
        const listKey = e.target.getAttribute('listkey');
        setItems(oldItems => {
            let updatedItems = oldItems.map((item, index) => { 
                if (index == listKey) { 
                    item.key = e.target.value;
                    return item;
                }
                return item;
            });
            return updatedItems;
        })
        setContentValue(JSON.stringify(items))
    }

    const handleCaptionChange = (e) => {
        const listKey = e.target.getAttribute('listkey');
        setItems(oldItems => {
            let updatedItems = oldItems.map((item, index) => { 
                if (index == listKey) { 
                    item.caption = e.target.value;
                    return item;
                }
                return item;
            });
            return updatedItems;
        })
        setContentValue(JSON.stringify(items))
    }

    return (
        <div className="block">
        {items.map( (item, index) => <div key={index*0.23} >
                            <img src={item.value !== null ? item.value : defaultImage} alt="preview" height={150} width={150} />
                            <div className="flex">
                                <input 
                                    className={`shadow appearance-none border rounded w-full py-2 px-3 mr-2 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
                                    type="text" placeholder="Key" listkey={index} onChange={handleKeyChange}  defaultValue={item.key} 
                                    />
                                <input 
                                    listkey={index} 
                                    type="file" 
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
                                    />
                            </div>
                            <input 
                                className={`shadow block appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
                                type="text" 
                                placeholder="Caption" listkey={index} onChange={handleCaptionChange}  defaultValue={item.caption} 
                                />
                           
                          </div>)
        }
        <button 
            type="button"
            className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-1 px-2 my-4 rounded focus:outline-none focus:shadow-outline"
            onClick={ e => setItems(old => [...old, {key: '', value_type: 'image', value: null, caption: ''}])}>
                +
        </button>
        </div>
        
    )
}
const TeamList = ({setContentValue, contentValue}) => {
    let itemsObj = [
        {name: '', image: null, title: ''}
    ]

    if (!empty(contentValue)) {
        itemsObj = JSON.parse(contentValue);
    }
    const [items, setItems] = React.useState(itemsObj);

    const handleImageChange = async (e) => {
        const listKey = e.target.getAttribute('listkey');
        const formData = new FormData();
        formData.append('file', e.target.files[0]);
        try {
            const result = await sdk.uploadImage(formData);
            setItems(oldItems => {
                let updatedItems = oldItems.map((item, index) => { 
                    if (index == listKey) { 
                        item.image = result.url;
                        return item;
                    }
                    return item;
                });
                return updatedItems;
            })
            setContentValue(JSON.stringify(items))
        }catch(err) {
            console.error(err);
        }
    }

    const handleNameChange = (e) => {
        const listKey = e.target.getAttribute('listkey');
        setItems(oldItems => {
            let updatedItems = oldItems.map((item, index) => { 
                if (index == listKey) { 
                    item.name = e.target.value;
                    return item;
                }
                return item;
            });
            return updatedItems;
        })
        setContentValue(JSON.stringify(items))
    }

    const handleTitleChange = (e) => {
        const listKey = e.target.getAttribute('listkey');
        setItems(oldItems => {
            let updatedItems = oldItems.map((item, index) => { 
                if (index == listKey) { 
                    item.title = e.target.value;
                    return item;
                }
                return item;
            });
            return updatedItems;
        })
        setContentValue(JSON.stringify(items))
    }

    return (
        <div className="block my-4">
        {items.map( (item, index) => <div key={index*0.23} className="my-4" >
                            
                            {/* <div className="flex"> */}
                            <input 
                                className={`shadow block appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
                                type="text" 
                                placeholder="Title" listkey={index} onChange={handleTitleChange}  defaultValue={item.title} 
                                />
                            <input 
                                className={`shadow appearance-none border rounded w-full py-2 px-3 mr-2 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
                                type="text" placeholder="Name" listkey={index} onChange={handleNameChange}  defaultValue={item.name} 
                                />
                            <img src={item.image !== null ? item.image : defaultImage} alt="preview" height={150} width={150} />
                            <input 
                                listkey={index} 
                                type="file" 
                                accept="image/*"
                                onChange={handleImageChange}
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
                                />
                            {/* </div> */}
                           
                           
                          </div>)
        }
        <button 
            type="button"
            className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-1 px-2 my-4 rounded focus:outline-none focus:shadow-outline"
            onClick={ e => setItems(old => [...old, {name: '', image: null, title: ''}])}>
                +
        </button>
        </div>
        
    )
}
const KeyValuePair = ({setContentValue, contentValue}) => {
    let itemsObj = [
        {key: '', value_type: 'text', value: ''}
    ]
    
    if (!empty(contentValue)) {
        itemsObj = JSON.parse(contentValue);
    }
    
    const [items, setItems] = React.useState(itemsObj);
    const valueTypeMap = [
        {
            key: "text",
            value: "Text"
        },
        {
            key: "number",
            value: "Number"
        },
        {
            key: "json",
            value: "JSON Object"
        },
        {
            key: "url",
            value: "URL"
        }
    ]


    const handleKeyChange = (e) => {
        const listKey = e.target.getAttribute('listkey');
        setItems(oldItems => {
            let updatedItems = oldItems.map((item, index) => { 
                if (index == listKey) { 
                    item.key = e.target.value;
                    return item;
                }
                return item;
            });
            return updatedItems;
        })
        setContentValue(JSON.stringify(items))
    }

    const handleValueChange = (e) => {
        const listKey = e.target.getAttribute('listkey');
        setItems(oldItems => {
            let updatedItems = oldItems.map((item, index) => { 
                if (index == listKey) { 
                    item.value = e.target.value;
                    return item;
                }
                return item;
            });
            return updatedItems;
        })
        setContentValue(JSON.stringify(items))
    }

    const handleValueTypeChange = (e) => {
        const listKey = e.target.getAttribute('listkey');
        setItems(oldItems => {
            let updatedItems = oldItems.map((item, index) => { 
                if (index == listKey) { 
                    item.value_type = e.target.value;
                    return item;
                }
                return item;
            });
            return updatedItems;
        })
        setContentValue(JSON.stringify(items))
    }

    return (
        <div className="block">
        {items.map( (item, index) => <div key={index*0.23} className="my-4" >
                            <input 
                                className={`shadow appearance-none border rounded w-full py-2 px-3 mr-2 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
                                type="text" placeholder="Key" listkey={index} onChange={handleKeyChange}  defaultValue={item.key} 
                                />
                            <select 
                                className={`shadow block border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
                                listkey={index} onChange={handleValueTypeChange}  defaultValue={item.value_type}>
                                    {valueTypeMap.map( (type, index) => <option key={index*122}  value={type.key}>{type.value}</option>)}
                            </select>
                            <input 
                                className={`shadow block appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
                                type="text" 
                                required
                                placeholder="Value" listkey={index} onChange={handleValueChange}  defaultValue={item.value} 
                                />
                            
                           
                          </div>)
        }
        <button 
            type="button"
            className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-1 px-2 my-4 rounded focus:outline-none focus:shadow-outline"
            onClick={ e => setItems(old => [...old, {key: '', value_type: 'text', value: ''}])}>
                +
        </button>
        </div>
        
    )
}


