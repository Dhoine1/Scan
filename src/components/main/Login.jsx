import React, { useState } from "react";
import "./styles/login.css";

import Socialnet from "./socialnet/Socialnet";
import axios from "axios";

// страница авторизации
const Login = () => {

    const login_api = "https://gateway.scan-interfax.ru/api/v1/account/login" 

    const [data, setData] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        const value = e.target.value;
        const button = document.getElementById('login_button');
        setData({
            ...data,
            [e.target.name]: value,
        });
        // если во все поля что-то ввели, то кнопка для логина становится активной
        if (data.username === "" || data.password === "") { button.disabled = true } else { button.disabled = false}
        
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            login: data.username,
            password: data.password,
        };
        //запрос на авторизацию и помещения токена в локал сторадж
        axios.post(login_api, userData)
            .then((response) => {
                if (response.status === 200) {
                    localStorage.setItem("accessToken", response.data["accessToken"]);
                    localStorage.setItem("expire", response.data["expire"] );
                    console.log(localStorage.getItem("accessToken"));
                    console.log(localStorage.getItem("expire"));

                    window.location.href = ".";
                }

            })
            .catch((error) => {
                if (error.response.status === 401) {
                    const status = document.getElementById('login_error');
                    status.innerHTML = "Логин или пароль неверен ";
                } else if (error.response) {
                    console.log(error.response);
                    console.log("server error");
                } else if (error.request) {
                    console.log("network error");
                } else {
                    console.log(error);
                }
            })
    };

    return (
        <div className='login_main'>
            
            <div className='login_left_field'>
                ДЛЯ ОФОРМЛЕНИЯ ПОДПИСКИ <br/>НА ТАРИФ, НЕОБХОДИМО <br/>АВТОРИЗОВАТЬСЯ.<br/><br/>
                <img className='login_img_characters' src="/pict/characters.svg" alt='characters' />
            </div>
            <img className="login_form_lock" src='/pict/lock.svg' alt='Lock'/>
            <div className='login_right_field'>       
               <div className="login_enter_register">
                    <div className='login_enter'><pre>     Войти     </pre></div>
                    <div className="login_register"><pre>  Зарегистрироваться  </pre></div>
               </div>

               <div className="login_form_field">
                    <form className="login_form" noValidate onSubmit={handleSubmit}>
                        <label className="login_label">Логин или номер телефона:</label><br/>
                        <input className='login_input' type='text' id='username' name='username' value={data.username} onChange={handleChange}/><br/>
                        <label className="login_label">Пароль:</label><br/>
                        <input className='login_input' type='password' id='password' name='password' value={data.password} onChange={handleChange}/><br/>
                        <span id="login_error"></span>
                        <button className="login_button" type='submit' disabled id="login_button" >Войти</button>
                    </form>
                    <div className="login_remake_password"><u>Восстановить пароль</u></div>
               </div>
               <p className="login_form_field">Войти через:</p>
                {/* кнопки социальных сетей */}
               <div className="login_socialnet">
                    <Socialnet src="/pict/google.png" alt="Google"/>
                    <Socialnet src="/pict/facebook.png" alt="Facebook"/>
                    <Socialnet src="/pict/yandex.png" alt="Yandex"/>
               </div>
            </div>
            <img className='login_img_characters_mobile' src="/pict/characters.svg" alt='characters' />

        </div>
        );
    };
    
    export default Login;