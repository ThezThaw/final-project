
export default function PersonImage(props: any){

    return (
        <>
            <div style={{display:"flex",flexFlow:"column",alignItems:"center"}}>
                <div>
                    <img className={props.info.class} src={props.info.img} />
                </div>  
            </div>
        </>
    );
}