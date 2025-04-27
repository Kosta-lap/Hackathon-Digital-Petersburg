import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hook';
import { fetchEventCategories } from '../store/eventCategoriesActions';
import { setUserLocation } from '../store/locationSlice';
import axios from 'axios';

import arrow from "../images/arrow.svg";
import desc_f from "../images/desc_f.svg";
import desc_s from "../images/desc_s.svg";
import desc_t from "../images/desc_t.svg";
import event_img from "../images/event.jpg";

import Header from "../components/Header"
import Footer from "./Footer";

interface Event {
    dates: Array<{
        start: number;
        end: number;
    }>;
    description: string;
    images: Array<{
        image: string;
        source?: any;
    }>;
    place: {
        id: number;
    };
    site_url: string;
    title: string;
}

const MainPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { items: categories } = useAppSelector((state) => state.eventCategories);
    const { latitude, longitude } = useAppSelector((state) => state.location);

    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Загрузка тэгов
    useEffect(() => {
        dispatch(fetchEventCategories());
    }, [dispatch]);

    // Запрос местоположения пользователя
    useEffect(() => {
        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        dispatch(setUserLocation({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        }));
                    },
                    (error) => {
                        console.error("Error getting location:", error);
                        dispatch(setUserLocation({
                            latitude: 59.934280, // Санкт-Петербург по умолчанию
                            longitude: 30.335098
                        }));
                    }
                );
            } else {
                console.error("Geolocation is not supported by this browser.");
                dispatch(setUserLocation({
                    latitude: 59.934280,
                    longitude: 30.335098
                }));
            }
        };

        getLocation();
    }, [dispatch]);

    // Загрузка событий (концертов) при изменении геолокации
    useEffect(() => {
        if (!latitude || !longitude) return;

        const fetchConcerts = async () => {
            setLoading(true);
            setError(null);

            try {
                // Получаем текущую дату
                const today = new Date();
                const startOfDay = new Date(today.setHours(0, 0, 0, 0));
                const endOfDay = new Date(today.setHours(23, 59, 59, 999));

                // Находим slug категории "концерты"
                const concertCategory = categories.find(cat =>
                    cat.name.toLowerCase().includes('концерт') ||
                    cat.name.toLowerCase().includes('concert')
                );

                if (!concertCategory) {
                    throw new Error('Категория "концерты" не найдена');
                }

                const url = `https://spb-afisha.gate.petersburg.ru/kg/external/afisha/events?` +
                    `lat=${latitude}&lng=${longitude}&radius=1000&` +
                    `categories=${concertCategory.slug}&` +
                    `fields=dates,title,description,images,place,site_url&` +
                    `actual_since=${Math.floor(startOfDay.getTime() / 1000)}&` +
                    `actual_until=${Math.floor(endOfDay.getTime() / 1000)}&` +
                    `page=1&count=3`; // Загружаем только 3 события

                const fetchWithRetry = async (url: string, retries = 3, delay = 1000) => {
                    for (let i = 0; i < retries; i++) {
                        try {
                            const result = await axios.get<any>(url, {
                                headers: {
                                    'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJhU1RaZm42bHpTdURYcUttRkg1SzN5UDFhT0FxUkhTNm9OendMUExaTXhFIn0.eyJleHAiOjE4Mzk0MzU0OTEsImlhdCI6MTc0NDc0MTA5MSwianRpIjoiMjU4MDNmMGEtNWZmYi00NzFiLThlM2QtMzFlMjY1ZGJhMDQyIiwiaXNzIjoiaHR0cHM6Ly9rYy5wZXRlcnNidXJnLnJ1L3JlYWxtcy9lZ3MtYXBpIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjM5YzBmYzE4LTUyOWItNDYyMy05ODgzLTI1MDA4Njg4NDkyYyIsInR5cCI6IkJlYXJlciIsImF6cCI6ImFkbWluLXJlc3QtY2xpZW50Iiwic2Vzc2lvbl9zdGF0ZSI6IjFmYzBlY2NkLWEwNzUtNDNiYi04MzI3LTlkYmEyMDg4ZWFlYyIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtZWdzLWFwaSIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6ImVtYWlsIHByb2ZpbGUiLCJzaWQiOiIxZmMwZWNjZC1hMDc1LTQzYmItODMyNy05ZGJhMjA4OGVhZWMiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiLQmtC-0L3RgdGC0LDQvdGC0LjQvSDQmtC-0L3RgdGC0LDQvdGC0LjQvSIsInByZWZlcnJlZF91c2VybmFtZSI6IjgzYzYxMWQzYmIxMWFmNmI3ZjhhNWFmOGIzYTgyOGNlIiwiZ2l2ZW5fbmFtZSI6ItCa0L7QvdGB0YLQsNC90YLQuNC9IiwiZmFtaWx5X25hbWUiOiLQmtC-0L3RgdGC0LDQvdGC0LjQvSJ9.jIER5r_7BVW0UeS8SQx9TSYq82qidrvs5C9QQ5hBMqHNBt5P3oXEZ6aXnEXPkH6pVpaW3u3JLNDYX_7Qcjy9WtB5enRRX2N-UCK4B5WkJZW30g-bEbdWn0Rg9PUJ9tvCkDyULYVI4P0ZbHvAABrDkzOWiu6GLXmgtQabnKuhdZOy0If0x1WvgoUjofBaJTrINQM5Bxd1tqQ_3QXT3oR9TnLBlUUKHBfgHA83SJKfEe2irsSo_bZ-cXvUoWLzKQX1ORZ2YwGQavZ5DPeDiWhG0kMZHVcdlofvG5BsRVPAIf8i2eMdQhzZxqG5g7U6XaQg8976iflQUCEx0T5-RruwRA`
                                }
                            });
                            return result;
                        } catch (error: any) {
                            if (error.response?.status !== 502 || i === retries - 1) {
                                throw error;
                            }
                            console.log(`Получена ошибка 502. Повторная попытка ${i + 1}/${retries} через ${delay}ms`);
                            await new Promise(res => setTimeout(res, delay));
                        }
                    }
                };

                const response_events: any = await fetchWithRetry(url);

                setEvents(response_events.data.data || []);
            } catch (err) {
                console.error('Ошибка при загрузке концертов:', err);
                setError('Не удалось загрузить события');
            } finally {
                setLoading(false);
            }
        };

        fetchConcerts();
    }, [latitude, longitude, categories]);

    // Код глаз (оставлен без изменений)
    const eyesRef = useRef<HTMLDivElement>(null);
    const lastMousePosition = useRef({ x: 0, y: 0 });
    const getAngle = (cx: number, cy: number, ex: number, ey: number) => {
        const dy = ey - cy;
        const dx = ex - cx;
        const rad = Math.atan2(dy, dx);
        return rad * 180 / Math.PI;
    };
    const updateEyeRotation = (mouseX: number, mouseY: number) => {
        if (!eyesRef.current) return;

        const rect = eyesRef.current.getBoundingClientRect();
        const personX = rect.left + rect.width / 2;
        const personY = rect.top + rect.height / 2;
        const angleDeg = getAngle(mouseX, mouseY, personX, personY);

        const eyes = eyesRef.current.querySelectorAll(".glaz");
        eyes.forEach(eye => {
            (eye as HTMLElement).style.transform = `rotate(${90 + angleDeg}deg)`;
        });
    };
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            lastMousePosition.current = { x: e.clientX, y: e.clientY };
            updateEyeRotation(e.clientX, e.clientY);
        };

        const handleScroll = () => {
            updateEyeRotation(
                lastMousePosition.current.x,
                lastMousePosition.current.y
            );
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('scroll', handleScroll);
        };
    });

    return (
        <div className="main">
            <Header />
            <div>
                <section className="main_logo">
                    <div className="container">
                        <div className="logo_box">
                            <h1>Твоя карта</h1>
                            <h2>впечатлений</h2>
                            <button><a href="/login"> начать</a></button>
                        </div>
                    </div>
                    <img className="logo_arrow" src={arrow} alt='pic' />
                </section>
                <section className="description">
                    <div className="eblo">
                        <div className="glaza" ref={eyesRef}>
                            <div className="glaz">
                                <div className="zrach"></div>
                            </div>
                            <div className="glaz">
                                <div className="zrach"></div>
                            </div>
                        </div>
                        <div className="rot"></div>
                    </div>
                    <div className="desc_about">
                        <div className="container">
                            <div className="about_box">
                                <div className="box_desc">
                                    <h4>Личный Культурный Планировщик</h4>
                                    <p>
                                        Это твой персональный помощник для поиска мероприятий. Он поможет тебе составить
                                        культурный план на вечер или выходные в зависимости от твоих интересов, свободного
                                        времени и погоды.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="desc_possib">
                        <div className="container">
                            <div className="possib_box">
                                <h3>Возможности</h3>
                                <div className="card_box">
                                    <div className="possib_card">
                                        <img src={desc_f} alt="" />
                                        <p>Персонализированные рекомендации на основе предпочтений</p>
                                    </div>
                                    <div className="possib_card">
                                        <img src={desc_s} alt="" />
                                        <p>Умный подбор событий по свободному времени</p>
                                    </div>
                                    <div className="possib_card">
                                        <img src={desc_t} alt="" />
                                        <p>Учет местоположения</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Секция с концертами */}
                <section className="events">
                    <div className="container">
                        <div className="events_box">
                            <h3>Популярные события</h3>
                            {events.map((event, index) => (
                                <div className="event_card">
                                    <img
                                        src={event.images[0]?.image || event_img}
                                        alt={event.title}
                                        className="event_img"
                                    />
                                    <div className="event_desc">
                                        <h4>{event.title}</h4>
                                        <div className="event_about">
                                            <p>{event.description.length > 100
                                                ? `${event.description.substring(0, 100)}...`
                                                : event.description}</p>
                                            <p>{new Date(event.dates[0].start * 1000).toLocaleString()}</p>
                                        </div>
                                        <div className="event_buttons">
                                            <button className="about">Подробнее</button>
                                            <button className="like" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Footer />
                </section>
            </div>
        </div>
    );
};

export default MainPage;