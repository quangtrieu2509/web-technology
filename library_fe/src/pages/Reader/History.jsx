import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { SERVER_ADDR } from '../../api/serverAddr'
import TransactionDetail from "../../components/Librarian/TransactionDetail";

// const transactions = [
//   {
//       "transactionid": "192673494653067",
//       "userid": "10",
//       "booktitleid": "4",
//       "bookid": "661971205901148",
//       "transactiondate": "2022-07-13",
//       "returndate": "2022-07-20",
//       "isreturn": "0",
//       "username": "abc"
//   },
//   {
//       "transactionid": "392275749113600",
//       "userid": "10",
//       "booktitleid": "4",
//       "bookid": "661971205901148",
//       "transactiondate": "2022-07-13",
//       "returndate": "2022-07-27",
//       "isreturn": "0",
//       "username": "abc"
//   },
//   {
//       "transactionid": "783552453378040",
//       "userid": "10",
//       "booktitleid": "4",
//       "bookid": "695806144199077",
//       "transactiondate": "2022-07-13",
//       "returndate": "2022-07-20",
//       "isreturn": "1",
//       "username": "abc"
//   }
// ]

function History() {
  const navigate = useNavigate();
  const [ pageNum, setPageNum ] = useState(1);
  const [ transactions, setTransactions ] = useState(null);
  const [ transID, setTransID ] = useState(0);

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== '2') {
      navigate('/');
    }

    const getAllTransaction = async () => {
      const data = await fetch(`${SERVER_ADDR}/library_be/index.php?controller=transaction&action=getOwnerTransaction&pageSize=11&&page=${pageNum}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        }
      });
  
      const res = await data.json();
      setTransactions(await res);
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

  const handleSeeDetail = (id) => {
    document.getElementById('detail').classList.remove('hidden');
    setTransID(id);
  }

  if (transactions) return (
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
            {transactions.data.map((e, index) =>
              <div 
                key={index} 
                className={index % 2 ? "history-title" : "history-title gray"}
                onClick={() => handleSeeDetail(e.transactionid)}
              >
                <div className="bookname middle-vertical">{e.bookname}</div>
                <div className="transactiondate middle-vertical">{e.transactiondate}</div>
                <div className="returndate middle-vertical">{e.returndate}</div>
                <div className="isreturn middle-vertical">
                  {e.isreturn === '1' ? 'Chưa trả' : 'Đã trả'}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="number-of-page">
          Trang:
          <button className="btn-number-page" onClick={handleJumpFirstPage}>Về trang đầu</button>
          {pageNum === 1 || pageNum > transactions.pages + 1 ? <></> : <div className="page-number btn-number-page" onClick={() => handleChoosePage(pageNum - 1)}>{pageNum - 1}</div>}
          <div className="page-number selected">{pageNum}</div>
          {pageNum >= transactions.pages ? <></> : <div className="page-number btn-number-page" onClick={() => handleChoosePage(pageNum + 1)}>{pageNum + 1}</div>}
          <input id="page-num-jump" type='number' placeholder="Nhập trang muốn đến" />
          <button className="btn-number-page btn2" onClick={handleJumpPage}>Đi</button>
        </div>
      </div>
      <div id='detail' className='wrap-book-detail hidden'>
        <TransactionDetail transID={transID}/>
      </div>
    </div>
  )
  else return (<></>)
}

export default History