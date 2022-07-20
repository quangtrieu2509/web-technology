import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const transaction = [
  {
      "transactionid": "192673494653067",
      "userid": "10",
      "booktitleid": "4",
      "bookid": "661971205901148",
      "transactiondate": "2022-07-13",
      "returndate": "2022-07-20",
      "isreturn": "0",
      "username": "abc"
  },
  {
      "transactionid": "392275749113600",
      "userid": "10",
      "booktitleid": "4",
      "bookid": "661971205901148",
      "transactiondate": "2022-07-13",
      "returndate": "2022-07-27",
      "isreturn": "0",
      "username": "abc"
  }
]

function TransactionManage() {
  const navigate = useNavigate();
  const [ pageNum, setPageNum ] = useState(1);

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== '1') {
      navigate('/');
    }
  });

  const handleChoosePage = (p) => {
    setPageNum(p);
  }

  return (
    <div className="transaction-manage-page">
      <div className="title-page">Quản lí mượn trả</div>
      <div className="transaction-manage-search">
        <input placeholder="Tìm kiếm lượt mượn trả"/>
        Tìm theo:
        <select id="search-type">
          <option value="transactionID">TransactionID</option>
          <option value="username">Username</option>
          <option value="bookID">BookID</option>
        </select>
      </div>
      <div className="transaction-info-box">
        <div className="scrollbar-box">
          <div className="transaction-info"></div>
        </div>
      </div>
      <div className="number-of-page">
        Trang:
        {pageNum === 1 ? <></> : <div className="page-number" onClick={() => handleChoosePage(pageNum - 1)}>{pageNum - 1}</div>}
        <div className="page-number selected">{pageNum}</div>
        <div className="page-number" onClick={() => handleChoosePage(pageNum + 1)}>{pageNum + 1}</div>
      </div>
    </div>
  )
}

export default TransactionManage