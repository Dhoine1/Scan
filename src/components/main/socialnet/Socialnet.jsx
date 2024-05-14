import React from "react";
import "./socialnet.css"


const Socialnet = (props) => {
    return (<>
        <img className="login_social_button" src={props.src} alt={props.alt}/>
        </>
    );

};
    
export default Socialnet;