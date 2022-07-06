import styled from 'styled-components'
import logo from '../images/logo1.jpg'
import './components.css'
import {
  SearchOutlined
} from '@ant-design/icons'

import LibrarianMenu from './Menu/LibrarianMenu'
import GuestMenu from './Menu/GuestMenu'
import ReaderMenu from './Menu/ReaderMenu'

const NavBarStyle = styled.div`
  display: flex;
  // margin-top: 6px;
  height: 60px;
  // justify-content: space-between;
`

function NavBar() {
  const role = localStorage.getItem('role');

  return (
    <NavBarStyle>
    { role === null ? <GuestMenu /> : role === '1' ? <ReaderMenu /> : <LibrarianMenu /> }
      <div className='search-box' >
        <input className='input-search' placeholder='Tìm kiếm'></input>
        <button className='button-search'>
          <SearchOutlined className='icon-search' />
        </button>
      </div>
      <img 
        src={logo} 
        alt='logo' 
        height='50px' 
        style={{ position: 'absolute', right: '5%', marginTop: '5px'}}
      />
    </NavBarStyle>
  )
}

export default NavBar;