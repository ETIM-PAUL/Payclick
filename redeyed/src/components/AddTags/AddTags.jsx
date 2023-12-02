
  import React from 'react';
  
  const AddTags = ({tags, tag, setTagData}) => {
    // console.log('addtag--->',{tags, tag, setTagData})
    return (
      <li className="px-2 py-1 text-sm inline-flex items-center gap-2 rounded bg-blue-500 text-white"><span>{tag}</span> <button onClick={() => setTagData(tags.filter(tags=> tags.name !== tag))} className="flex items-center justify-center h-5 w-5 rounded-full bg-blue-100 hover:bg-blue-200 duration-300"><span className="leading-0 -mt-1 text-black">&times;</span></button></li>
      );
};

export default AddTags;
