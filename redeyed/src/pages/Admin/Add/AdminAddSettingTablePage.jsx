
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
    
    const AddSettingPage = () => {
      const { dispatch: globalDispatch } = React.useContext(GlobalContext);
      const schema = yup
        .object({
          
        	setting_key: yup.string(),
        	setting_value: yup.string(),
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
    
          sdk.setTable("setting");
    
          const result = await sdk.callRestAPI(
            {
              
        		setting_key: _data.setting_key,
        		setting_value: _data.setting_value,
         
            },
            "POST"
          );
          if (!result.error) {
            showToast(globalDispatch, "Added");
            navigate("/admin/setting");
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
          setError("setting_key", {
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
            path: "setting",
          },
        });
      }, []);

      return (
        <div className=" shadow-md rounded  mx-auto p-5">
          <h4 className="text-2xl font-medium">Add Setting</h4>
          <form className=" w-full max-w-lg" onSubmit={handleSubmit(onSubmit)}>
    
            
      <MkdInput
      type={"text"}
      page={"setting"}
      name={"setting_key"}
      errors={errors}
      label={"Setting Key"}
      placeholder={"Setting Key"}
      register={register}
      className={""}
    />
        
            
        <div className="mb-4  ">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="setting_value"
        >
          Setting Value
        </label>
        <textarea
          placeholder="Setting Value"
          {...register("setting_value")}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            errors.setting_value?.message ? "border-red-500" : ""
          }`}
          row={50}
        ></textarea>
        <p className="text-red-500 text-xs italic">
          {errors.setting_value?.message}
        </p>
      </div>
        
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
    
    export default AddSettingPage;
    
    
    