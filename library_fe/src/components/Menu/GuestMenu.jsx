import MenuPC from "./MenuPC"
import { 
  LoginOutlined, 
  HomeOutlined,
} from '@ant-design/icons'

const menu = [
  {
    icon: <HomeOutlined />,
    text: 'Trang chủ',
    link: '/'
  },
  {
    icon: <LoginOutlined />,
    text: 'Đăng nhập',
    link: '/login'
  }
]

function GuestMenu() {

  return (
    <MenuPC menu={menu}/>
  )
}

export default GuestMenu;