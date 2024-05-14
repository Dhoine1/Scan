import React from "react";
import './whyme.css'

// блок Почему мы
const Whyme = (props) => {
    return (
        <div className='whyme_block'>
            <img src={props.pict} alt='pictograme to text' /><br/>
            {props.text}
        </div>
    )
};
    
export default Whyme;