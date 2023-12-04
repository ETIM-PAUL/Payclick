
    import React from "react";
    import { useForm } from "react-hook-form";
    import { yupResolver } from "@hookform/resolvers/yup";
    import * as yup from "yup";
    import MkdSDK from "Utils/MkdSDK";
    import { useNavigate, useParams } from "react-router-dom";
    import { tokenExpireError } from "Context/Auth";
    import { GlobalContext, showToast } from "Context/Global";
    import { isImage, empty, isVideo } from "Utils/utils";
    import {MkdInput} from "Components/MkdInput";
    import {SkeletonLoader} from "Components/Skeleton"

    let sdk = new MkdSDK();

    const ViewCategoryPage = () => {
    const { dispatch: globalDispatch } = React.useContext(GlobalContext);

    const { dispatch } = React.useContext(GlobalContext);
    const [viewModel, setViewModel] = React.useState({});
    const [loading, setLoading] = React.useState(true)

    

    const params = useParams();

    React.useEffect(function () {
        (async function () {
        try {
            setLoading(true)
            sdk.setTable("category");
            const result = await sdk.callRestAPI({ id: Number(params?.id), join: "", }, "GET");
            if (!result.error) {

                setViewModel(result.model);
                setLoading(false)

            }
        } catch (error) {
            setLoading(false)

            console.log("error", error);
            tokenExpireError(dispatch, error.message);
        }
        })();
    }, []);
    return (
        <div className=" shadow-md rounded  mx-auto p-5">
       {loading ? (<SkeletonLoader/>) :(
        <>
        <h4 className="text-2xl font-medium">View Category</h4>

            
            
            <div className="mb-4 mt-4">
                <div className="flex mb-4">
                    <div className="flex-1">Name</div>
                    <div className="flex-1">{viewModel?.name}</div>
                </div>
            </div>
           
        
            
            <div className="mb-4 mt-4">
                <div className="flex mb-4">
                    <div className="flex-1">Status</div>
                    <div className="flex-1">{viewModel?.status}</div>
                </div>
            </div>
           
        
            
            </>    )
        }
        </div>
    );
    };

    export default ViewCategoryPage;

    