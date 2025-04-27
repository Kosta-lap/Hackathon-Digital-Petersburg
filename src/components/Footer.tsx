import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
    const navigate = useNavigate();
    return (
        <footer>
            <div className="container">
                <div className="footer_box">
                    <div className="footer_info">
                        <h4>Связаться с нами</h4>
                        <div className="info_desc">
                            <a onClick={()=>{navigate("../")}} className="footer_href">VK</a>
                            <a onClick={()=>{navigate("../")}} className="footer_href">Telegram</a>
                        </div>
                    </div>
                    <div className="footer_info">
                        <h4>О сайте</h4>
                        <div className="info_desc">
                            <a onClick={()=>{navigate("../info")}}>Документация</a>
                            <a onClick={()=>{navigate("../info")}}>Используемые источники</a>
                        </div>
                    </div>
                    <div className="footer_info">
                        <h4>О нас</h4>
                        <div className="info_desc">
                            <a onClick={()=>{navigate("../info")}}>Авторы</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;