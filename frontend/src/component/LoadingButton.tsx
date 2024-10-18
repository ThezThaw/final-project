import { Spinner } from "react-bootstrap";

export default function LoadingButton(props: any){
    return (
        <button className={"btn btn-" + (props.btnType ?? 'primary')} onClick={props.onClick} disabled={props.isLoading}>
            {props.isLoading 
                ?
                <>
                    <Spinner                            
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    />
                    <span>&nbsp;</span>
                </>
                :
                <i className={props.icon}></i>
            }            
            {
                props.btnText
            }
        </button>
    );
}