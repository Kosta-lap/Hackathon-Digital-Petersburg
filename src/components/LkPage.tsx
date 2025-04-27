import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Footer from "./Footer";
import event from "../images/event.jpg";
import Header from './Header';
import { useAppDispatch, useAppSelector } from '../hook';
import { fetchEventCategories } from '../store/eventCategoriesActions';
import { RootState } from '../store/store';

const LkPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'profile' | 'favorites' | 'categories'>('profile');
    const { isAuthenticated, id, name } = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    const dispatch = useAppDispatch();
    const { items, loading, error } = useAppSelector((state) => state.eventCategories);

    const [activeButton, setActiveButton] = useState<'name' | 'password' | null>(null);
    const [nameForm, setNameForm] = useState(name || '');
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleNameClick = () => {
        setActiveButton(prev => prev === 'name' ? null : 'name');
    };
      
    const handlePasswordClick = () => {
        setActiveButton(prev => prev === 'password' ? null : 'password');
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNameForm(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordForm({
            ...passwordForm,
            [e.target.name]: e.target.value
        });
    };

    const handleNameSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would dispatch an action to update the name
        console.log('New name:', nameForm);
        setActiveButton(null);
    };

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would dispatch an action to update the password
        console.log('Password change:', passwordForm);
        setActiveButton(null);
        setPasswordForm({
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        });
    };

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
                                    <p className="lk-content-profile__name">{name}</p>
                                </div>
                                <div className="lk-content-profile__actions">
                                    <button 
                                        className={`lk-content-profile__btn ${activeButton === 'name' ? 'active' : ''}`}
                                        onClick={handleNameClick}
                                    >
                                        Изменить имя
                                    </button>
                                    <button 
                                        className={`lk-content-profile__btn ${activeButton === 'password' ? 'active' : ''}`}
                                        onClick={handlePasswordClick}
                                    >
                                        Изменить пароль
                                    </button>
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
                    <div className={`popup-wrapper ${activeButton === 'name' ? 'active' : ''}`}>
                        <form className="lk-popup-name" onSubmit={handleNameSubmit}>
                            <div className="lk-popup-name__input-block">
                                <h4 className="lk-popup-name__input-title">Новое имя пользователя</h4>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Введите новое имя"
                                    className="lk-popup-name__input"
                                    value={nameForm}
                                    onChange={handleNameChange}
                                    required
                                />
                            </div>
                            <div className="lk-popup-name__actions">
                                <button 
                                    type="button" 
                                    className="lk-popup-name__btn cancel"
                                    onClick={handleNameClick}
                                >
                                    Отмена
                                </button>
                                <button type="submit" className="lk-popup-name__btn confirm">
                                    Подтвердить
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className={`popup-wrapper ${activeButton === 'password' ? 'active' : ''}`}>
                        <form className="lk-popup-name" onSubmit={handlePasswordSubmit}>
                            <div className="lk-popup-name__input-block">
                                <h4 className="lk-popup-name__input-title">Текущий пароль</h4>
                                <input
                                    type="password"
                                    name="currentPassword"
                                    placeholder="Введите текущий пароль"
                                    className="lk-popup-name__input"
                                    value={passwordForm.currentPassword}
                                    onChange={handlePasswordChange}
                                    required
                                />
                            </div>
                            <div className="lk-popup-name__input-block">
                                <h4 className="lk-popup-name__input-title">Новый пароль</h4>
                                <input
                                    type="password"
                                    name="newPassword"
                                    placeholder="Введите новый пароль"
                                    className="lk-popup-name__input"
                                    value={passwordForm.newPassword}
                                    onChange={handlePasswordChange}
                                    required
                                />
                            </div>
                            <div className="lk-popup-name__input-block">
                                <h4 className="lk-popup-name__input-title">Подтверждение пароля</h4>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Подтвердите новый пароль"
                                    className="lk-popup-name__input"
                                    value={passwordForm.confirmPassword}
                                    onChange={handlePasswordChange}
                                    required
                                />
                            </div>
                            <div className="lk-popup-name__actions">
                                <button 
                                    type="button" 
                                    className="lk-popup-name__btn cancel"
                                    onClick={handlePasswordClick}
                                >
                                    Отмена
                                </button>
                                <button type="submit" className="lk-popup-name__btn confirm">
                                    Подтвердить
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <Footer />
            </section>
        </div>
    );
};

export default LkPage;