import Home from '../pages/Common/Home'
import AccountInfo from '../pages/Common/AccountInfo'
import Cart from '../pages/Reader/Cart'
import History from '../pages/Reader/History'
import BookTitle from '../pages/Librarian/BookTitle'
import ReaderAccount from '../pages/Librarian/ReaderAccount'

export const PUBLIC_ROUTER = [
  {
    key: "home",
    path: '/',
    element: <Home />,
    exact: true,
    subMenu: 0
  },
  {
    key: "homeChildren",
    path: '/:type',
    element: <Home />,
    exact: true,
    subMenu: 0
  },
  {
    key: 'AccountInfo',
    path: '/AccountInfo',
    element: <AccountInfo />,
    exact: true,
    subMenu: 1
  },
  {
    key: 'Cart',
    path: '/Cart',
    element: <Cart />,
    exact: true,
    subMenu: 2
  },
  {
    key: 'History',
    path: '/History',
    element: <History />,
    exact: true
  },
  {
    key: 'BookTitle',
    path: '/BookTitle',
    element: <BookTitle />,
    exact: true,
    subMenu: 2
  },
  {
    key: 'ReaderAccount',
    path: '/ReaderAccount',
    element: <ReaderAccount />,
    exact: true,
    subMenu: 3
  }
]