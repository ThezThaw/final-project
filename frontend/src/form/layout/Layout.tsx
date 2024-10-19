import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ProgressBar, Toast } from "react-bootstrap";
import { actionService } from "../../service/ActionService";
import { loadingService } from "../../service/LoadingService";
import { ActionControl } from "../../component/ActionControl";
import { authService } from "../../service/AuthService";
import SpeedDial from "../../component/SpeedDial";
import { SideMenu } from "../../component/SideMenu";
import PersonImage from "../../component/PersonImage";
import { PersonImageInfoVm } from "../../model/PersonImageInfoVm";
import * as loggedInUserInfoService from '../../service/LoggedInUserInfoService';

export function Layout(){

    const [actions, setActions]= useState([]);
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const chk = useRef(true);    

    const getPersonImageInfo = () => {
      let info : PersonImageInfoVm = {
          img: loggedInUserInfoService.getLoggedInUserInfo()?.img ?? '',
          class: 'img-40 img-circle profile-img',
          defaultClass: 'icon-35 icon-empty'
      }
      return info;
  }


  useEffect(() => {
    if(chk.current){
  
      actionService.actions$.subscribe((actions:[]) => {
        setActions(actions);
      });

      loadingService.isLoading$.subscribe(l => setLoading(l));
    }

    return () => {
      chk.current = false;
    };
  },[])


  const logoutAction = {
    icon: 'fas fa-sign-out-alt',
    name: 'Logout',
    onClick: () => authService.logout(navigate),
  };

    
    return (
        <>
        
          <div style={{borderBottom:"1px solid grey",display:"flex",
            justifyContent:"space-between",
            position:'sticky',
            top:"0px",
            backgroundColor:"#f8f8f8",
            zIndex:"1000"}}>
            <div>
              <SideMenu navigate={navigate}></SideMenu>
            </div>
            <div style={{alignSelf:'center'}}>
              {/* <ActionControl actions={actions}></ActionControl> */}
                <div style={{display:"flex", gap:"5"}}>
                  
                  
                  <div className="profile-name-sm">
                      {loggedInUserInfoService.getLoggedInUserInfo()?.name}
                  </div>

                  <div style={{paddingRight:"5px",paddingLeft:"5px"}}></div>

                  <div style={{marginRight:"10px"}}>
                    <PersonImage info={getPersonImageInfo()}></PersonImage>
                  </div>
                </div>
            </div>
          </div>
          
          {isLoading &&
            <ProgressBar animated now={100} className="loading" />
          }                

        <Outlet />
        <SpeedDial actions={logoutAction}/>

        </>
    );
}