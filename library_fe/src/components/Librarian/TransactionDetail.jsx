import { useEffect, useState } from "react";

import './librarianComponent.css'
import { SERVER_ADDR } from '../../api/serverAddr'

function TransactionDetail(props) {
  const role = localStorage.getItem('role');
  const [ transactionDetail, setTransactionDetail ] = useState(null);
  const [ response, setResponse ] = useState('');

  useEffect(() => {
    if (props.transID) fetchData();
  }, [props.transID]);

  const fetchData = async () => {
    const data = await fetch(`${SERVER_ADDR}/library_be/index.php?controller=transaction&action=findById&id=${props.transID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
      }
    });

    const res = await data.json();
    setTransactionDetail(await res);
    console.log(res);
  }

  const handleExitDetail = () => {
    document.getElementById('detail').classList.add('hidden');
  }

  const handleReturnBook = async () => {
    const data = await fetch(`${SERVER_ADDR}/library_be/index.php?controller=transaction&action=update&id=${props.transID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
      },
      body: JSON.stringify({
        "isreturn": 0,
        "bookstatus": 0
    })
    });

    const res = await data.json();
    setResponse(await res);
    fetchData();
    console.log(res);
    setTimeout(() => {
      setResponse('');
    }, 2000);
  }

  if (transactionDetail) return (
    <div className='book-detail'>
      <div className="button-X" onClick={handleExitDetail}></div>
      <div className="main-detail" style={{textAlign: 'left'}}>
        <div className="member-detail">
          <b>Mã lượt mượn: </b> <i>{transactionDetail.transactionid}</i>
        </div>
        <div className="member-detail">
          <b>Ngày mượn: </b> <i>{transactionDetail.transactiondate}</i>
        </div>
        <div className="member-detail">
          <b>{transactionDetail.isreturn === '0' ? 'Ngày trả:' : 'Ngày trả dự kiến:'}</b> <i>{transactionDetail.returndate}</i>
        </div>
        <div className="member-detail">
          <b>Trạng thái: </b> <i>{transactionDetail.isreturn === '0' ? 'Đã trả' : 'Chưa trả'}</i>
        </div>
        <div className="member-detail">
          <b>Tên đầu sách: </b> <i>{transactionDetail.booktitle.bookname}</i>
        </div>
        <div className="member-detail">
          <b>Mã cuốn sách: </b> <i>{transactionDetail.bookid}</i>
        </div>
        <div className="member-detail">
          <b>Tài khoản người mượn: </b> <i>{transactionDetail.account.username}</i>
        </div>
        <div className="member-detail">
          <b>Tên người mượn: </b> <i>{transactionDetail.account.fullname}</i>
        </div>
        <div className="member-detail">
          <b>Số điện thoại: </b> <i>{transactionDetail.account.phone}</i>
        </div>
        {transactionDetail.isreturn === '0' ?
          <></>
          :
          role === '1' ?
          <div className="button-box">
            <button onClick={handleReturnBook}>Xác nhận trả sách</button>
          </div>
          :
          <></>
        }
        <p className="response-trans-detail">{response}</p>
      </div>
    </div>
  )
  else return (<></>);
}

export default TransactionDetail