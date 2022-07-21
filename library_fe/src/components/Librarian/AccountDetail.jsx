import { useEffect, useState } from "react";

import './librarianComponent.css'
import { SERVER_ADDR } from '../../api/serverAddr'

function AccountDetail(props) {
  const [ accountInfo, setAccountInfo ] = useState(null);
  const [ response, setResponse ] = useState('');

  useEffect(() => {
    fetchData();
  }, [props.accID]);

  
  const fetchData = async () => {
    const data = await fetch(`${SERVER_ADDR}/library_be/index.php?controller=account&action=findById&id=${props.accID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
      }
    });

    const res = await data.json();
    setAccountInfo(await res);
    console.log(res);
  }

  const handleExitDetail = () => {
    document.getElementById('detail').classList.add('hidden');
  }

  const handleLockAcc = async (status) => {
    const data = await fetch(`${SERVER_ADDR}/library_be/index.php?controller=account&action=lockUser&id=${props.accID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
      },
      body: JSON.stringify({
        "islock": status
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

  if (accountInfo) return (
    <div className='book-detail'>
      <div className="button-X" onClick={handleExitDetail}></div>
      <div className="main-detail" style={{textAlign: 'left'}}>
        <div className="member-detail">
          <b>Barcode: </b> <i>{accountInfo.barcode}</i>
        </div>
        <div className="member-detail">
          <b>Username: </b> <i>{accountInfo.username}</i>
        </div>
        <div className="member-detail">
          <b>Họ và tên: </b> <i>{accountInfo.fullname}</i>
        </div>
        <div className="member-detail">
          <b>Giới tính: </b>
          {accountInfo.gender === '0' ? 'Nam' : accountInfo.gender === '1' ? 'Nữ' : 'Khác'}
        </div>
        <div className="member-detail">
          <b>Số điện thoại: </b> <i>{accountInfo.phone}</i>
        </div><div className="member-detail">
          <b>Trạng thái: </b>
          {accountInfo.islock === '0' ? 'Bình thường' : 'Khóa'}
        </div>
        {accountInfo.islock === '1' ?
          <div className="button-box">
            <button onClick={() => handleLockAcc(0)}>Mở khóa tài khoản</button>
          </div>
          :
          <div className="button-box">
            <button onClick={() => handleLockAcc(1)}>Khóa tài khoản</button>
          </div>
        }
        <p className="response-trans-detail">{response}</p>
      </div>
    </div>
  )
  else return(
    <div className='book-detail'>
      <div className="button-X" onClick={handleExitDetail}></div>
    </div>
  )
}

export default AccountDetail