import styled from "styled-components"
import { useEffect, useState } from "react"
import { Menu, Button } from "antd"
import { Link } from "react-router-dom"
import { 
  LoginOutlined, 
  HomeOutlined, 
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons'

const MenuBox = styled.div`
  width: 200px;
  position: fixed;
  left: 1%;
  margin-top: 6px;
`

function GuestMenu() {
  const [ windowWidth, setWindowWidth ] = useState(window.innerWidth);
  const [ hideMenu, setHideMenu ] = useState(windowWidth <= 480 ? false : true)
  const [ hidden, setHidden ] = useState(windowWidth <= 480 ? true : false)

  useEffect(() => {
    window.addEventListener("resize", updateWindowDimensions);

    return () => {
      window.removeEventListener("resize", updateWindowDimensions)
    }
  })

  const updateWindowDimensions = () => {
    setWindowWidth(window.innerWidth);
    setHideMenu(windowWidth <= 480 ? false : true);
    setHidden(windowWidth <= 480 ? true : false)
  }

  const handleOpenMenu = () => {
    window.innerWidth <= 480 ? setHidden(prev => !prev) : setHideMenu(prev => !prev)
  }

  return (
    <MenuBox>
      <Button
        type='primary'
        onClick={handleOpenMenu}
        size='large'
        style={{ marginLeft: '7%', position: 'relative', top: '0px', marginBottom: '20px' }}
      >
        {hideMenu ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        theme='dark'
        inlineCollapsed={hideMenu}
        hidden={hidden}
        mode='inline'
        selectedKeys='/'
      >
        <Menu.Item key='/' icon={<HomeOutlined />} >
          <Link to="/" >Trang chủ</Link>
        </Menu.Item>
        <Menu.Item key='5' icon={<LoginOutlined />} >
          <Link to='/login'>Đăng nhập</Link>
        </Menu.Item>
      </Menu>
    </MenuBox>
  )
}

export default GuestMenu