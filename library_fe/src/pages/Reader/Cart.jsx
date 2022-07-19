import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  DeleteOutlined
} from '@ant-design/icons'

import CartItem from "../../components/Reader/CartItem";
import BookDetail from "../../components/Home/BookDetail";
import './reader.css'
import { SERVER_ADDR } from '../../api/serverAddr'

// const cart = [
//   {
//       "booktitleid": "4",
//       "bookname": "Love is War ascdcds dsfioewr jscdjsido cdseqwirw acdsoif acsdll sdoeoiwq",
//       "pages": "100",
//       "publishyear": "2009",
//       "quantity": "2",
//       "quantityleft": "1",
//       "description": "It is really good, yeahh",
//       "picture": "https://images-na.ssl-images-amazon.com/images/I/51HFQfT7OFL._SX331_BO1,204,203,200_.jpg",
//       "author": [
//           "Duong Quang Trieu",
//           "Harry Marguire"
//       ],
//       "category": [
//           "Tinh cam",
//           "Tieu thuyet"
//       ]
//   },
//   {
//       "booktitleid": "1",
//       "bookname": "Math",
//       "pages": "100",
//       "publishyear": "2019",
//       "quantity": "2",
//       "quantityleft": "2",
//       "description": "It is really good, yeahh",
//       "picture": "https://bizweb.dktcdn.net/thumb/grande/100/397/420/products/61sc4vidcyl-sx419-bo1-204-203-200.jpg?v=1619849924967",
//       "author": [
//           "Tran Quoc Binh"
//       ],
//       "category": [
//           "Toan hoc",
//           "Lap trinh"
//       ]
//   }
// ]

function Cart() {
  const navigate = useNavigate();
  const [ cart, setCart ] = useState([]);
  const [ checked, setChecked ] = useState([]);
  const [ bookID,  setBookID ] = useState(1);

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== '2') {
      navigate('/');
    }

    getBookFromCart();
  }, [navigate])

  const getBookFromCart = async () => {
    const data = await fetch(`${SERVER_ADDR}/library_be/index.php?controller=cart`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
      }
    });

    const res = await data.json();
    setCart(await res);
    console.log(res);
  }

  const handleSubmit = () => {
    console.log(checked);
  }

  const handleSeeDetail = (e) => {
    document.getElementById('detail').classList.remove('hidden');
    setBookID(e.currentTarget.attributes.bookid.nodeValue);
  }

  const handleDeleteFromCart = async (id) => {
    console.log(id);
    const data = await fetch(`${SERVER_ADDR}/library_be/index.php?controller=cart&action=delete&booktitleid=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
      },
    });

    console.log(await data.json());
    getBookFromCart();
  }

  const handleCheck = (id) => {
    if (checked.includes(id)) {
      setChecked(prev => prev.filter(e => e !== id));
    }
    else setChecked(prev => [...prev, id]);
  }

  return (
    <div className="cart-page">
      <div className="grid-container-cart">
        {cart.map((e, index) =>
          <div 
            key={index}
            className="wrap-cart-item"
          >
            <div
              onClick={handleSeeDetail}
              bookid={e.booktitleid}
            >
              <CartItem
                booktitleid={e.booktitleid}
                img={e.picture}
                name={e.bookname}
                quantity={e.quantity}
                quantityleft={e.quantityleft}
              />
            </div>
            <div className='cart-item-button'>
              <button className='delete' onClick={() => handleDeleteFromCart(e.booktitleid)}>
                <DeleteOutlined className='icon' />
                Xóa khỏi giỏ
              </button>
              <input type='checkbox' onChange={() => handleCheck(e.booktitleid)} />
            </div>
          </div>
        )}
        <div></div>
      </div>
      {
        checked.length ?
          <div className="borrow-box">
            <div className="checked-number">Đã chọn {checked.length} quyển</div>
            <button onClick={handleSubmit}>Mượn ngay</button>
          </div>
          :
          <></>
      }
      <div id='detail' className='wrap-book-detail hidden'>
        <BookDetail bookID={bookID} />
      </div>
    </div>
  )
}

export default Cart