import React, { useEffect, useState } from "react";
import "./styles/rezult.css";
import axios from "axios";
import Loader from "../../fonts/loader.js";

const Result = () => {
    const histogram_api = "https://gateway.scan-interfax.ru/api/v1/objectsearch/histograms"; 
    const object_api = "https://gateway.scan-interfax.ru/api/v1/objectsearch";
    const post_api = "https://gateway.scan-interfax.ru/api/v1/documents";
    const token = localStorage.getItem("accessToken");
    const header = {
        "Content-type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
    };
    const [isLoading, setIsLoading] = useState(true);

    var subject =''
    var page = 1;
    const [nextPage, setNextPage] = useState();
    const [articleList, setArticleList] = useState([]);

    setTimeout (() => {
        setIsLoading(false);
    }, 2000);

    const Block = (id) => {
        const output_block = document.getElementById("rezultBlocks");
        const ids = {ids: [id]}
        // запрос на получение блока статьи. Возвращает готовый div, добавляя его к выводу
        axios.post(post_api, ids, {headers: header})
        .then((response) => {
                if (response.status === 200) {
                    if (response.data[0]['ok']['attributes']['isTechNews']){
                        subject = '<div class="rezultTeg">Технические новости</div><br/>'
                    } else if (response.data[0]['ok']['attributes']['isAnnouncement']){ 
                        subject = '<div class="rezultTeg">Анонс или календарь</div><br/>'
                    } else if (response.data[0]['ok']['attributes']['isDigest']) {
                        subject = '<div class="rezultTeg">Сводка новостей</div><br/>'
                    } else {
                        subject = " "
                    }
                    var text =`<div class="rezultBlock">
                                <p class="rezultSmallgraytext">${response.data[0]['ok']['issueDate'].slice(0,10)} <u> ${response.data[0]['ok']['source']['name']}</u></p><br/>
                                <p class="rezultBlockTitle">${response.data[0]['ok']['title']['text'].slice(0,100)}</p><br/>
                                ${subject} <img class="rezultBlockimg" src='/pict/foto.png' alt='q'/> <br/><br/>
                                <div class="rezultBlockText">${response.data[0]['ok']['content']['markup'].slice(0,1500)}</div><br/><br/>
                                <div class="rezultBlockBottom">
                                    <div class="rezultBlockButton"><a href="${response.data[0]['ok']['url']}">Читать в источнике</a>
                                    </div>
                                    <div class="rezultBlockText">${response.data[0]['ok']['attributes']['wordCount']} слова.</div>
                                </div>
                                </div>`
                    output_block.innerHTML += text
                }
                
            })
        .catch((error) => {
            if (error.response.status === 401) {
                console.log("Логин или пароль неверен ");
                } else if (error.response) {
                console.log(error.response);
                console.log("server error");
                } else if (error.request) {
                console.log("network error");
                } else {
                console.log(error);
                }
                });
        }

        // запрос на получение еще 10 постов, при нажатии на кнопку
    const morePage = () => {
        const leght = Object.keys(articleList[0]).length;
        if ((page+1)*10 > leght) {
            for (var i_morePage=page*10; i_morePage<leght; ++i_morePage)
             {
                Block(articleList[0][i_morePage]['encodedId']);
                setNextPage('rezult_Nomore')
            }
        } else {
        for (var i_morePage=page*10; i_morePage<(page+1)*10; ++i_morePage) {Block(articleList[0][i_morePage]['encodedId']);
        }
        ++page;
    }}


    useEffect (() => {
        const userData = JSON.parse(localStorage.getItem("search_request"));
        // при загрузке страницы запрашивает данные о гистограмме, на основе переданных данных из запроса. И потом рисует блоки гистограммы
        axios.post(histogram_api, userData, {headers: header})
        .then((response) => {
                if (response.status === 200) {
                    var historgamm_data = response.data['data'];
                    var historgamm_risk = response.data['data'];
                    const Output = document.getElementById('rezult_histogramm_block');
                    const Output_itogo = document.getElementById('rezult_itogo');
                    var dateSlice ="";
                    var summDate = 0;
                    for (var i = 0; i < historgamm_data[0]['data'].length; ++i) {
                        dateSlice = historgamm_data[0]['data'][i]['date'].slice(8,10) + '.' + historgamm_data[0]['data'][i]['date'].slice(5,7) + '.' + historgamm_data[0]['data'][i]['date'].slice(0,4);
                        Output.innerHTML += `<div class="rezult_histogramm_searched">${dateSlice}<br/>
                        <br/>${historgamm_data[0]['data'][i]['value']}<br/><br/>${historgamm_risk[1]['data'][i]['value']}</div>`;
                        summDate += historgamm_data[0]['data'][i]['value'];
                    };
                    Output_itogo.innerHTML = summDate;
                }
            })
        .catch((error) => {
            if (error.response.status === 401) {
                console.log("Логин или пароль неверен ");
            } else if (error.response) {
                console.log(error.response);
                console.log("server error");
            } else if (error.request) {
                console.log("network error");
            } else {
                console.log(error);
            }
        });
        // так же, при загрузке страницыполучает список постов и сразу же отрисовывает первые 10
        axios.post(object_api, userData, {headers: header})
        .then((response) => {
            if (response.status === 200) {
                if (response.data['items'].length >10) {
                    for (var i=0; i<10; ++i){Block(response.data['items'][i]['encodedId']); 
                    // если посто более 10, то кнопку отображаем
                    setNextPage('rezult_more')}
                    } else {
                        for (var i=0; i<response.data['items'].length; ++i){
                            Block(response.data['items'][i]['encodedId']);
                            // если посты меньше, чем 10, то кноку скрываем
                            setNextPage('rezult_Nomore') }
                    }
                setArticleList([
                    response.data['items']])
            }
        })
        .catch((error) => {
            if (error.response.status === 401) {
                console.log("Логин или пароль неверен ");
            } else if (error.response) {
                console.log(error.response);
                console.log("server error");
            } else if (error.request) {
                console.log("network error");
            } else {
                console.log(error);
            }
        });
}, []);


    

return (
        <div className="rezult">
            <div className="rezultTop">
                <div className="rezultText">
                    <h1>Ищем. Скоро <br/>будут результаты</h1><br/>
                    <p className="rezultSmalltext">Поиск может занять некоторое время, <br/>просим сохранять терпение. </p>
                </div>
                <img className="rezultImg" src="/pict/rezult.svg" alt="Women and target"/>
            </div>
            <div className="rezultMiddle"><h3>ОБЩАЯ СВОДКА</h3><br/>
                <p className="rezultSmallgraytext">Найдено <span id="rezult_itogo"></span> вариантов</p>
                {/* крутилка */}
                { isLoading ? (<div className="rezult_loader"> <Loader /> </div>) : <div/>}
            </div>
            
            <div className="rezult_histogramm">
                <div className="rezult_histogramm_info">

                    Период<br/><br/>Всего<br/><br/>Риски
                </div>
                <div id="rezult_histogramm_block">    </div>
            </div>

            <div className="rezultBottom"><h3>СПИСОК ДОКУМЕНТОВ</h3><br/></div>

            <div className="rezultBlocks" id="rezultBlocks">        
            </div>
            <div className="rezultBottomButton">
                <button className={nextPage} onClick={morePage}> Показать больше</button><br/><br/>
            </div>

            
        </div>
    )};
    
export default Result;