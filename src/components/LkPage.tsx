import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Footer from "./Footer";

import event from "../images/event.jpg"
import Header from './Header';


import { useAppDispatch, useAppSelector } from '../hook';
import { fetchEventCategories } from '../store/eventCategoriesActions';
import { RootState } from '../store/store';


const LkPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'profile' | 'favorites' | 'categories'>('profile');
    const { isAuthenticated, name } = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    const dispatch = useAppDispatch();
    const { items, loading, error } = useAppSelector((state) => state.eventCategories);

    useEffect(() => {
        dispatch(fetchEventCategories());
    }, [dispatch]);

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
                        {activeTab === 'categories' && (
                            <div className="lk-categories">
                               <h3 className="lk-categories__title">Избранные Категории</h3>
                               <div className="lk-categories__box">
                                    {items.length > 0 ? (
                                        items.map(eventItem => (
                                            <button
                                                type="button"
                                                className={`category-btn about`}
                                                data-category={eventItem.slug}
                                                key={eventItem.slug}
                                                // onClick={() => handleCategoryToggle(eventItem.slug)}
                                            >
                                                {eventItem.name}
                                            </button>
                                        ))
                                    ) : (
                                        <div>Событий не найдено</div>
                                    )}
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