import React, {useState}  from "react";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import './menu.css';
import Info from "./info/Info.jsx";
import { slide as Slide} from 'react-burger-menu';
import Loader from "../../fonts/loader.js";

// heaader с меню и проверкой авторизации
const Menu = () => {
    const expire = localStorage.getItem("expire");
    const currentDate = new Date();
    const [isLoading, setIsLoading] = useState(true);
    var islogggedin = false;
    // проверка, что токен не истек
    if (expire > dateFormat(currentDate, 'isoDateTime')) {islogggedin = true};

    setTimeout (() => {
        setIsLoading(false);
    }, 2000);


    const logout = () => {
        localStorage.setItem("accessToken", "");
        localStorage.setItem("expire", "");
    };

    
    return (<>
        
        <div className='header'>
            <img className='header_logo' src='./pict/scan_logo.png' alt='logo' />
           
            {/* без бургер меню на 1200px +*/}
            <div className='header_menu'>
                <Link to="/main">Главная</Link>
                <Link to=".">Тарифы</Link>
                <Link to=".">FAQ</Link>
            </div>
            
           
            <div className='header_login'>
                {/* проверка авторизации */}
                { islogggedin ? ( 
                    <div className="header_rightside_afterlogin">
                        <div className="header_info"> 
                        {/* крутилка */}
                            {isLoading ? <div className="header_loader"><Loader/></div> : <Info />}
                         </div>
                            {/* с бургер меню на < 1200px */}
                            <div className='header_menu_small'>
                            <Slide right>
                                <Link to="/main">Главная</Link><br/>
                                <Link to=".">Тарифы</Link><br/>
                                <Link to=".">FAQ</Link><br/><br/><br/>
                                <a className="header_td_profile_div_text_exit" href="." onClick={logout}>Выйти</a>
                            </Slide>
                            </div> 
                            {/* заглушка для профиля и логаут */}
                        <div className='header_td_profile'>
                            <div className="header_td_profile_div">
                                <div className="header_td_profile_div_text">Алексей А.<br/>
                                    <a className="header_td_profile_div_text_exit" href="." onClick={logout}>Выйти</a>
                                </div>
                                    <img src="/pict/ava.png" alt='avatara' className="header_td_profile_div_ava"/>
                            </div>
                        </div>
                    </div>) : (
                    <div>
                        {/* вариант меню для навошедших в профиль */}
                        <div className='header_menu_small'>
                        <Slide right>
                            <Link to="/main">Главная</Link><br/>
                            <Link to=".">Тарифы</Link><br/>
                            <Link to=".">FAQ</Link><br/><br/><br/>
                            <a className="header_menu_small_grey" href=".">Зарегистрироваться</a><br/>
                            <Link className='header_enter_button' to='/login'><strong>Войти</strong></Link>
                        </Slide>
                        </div>

                        <table className='header_table'>
                        <tbody>
                            <tr>
                                <td className='header_td_text'><a href='.'>Зарегистрироваться </a></td>
                                <td className='header_td_stick'>|</td>
                                <td className='header_td_button'>
                                <Link className='header_enter_button' to='/login'><strong>Войти</strong></Link></td>
                            </tr>
                        </tbody>                 
                        </table>
                    </div>
                    )}                 
            </div>
        </div>
        </>
    );
};

export default Menu;