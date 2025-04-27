import React from 'react';

import event from "../images/event.jpg"

const EventsExample: React.FC = () => {
    return (
        <div>
            <div className="container">
                <div className="events_box">
                    <h3>Популярные события</h3>
                    <div className="events_cards">
                        <div className="event_card">
                            <img src={event} alt="" className="event_img" />
                            <div className="event_desc">
                                <h4>Название события</h4>
                                <div className="event_about">
                                    <p>Подробное описание события</p>
                                    <p>Место проведения, Время</p>
                                </div>
                                <div className="event_buttons">
                                    <button className="about">Подробнее</button>
                                    <button className="like" />
                                </div>
                            </div>
                        </div>
                        <div className="event_card">
                            <img src={event} alt="" className="event_img" />
                            <div className="event_desc">
                                <h4>Название события</h4>
                                <div className="event_about">
                                    <p>Подробное описание события</p>
                                    <p>Место проведения, Время</p>
                                </div>
                                <div className="event_buttons">
                                    <button className="about">Подробнее</button>
                                    <button className="like" />
                                </div>
                            </div>
                        </div>
                        <div className="event_card">
                            <img src={event} alt="" className="event_img" />
                            <div className="event_desc">
                                <h4>Название события</h4>
                                <div className="event_about">
                                    <p>Подробное описание события</p>
                                    <p>Место проведения, Время</p>
                                </div>
                                <div className="event_buttons">
                                    <button className="about">Подробнее</button>
                                    <button className="like" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventsExample;