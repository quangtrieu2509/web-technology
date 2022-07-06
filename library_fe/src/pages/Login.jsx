import { Button, Form, Input, message } from 'antd'
import { useNavigate, Link } from 'react-router-dom'
import styled from 'styled-components'

import './pages.css'
import logo from '../images/logo1.jpg'

const Line = styled.div`
  height: 1px;
  width: 96%;
  margin-left: 2%;
  background-color: black;
  margin-bottom: 10px;
`

function Login() {
  const [ form ] = Form.useForm()
  const navigate = useNavigate()

  const handleLogin = () => {
    const { username, password } = form.getFieldValue()
    if (username && password) {
      if (username === '1') {
        localStorage.setItem('role', 1)
        navigate('/')
      }
      else if (username === '2') {
        localStorage.setItem('role', 2)
        navigate('/')
      }
      else message.error('Tài khoản hoặc mật khẩu không đúng')
    } else {
      message.error('Cần nhập đủ tài khoản mật khẩu')
    }
  }

  return (
    <div className='background'>
      <div className='login-box'>
        <img
          src={logo}
          alt='logo'
          className='logo'
        />
        <Form form={form} style={{ marginLeft: '7%', width: '86%' }}>
          <Form.Item
            name='username'
            rules={[{ required: true, message: "Cần nhập tên đăng nhập!" }]}
          >
            <Input placeholder='Tên đăng nhập' size='large'/>
          </Form.Item>
          <Form.Item
            name='password'
            rules={[{ required: true, message: "Cần nhập mật khẩu!" }]}
          >
            <Input.Password placeholder="Mật khẩu" size='large'/>
          </Form.Item>
          <Form.Item>
            <Button
              block
              type='primary'
              style={{ marginLeft: '20%', marginBottom: '6px', width: '60%' }}
              onClick={handleLogin}
              htmlType="submit"
            >
              Đăng nhập
            </Button>
          </Form.Item>
          <div style={{ textAlign: 'center', marginBottom: '16px' }} >
            <a href='recover'>Quên mật khẩu</a>
          </div>
          <Line />
          <Button
            type='primary'
            style={{ backgroundColor: 'green', marginLeft: '20%', width: '60%' }}
          >
            <Link to='/register'>Tạo tài khoản</Link>
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default Login