import React, { useEffect, useRef } from 'react';
import { useAppDispatch } from '../hook';
import { fetchEventCategories } from '../store/eventCategoriesActions';
import { setUserLocation } from '../store/locationSlice';

import arrow from "../images/arrow.svg";
import desc_f from "../images/desc_f.svg";
import desc_s from "../images/desc_s.svg";
import desc_t from "../images/desc_t.svg";


import Header from "../components/Header"
import EventsExample from './EventsExample';
import Footer from "./Footer";

const MainPage: React.FC = () => {
    // Загрузка тэгов
    const dispatch = useAppDispatch();
    useEffect(() => { dispatch(fetchEventCategories()); }, [dispatch]);

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
                            latitude: 59.934280,
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

    // Код глаз
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
            </div>
            <section className="events">
                <EventsExample />
                <Footer />
            </section>
        </div>
    );
};

export default MainPage;