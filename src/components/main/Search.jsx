import React, { useState } from "react";
import "./styles/search.css";



const Search = () => {

    const [search_data, setSearch_data] = useState({
        inn: "",
        tone: "any",
        count: "",
        data_from: "",
        data_to: "",
    });

    //Валидация поля Колличество
    const validateCount = (count) => {
        if (count>0 && count<1001) {
            document.getElementById('error_count').innerHTML = '';
        return true } else {
            document.getElementById('error_count').innerHTML = 'Обязательное поле';
            return false;
        }
    }

    // Валидация ИНН
    const validateInn = (inn) => {
        inn = inn.toString();
        var checkDigit = function (inn, coefficients) {
			var n = 0;
			for (var i in coefficients) {
				n += coefficients[i] * inn[i];
			}
			return parseInt(n % 11 % 10);}

        var n10 = checkDigit(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
        
        if (inn.length === 10 && n10 === parseInt(inn[9])) {
            document.getElementById('error_inn').innerHTML = ''
            return true;
        }  else {
            document.getElementById('error_inn').innerHTML = 'Введите корректные данные';
            return false;
        }
    }

    //Валидация даты
    const validateData = (data_from, data_to) => {
        var nowData = new Date().toISOString().slice(0, 10);
        console.log (data_from.toString(), data_to.toString(), nowData.toString())
        if (data_from.toString() < data_to.toString() && data_to.toString() <= nowData.toString()) {
            document.getElementById('error_data').innerHTML = '';
        return true } else {
            document.getElementById('error_data').innerHTML = 'Введите корректные данные';
            return false;
        }
    }

    //Проверка, что обязательные поля заполнены
    const handleChange = (e) => {
        const value = e.target.value;
        const button = document.getElementById('search_button');
        setSearch_data({
            ...search_data,
            [e.target.name]: value,
        });
        if (search_data.inn === "" || search_data.count === "") { button.disabled = true } else { button.disabled = false};
        
    };

    // Заполнения JSON запроса в API
    const handlesearchSubmit = (e) => {
        e.preventDefault();
        const userData = {
            issueDateInterval: {
                startDate: search_data.data_from,
                endDate: search_data.data_to
            },
            searchContext: {
                targetSearchEntitiesContext: {
                    targetSearchEntities: [
                        {
                            type: "company",
                            sparkId: null,
                            entityId: null,
                            inn: search_data.inn,
                            maxFullness: true,
                            inBusinessNews: null
                        }
                    ],
                    onlyMainRole: true,
                    tonality: search_data.tone,
                    onlyWithRiskFactors: false,
                    riskFactors: {
                        and: [],
                        or: [],
                        not: []
                    },
                    themes: {
                        and: [],
                        or: [],
                        not: []
                    },
                },
                themesFilter: {
                    and: [],
                    or: [],
                    not: []
                }
            },
            searchArea: {
                includedSources: [],
                excludedSources: [],
                includedSourceGroups: [],
                excludedSourceGroups: []
            },
            attributeFilters: {
                excludeTechNews: true,
                excludeAnnouncements: true,
                excludeDigests: true
            },
            similarMode: "duplicates",
            limit: search_data.count,
            sortType: "issueDate",
            sortDirectionType: "desc",
            intervalType: "month",
            histogramTypes: [
                "totalDocuments",
                "riskFactors"
            ]
        };
        //Функции валидации полей и тогде переход на страницу запроса
        validateCount(search_data.count);
        validateInn(search_data.inn);
        validateData(search_data.data_from, search_data.data_to);
        if (validateCount(search_data.count) && validateInn(search_data.inn) && validateData(search_data.data_from, search_data.data_to)){
            localStorage.setItem("search_request", JSON.stringify(userData));
            window.location.href = "/results"}

        
    };

    return (
        <div>
            <div className="search_topblock">
                <div><h1>Найдите необходимые <br/>данные в пару кликов.</h1><br/><br/><br/>
                <p className="search_text">
                Задайте параметры поиска. <br/>
                Чем больше заполните, тем точнее поиск.
                </p>
                </div>
                <img className="search_top_image" src="/pict/sheet.svg" alt="sheet"/>
                <img className="search_top_image_folder" src="/pict/folders.svg" alt="folders"/>
            </div>

            <div className="search_bootomblock">
                <div className="search_searchfild">
                    <form className="search_form" noValidate onSubmit={handlesearchSubmit}>
                        <div className="search_form_topfield">
                            <div className="search_form_topfield_left">
                                <label className="search_label">ИНН компании *</label><br/><br/>
                                <input className='search_input' type='number' id='inn' name='inn' placeholder="10 цифр" value={search_data.inn} onChange={handleChange}/><br/>
                                <div id="error_inn"></div><br/>
                                <label className="search_label">Тональность</label><br/><br/>
                                <select className='search_input' type='text' id='tone' name='tone' value={search_data.tone} onChange={handleChange}>
                                    <option value="any">Любая</option>
                                    <option value="positive">Позитивная</option>
                                    <option value="negative">Негативная</option>
                                </select><br/><br/><br/>
                                <label className="search_label">Количество документов в выдаче *</label><br/><br/>
                                <input className='search_input' type='number' min='1' max='1000' id='count' name='count' placeholder="От 1 до 1000" value={search_data.count} onChange={handleChange}/>
                                <div id="error_count"></div><br/>
                            </div>
                            {/* Куда в JSON запрос помещать данные из чекбоксов не нашел. Но это легко добавить. Пока они просто заглушки */}
                            <div className="search_form_topfield_right">
                                <input className="search_checkbox" type="checkbox" id='polnota' name='polnota'/>
                                <label htmlFor="polnota">Признак максимальной полноты</label><br/>
                                <input className="search_checkbox" type="checkbox" id='buisness_content' name='buisness_content'/>
                                <label htmlFor="buisness_content">Упоминания в бизнес-контексте</label><br/>
                                <input className="search_checkbox" type="checkbox" id='main_role' name='main_role'/>
                                <label htmlFor="main_role">Главная роль в публикации</label><br/>
                                <input className="search_checkbox" type="checkbox" id='risk_factor' name='risk_factor' disabled/>
                                <label className="disabled" htmlFor="risk_factor">Публикации только с риск-факторами</label><br/>
                                <input className="search_checkbox" type="checkbox" id='include_news' name='include_news' disabled/>
                                <label className="disabled" htmlFor="include_news">Включать технические новости рынков</label><br/>
                                <input className="search_checkbox" type="checkbox" id='include_announse' name='include_announse'/>
                                <label htmlFor="include_announse">Включать анонсы и календари</label><br/>
                                <input className="search_checkbox" type="checkbox" id='include_summary' name='include_summary' disabled/>
                                <label className="disabled" htmlFor="include_summary">Включать сводки новостей</label><br/>
                            </div>
                        </div>
                        <div className="search_form_bottomfield">
                            <div className="search_form_bottomfield_left">
                                <label className="search_label">Диапозон поиска *</label><br/><br/>
                                <input className='search_input_date' type='date' id='data_from' name='data_from' required placeholder="Дата начала" value={search_data.data_from} onChange={handleChange}/>
                                <input className='search_input_date' type='date' id='data_to' name='data_to' required placeholder="Дата конца" value={search_data.data_to} onChange={handleChange}/>
                                <br/>
                                <div id="error_data"></div><br/>
                            </div>
                            <div className="search_form_bottomfield_right">
                                <button className="search_button" type='submit'  id="search_button"  disabled>Поиск</button><br/><br/>
                                <p className="search_form_remark">* Обязательные к заполнению поля</p>
                            </div>
                        </div>
                    </form>
                </div>
                <img className="search_bottom_image" src="/pict/rocket.svg" alt="rocket man"/>
            </div>

            
        </div>
        );
    };
    
    export default Search;