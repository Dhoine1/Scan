import React from "react";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import "./styles/main.css";
import Whyme from "./why_me/Whyme";
import Sliderwhyme from "./sliderwhyme/Sliderwhyme";


const Main = () => {
    const expire = localStorage.getItem("expire");
    const currentDate = new Date();
    var islogggedin = false;
    if (expire > dateFormat(currentDate, 'isoDateTime')) {islogggedin = true};


    return (
        <div className='main_div'>

            <div className='main_getdata_block'>
                <div className='main_getdata_text'>
                    <h1>сервис по поиску <br/>публикаций <br/>о компании <br/>по его ИНН</h1><br/>
                    <p className='main_regular_text'>Комплексный анализ публикаций, получение данных<br/>в формате PDF на электронную почту.</p><br/>
                    <br/><br/>
                    {/* проверка авторизации через экпайр токена */}
                    { islogggedin ? (<Link className='main_serch_button' to='/search'>Запросить данные</Link>) : <div/>}
                </div>
                <div className='main_getdata_img'>
                    <img src='/pict/main_man.jfif' alt='smart man' />
                </div>
            </div>
            {/* три варианта карусели для разного размера окна */}
            <p className='main_medium_text'>ПОЧЕМУ ИМЕННО МЫ</p>           
            <div className='main_why_we'>
                <div className='main_slider_big'>
                    <Sliderwhyme items='3'/>
                </div>
                <div className='main_slider_middle'>
                    <Sliderwhyme items='2'/>
                </div>
                <div className='main_slider_mobile'>
                    <Sliderwhyme items='1'/>
                </div>
                <br/>
            </div>

            <img className='downman_img' src='/pict/down_man.svg' alt='down man' />
            <p className='main_medium_text'>НАШИ ТАРИФЫ</p>
            {/* Отрисовка тарифов с заглушками, так как информации о тарифе не получить
            В тарифах так много различий, что проще их отрисовать отдельно каждый */}
            <div className='main_tarifs'>
                
                <div className='main_tarif_beginner'>
                    <div className='main_tarif_head_beginner'>
                        <div className='main_tarif_head_text'>
                            <div><h3>Beginner</h3><br/>
                            Для небольшого исследования</div>
                            <div>
                                <img src='/pict/lamp.svg' alt='lamp' />
                            </div>
                        </div>
                    </div>
                    <div id='tarif_beginner'>
                        Текущий тариф
                    </div>
                    <div className='main_tarif_body'>
                        <div className='main_tarif_body_prise'>
                            <h3>799 ₽ </h3> <strike> 1 200 ₽</strike>
                        </div>
                        <div className='main_tarif_body_othertext'>
                            или 150 ₽/мес. при рассрочке на 24 мес.<br/><br/><br/><br/>
                            <h4>В тариф входит:</h4><br/>
                            <img className='main_galka' src='/pict/galka.png' alt='galka' />Безлимитная история запросов<br/>
                            <img className='main_galka' src='/pict/galka.png' alt='galka' />Безопасная сделка<br/>
                            <img className='main_galka' src='/pict/galka.png' alt='galka' />Поддержка 24/7<br/><br/>
                        </div>
                        <div className='main_tarif_body_button'>
                            <a className='main_tarif_podrobnee' href='#'>Подробнее</a>
                        </div>
                    </div>
                </div>

                <div className='main_tarif_pro'>
                    <div className='main_tarif_head_pro'>
                        <div className='main_tarif_head_text'>
                            <div><h3>Pro</h3><br/>
                            Для HR и фрилансеров</div>
                            <div>
                                <img className='arrow_svg' src='/pict/arrow.svg' alt='arrow' />
                            </div>
                        </div>
                    </div>
                    <div id='tarif_pro'>
                        Текущий тариф
                    </div>
                    <div className='main_tarif_body'>
                        <div className='main_tarif_body_prise'>
                            <h3>1 299 ₽ </h3> <strike> 2 600 ₽</strike>
                        </div>
                        <div className='main_tarif_body_othertext'>
                            или 279 ₽/мес. при рассрочке на 24 мес.<br/><br/><br/><br/>
                            <h4>В тариф входит:</h4><br/>
                            <img className='main_galka' src='/pict/galka.png' alt='galka' />Все пункты тарифа Beginner<br/>
                            <img className='main_galka' src='/pict/galka.png' alt='galka' />Экспорт истории<br/>
                            <img className='main_galka' src='/pict/galka.png' alt='galka' />Рекомендации по приоритетам<br/><br/>
                        </div>
                        <div className='main_tarif_body_button'>
                            <a className='main_tarif_podrobnee' href='#'>Подробнее</a>
                        </div>
                    </div>
                </div>

                <div className='main_tarif_business'>
                    <div className='main_tarif_head_business'>
                        <div className='main_tarif_head_text'>
                            <div><h3>Business</h3><br/>
                            Для корпоративных клиентов</div>
                            <div>
                                <img src='/pict/laptop.svg' alt='laptop' />
                            </div>
                        </div>
                    </div>
                    <div id='tarif_business'>
                        Текущий тариф
                    </div>
                    <div className='main_tarif_body'>
                        <div className='main_tarif_body_prise'>
                            <h3>2 379 ₽ </h3> <strike> 3 700 ₽</strike>
                        </div>
                        <div className='main_tarif_body_othertext'>
                            или 150 ₽/мес. при рассрочке на 24 мес.<br/><br/><br/><br/>
                            <h4>В тариф входит:</h4><br/>
                            <img className='main_galka' src='/pict/galka.png' alt='galka' />Все пункты тарифа Pro<br/>
                            <img className='main_galka' src='/pict/galka.png' alt='galka' />Безлимитное количество запросов<br/>
                            <img className='main_galka' src='/pict/galka.png' alt='galka' />Приоритетная поддержка<br/><br/>
                        </div>
                        <div className='main_tarif_body_button'>
                            <a className='main_tarif_podrobnee' href='#'>Подробнее</a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        );
    };
    
    export default Main;