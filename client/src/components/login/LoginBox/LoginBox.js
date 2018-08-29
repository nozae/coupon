import React from 'react';
import Button from '../../common/Button';
import './LoginBox.scss';

const LoginBox = ({ onLogin, onChange, onKeyPress }) => (
  <div className="LoginBox">
    <div className="LoginForm">
      <input
        type="text"
        name="email"
        placeholder="아이디를 입력하세요."
        onChange={onChange}
      />
      <input
        type="password"
        name="password"
        placeholder="비밀번호를 입력하세요."
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
      <Button theme="highlight w100" onClick={onLogin}>
        login
      </Button>
    </div>
  </div>
);

export default LoginBox;
