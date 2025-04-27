import React, { useEffect, useState } from 'react';
import Header from "../components/Header"
import Footer from "./Footer";
import { useAppDispatch, useAppSelector } from '../hook';
import { fetchEventCategories } from '../store/eventCategoriesActions';
import axios from 'axios';

import event_img from "../images/event.jpg"

interface CoordsResponse{
    ID: number,
    Building_ID: number, 
    Name: string,
    Longitude: number,
    Latitude: number
}

const SearchPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { items, loading, error } = useAppSelector((state) => state.eventCategories);

    useEffect(() => {
        dispatch(fetchEventCategories());
    }, [dispatch]);


    const [searchParams, setSearchParams] = useState({
        priceType: '',
        maxMinutes: '',
        timeFrom: '',
        timeTo: '',
        categories: [] as string[]
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage] = useState(7); // Количество карточек на странице

    const [events, setEvents] = useState([
        { id: 1, title: "Название события 1", description: "Описание 1", location: "Место 1", time: "10:00" },
        { id: 2, title: "Название события 2", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 3, title: "Название события 3", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 4, title: "Название события 4", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 5, title: "Название события 5", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 6, title: "Название события 6", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 7, title: "Название события 7", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 1, title: "Название события 1", description: "Описание 1", location: "Место 1", time: "10:00" },
        { id: 2, title: "Название события 2", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 3, title: "Название события 3", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 4, title: "Название события 4", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 5, title: "Название события 5", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 6, title: "Название события 6", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 7, title: "Название события 7", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 1, title: "Название события 1", description: "Описание 1", location: "Место 1", time: "10:00" },
        { id: 2, title: "Название события 2", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 3, title: "Название события 3", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 4, title: "Название события 4", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 5, title: "Название события 5", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 6, title: "Название события 6", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 7, title: "Название события 7", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 1, title: "Название события 1", description: "Описание 1", location: "Место 1", time: "10:00" },
        { id: 2, title: "Название события 2", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 3, title: "Название события 3", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 4, title: "Название события 4", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 5, title: "Название события 5", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 6, title: "Название события 6", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 7, title: "Название события 7", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 1, title: "Название события 1", description: "Описание 1", location: "Место 1", time: "10:00" },
        { id: 2, title: "Название события 2", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 3, title: "Название события 3", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 4, title: "Название события 4", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 5, title: "Название события 5", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 6, title: "Название события 6", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 7, title: "Название события 7", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 1, title: "Название события 1", description: "Описание 1", location: "Место 1", time: "10:00" },
        { id: 2, title: "Название события 2", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 3, title: "Название события 3", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 4, title: "Название события 4", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 5, title: "Название события 5", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 6, title: "Название события 6", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 7, title: "Название события 7", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 1, title: "Название события 1", description: "Описание 1", location: "Место 1", time: "10:00" },
        { id: 2, title: "Название события 2", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 3, title: "Название события 3", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 4, title: "Название события 4", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 5, title: "Название события 5", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 6, title: "Название события 6", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 7, title: "Название события 7", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 1, title: "Название события 1", description: "Описание 1", location: "Место 1", time: "10:00" },
        { id: 2, title: "Название события 2", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 3, title: "Название события 3", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 4, title: "Название события 4", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 5, title: "Название события 5", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 6, title: "Название события 6", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 7, title: "Название события 7", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 1, title: "Название события 1", description: "Описание 1", location: "Место 1", time: "10:00" },
        { id: 2, title: "Название события 2", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 3, title: "Название события 3", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 4, title: "Название события 4", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 5, title: "Название события 5", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 6, title: "Название события 6", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 7, title: "Название события 7", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 1, title: "Название события 1", description: "Описание 1", location: "Место 1", time: "10:00" },
        { id: 2, title: "Название события 2", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 3, title: "Название события 3", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 4, title: "Название события 4", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 5, title: "Название события 5", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 6, title: "Название события 6", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 7, title: "Название события 7", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 1, title: "Название события 1", description: "Описание 1", location: "Место 1", time: "10:00" },
        { id: 2, title: "Название события 2", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 3, title: "Название события 3", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 4, title: "Название события 4", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 5, title: "Название события 5", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 6, title: "Название события 6", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 7, title: "Название события 7", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 1, title: "Название события 1", description: "Описание 1", location: "Место 1", time: "10:00" },
        { id: 2, title: "Название события 2", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 3, title: "Название события 3", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 4, title: "Название события 4", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 5, title: "Название события 5", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 6, title: "Название события 6", description: "Описание 2", location: "Место 2", time: "12:00" },
        { id: 7, title: "Название события 7", description: "Описание 2", location: "Место 2", time: "12:00" },
    ]);

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = events.slice(indexOfFirstCard, indexOfLastCard);
    const totalPages = Math.ceil(events.length / cardsPerPage);

    const renderPagination = () => {
        const pages = [];
        const maxVisible = 5; // Максимальное количество видимых кнопок

        // Все страницы умещаются
        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        }
        // Слишком много страниц - используем точки
        else {
            // Всегда показываем первую страницу
            pages.push(1);

            // Определяем границы отображаемых страниц
            let leftBound = Math.max(2, currentPage - 1);
            let rightBound = Math.min(totalPages - 1, currentPage + 1);

            // Добавляем точки слева, если нужно
            if (leftBound > 2) {
                pages.push('...');
            }

            // Добавляем страницы вокруг текущей
            for (let i = leftBound; i <= rightBound; i++) {
                pages.push(i);
            }

            // Добавляем точки справа, если нужно
            if (rightBound < totalPages - 1) {
                pages.push('...');
            }

            // Всегда показываем последнюю страницу
            pages.push(totalPages);
        }

        return (
            <div className="pagination">
                {/* Кнопка "Назад" */}
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="pagination-nav"
                >
                    &lt;
                </button>

                {/* Номера страниц */}
                {pages.map((page, index) => {
                    if (page === '...') {
                        return (
                            <span key={`ellipsis-${index}`} className="pagination-ellipsis">
                                ...
                            </span>
                        );
                    }
                    return (
                        <button
                            key={`page-${page}`}
                            onClick={() => setCurrentPage(page as number)} // Исправлено: передаем номер страницы
                            className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                        >
                            {page}
                        </button>
                    );
                })}

                {/* Кнопка "Вперед" */}
                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="pagination-nav"
                >
                    &gt;
                </button>
            </div>
        );
    };

    // Обработчик изменения полей формы
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;

        if (type === 'radio') {
            setSearchParams(prev => ({
                ...prev,
                [name]: value
            }));
        } else {
            setSearchParams(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    // Обработчик выбора категории
    const handleCategoryToggle = (categorySlug: string) => {
        setSearchParams(prev => {
            const newCategories = prev.categories.includes(categorySlug)
                ? prev.categories.filter(slug => slug !== categorySlug)
                : [...prev.categories, categorySlug];

            return {
                ...prev,
                categories: newCategories
            };
        });
    };

    // Обработчик отправки формы
    const  handleSearchSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Search params:', encodeURIComponent(searchParams.maxMinutes));
        const response = await axios.get<CoordsResponse>(`https://geocode.gate.petersburg.ru/parse/eas?street=${encodeURIComponent(searchParams.maxMinutes)}`, {
            headers: {
                'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJhU1RaZm42bHpTdURYcUttRkg1SzN5UDFhT0FxUkhTNm9OendMUExaTXhFIn0.eyJleHAiOjE4Mzk0MzU0OTEsImlhdCI6MTc0NDc0MTA5MSwianRpIjoiMjU4MDNmMGEtNWZmYi00NzFiLThlM2QtMzFlMjY1ZGJhMDQyIiwiaXNzIjoiaHR0cHM6Ly9rYy5wZXRlcnNidXJnLnJ1L3JlYWxtcy9lZ3MtYXBpIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjM5YzBmYzE4LTUyOWItNDYyMy05ODgzLTI1MDA4Njg4NDkyYyIsInR5cCI6IkJlYXJlciIsImF6cCI6ImFkbWluLXJlc3QtY2xpZW50Iiwic2Vzc2lvbl9zdGF0ZSI6IjFmYzBlY2NkLWEwNzUtNDNiYi04MzI3LTlkYmEyMDg4ZWFlYyIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtZWdzLWFwaSIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6ImVtYWlsIHByb2ZpbGUiLCJzaWQiOiIxZmMwZWNjZC1hMDc1LTQzYmItODMyNy05ZGJhMjA4OGVhZWMiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiLQmtC-0L3RgdGC0LDQvdGC0LjQvSDQmtC-0L3RgdGC0LDQvdGC0LjQvSIsInByZWZlcnJlZF91c2VybmFtZSI6IjgzYzYxMWQzYmIxMWFmNmI3ZjhhNWFmOGIzYTgyOGNlIiwiZ2l2ZW5fbmFtZSI6ItCa0L7QvdGB0YLQsNC90YLQuNC9IiwiZmFtaWx5X25hbWUiOiLQmtC-0L3RgdGC0LDQvdGC0LjQvSJ9.jIER5r_7BVW0UeS8SQx9TSYq82qidrvs5C9QQ5hBMqHNBt5P3oXEZ6aXnEXPkH6pVpaW3u3JLNDYX_7Qcjy9WtB5enRRX2N-UCK4B5WkJZW30g-bEbdWn0Rg9PUJ9tvCkDyULYVI4P0ZbHvAABrDkzOWiu6GLXmgtQabnKuhdZOy0If0x1WvgoUjofBaJTrINQM5Bxd1tqQ_3QXT3oR9TnLBlUUKHBfgHA83SJKfEe2irsSo_bZ-cXvUoWLzKQX1ORZ2YwGQavZ5DPeDiWhG0kMZHVcdlofvG5BsRVPAIf8i2eMdQhzZxqG5g7U6XaQg8976iflQUCEx0T5-RruwRA` // Добавляем токен в заголовок
            }
        });
        if (response.data) {
            console.log(response.data);
            console.log(searchParams);
        }
    };


    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="main main_lk">
            <Header />
            <section className="lk events">
                <div>
                    <div className="container">
                        <div className="lk-content search">
                            {!loading && !error && (
                                <>
                                    <form onSubmit={handleSearchSubmit}>
                                        <div className="search_form">
                                            <div className="input_box">
                                                <h4>Цена</h4>
                                                <div className="inputs_check">
                                                    <div className="check_box">
                                                        <label htmlFor="free">Бесплатно</label>
                                                        <input
                                                            type="radio"
                                                            id="free"
                                                            name="priceType"
                                                            value="free"
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="check_box">
                                                        <label htmlFor="paid">Платно</label>
                                                        <input
                                                            type="radio"
                                                            id="paid"
                                                            name="priceType"
                                                            value="paid"
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="check_box">
                                                        <label htmlFor="fip">Платно и бесплатно</label>
                                                        <input
                                                            type="radio"
                                                            id="fip"
                                                            name="priceType"
                                                            value="both"
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="input_box">
                                                <h4>Местоположение</h4>
                                                <div className="text_box address">
                                                    <label htmlFor="count_m">
                                                        Адрес:
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="count_m"
                                                        className='reg-log-form__input'
                                                        name="maxMinutes"
                                                        value={searchParams.maxMinutes}
                                                        placeholder='Торжковская, 15'
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="input_box">
                                                <h4>Время</h4>
                                                <div className="text_box time">
                                                    <label htmlFor="count_t_ot">от
                                                        <input
                                                            type="text"
                                                            id="count_t_ot"
                                                            className='reg-log-form__input'
                                                            name="timeFrom"
                                                            value={searchParams.timeFrom}
                                                            onChange={handleInputChange}
                                                        />
                                                    </label>
                                                    <label htmlFor="count_t_do">до
                                                        <input
                                                            type="text"
                                                            id="count_t_do"
                                                            className='reg-log-form__input'
                                                            name="timeTo"
                                                            value={searchParams.timeTo}
                                                            onChange={handleInputChange}
                                                        />
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="input_box">
                                                <h4>Категории</h4>
                                                <div className="category_box">
                                                    {items.length > 0 ? (
                                                        items.map(eventItem => (
                                                            <button
                                                                type="button"
                                                                className={`category-btn about ${searchParams.categories.includes(eventItem.slug) ? 'active' : ''}`}
                                                                data-category={eventItem.slug}
                                                                key={eventItem.slug}
                                                                onClick={() => handleCategoryToggle(eventItem.slug)}
                                                            >
                                                                {eventItem.name}
                                                            </button>
                                                        ))
                                                    ) : (
                                                        <div>Событий не найдено</div>
                                                    )}
                                                </div>
                                            </div>
                                            <button type="submit" className="search-submit-btn">
                                                Найти
                                            </button>
                                        </div>
                                    </form>
                                    <div className="search_response">
                                        <div className="response_box">
                                            {currentCards.map(event => (
                                                <div className="lk-favorite_card lk-favorite-card" key={event.id}>
                                                    <img src={event_img} alt="" className="lk-favorite-card__image" />
                                                    <div className="lk-favorite-card__desc">
                                                        <h4>{event.title}</h4>
                                                        <div className="lk-favorite-card__about">
                                                            <p>{event.description}</p>
                                                            <p>{event.location}, {event.time}</p>
                                                        </div>
                                                        <div className="lk-favorite-card__actions">
                                                            <button className="about">Подробнее</button>
                                                            <button className="like active" />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        {renderPagination()}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <Footer />
            </section>
        </div>
    );
};

export default SearchPage;