import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Alert from '../components/Alert'
import './pages.css'
import logo from '../images/logo1.jpg'

function Login() {
  const [ response, setResponse ] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== null) {
      navigate('/');
    }

    document.addEventListener('keydown', handleEnter);

    return (() => document.removeEventListener('keydown', handleEnter));
  });

  var username, password;
  const CheckValidate = () => {
    username = document.getElementById('username').value;
    let warning = document.getElementById('warning1');
    // Show warning if username is empty
    if (username) {
      warning.classList.add('hidden');
    }
    else warning.classList.remove('hidden');

    password = document.getElementById('password').value;
    warning = document.getElementById('warning2');
    // Show warning if password is empty
    if (password) {
      warning.classList.add('hidden');
    }
    else warning.classList.remove('hidden');
  }

  const handleLogin = async () => {
    CheckValidate();
    
    if (username && password) {
      const data = await fetch('http://localhost:63342/library_be/index.php?controller=auth&action=signIn', {
        method: 'POST',
        body: JSON.stringify({
          username,
          password
        })
      });
      const res = await data.json();
      setResponse(await res);

      if (typeof res === 'string') {
        const alert = document.querySelector('#box-alert');
        alert.classList.remove('hidden');
        setTimeout(() => {
          alert.classList.add('hidden');
        }, 2000)
      }
      else {
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('role', res.user.role);
        localStorage.setItem('username', res.user.username);
        navigate('/');
      }
    }
  }

  const handleSignup = () => {
    navigate('/register');
  }

  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      handleLogin();
    }
  }

  return (
    <div className='background'>
      <div id='box-alert' className='hidden'>
        <Alert message={typeof response === 'string' ? response : ''} />
      </div>
      <div className='login-box'>
        <img
          src={logo}
          alt='logo'
          className='logo'
        />
        <input
          id='username'
          className='input-form'
          placeholder='Tên đăng nhập'
        />
        <p id='warning1' className='warning hidden'>Cần nhập tên đăng nhập!!!</p>
        <input
          id='password'
          type='password'
          className='input-form'
          placeholder='Mật khẩu'
        />
        <p id='warning2' className='warning hidden'>Cần nhập mật khẩu!!!</p>
        <button className='button-form button-blue' onClick={handleLogin}>Đăng nhập</button>
        <div className='line'></div>
        <button className='button-form button-green' onClick={handleSignup}>Tạo tài khoản</button>
      </div>
    </div>
  )
}

export default Login;