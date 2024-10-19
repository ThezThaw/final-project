
export default function PersonImage(props: any){

    return (
        <>
            {props.info.img == '' ?
                <div>
                    <i className={"fas fa-user-circle " + props.info.defaultClass}></i>
                </div> 
            :
                <div>
                    <img className={props.info.class} src={props.info.img} />
                </div> 
            }
        </>
    );
}