import {
  LogoutOutlined,
  IdcardOutlined,
  HomeOutlined,
  ReadOutlined,
  SolutionOutlined
} from '@ant-design/icons'

import MenuPC from './MenuPC'

const menu = [
  {
    icon: <HomeOutlined />,
    text: 'Trang chủ',
    link: '/',
    class: ''
  },
  {
    icon: <IdcardOutlined />,
    text: 'Thông tin tài khoản',
    link: '/AccountInfo'
  },
  {
    icon: <ReadOutlined />,
    text: 'Quản lí đầu sách',
    link: '/BookTitle'
  },
  {
    icon: <SolutionOutlined />,
    text: 'Quản lí độc giả',
    link: '/ReaderAccount'
  },
  {
    icon: <LogoutOutlined />,
    text: 'Đăng xuất',
    link: '/',
    classname: 'logout'
  }
]

function LibrarianMenu() {
  return (
    <MenuPC menu={menu} />
  )
}

export default LibrarianMenu