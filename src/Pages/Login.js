// Login.js

import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';


const Login = ( { setIsLoggedIn } ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [validated, setValidated] = useState(false);
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

        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
            return;
        }

        try {
            const response = await fetch('http://13.125.96.124:8080/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                alert('로그인 성공!');
                setIsLoggedIn(true);
                navigate('/');
            } else {
                alert(result.message || '로그인 실패');
            }
        } catch (error) {
            console.error('로그인 중 오류 발생:', error);
            alert('서버 오류로 로그인에 실패했습니다.');
        }

        setValidated(true);
    };

    return (
        <div className="contents">
            <div className="container">
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

                    <button type="submit" className="btn-login">Login</button>
                </form>

                <div className="register-container">
                    <button className="btn-register">Sign Up</button>
                </div>
            </div>
        </div>
    );
};

export default Login;

