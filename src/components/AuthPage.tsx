import React, { useEffect, useState } from 'react';
import img from "../images/reg-log-logo.svg";

const AuthPage: React.FC = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const updateEyeRotation = (mouseX: number, mouseY: number) => {
            const person = document.querySelector(".reg-log-form__title");
            if (!person) return;

            const rect = person.getBoundingClientRect();
            const personX = rect.left + rect.width / 2;
            const personY = rect.top + rect.height / 2;
            const angleDeg = getAngle(mouseX, mouseY, personX, personY);

            const eyes = document.querySelectorAll(".reg-log-glaz");
            eyes.forEach(eye => {
                (eye as HTMLElement).style.transform = `rotate(${90 + angleDeg}deg)`;
            });
        };

        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            updateEyeRotation(e.clientX, e.clientY);
        };

        const handleScroll = () => {
            updateEyeRotation(mousePosition.x, mousePosition.y);
        };

        // Initialize with current mouse position
        updateEyeRotation(mousePosition.x, mousePosition.y);

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('scroll', handleScroll);
        };
    }, [mousePosition]);

    const getAngle = (cx: number, cy: number, ex: number, ey: number) => {
        const dy = ey - cy;
        const dx = ex - cx;
        const rad = Math.atan2(dy, dx);
        const deg = rad * 180 / Math.PI;
        return deg;
    };

    return (
        <main className="reg-log">
            <div className="reg-log-header container">
                <a href="/">
                
                <img src={img} alt="logo"/>
                </a>
            </div>
            <div className="container">
                <div className="reg-log-content">
                    <div className="reg-log-glaz">
                        <div className="dot"></div>
                    </div>
                    <div className="reg-log-content__form">
                        <form method="post" action="./index.html" className="reg-log-form">
                            <h3 className="reg-log-form__title">Войти</h3>
                            <div className="reg-log-form__input-block">
                                <h4 className="reg-log-form__input-title">Имя</h4>
                                <input type="text" placeholder="Введите своё имя" className="reg-log-form__input" />
                            </div>
                            <div className="reg-log-form__input-block">
                                <h4 className="reg-log-form__input-title">Пароль</h4>
                                <input name="login" type="password" placeholder="Введите пароль" className="reg-log-form__input" />
                            </div>
                            <button type="submit" name="action" className="reg-log-form__send-btn" value="Reg-logist">
                                Войти
                            </button>
                            <p className="reg-log-form__tip">
                                Нет аккаунта? <br />
                                <a href="/regist" className="reg-log-form__tip-link"> Зарегистрироваться</a>
                            </p>
                        </form>
                    </div>
                    <div className="reg-log-glaz">
                        <div className="dot"></div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default AuthPage;