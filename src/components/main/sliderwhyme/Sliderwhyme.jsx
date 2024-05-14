import React from "react";
import Slider from "react-slick";
import "./slick/slick.css";
import "./slick/slick-theme.css";

import Whyme from "../why_me/Whyme";

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block"}}
        onClick={onClick}
      />
    );
  }

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block"}}
        onClick={onClick}
      />
    );
  }

const Sliderwhyme = (props) => {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: parseInt(props.items),
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
      };

    return (
        <div className="slider-container">
        <Slider {...settings}>
                 <div>
                    <Whyme pict='/pict/clock.svg' text='Высокая и оперативная скорость обработки заявки'/>
                 </div>
                <div>
                    <Whyme pict='/pict/lupa.svg' text='Огромная комплексная база данных, обеспечивающая объективный ответ на запрос'/>
                </div>
                <div>
                     <Whyme pict='/pict/shield.svg' text='Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству'/>
                </div>
                 <div>
                     <Whyme pict='/pict/clock.svg' text='Тест 1'/>
                 </div>
                 <div>
                    <Whyme pict='/pict/clock.svg' text='Тест 2'/>
                 </div>
                <div>
                    <Whyme pict='/pict/clock.svg' text='Тест 3'/>
                 </div>
         </Slider>
    </div>
        
    )
};
    
export default Sliderwhyme;