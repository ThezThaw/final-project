import { useEffect, useState } from "react";
import { DynamicButtonAction } from "../model/DynamicButtonAction";
import LoadingButtion from "./LoadingButton";
import { loadingService } from "../service/LoadingService";

export function ActionControl(props:any){

    const [isLoading, setLoading] = useState(false);
    useEffect(() => {
        loadingService.isLoading$.subscribe(l => setLoading(l));
    },[]);

    return (
        <>
            <div style={{margin:"0px 10px 0px 10px", display:"flex",gap:"5px"}}>
            {
                props.actions.map((action:DynamicButtonAction) => 
                    
                    // <button className="btn btn-primary" onClick={action.onClick}>{action.name}</button>
                    <LoadingButtion 
                        onClick={action.onClick} 
                        btnText={action.name}
                        icon={action.icon}
                        btnType={action.btnType ?? 'primary'}
                        isLoading={isLoading}
                        ></LoadingButtion>
                )
            }
            </div>
        </>
    );
}