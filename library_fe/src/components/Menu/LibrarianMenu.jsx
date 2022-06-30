import styled from "styled-components"
import { useState } from "react"
import { Menu, Button } from "antd"
import { Link } from "react-router-dom"
import { 
  MenuFoldOutlined, 
  MenuUnfoldOutlined, 
  LogoutOutlined,
  IdcardOutlined,
  HomeOutlined,
  AuditOutlined,
  ReadOutlined,
  SolutionOutlined
} from '@ant-design/icons'

const MenuBox = styled.div`
  width: 200px;
  position: absolute;
  left: 1%;
  margin-top: 6px;
`

const { SubMenu } = Menu

function LibrarianMenu() {
  const [ hideMenu, setHideMenu ] = useState(true)

  const handleOpenMenu = () => {
    setHideMenu(prev => !prev)
  }

  const handleSignOut = () => {
    localStorage.removeItem('role')
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
        mode='inline'
        selectedKeys={window.location.pathname}
      >
        <Menu.Item key='/' icon={<HomeOutlined />} >
          <Link to="/" >Trang chủ</Link>
        </Menu.Item>
        <Menu.Item key='/AccountInfo' icon={<IdcardOutlined />} >
          <Link to="/AccountInfo" >Thông tin tài khoản</Link>
        </Menu.Item>
        <SubMenu key='sub2' icon={<AuditOutlined />} title='Quản lý'>
          <Menu.Item key='/BookTitle' icon={<ReadOutlined />} >
            <Link to='/BookTitle' >Quản lí đầu sách</Link>
          </Menu.Item>
          <Menu.Item key='/ReaderAccount' icon={<SolutionOutlined />} >
            <Link to='/ReaderAccount' >Quản lí độc giả</Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key='5' icon={<LogoutOutlined />} onClick={handleSignOut}>
          <Link to='/login'>Đăng xuất</Link>
        </Menu.Item>
      </Menu>
    </MenuBox>
  )
}

export default LibrarianMenu