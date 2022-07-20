import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import './librarian.css'

const readers = [
  {
      "id": "10",
      "username": "abc",
      "email": "xxx@gmail.com",
      "fullname": "Duong Trieu",
      "gender": "0",
      "phone": "0912345678",
      "islock": "0",
      "barcode": "3807678114355",
      "role": "2"
  },
  {
      "id": "12",
      "username": "abcx",
      "email": "abc@gmail.com",
      "fullname": "Duong Quang Trieu",
      "gender": "0",
      "phone": "0945736225",
      "islock": "0",
      "barcode": "8140903618524",
      "role": "2"
  },
  {
      "id": "14",
      "username": "tuan",
      "email": "email@day.nhe",
      "fullname": "Hà Nhật Tuấn",
      "gender": "0",
      "phone": "0324234",
      "islock": "0",
      "barcode": "1633569114470",
      "role": "2"
  },
  {
      "id": "15",
      "username": "nhattuan1606okabc",
      "email": "tuan.hn194399@sis.hust.edu.vn",
      "fullname": "A",
      "gender": "0",
      "phone": "123",
      "islock": "0",
      "barcode": "8747409056752",
      "role": "2"
  },
  {
      "id": "16",
      "username": "abc",
      "email": "abc@def.com",
      "fullname": "a",
      "gender": "1",
      "phone": "213",
      "islock": "0",
      "barcode": "8003353939076",
      "role": "2"
  },
  {
      "id": "17",
      "username": "tuan",
      "email": "ac@a.m",
      "fullname": "Đây là một tên dài nhé",
      "gender": "0",
      "phone": "123",
      "islock": "1",
      "barcode": "0939043587421",
      "role": "2"
  }
]

function ReaderAccount() {
  const navigate = useNavigate();
  const [ pageNum, setPageNum ] = useState(2);

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== '1') {
      navigate('/');
    }
  })

  const handleChoosePage = (p) => {
    setPageNum(p);
  }

  return (
    <div className="reader-account-page">
      <div className="title-page">Quản lí độc giả</div>
      <div className="reader-info-box">
        <div className="scrollbar-box">
          <div className="reader-info">
            <div className="reader-info-title">
              <div className="username-info middle-vertical">Username</div>
              <div className="fullname-info middle-vertical">Họ và tên</div>
              <div className="gender-info middle-vertical">Giới tính</div>
              <div className="phone-info middle-vertical">Số điện thoại</div>
            </div>
            {readers.map((e, index) =>
              <div key={index} className={index % 2 ? "reader-info-title" : "reader-info-title gray"}>
                <div className="username-info middle-vertical">{e.username}</div>
                <div className="fullname-info middle-vertical">{e.fullname}</div>
                <div className="gender-info middle-vertical">
                  {e.gender === '0' ? 'Nam' : e.gender === '1' ? 'Nữ' : 'Khác'}
                </div>
                <div className="phone-info middle-vertical">{e.phone}</div>
                <div className="islock-info middle-vertical">
                  {e.islock === '0' ?
                    <button className="lock">Khóa</button>
                    :
                    <button className="unlock">Mở khóa</button>
                  }
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="number-of-page">
          Trang:
          {pageNum === 1 ? <></> : <div className="page-number" onClick={() => handleChoosePage(pageNum - 1)}>{pageNum - 1}</div>}
          <div className="page-number selected">{pageNum}</div>
          <div className="page-number" onClick={() => handleChoosePage(pageNum + 1)}>{pageNum + 1}</div>
        </div>
      </div>
    </div>
  )
}

export default ReaderAccount