import {
  SearchOutlined
} from '@ant-design/icons'

import logo from '../images/logo1.jpg'
import './components.css'
import LibrarianMenu from './Menu/LibrarianMenu'
import GuestMenu from './Menu/GuestMenu'
import ReaderMenu from './Menu/ReaderMenu'

function NavBar(props) {
  const role = localStorage.getItem('role');

  return (
    <div className='nav-bar'>
    { role === null ? <GuestMenu subMenu={props.subMenu}/> : role === '2' ? <ReaderMenu subMenu={props.subMenu}/> : <LibrarianMenu subMenu={props.subMenu}/> }
      <div className='search-box' >
        <input className='input-search' placeholder='Tìm kiếm'></input>
        <button className='button-search'>
          <SearchOutlined className='icon-search' />
        </button>
      </div>
      <img 
        src={logo} 
        alt='logo' 
        height='63px' 
        style={{ position: 'absolute', right: '5%'}}
      />
    </div>
  )
}

export default NavBar;