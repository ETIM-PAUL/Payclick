
    import React from "react";
    import { useForm } from "react-hook-form";
    import { yupResolver } from "@hookform/resolvers/yup";
    import * as yup from "yup";
    import MkdSDK from "Utils/MkdSDK";
    import { useNavigate } from "react-router-dom";
    import { tokenExpireError } from "Context/Auth";
    import { GlobalContext, showToast } from "Context/Global";
    import ReactQuill from 'react-quill';
    import 'react-quill/dist/quill.snow.css';
    import { isImage, empty, isVideo, isPdf } from "Utils/utils";
    import {MkdInput} from "Components/MkdInput";
    import {InteractiveButton} from "Components/InteractiveButton";
    import {SkeletonLoader }from"Components/Skeleton"
    
    const AddCategoryPage = () => {
      const { dispatch: globalDispatch } = React.useContext(GlobalContext);
      const schema = yup
        .object({
          
        	name: yup.string(),
        	status: yup.string(),
        })
        .required();
    
      const { dispatch } = React.useContext(GlobalContext);
      const [fileObj, setFileObj] = React.useState({});
      const [isSubmitLoading, setIsSubmitLoading] = React.useState(false);
    
      const navigate = useNavigate();
      const {
        register,
        handleSubmit,
        setError,
        setValue,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema),
      });
      const [pageDetails, setPageDetails] = React.useState([]);

    const getPageDetails = async () => {
      const result = await (new TreeSDK()).getList("table")
                                          .catch(e => console.error(object))
      setPageDetails(result.list);
    }
    
      const previewImage = (field, target) => {
        let tempFileObj = fileObj;
        tempFileObj[field] = {
          file: target.files[0],
          tempURL: URL.createObjectURL(target.files[0]),
        };
        setFileObj({ ...tempFileObj });
      };
    
      const onSubmit = async (_data) => {
        let sdk = new MkdSDK();
    setIsSubmitLoading(true)
        try {
          for (let item in fileObj) {
            let formData = new FormData();
            formData.append('file', fileObj[item].file);
            let uploadResult = await sdk.uploadImage(formData);
            _data[item] = uploadResult.url;
          }
    
          sdk.setTable("category");
    
          const result = await sdk.callRestAPI(
            {
              
        		name: _data.name,
        		status: _data.status,
         
            },
            "POST"
          );
          if (!result.error) {
            showToast(globalDispatch, "Added");
            navigate("/admin/category");
          } else {
            if (result.validation) {
              const keys = Object.keys(result.validation);
              for (let i = 0; i < keys.length; i++) {
                const field = keys[i];
                setError(field, {
                  type: "manual",
                  message: result.validation[field],
                });
              }
            }
          }
          setIsSubmitLoading(false)
        } catch (error) {
          setIsSubmitLoading(false)
          console.log("Error", error);
          setError("name", {
            type: "manual",
            message: error.message,
          });
          tokenExpireError(dispatch, error.message);
        }
      };
    
      React.useEffect(() => {
        globalDispatch({
          type: "SETPATH",
          payload: {
            path: "category",
          },
        });
      }, []);

      return (
        <div className=" shadow-md rounded  mx-auto p-5">
          <h4 className="text-2xl font-medium">Add Category</h4>
          <form className=" w-full max-w-lg" onSubmit={handleSubmit(onSubmit)}>
    
            
      <MkdInput
      type={"text"}
      page={"category"}
      name={"name"}
      errors={errors}
      label={"Name"}
      placeholder={"Name"}
      register={register}
      className={""}
    />
        
            
      <MkdInput
      type={"number"}
      page={"category"}
      name={"status"}
      errors={errors}
      label={"Status"}
      placeholder={"Status"}
      register={register}
      className={""}
    />
          
        
            <InteractiveButton 
              type="submit"
              loading={isSubmitLoading}
              disabled={isSubmitLoading}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </InteractiveButton>
          </form>
        </div>
      );
    };
    
    export default AddCategoryPage;
    
    
    