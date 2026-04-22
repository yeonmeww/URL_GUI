// Loggedin.js

import React from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Loggedin = ({ setIsLoggedIn, userEmail }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('Email');
        localStorage.removeItem('realname')
        setIsLoggedIn(false);
        navigate('/Login');
    };

    return (
        <div className='login-full'>
            <div className="contents">
                <div className="container">
                    <img
                        src={require('./pcec.png')}
                        alt="PCEC Logo"
                        style={{width: '100%', marginBottom: '20px' }}
                    />
                    <h3>My Account</h3>

                    <div className="form-group">
                        <div className="id-row">
                            <label>이름</label>
                            <span style={{ fontSize: '14px', color: '#333' }}>
                            {userEmail || localStorage.getItem('realname')}
                            </span>
                        </div>
                        <div className="id-row">
                            <label>ID</label>
                            <span style={{ fontSize: '14px', color: '#333' }}>
                            {userEmail || localStorage.getItem('Email')}
                            </span>
                        </div>
                        <div className="id-row">
                            <label>Auth</label>
                            <span style={{ fontSize: '14px' }}>
                            Admin
                            </span>
                        </div>
                    </div>

                    <button className="btn-login" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>

            <div className="institution-row-wrapper">
                <div className="institution-row">
                    <img src={require('./Home/kier.jpg')} alt="KIER" />
                    <img src={require('./Home/kist.jpg')} alt="KIST" />
                    <img src={require('./Home/sk.jpg')} alt="성균관대" />
                    <img src={require('./Home/korea.jpg')} alt="고려대" />
                    <img src={require('./Home/hy.jpg')} alt="한양대" />
                    <img src={require('./Home/pn.jpg')} alt="부산대" />
                    <img src={require('./Home/kit.jpg')} alt="금오공대" />
                    <img src={require('./Home/INU.jpg')} alt="인천대" />
                    <img src={require('./Home/h.jpg')} alt="홍익대" />
                </div>
            </div>
        </div>
    );
};

export default Loggedin;