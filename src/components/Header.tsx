import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import img from "../images/header-logo.svg";
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const Header: React.FC = () => {
  const [isSticky, setIsSticky] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, name } = useSelector((state: RootState) => state.user);


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

  return (
    <header className={isSticky ? 'sticky' : ''}>
      <div className="container">
        <div className="header_box">
          <img className="header-logo" src={img} alt='pic' onClick={()=>{ console.log("Clicked!"); navigate("../lk") }} ></img>
          <nav className="header_nav">
            {!isAuthenticated && (
              <>
                <button type="button" onClick={() => { navigate("../regist") }}>Начать</button>
                <button type="button" onClick={() => { navigate("../login") }}>Войти</button>
              </>
            )}
            {isAuthenticated && (
              <>
                <button type="button" onClick={() => { navigate("../search") }}>Поиск</button>
                <button type="button" onClick={() => { navigate("../lk") }}>Личный Кабинет</button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;