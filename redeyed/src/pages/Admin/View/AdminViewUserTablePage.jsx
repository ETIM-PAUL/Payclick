
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

    const ViewUserPage = () => {
    const { dispatch: globalDispatch } = React.useContext(GlobalContext);

    const { dispatch } = React.useContext(GlobalContext);
    const [viewModel, setViewModel] = React.useState({});
    const [loading, setLoading] = React.useState(true)

    

    const params = useParams();

    React.useEffect(function () {
        (async function () {
        try {
            setLoading(true)
            sdk.setTable("user");
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
        <h4 className="text-2xl font-medium">View User</h4>

            
            
            <div className="mb-4 mt-4">
                <div className="flex mb-4">
                    <div className="flex-1">Id</div>
                    <div className="flex-1">{viewModel?.id}</div>
                </div>
            </div>
           
        
            
            <div className="mb-4 mt-4">
                <div className="flex mb-4">
                    <div className="flex-1">Oauth</div>
                    <div className="flex-1">{viewModel?.oauth}</div>
                </div>
            </div>
           
        
            
            <div className="mb-4 mt-4">
                <div className="flex mb-4">
                    <div className="flex-1">Role</div>
                    <div className="flex-1">{viewModel?.role}</div>
                </div>
            </div>
           
        
            
            <div className="mb-4 mt-4">
                <div className="flex mb-4">
                    <div className="flex-1">First Name</div>
                    <div className="flex-1">{viewModel?.first_name}</div>
                </div>
            </div>
           
        
            
            <div className="mb-4 mt-4">
                <div className="flex mb-4">
                    <div className="flex-1">Last Name</div>
                    <div className="flex-1">{viewModel?.last_name}</div>
                </div>
            </div>
           
        
            
            <div className="mb-4 mt-4">
                <div className="flex mb-4">
                    <div className="flex-1">Email</div>
                    <div className="flex-1">{viewModel?.email}</div>
                </div>
            </div>
           
        
            
            <div className="mb-4 mt-4">
                <div className="flex mb-4">
                    <div className="flex-1">Password</div>
                    <div className="flex-1">{viewModel?.password}</div>
                </div>
            </div>
           
        
            
            <div className="mb-4 mt-4">
                <div className="flex mb-4">
                    <div className="flex-1">Type</div>
                    <div className="flex-1">{viewModel?.type}</div>
                </div>
            </div>
           
        
            
            <div className="mb-4 mt-4">
                <div className="flex mb-4">
                    <div className="flex-1">Verify</div>
                    <div className="flex-1">{viewModel?.verify}</div>
                </div>
            </div>
           
        
            
            <div className="mb-4 mt-4">
                <div className="flex mb-4">
                    <div className="flex-1">Phone</div>
                    <div className="flex-1">{viewModel?.phone}</div>
                </div>
            </div>
           
        
            
            <div className="mb-4 mt-4">
                <div className="flex mb-4">
                    <div className="flex-1">Photo</div>
                    <div className="flex-1">{viewModel?.photo}</div>
                </div>
            </div>
           
        
            
            <div className="mb-4 mt-4">
                <div className="flex mb-4">
                    <div className="flex-1">Refer</div>
                    <div className="flex-1">{viewModel?.refer}</div>
                </div>
            </div>
           
        
            
            <div className="mb-4 mt-4">
                <div className="flex mb-4">
                    <div className="flex-1">Stripe Uid</div>
                    <div className="flex-1">{viewModel?.stripe_uid}</div>
                </div>
            </div>
           
        
            
            <div className="mb-4 mt-4">
                <div className="flex mb-4">
                    <div className="flex-1">Paypal Uid</div>
                    <div className="flex-1">{viewModel?.paypal_uid}</div>
                </div>
            </div>
           
        
            
            <div className="mb-4 mt-4">
                <div className="flex mb-4">
                    <div className="flex-1">Two Factor Authentication</div>
                    <div className="flex-1">{viewModel?.two_factor_authentication}</div>
                </div>
            </div>
           
        
            
            <div className="mb-4 mt-4">
                <div className="flex mb-4">
                    <div className="flex-1">Status</div>
                    <div className="flex-1">{viewModel?.status}</div>
                </div>
            </div>
           
        
            
            <div className="mb-4 mt-4">
                <div className="flex mb-4">
                    <div className="flex-1">Create At</div>
                    <div className="flex-1">{viewModel?.create_at}</div>
                </div>
            </div>
           
        
            
            <div className="mb-4 mt-4">
                <div className="flex mb-4">
                    <div className="flex-1">Update At</div>
                    <div className="flex-1">{viewModel?.update_at}</div>
                </div>
            </div>
           
        
            
            </>    )
        }
        </div>
    );
    };

    export default ViewUserPage;

    