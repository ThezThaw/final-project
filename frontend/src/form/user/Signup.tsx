import { useEffect, useRef, useState } from "react";
import { AppConst } from "../../helper/AppConst";
import LoadingButton from "../../component/LoadingButton";
import { SignupOrEditVm } from "../../model/SignupOrEditVm";
import { loadingService } from "../../service/LoadingService";
import * as userService from '../../service/UserService';

export default function Signup()
{
    // const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    
    const nameRef = useRef<HTMLInputElement>(null);
    const loginIdRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);

    useEffect(()=>{
        nameRef.current?.focus();
    },[]);

    const checkPasswordMatch = () => {
        if (passwordRef.current?.value !== confirmPasswordRef.current?.value) {
            confirmPasswordRef.current?.setCustomValidity('Passwords do not match');
        } else {
            confirmPasswordRef.current?.setCustomValidity('');
        }
      }

    const onSubmit = (e: any) => {
        e.preventDefault();
        if(!e.target.reportValidity()) return;

        let vm : SignupOrEditVm = {
            name: nameRef.current?.value || '',
            email: loginIdRef.current?.value || '',
            password: passwordRef.current?.value || '',
            imgChanged: false            
        };

        loadingService.setLoading(true);
        // userService.SignUp(vm, navigate)
        userService.SignUp(vm)
        .then(response => {
            if(response.status){
                //navigate(AppConst.RouteLink_Home);
            }else{
                console.error(response);
                // toast.error(response.message, {
                //     position: "top-center",
                //     autoClose: 1000,
                //     // autoClose: false,
                //     closeButton: false,
                //     theme: "colored"
                //   });
            }
        })
        .finally(() => loadingService.setLoading(false));
    }

    return (
        <>
            <div className="container-fluid" style={{marginTop:"50px",textAlign:"center"}}>
                <form className="row g-3 needs-validation" onSubmit={onSubmit} noValidate>

                    <div className="input-group">
                        <span className="input-group-text">Name</span>
                        <input id="name" type='text' ref={nameRef} className="form-control" required disabled={isLoading}></input>
                    </div>

                    <div className="input-group">
                        <span className="input-group-text">Email (Login ID)</span>
                        <input id="loginId" type='email' ref={loginIdRef} className="form-control" placeholder="example@email.com" required disabled={isLoading}></input>
                    </div>

                    <div className="input-group">
                        <span className="input-group-text">Password</span>
                        <input id="password" type='password' ref={passwordRef} className="form-control" required disabled={isLoading}></input>
                    </div>

                    <div className="input-group">
                        <span className="input-group-text">Confirm Password</span>
                        <input id="confirmpassword" onInput={checkPasswordMatch} type='password' ref={confirmPasswordRef} className="form-control" required disabled={isLoading}></input>
                    </div>
                    <LoadingButton isLoading={isLoading} btnText="Sing Up"></LoadingButton>
                    {/* <Link to={AppConst.RouteLink_Login}>Login</Link> */}
                </form>
            </div>
        </>
    );
}