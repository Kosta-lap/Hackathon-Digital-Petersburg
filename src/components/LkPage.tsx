import React, { useState } from 'react';
import Footer from "./Footer";

import event from "../images/event.jpg"
import Header from './Header';

const LkPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'profile' | 'favorites' | 'categories'>('profile');

    return (
        <div className="main main_lk">
            <Header />
            <section className="lk events">
                <div className="container">
                    <div className="lk-content">
                        <div className="lk-content__actions">
                            <button
                                className={`lk-content__actions-btn ${activeTab === 'profile' ? 'active' : ''}`}
                                onClick={() => setActiveTab('profile')}
                            >Профиль
                            </button>
                            <button
                                className={`lk-content__actions-btn ${activeTab === 'favorites' ? 'active' : ''}`}
                                onClick={() => setActiveTab('favorites')}
                            >Избранные
                            </button>
                            <button
                                className={`lk-content__actions-btn ${activeTab === 'categories' ? 'active' : ''}`}
                                onClick={() => setActiveTab('categories')}
                            >Любимые категории
                            </button>
                        </div>
                        {activeTab === 'profile' && (
                            <div className="lk-content__profile lk-content-profile">
                                <div className="lk-content-profile__name-block">
                                    <h4 className="lk-content-profile__name-block-title">Имя</h4>
                                    <p className="lk-content-profile__name">Имя пользователя</p>
                                </div>
                                <div className="lk-content-profile__actions">
                                    <button className="lk-content-profile__btn">Изменить имя</button>
                                    <button className="lk-content-profile__btn">Изменить пароль</button>
                                </div>
                            </div>
                        )}
                        {activeTab === 'favorites' && (
                            <div className="lk-favorite">
                                <div className="lk-favorite_card lk-favorite-card">
                                    <img src={event} alt="" className="lk-favorite-card__image" />
                                    <div className="lk-favorite-card__desc">
                                        <h4>Название события</h4>
                                        <div className="lk-favorite-card__about">
                                            <p>Подробное описание события</p>
                                            <p>Место проведения, Время</p>
                                        </div>
                                        <div className="lk-favorite-card__actions">
                                            <button className="about">Подробнее</button>
                                            <button className="like active" />
                                        </div>
                                    </div>
                                </div>
                                <div className="lk-favorite_card lk-favorite-card">
                                    <img src={event} alt="" className="lk-favorite-card__image" />
                                    <div className="lk-favorite-card__desc">
                                        <h4>Название события</h4>
                                        <div className="lk-favorite-card__about">
                                            <p>Подробное описание события</p>
                                            <p>Место проведения, Время</p>
                                        </div>
                                        <div className="lk-favorite-card__actions">
                                            <button className="about">Подробнее</button>
                                            <button className="like" />
                                        </div>
                                    </div>
                                </div>
                                <div className="lk-favorite_card lk-favorite-card">
                                    <img src={event} alt="" className="lk-favorite-card__image" />
                                    <div className="lk-favorite-card__desc">
                                        <h4>Название события</h4>
                                        <div className="lk-favorite-card__about">
                                            <p>Подробное описание события</p>
                                            <p>Место проведения, Время</p>
                                        </div>
                                        <div className="lk-favorite-card__actions">
                                            <button className="about">Подробнее</button>
                                            <button className="like" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <Footer />
            </section>
        </div>
    );
};

export default LkPage;