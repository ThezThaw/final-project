import { ChangeEvent, useEffect, useRef, useState } from "react";
import { AppUserVm } from "../../model/AppUserVm";
import { actionService } from "../../service/ActionService";
import * as loggedInUserInfoService from '../../service/LoggedInUserInfoService';
import { DynamicButtonAction } from "../../model/DynamicButtonAction";
import { SignupOrEditVm } from "../../model/SignupOrEditVm";
import { loadingService } from "../../service/LoadingService";
import { toast } from "react-toastify";
import './Profile.css';
import { Buffer } from 'buffer';

export default function Profile(){

    const [currentUser, setCurrentUser] = useState<AppUserVm>();
    const [pwdChange, setPwdChage] = useState(false);

    const nameRef = useRef<HTMLInputElement>(null);
    const oldPasswordRef = useRef<HTMLInputElement>(null);
    const newPasswordRef = useRef<HTMLInputElement>(null);
    const btnUpdateRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {

        const cu = loggedInUserInfoService.getLoggedInUserInfo();
        setCurrentUser(cu ?? undefined);
        setBase64String(cu?.img ?? '');

        const btnActions: DynamicButtonAction[] = [
            {
                name: 'Update',
                onClick: () => {
                    btnUpdateRef.current?.click();
                }
            }
        ];
        
        actionService.setActions(btnActions);

    },[]);

    const onSubmit = async (e: any) => {
        e.preventDefault();
        if(!e.target.reportValidity()) return;

        const imgChanged = loggedInUserInfoService.getLoggedInUserInfo()?.img != base64String;

        let vm : SignupOrEditVm = {
            name: nameRef.current?.value || '',
            email: currentUser?.email || '',
            imgChanged: imgChanged,
            img: imgChanged ? base64String : null
        };
        if(pwdChange){
            vm.password = oldPasswordRef.current?.value;
            vm.newPassword = newPasswordRef.current?.value;
        }

        loadingService.setLoading(true);
        // userService.UpdateProfile(vm)
        // .then(response => {
        //     if(response.status){
        //         toast.success("Updated", {
        //             position: "top-center",
        //             autoClose: 1000,
        //             // autoClose: false,
        //             closeButton: false,
        //             theme: "colored"
        //           });
        //     }else{
        //         // console.error(response);
        //         // alert(response.message);
        //         toast.error(response.message, {
        //             position: "top-center",
        //             autoClose: 1000,
        //             // autoClose: false,
        //             closeButton: false,
        //             theme: "colored"
        //           });
        //     }
        // })
        // .finally(() => loadingService.setLoading(false));
    }

    const goingToChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPwdChage(e.target.checked);
        oldPasswordRef.current?.focus();
    }



    const targetSize = 1.5 * 1024 * 1024; // 1.5 MB
    const fileUploadRef = useRef<HTMLInputElement>(null);
    const [base64String, setBase64String] = useState('');
    const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files as FileList;
        selectedFiles?.[0]?.arrayBuffer().then(arrayBuffer => {
            const byteArray = new Uint8Array(arrayBuffer);

            if(byteArray.length > targetSize){
                toast.warning("Image file size is more than 1.5MB. Please use smaller size image instead.", {
                    position: "top-center",
                    autoClose: 5000,
                    // autoClose: false,
                    // closeButton: true,
                    theme: "colored"
                  });
                fileUploadRef.current!.value = '';
                return;
            }

            const buffer = Buffer.from(byteArray);
            const base64 = buffer.toString('base64');
            setBase64String(`data:image/jpeg;base64,${base64}`);
        })
      };

    const imgClicked = () => fileUploadRef.current?.click();
    const imgRemoveClicked = () => {
        setBase64String('');
        fileUploadRef.current!.value = '';
    }

    return (
        <>
            <div style={{display:"flex", justifyContent:"space-around"}}>
                <div style={{width:"50vw", textAlign:"center",marginTop:"50px"}}>
                    
                    <div style={{display:"flex",gap:"50px",padding:"20px",border:"1px solid lightgray",borderRadius:"10px"}}>

                        <div>
                            <form className="row g-3 needs-validation" onSubmit={onSubmit} noValidate>

                                <div className="input-group">
                                    <span className="input-group-text">Name</span>
                                    <input id="name" type='text' ref={nameRef} defaultValue={currentUser?.name} className="form-control" placeholder="Name" required></input>
                                </div>

                                <div style={{display:'flex'}}>
                                    <div className="form-check form-switch" style={{fontSize:"x-large"}}>                   
                                        <input onChange={goingToChangePassword} className="form-check-input" type="checkbox" role="switch" id="pwdChange"></input>
                                    </div>
                                    <div style={{alignSelf:"center"}}>
                                        Change password
                                    </div>
                                </div>


                                {pwdChange &&
                                    <>
                                        <div className="input-group">
                                            <span className="input-group-text">Old Password</span>
                                            <input id="oldpassword" type='password' ref={oldPasswordRef} className="form-control" placeholder="Old Password" required={pwdChange}></input>
                                        </div>
                                        <div className="input-group">
                                            <span className="input-group-text">New Password</span>
                                            <input id="newpassword" type='password' ref={newPasswordRef} className="form-control" placeholder="New Password" required={pwdChange}></input>
                                        </div>
                                    </>
                                }


                                <button hidden className="btn btn-primary" ref={btnUpdateRef}>Update</button>

                            </form>   
                        </div>

                        <div className="div-img">
                            <input ref={fileUploadRef} type="file" accept="image/*" onChange={selectImage} hidden />
                            <div>
                                {base64String != '' &&
                                    <div>
                                        <img className="profile-selected" src={base64String} onClick={imgClicked} />
                                        <span className="profile-btn profile-remove" onClick={imgRemoveClicked}>
                                            <i className="fa fa-times-circle profile-btn-border"></i>
                                        </span>
                                    </div>                            
                                }
                                {base64String == '' &&            
                                    <div>
                                        <i className="fas fa-user-circle profile-unselected" onClick={imgClicked}></i>
                                        <span className="profile-btn profile-add" onClick={imgClicked}>
                                            <i className="fa fa-plus-circle profile-btn-border"></i>
                                        </span>
                                    </div>
                                }
                            
                            </div>


                        </div>   
                    </div>
                </div>                
            </div>         
        </>
    );
}