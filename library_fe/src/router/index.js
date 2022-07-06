import Home from '../pages/Home'
import AccountInfo from '../pages/AccountInfo'
import Cart from '../pages/Reader/Cart'
import History from '../pages/Reader/History'
import BookTitle from '../pages/Librarian/BookTitle'
import ReaderAccount from '../pages/Librarian/ReaderAccount'

export const PUBLIC_ROUTER = [
  {
    key: "home",
    path: '/',
    element: <Home />,
    exact: true
  },
  {
    key: "homeChildren",
    path: '/:type',
    element: <Home />,
    exact: true
  },
  {
    key: 'AccountInfo',
    path: '/AccountInfo',
    element: <AccountInfo />,
    exact: true
  },
  {
    key: 'Cart',
    path: '/Cart',
    element: <Cart />,
    exact: true
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
    exact: true
  },
  {
    key: 'ReaderAccount',
    path: '/ReaderAccount',
    element: <ReaderAccount />,
    exact: true
  }
]