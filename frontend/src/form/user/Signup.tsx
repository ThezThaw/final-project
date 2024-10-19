import { useEffect, useRef, useState } from "react";
import { AppConst } from "../../helper/AppConst";
import LoadingButton from "../../component/LoadingButton";
import { SignupOrEditVm } from "../../model/SignupOrEditVm";
import { loadingService } from "../../service/LoadingService";
import * as userService from '../../service/UserService';
import './Signup.css'
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Buffer } from 'buffer';

export default function Signup()
{
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    
    const nameRef = useRef<HTMLInputElement>(null);
    const loginIdRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);

    useEffect(()=>{
        nameRef.current?.focus();
        loadingService.isLoading$.subscribe(l => {
            setLoading(l);            
        });
    },[]);

    const imgClicked = () => fileUploadRef.current?.click();
    const imgRemoveClicked = () => {
        setBase64String('');
        fileUploadRef.current!.value = '';
    }


    const targetSize = 1.5 * 1024 * 1024; // 1.5 MB
    const fileUploadRef = useRef<HTMLInputElement>(null);
    const [base64String, setBase64String] = useState('');
    const [selectedImage, setSelectedImage] = useState<File | Blob>();
    const [selectedImageName, setSelectedImageName] = useState('');
    const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {


        if (event.target.files && event.target.files.length > 0) {
            setSelectedImage(event.target.files[0]);
            setSelectedImageName(event.target.files[0].name);
        }

        const selectedFiles = event.target.files as FileList;
        selectedFiles?.[0]?.arrayBuffer().then(arrayBuffer => {
            const byteArray = new Uint8Array(arrayBuffer);

            // if(byteArray.length > targetSize){
            //     toast.warning("Image file size is more than 1.5MB. Please use smaller size image instead.", {
            //         position: "top-center",
            //         autoClose: 5000,
            //         // autoClose: false,
            //         // closeButton: true,
            //         theme: "colored"
            //       });
            //     fileUploadRef.current!.value = '';
            //     return;
            // }

            const buffer = Buffer.from(byteArray);
            const base64 = buffer.toString('base64');
            setBase64String(`data:image/jpeg;base64,${base64}`);
        })

      };

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

        if (selectedImage) {
            const image = new FormData();
            image.append(vm.email,selectedImage);
            vm.imgFile = selectedImage;
            vm.profileImageType = selectedImage.type;
        }

        loadingService.setLoading(true);
        userService.SignUp(vm, navigate)
        .then(response => {
            if(response.status){
                navigate(AppConst.RouteLink_Profile);
            }else{
                console.error(response);
                toast.error(response.message, {
                    position: "top-center",
                    autoClose: 1000,
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
                <div style={{width:"50vw", textAlign:"center",marginTop:"50px"}}>
                    <div>
                        <div className="brand-name">
                            CS516
                        </div>                       
                    </div>
                    <br></br>

                    <div style={{display:"flex",gap:"50px",padding:"20px",border:"1px solid lightgray",borderRadius:"10px"}}>

                        <div>
                            <form className="row g-3 needs-validation" onSubmit={onSubmit} noValidate>

                                <div className="input-group">
                                    <span className="input-group-text">Name</span>
                                    <input id="name" type='text' ref={nameRef} className="form-control" required disabled={isLoading}></input>
                                </div>

                                <div className="input-group">
                                    <span className="input-group-text">Email</span>
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
                                <Link to={AppConst.RouteLink_Login}>Login</Link>
                                
                            </form>
                        </div>

                        <div className="div-img">
                            <input ref={fileUploadRef} type="file" accept="image/*" onChange={selectImage} hidden />
                            <div>
                                {base64String == '' ?            
                                    <div>
                                        <i className="fas fa-user-circle profile-unselected" onClick={imgClicked}></i>
                                        <span className="profile-btn profile-add" onClick={imgClicked}>
                                            <i className="fa fa-plus-circle profile-btn-border"></i>
                                        </span>
                                    </div>

                                    :

                                    <div>
                                        <img className="profile-selected" src={base64String} onClick={imgClicked} />
                                        <span className="profile-btn profile-remove" onClick={imgRemoveClicked}>
                                            <i className="fa fa-times-circle profile-btn-border"></i>
                                        </span>
                                    </div>     

                                }
                                
                            </div>
                        </div>


                    </div>                    
                    
                    <br></br>
                </div>
            </div>
        </>
    );
}