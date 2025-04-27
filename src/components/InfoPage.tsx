import React from 'react';
import Header from "../components/Header"
import Footer from "./Footer";

const InfoPage: React.FC = () => {
    return (
        <div className="main main_lk">
            <Header />
            <section className="lk events">
                <div>
                    <div className="container">
                        <div className="info-content">
                            <div className="info-content__text-block">
                                <h3 className="info-content__title">Документация</h3>
                                <p className="info_content__text">Как пользоваться сайтом, инструкция для идиотов
                                    лалалала бла бла пукпукпук
                                    текстекст текст
                                    пук</p>
                            </div>
                            <div className="info-content__text-block">
                                <h3 className="info-content__title">Используемые источники</h3>
                                <h4 className="info-content__subtitle">Данные портала KudaGo</h4>
                                <p className="info_content__text">API содержит информацию об афише событий города Санкт-Петербург.</p>
                                <h4 className="info-content__subtitle">Данные по мероприятиям в сфере культуры</h4>
                                <p className="info_content__text">API содержит информацию: Мероприятие, полное описание, возрастное ограничение и т.п.</p>
                            </div>
                            <div className="info-content__text-block">
                                <h3 className="info-content__title">Авторы</h3>
                                <p className="info_content__text">Галеев Амир</p>
                                <p className="info_content__text">Иванов Данила</p>
                                <p className="info_content__text">Лапшов Константин</p>
                                <p className="info_content__text">Романов Егор</p>
                                <p className="info_content__text">ХХХIRuleOFF Динар</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </section>

        </div>
    );
};

export default InfoPage;