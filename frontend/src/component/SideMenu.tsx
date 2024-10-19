import { AppConst } from "../helper/AppConst";
import { PersonImageInfoVm } from "../model/PersonImageInfoVm";
import * as loggedInUserInfoService from '../service/LoggedInUserInfoService';
import PersonImage from "./PersonImage";

export function SideMenu(props:any){
    
    const getPersonImageInfo = () => {
        let info : PersonImageInfoVm = {
            img: loggedInUserInfoService.getLoggedInUserInfo()?.img ?? '',
            class: 'img-60 img-circle profile-img',
            defaultClass: 'icon-60 icon-empty'
        }
        return info;
    }

    const menuClicked = (url:string) => {
        props.navigate(url);
    }

    return (
        <>
            <div  style={{marginLeft:"-5px"}}>     
                <button type="button" className="btn btn-lg" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"><i className='fa fa-bars'></i></span>
                </button>

                <button type="button" className="btn btn-lg" style={{marginLeft:"-25px"}} onClick={() => menuClicked(AppConst.RouteLink_Root)}>
                    <span className="navbar-toggler-icon"><i className='fa fa-home' style={{fontSize:"x-large"}}></i></span>
                </button>

                <div style={{width:"50vw"}} className="offcanvas offcanvas-start text-bg" tabIndex={-1} id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                <div id="header" className="offcanvas-header" style={{borderBottom:"1px solid lightgray"}}>
                    

                    <div style={{display:"flex"}}>
                        <div>
                            <a className="nav-link active" aria-current="page" href="#" onClick={() => menuClicked(AppConst.RouteLink_Profile)} data-bs-dismiss="offcanvas">                                
                                <PersonImage info={getPersonImageInfo()}></PersonImage>
                            </a>
                        </div>
                        <div className="profile-name">
                            {loggedInUserInfoService.getLoggedInUserInfo()?.name}
                        </div>
                    </div>


                </div>
                <div id="body" className="offcanvas-body">
                    <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                        <li className="nav-item">
                            Menu 1
                        </li>
                        <li className="nav-item">
                            Menu 2
                        </li>
                    </ul>
                </div>
                </div>
            </div>
        </>
    );
}