// Login.js

import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';


const Login = ( { setIsLoggedIn } ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [validated, setValidated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        console.log('checkValidity:', form.checkValidity());
        console.log('formData:', formData);

        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('http://localhost:8080/api/v1/auth/jwt/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.username,
                    password: formData.password,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                const accessToken = response.headers.get('Authorization');
                const refreshToken = response.headers.get('refreshToken');
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                localStorage.setItem('Email', result.data.username);
                localStorage.setItem('realname', result.data.realname);
                alert('로그인 성공!');
                setIsLoggedIn(true);
                navigate('/');
            } else {
                alert(result.message || '로그인 실패');
            }
        } catch (error) {
            console.error('로그인 중 오류 발생:', error);
            alert('서버 오류로 로그인에 실패했습니다.');
        } finally {
            setLoading(false);
        }

        setValidated(true);
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
                    <h3>Login</h3>
                    <form noValidate className={validated ? 'was-validated' : ''} onSubmit={handleSubmit}>
                        <div className="form-group">
                            <div className="id-row">
                                <label htmlFor="username">ID</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    required
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="pw-row">
                                <label htmlFor="password">PW</label>
                                <div className="pw-input-wrap">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        className="form-control"
                                        id="password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    <button
                                        type="button"
                                        className="btn-hide"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? 'Hide' : 'Show'}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="btn-login" disabled={loading}>
                            {loading ? '로그인 중...' : 'Login'}
                        </button>
                    </form>

                    <div className="register-container">
                        <button className="btn-register" onClick={() => navigate('/register')}>Sign Up</button>
                    </div>
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

export default Login;