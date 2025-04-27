import React from 'react';

const Header: React.FC = () => {
    return (
        <footer>
            <div className="container">
                <div className="footer_box">
                    <div className="footer_info">
                        <h4>Связаться с нами</h4>
                        <div className="info_desc">
                            <a href="./" className="footer_href">VK</a>
                            <a href="./" className="footer_href">Telegram</a>
                        </div>
                    </div>
                    <div className="footer_info">
                        <h4>О сайте</h4>
                        <div className="info_desc">
                            <a href="/info">Документация</a>
                            <a href="/info">Используемые источники</a>
                        </div>
                    </div>
                    <div className="footer_info">
                        <h4>О нас</h4>
                        <div className="info_desc">
                            <a href="/info">Авторы</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Header;