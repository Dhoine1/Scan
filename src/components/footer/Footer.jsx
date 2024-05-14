import React from "react";
import './footer.css'

const Footer = () => {
    return (
        <div className='footer'>
            <img className='footer_logo' src='./pict/scan_logo_negative.png' alt='logo' />
            <div className='footer_info'>
                <p>г. Москва, Цветной б-р, 40<br/>
                    +7 495 771 21 11<br/>
                    info@skan.ru</p><br/>
                <p className='footer_copyright'>Copyright. 2022</p>
            </div>
        </div>
    );
};
    
export default Footer;