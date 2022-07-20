import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const transactions = [
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
  },
  {
      "transactionid": "783552453378040",
      "userid": "10",
      "booktitleid": "4",
      "bookid": "695806144199077",
      "transactiondate": "2022-07-13",
      "returndate": "2022-07-20",
      "isreturn": "1",
      "username": "abc"
  }
]

function History() {
  const navigate = useNavigate();
  const [ pageNum, setPageNum ] = useState(2);

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== '2') {
      navigate('/');
    }
  })

  const handleChoosePage = (p) => {
    setPageNum(p);
  }

  return (
    <div className="history-page">
      <div className="title-page">Lịch sử mượn</div>
      <div className="history-box">
        <div className="scrollbar-box">
          <div className="history-info">
            <div className="history-title">
              <div className="bookname middle-vertical">Tên sách</div>
              <div className="transactiondate middle-vertical">Ngày mượn</div>
              <div className="returndate middle-vertical">Ngày trả dự kiến</div>
              <div className="isreturn middle-vertical">Trạng thái</div>
            </div>
            {transactions.map((e, index) =>
              <div key={index} className={index % 2 ? "history-title" : "history-title gray"}>
                <div className="bookname middle-vertical">{e.booktitleid}</div>
                <div className="transactiondate middle-vertical">{e.transactiondate}</div>
                <div className="returndate middle-vertical">{e.returndate}</div>
                <div className="isreturn middle-vertical">
                  {e.isreturn === '0' ? 'Chưa trả' : 'Đã trả'}
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

export default History