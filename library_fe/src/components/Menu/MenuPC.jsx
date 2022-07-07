import { useEffect, useState } from 'react';

import './menuPC.css'

var listSubmenu;

function MenuPC(props) {
  const [ subMenu, setSubMenu ] = useState(0);

  useEffect(() => {
    listSubmenu = document.querySelectorAll('li');
    listSubmenu[0].classList.add('active');

    const handleLogOut = () => {
      localStorage.removeItem('role');
      console.log('abc');
    }

    const logoutMenu = document.querySelector('.logout');
    if (logoutMenu !== null) {
      logoutMenu.addEventListener("click", handleLogOut);
    }

    return () => {
      if (logoutMenu !== null) logoutMenu.removeEventListener("click", handleLogOut);
    }
  }, [])

  const handleToggleMenu = () => {
    const navigationBox = document.querySelector('.navigation-box');
    navigationBox.classList.toggle('open');
    navigationBox.classList.toggle('not-open');
  }

  const handleChooseMenu = (e) => {
    setSubMenu(e.currentTarget.id);
  }

  const handleMouseEnterMenu = (e) => {
    listSubmenu.forEach((item) => item.classList.remove('active'));
    e.currentTarget.classList.add('active');
  }

  const handleMouseOutMenu = (e) => {
    e.currentTarget.classList.remove('active');
    listSubmenu[Number(subMenu)].classList.add('active');
  }

  

  return (
    <div className="navigation-box not-open">
      <div 
        className="menu-toggle"
        onClick={handleToggleMenu}
      ></div>
      <div className='navigation'>
        <ul >
          {props.menu.map( (e, index) => 
            <li
              key={index}
              id={index}
              className={e.classname}
              onClick={handleChooseMenu}
              onMouseEnter={handleMouseEnterMenu}
              onMouseLeave={handleMouseOutMenu}
            >
              <a href={e.link}>
                <span className='icon'>{e.icon}</span>
                <span className='text'>{e.text}</span>
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default MenuPC;