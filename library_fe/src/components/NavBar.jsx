import styled from 'styled-components'
import { Form, Input } from 'antd'
import logo from '../images/logo1.jpg'
import './components.css'

import LibrarianMenu from './Menu/LibrarianMenu'
import GuestMenu from './Menu/GuestMenu'
import ReaderMenu from './Menu/ReaderMenu'

const NavBarStyle = styled.div`
  display: flex;
  margin-top: 6px;
  height: 50px;
  // justify-content: space-between;
`

function NavBar() {
  const role = localStorage.getItem('role')

  return (
    <NavBarStyle>
      { role === null ? <GuestMenu /> : role === 1 ? <ReaderMenu /> : <LibrarianMenu /> }
      <div className='search-box' >
        <Form.Item className='search-box' style={{ width: '100%' }}>
          <Input.Search placeholder="Tìm kiếm" size='large' enterButton />
        </Form.Item>
      </div>
      <img 
        src={logo} 
        alt='logo' 
        height='50px' 
        style={{ position: 'absolute', right: '5%'}}
      />
    </NavBarStyle>
  )
}

export default NavBar