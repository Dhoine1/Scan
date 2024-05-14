import React, { useEffect, useState } from "react";
import "./info.css";

import axios from "axios";

// Загрузка информации о компаниях и лимите после логина
const Info = () => {

    const token = localStorage.getItem("accessToken");
    const header = {
        "Content-type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
    };

    const login_api_info = "https://gateway.scan-interfax.ru/api/v1/account/info" 

    const [info, setData] = useState({
        count: "",
        limit: "",
    });


    useEffect (()  => {
        axios.get(login_api_info, {headers: header})
        .then((response) => {
            setData(response.data);
            const Output = document.getElementById('header_td_api_info_text_black');
            Output.innerHTML = "  " + response.data["eventFiltersInfo"]["usedCompanyCount"];
            const Output2 = document.getElementById('header_td_api_info_text_green');
            Output2.innerHTML = "  " + response.data["eventFiltersInfo"]["companyLimit"];
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);


    return (
    
    <div className="header_td_api_info"> 
        <p className="header_td_api_info_text">Использовано компаний  
        <span id="header_td_api_info_text_black"></span> </p>
        <p className="header_td_api_info_text">Лимит по компаниям  
        <span id="header_td_api_info_text_green"></span></p>   
    
    </div>)
}

export default Info;