import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import img from "../images/reg-log-logo.svg";

interface FormData {
    name: string;
    password: string;
}

const AuthPage: React.FC = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [formData, setFormData] = useState<FormData>({ name: '', password: '' });

    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        console.log(formData.name)
        console.log(formData.password)

        try {
            // Отправка данных на сервер
            const response = await axios.post('http://localhost:8000/api/auth/login/', {
                username: formData.name,
                password: formData.password
            });

            if(response.data.flag){
                dispatch(setUser({
                    id: response.data.id,
                    name: response.data.user
                }));
                navigate("../lk")
            }else{
                console.log("wrong pass");
                //очищать поля
            }

        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || 'Ошибка регистрации');
            } else {
                setError('Неизвестная ошибка');
            }
        }
    };


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
                        <form onSubmit={handleSubmit} className="reg-log-form">
                            <h3 className="reg-log-form__title">Войти</h3>
                            <div className="reg-log-form__input-block">
                                <h4 className="reg-log-form__input-title">Имя</h4>
                                <input
                                    type="text"
                                    name='name'
                                    placeholder="Введите своё имя"
                                    className="reg-log-form__input"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="reg-log-form__input-block">
                                <h4 className="reg-log-form__input-title">Пароль</h4>
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="Введите пароль"
                                    className="reg-log-form__input"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                />
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