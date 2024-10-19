import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import './Login.css'
import LoadingButton from "../../component/LoadingButton";
import { loadingService } from "../../service/LoadingService";
import { AppConst } from "../../helper/AppConst";
import { authService } from "../../service/AuthService";
import { getLoggedInUserInfo } from "../../service/LoggedInUserInfoService";

export function Login(){    
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const loginIdRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    useEffect(() => {

        const chk = getLoggedInUserInfo();
        if(chk) navigate(AppConst.RouteLink_Root);


        loginIdRef.current?.focus();
        loadingService.isLoading$.subscribe(l => setLoading(l));

    },[]);

    const loginClicked = (event: any) => {        

        event.preventDefault();
        if(!event.target.reportValidity()) return;




        const email = loginIdRef.current?.value || '';
        const password = passwordRef.current?.value || '';
        loadingService.setLoading(true);
        authService.login(email, password,navigate)
        .then(response => {
            if(response.status){
                navigate(AppConst.RouteLink_Profile);
            }else{
                loginIdRef.current?.focus();
                toast.error(response.message, {
                    position: "top-center",
                    autoClose: 1500,
                    // autoClose: false,
                    closeButton: false,
                    theme: "colored"
                  });
            }
        })
        .finally(() => loadingService.setLoading(false));
    }

    return (
        <>



            <div style={{display:"flex", justifyContent:"space-around"}}>
                <div style={{width:"30vw", textAlign:"center",marginTop:"50px"}}>
                    <div>
                        <div className="brand-name">
                            CS516
                        </div>        
                        <div className="brand-sub-name">Final Project</div>                                                        
                    </div>
                    <br></br>
                    <form onSubmit={loginClicked} className="row g-3 needs-validation" noValidate>
                        <input type="email" id="loginId" ref={loginIdRef} className='form-control' placeholder="Email" required disabled={isLoading}></input>
                        <input type="password" id="password" ref={passwordRef} className='form-control' placeholder="Password" required disabled={isLoading}></input>                        
                        <LoadingButton isLoading={isLoading} btnText="Login"></LoadingButton>

                    </form>
                    <br></br>
                    <Link to={AppConst.RouteLink_Signup}>Signup</Link>
                </div>
            </div>
        </>
    );
}