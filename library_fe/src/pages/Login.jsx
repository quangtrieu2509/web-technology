import { message } from 'antd'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import './pages.css'
import logo from '../images/logo1.jpg'

function Login() {
  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== null) {
      navigate('/');
    }
  });


  const navigate = useNavigate();

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

  const handleLogin = () => {
    CheckValidate();
    
    if (username && password) {
      fetch('10.0.3.122:63342/library_be/index.php?controller=booktitle&action=findById&id=4')
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));

      ////////////////////////////////////////////////////////////////////
      // var aPromise = fetch('https://dog.ceo/api/breeds/image/random');
      // // Work with Promise object:
      // aPromise
      //   .then(function (response) {
      //     console.log("OK! Server returns a response object:");
      //     console.log(response);
      //     if (!response.ok) {
      //       throw new Error("HTTP error, status = " + response.status);
      //     }
      //     response.json()
      //       .then(function (myText) {
      //         console.log("Text:");
      //         console.log(myText);
      //       })
      //       .catch(function (error) {
      //         // Never happened.
      //       });
      //   })
      //   .catch(function (error) {
      //     console.log("Noooooo! Something error:");
      //     // Network Error!
      //     console.log(error);
      //   });
      ///////////////////////////////////////////////////////////////////////////

      if (username === '1') {
        localStorage.setItem('role', 1)
        navigate('/')
      }
      else if (username === '2') {
        localStorage.setItem('role', 2)
        navigate('/')
      }
      else message.error('Tài khoản hoặc mật khẩu không đúng')
    }
  }

  const handleSignup = () => {
    navigate('/register');
  }

  return (
    <div className='background'>
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