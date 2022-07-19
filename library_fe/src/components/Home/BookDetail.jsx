import { useEffect, useState } from "react";
import {
  ReadOutlined,
  ShoppingOutlined,
} from '@ant-design/icons'

import { SERVER_ADDR } from '../../api/serverAddr'

// const detail = {
//   "booktitleid": "1",
//   "bookname": "Coffret Les Enquêtes de Lacey Doyle: La Mort et le Chien (Tome 2) et Crime au Café (Tome 3)",
//   "pages": "100",
//   "publishyear": "2019",
//   "quantity": "2",
//   "quantityleft": "2",
//   "description": "Cuốn sách kể về 1 câu chuyện của 1 anh chàng abc tìm hiểu về toán học và đây là phần mô tả của câu chuyện abcxyz thêm cho dài",
//   "picture": "https://bizweb.dktcdn.net/thumb/grande/100/397/420/products/61sc4vidcyl-sx419-bo1-204-203-200.jpg?v=1619849924967",
//   "author": [
//       "Trần Quốc Bình"
//   ],
//   "category": [
//       "Toán học",
//       "Lập trình"
//   ]
// }

function BookDetail(props) {
  var role = localStorage.getItem('role');
  const [ detail, setDetail ] = useState(null);
  const [ response, setResponse ] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`${SERVER_ADDR}/library_be/index.php?controller=booktitle&action=getById&id=${props.bookID}`);
      
      setDetail(await data.json());
    }
    fetchData();
  }, [props.bookID])

  const handleExitDetail = () => {
    document.getElementById('detail').classList.add('hidden');
  }

  const handleAddToCart = async () => {
    const data = await fetch(`${SERVER_ADDR}/library_be/index.php?controller=cart&action=add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
      },
      body: JSON.stringify({
        booktitleid: props.bookID
      })
    });

    setResponse(await data.json());
    setTimeout(() => {
      setResponse('');
    }, 2000)
  }

  if (detail) return (
    <div className='book-detail'>
      <div className="button-X" onClick={handleExitDetail}></div>
      <div className="main-detail">
        <div className="book-content">
          <div className="left-column">
            <img
              src={detail.picture}
              alt={detail.bookname}
            />
          </div>
          <div className="right-column">
            <div className="bookname">{detail.bookname}</div>
            <div className="description member-book-detail"><b>Mô tả:</b> <i>{detail.description}</i></div>
            <div className="author member-book-detail">
              <b>Tác giả:</b> <i>{detail.author.map((e, index) => index === detail.author.length - 1 ? ` ${e}` : ` ${e},`)}</i>
            </div>
            <div className="year-page member-book-detail">
              <div className="year"><b>Năm xuất bản: </b> <i>{detail.publishyear}</i></div>
              <div><b>Số trang: </b> <i>{detail.pages}</i></div>
            </div>
            <div className="category member-book-detail">
              <b>Thể loại: </b><i>{detail.category.map((e, index) => index === detail.category.length - 1 ? ` ${e}` : ` ${e},`)}</i>
            </div>
            <div className="quantity member-book-detail">
              <div className="total"><b>Tổng số cuốn: </b> <i>{detail.quantity}</i></div>
              <div><b>Số cuốn còn lại: </b> <i>{detail.quantityleft}</i></div>
            </div>
          </div>
        </div>
        {
          role === '2' ?
            <button onClick={handleAddToCart}>
              <ShoppingOutlined className="btn-icon" />
              Thêm vào giỏ
            </button>
            : role === '1' ?
              <button>
                <ReadOutlined className="btn-icon" />
                Chỉnh sửa
              </button>
              :
              <></>
        }
        <p id="response-book-detail" className="response">{response}</p>
      </div>
    </div>
  )
  else return (<></>)
}

export default BookDetail;