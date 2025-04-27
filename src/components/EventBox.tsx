import React, { useState, useEffect } from 'react';

const EventBox: React.FC = () => {
    return (
        <div className="lk-favorite_card lk-favorite-card">
            <img src="" alt="" className="lk-favorite-card__image" />
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
    );
};

export default EventBox;