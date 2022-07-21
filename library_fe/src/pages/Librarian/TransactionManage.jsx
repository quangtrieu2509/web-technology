import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { SERVER_ADDR } from '../../api/serverAddr'
import './librarian.css'
import TransactionDetail from '../../components/Librarian/TransactionDetail'

// const transaction = [
//   {
//       "transactionid": "192673494653067",
//       "userid": "10",
//       "booktitleid": "4",
//       "bookid": "661971205901148",
//       "transactiondate": "2022-07-13",
//       "returndate": "2022-07-20",
//       "isreturn": "0",
//       "username": "abc",
//       "bookname": ""
//   },
//   {
//       "transactionid": "392275749113600",
//       "userid": "10",
//       "booktitleid": "4",
//       "bookid": "661971205901148",
//       "transactiondate": "2022-07-13",
//       "returndate": "2022-07-27",
//       "isreturn": "0",
//       "username": "abc",
//       "bookname": ""
//   },
//   {
//       "transactionid": "489692377930576",
//       "userid": "10",
//       "booktitleid": "1",
//       "bookid": "573886883150814",
//       "transactiondate": "2022-07-17",
//       "returndate": "2022-07-31",
//       "isreturn": "1",
//       "username": "abc",
//       "bookname": ""
//   },
//   {
//       "transactionid": "783552453378040",
//       "userid": "10",
//       "booktitleid": "4",
//       "bookid": "695806144199077",
//       "transactiondate": "2022-07-13",
//       "returndate": "2022-07-20",
//       "isreturn": "1",
//       "username": "abc",
//       "bookname": ""
//   },
//   {
//       "transactionid": "940428639662399",
//       "userid": "10",
//       "booktitleid": "1",
//       "bookid": "592508937214952",
//       "transactiondate": "2022-07-17",
//       "returndate": "2022-07-31",
//       "isreturn": "1",
//       "username": "abc",
//       "bookname": "Math"
//   }
// ]

function TransactionManage() {
  const navigate = useNavigate();
  const [ pageNum, setPageNum ] = useState(1);
  const [ transaction, setTransaction ] = useState({data: []});
  const [ transID, setTransID ] = useState(0);

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== '1') {
      navigate('/');
    }

    const getAllTransaction = async () => {
      const data = await fetch(`${SERVER_ADDR}/library_be/index.php?controller=transaction&pageSize=11&&page=${pageNum}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        }
      });
  
      const res = await data.json();
      setTransaction(await res);
      console.log(res);
    }

    getAllTransaction();
  }, [navigate, pageNum]);

  const handleChoosePage = (p) => {
    setPageNum(p);
  }

  const handleJumpPage = () => {
    let p = document.getElementById('page-num-jump').value;
    if (p) setPageNum(Number(p));
  }

  const handleJumpFirstPage = () => {
    setPageNum(1);
  }

  const handleSearchTransaction = async () => {
    let search = document.getElementById('trans-search-input').value;
    let type = document.getElementById('trans-search-type').value;
    const data = await fetch(`${SERVER_ADDR}/library_be/index.php?controller=transaction${search === '' ? '' : `&action=search&${type === '1' ? `id=${search}` : type === '2' ? `username=${search}` : `bookId=${search}`}`}&pageSize=11&&page=${pageNum}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
      }
    });

    const res = await data.json();
    setTransaction(await res);
    console.log(res);
  }

  const handleSeeDetail = (id) => {
    document.getElementById('detail').classList.remove('hidden');
    setTransID(id);
  }

  return (
    <div className="transaction-manage-page">
      <div className="title-page">Quản lí mượn trả</div>
      <div className="transaction-manage-search">
        <input id="trans-search-input" placeholder="Tìm kiếm lượt mượn trả"/>
        <div>
          Tìm theo:
          <select id="trans-search-type">
            <option value="1">Mã lượt mượn</option>
            <option value="2">Username</option>
            <option value="3">Mã cuốn sách</option>
          </select>
          <button onClick={handleSearchTransaction}>Tìm</button>
        </div>
      </div>
      <div className="transaction-info-box">
        <div className="scrollbar-box">
          <div className="transaction-info">
            <div className="transaction-info-title">
              <div className="username-info middle-vertical">Username</div>
              <div className="fullname-info middle-vertical">Họ và tên</div>
              <div className="transaction-date-info middle-vertical">Ngày mượn</div>
              <div className="return-date-info middle-vertical">Ngày trả</div>
              <div className="status-info middle-vertical">Trạng thái</div>
              <div className=""></div>
            </div>
            {transaction.data.map((e, index) =>
              <div 
                key={index} 
                className={index % 2 ? "transaction-info-title" : "transaction-info-title gray"}
                onClick={() => handleSeeDetail(e.transactionid)}
              >
                <div className="username-info middle-vertical">{e.username}</div>
                <div className="fullname-info middle-vertical">{e.fullname}</div>
                <div className="transaction-date-info middle-vertical">{e.transactiondate}</div>
                <div className="return-date-info middle-vertical">{e.returndate}</div>
                <div className="status-info middle-vertical">
                  {e.isreturn === '1' ? 'Chưa trả' : 'Đã trả'}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="number-of-page">
          Trang:
          <button className="btn-number-page" onClick={handleJumpFirstPage}>Về trang đầu</button>
          {pageNum === 1 || pageNum > transaction.pages + 1 ? <></> : <div className="page-number btn-number-page" onClick={() => handleChoosePage(pageNum - 1)}>{pageNum - 1}</div>}
          <div className="page-number selected">{pageNum}</div>
          {pageNum >= transaction.pages ? <></> : <div className="page-number btn-number-page" onClick={() => handleChoosePage(pageNum + 1)}>{pageNum + 1}</div>}
          <input id="page-num-jump" type='number' placeholder="Nhập trang muốn đến" />
          <button className="btn-number-page btn2" onClick={handleJumpPage}>Đi</button>
        </div>
      </div>
      <div id='detail' className='wrap-book-detail hidden'>
        <TransactionDetail transID={transID}/>
      </div>
    </div>
  )
}

export default TransactionManage