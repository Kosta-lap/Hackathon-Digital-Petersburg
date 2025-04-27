import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import img from "../images/header-logo.svg";

const Header: React.FC = () => {
  const [isSticky, setIsSticky] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleStartClick = () => {
    navigate('/regist');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <header className={isSticky ? 'sticky' : ''}>
      <div className="container">
        <div className="header_box">
          <img className="header-logo" src={img} alt='pic'></img>
          <nav className="header_nav">
            <button type="button" onClick={handleStartClick}>Начать</button>
            <button type="button" onClick={handleLoginClick}>Войти</button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;