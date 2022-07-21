import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import './librarian.css'
import AccountDetail from "../../components/Librarian/AccountDetail"
import { SERVER_ADDR } from '../../api/serverAddr'

function ReaderAccount() {
  const navigate = useNavigate();
  const [ pageNum, setPageNum ] = useState(1);
  const [ readers, setReaders ] = useState({data: []});
  const [ accID, setAccID ] = useState(0);

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== '1') {
      navigate('/');
    }

    const getAllUser = async () => {
      const data = await fetch(`${SERVER_ADDR}/library_be/index.php?controller=account&pageSize=11&page=${pageNum}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        }
      });
  
      const res = await data.json();
      setReaders(await res);
      console.log(res);
    }

    getAllUser();
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

  const handleSearchReader = async () => {
    let search = document.getElementById('reader-search-input').value;
    let type = document.getElementById('reader-search-type').value;
    const data = await fetch(`${SERVER_ADDR}/library_be/index.php?controller=account${search === '' ? '' : `&action=search&${type === '1' ? `username=${search}` : type === '2' ? `fullName=${search}` : `barcode=${search}`}`}&pageSize=11&&page=${pageNum}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
      }
    });

    const res = await data.json();
    setReaders(await res);
    console.log(res);
  }

  const handleSeeDetail = (id) => {
    document.getElementById('detail').classList.remove('hidden');
    setAccID(id);
  }

  return (
    <div className="reader-account-page">
      <div className="title-page">Quản lí độc giả</div>
      <div className="transaction-manage-search">
        <input id="reader-search-input" placeholder="Tìm kiếm độc giả"/>
        <div>
          Tìm theo:
          <select id="reader-search-type">
            <option value="1">Username</option>
            <option value="2">Họ tên</option>
            <option value="3">Mã Code</option>
          </select>
          <button onClick={handleSearchReader}>Tìm</button>
        </div>
      </div>
      <div className="reader-info-box">
        <div className="scrollbar-box">
          <div className="reader-info">
            <div className="reader-info-title">
              <div className="username-info middle-vertical">Username</div>
              <div className="fullname-info middle-vertical">Họ và tên</div>
              <div className="gender-info middle-vertical">Giới tính</div>
              <div className="phone-info middle-vertical">Số điện thoại</div>
              <div className="islock-info middle-vertical">Trạng thái</div>
            </div>
            {readers.data.map((e, index) =>
              <div 
                key={index} 
                className={index % 2 ? "reader-info-title" : "reader-info-title gray"}
                onClick={() => handleSeeDetail(e.id)}
              >
                <div className="username-info middle-vertical">{e.username}</div>
                <div className="fullname-info middle-vertical">{e.fullname}</div>
                <div className="gender-info middle-vertical">
                  {e.gender === '0' ? 'Nam' : e.gender === '1' ? 'Nữ' : 'Khác'}
                </div>
                <div className="phone-info middle-vertical">{e.phone}</div>
                <div className="islock-info middle-vertical">
                  {e.islock === '0' ? 'Bình thường' : 'Khóa'}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="number-of-page">
          Trang:
          <button className="btn-number-page" onClick={handleJumpFirstPage}>Về trang đầu</button>
          {pageNum === 1 || pageNum > readers.pages + 1 ? <></> : <div className="page-number btn-number-page" onClick={() => handleChoosePage(pageNum - 1)}>{pageNum - 1}</div>}
          <div className="page-number selected">{pageNum}</div>
          {pageNum >= readers.pages ? <></> : <div className="page-number btn-number-page" onClick={() => handleChoosePage(pageNum + 1)}>{pageNum + 1}</div>}
          <input id="page-num-jump" type='number' placeholder="Nhập trang muốn đến" />
          <button className="btn-number-page btn2" onClick={handleJumpPage}>Đi</button>
        </div>
      </div>
      <div id='detail' className='wrap-book-detail hidden'>
        <AccountDetail accID={accID}/>
      </div>
    </div>
  )
}

export default ReaderAccount