// Login.js
import React, { useState } from 'react';
import './Login.css'; 

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      // 로그인 처리 로직 추가 가능 (API 연결 등)
      alert('Success Login!');
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
              <label htmlFor="id">ID</label>
              <input type="text" className="form-control" id="id" required />
            </div>
            <div className="pw-row">
              <label htmlFor="password">PW</label>
              <div className="pw-input-wrap">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  id="password"
                  required
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
