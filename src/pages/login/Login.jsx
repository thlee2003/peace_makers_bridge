import React, { useState } from 'react';
import firebase from 'firebase';
import { authService } from '../../server/firebase';
import styles from './Login.module.css';

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const login = () => {
    console.log(id, password);
    authService.signInWithEmailAndPassword(id, password)
    .then(() => {
      window.location.replace('/home');
      alert("로그인 성공! 관리자님, 환영합니다.")
    }).catch((error) => {
      alert("로그인 실패!")
    })
  };
  return (
    <div className={styles.content}>
      <h1>로그인</h1>
      <input type="text" placeholder="아이디" value={id} onChange={(e) => setId(e.target.value)} />
      <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={login}>로그인</button>
    </div>
  );
};

export default Login;
