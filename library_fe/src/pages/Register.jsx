import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import './pages.css'
import logo from '../images/logo1.jpg'

// const 

function Register() {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== null) {
      navigate('/');
    }
  })

  var username, password, passwordCheck;
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

    passwordCheck = document.getElementById('password-check').value;
    warning = document.getElementById('warning3');
    // Show warning if password check is empty
    if (passwordCheck) {
      warning.classList.add('hidden');
      warning = document.getElementById('warning4');
      if (passwordCheck === password) {
        warning.classList.add('hidden');
      }
      else warning.classList.remove('hidden');
    }
    else warning.classList.remove('hidden');
  }

  const handleSignUp = () => {
    CheckValidate();
    console.log(password)
    console.log(passwordCheck)
  }

  return (
    <div className='background'>
      <div className='login-box register-box'>
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
        <input
          id='password-check'
          type='password'
          className='input-form'
          placeholder='Nhập lại mật khẩu'
        />
        <p id='warning3' className='warning hidden'>Cần nhập lại mật khẩu!!!</p>
        <p id='warning4' className='warning hidden'>Mật khẩu nhập lại không khớp!!!</p>
        <button className='button-form button-blue' onClick={handleSignUp}>Đăng ký</button>
      </div>
    </div>
  )
}

export default Register