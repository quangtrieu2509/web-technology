import { Form, Input, Button } from 'antd'
// import styled from 'styled-components'

import './pages.css'
import logo from '../images/logo1.jpg'

// const 

function Register() {
  const [ form ] = Form.useForm()

  return (
    <div className='background'>
      <div className='login-box'>
        <img
          src={logo}
          alt='logo'
          className='logo'
        />
        <Form form={form} style={{ marginLeft: '7%', width: '86%', marginTop: '30px' }}>
          <Form.Item
            name='username'
            rules={[{ required: true, message: "Cần nhập tên đăng nhập!" }]}
          >
            <Input placeholder='Tên đăng nhập' size='large' />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[{ required: true, message: "Cần nhập mật khẩu!" }]}
          >
            <Input.Password placeholder='Mật khẩu' size='large'/>
          </Form.Item>
          <Form.Item
            name='passwordRetype'
            rules={[{ required: true, message: "Cần nhập lại mật khẩu!" }]}
          >
            <Input.Password placeholder='Nhập lại mật khẩu' size='large'/>
          </Form.Item>
          <Form.Item>
            <Button
              block
              type='primary'
              style={{ marginLeft: '25%', marginTop: '16px', width: '50%' }}
              // onClick={handleLogin}
              htmlType="submit"
            >
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Register