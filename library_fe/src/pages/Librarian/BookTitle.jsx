import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import './librarian.css'
import { SERVER_ADDR } from "../../api/serverAddr";

const categoryList = ['Tiểu thuyết', 'Truyện tranh', 'Kinh tế', 'Chính trị', 'Tâm lý', 'Kĩ năng sống', 'Tình cảm', 'Khoa học'];

function BookTitle() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [ checked, setChecked ] = useState([]);
  const [ response, setResponse ] = useState('');
  const [ detail, setDetail ] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== '1') {
      navigate('/');
    }

    const getDetail = async () => {
      const data = await fetch(`${SERVER_ADDR}/library_be/index.php?controller=booktitle&action=findById&id=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        }
      });
  
      const res = await data.json();
      if (typeof res !== 'string') {
        setDetail(await res);
      } else {
        setResponse(await res);
      }
      // console.log(res);
    }

    if (id) {
      getDetail();
    }
  }, [navigate, id]);

  var bookname, pages, publishyear, description, picture, author, category;
  const CheckValidate = () => {
    let flag = true;

    bookname = document.getElementById('bookname').value;
    let warning = document.getElementById('warning1');
    if (!bookname) {
      warning.classList.remove('hidden');
      flag = false;
    }
    else warning.classList.add('hidden');

    description = document.getElementById('description').value;
    warning = document.getElementById('warning2');
    if (!description) {
      warning.classList.remove('hidden');
      flag = false;
    }
    else warning.classList.add('hidden');

    picture = document.getElementById('picture').value;
    warning = document.getElementById('warning3');
    if (!picture) {
      warning.classList.remove('hidden');
      flag = false;
    }
    else warning.classList.add('hidden');

    let author_tmp = document.getElementById('author').value;
    warning = document.getElementById('warning4');
    if (!author_tmp) {
      warning.classList.remove('hidden');
      flag = false;
    }
    else {
      author = author_tmp.split(', ');
      warning.classList.add('hidden');
    }

    publishyear = document.getElementById('publishyear').value;
    warning = document.getElementById('warning5');
    if (!publishyear) {
      warning.classList.remove('hidden');
      flag = false;
    }
    else warning.classList.add('hidden');

    pages = document.getElementById('pages').value;
    warning = document.getElementById('warning6');
    if (!pages) {
      warning.classList.remove('hidden');
      flag = false;
    }
    else warning.classList.add('hidden');

    warning = document.getElementById('warning7');
    if (checked.length === 0) {
      warning.classList.remove('hidden');
      flag = false;
    }
    else {
      warning.classList.add('hidden');
      category = [];
      checked.map((e) => category.push(categoryList[e]));
    }

    return flag;
  }

  const HandleCreateBookTitle = async () => {
    if (CheckValidate()) {
      const data = await fetch(`${SERVER_ADDR}/library_be/index.php?controller=booktitle&action=create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        },
        body: JSON.stringify({
          bookname,
          pages,
          publishyear,
          description,
          picture,
          author,
          category
        })
      });
  
      const res = await data.json();
      setResponse(await res);

      setTimeout(() => {
        setResponse('');
      }, 2000)
      console.log(res);
    }
  }

  const HandleModifyBookTitle = async () => {
    if (CheckValidate()) {
      const data = await fetch(`${SERVER_ADDR}/library_be/index.php?controller=booktitle&action=update&id=${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        },
        body: JSON.stringify({
          bookname,
          pages,
          publishyear,
          description,
          picture,
          author,
          category
        })
      });
  
      const res = await data.json();
      setResponse(await res);

      setTimeout(() => {
        setResponse('');
      }, 2000)
      console.log(res);
    }
  }

  const HandleSelect = (index) => {
    if (checked.includes(index)) {
      setChecked(prev => prev.filter(e => e !== index));
    }
    else setChecked(prev => [...prev, index]);
  }

  return (
    <div className="book-title-page">
      <div className="title-page">Quản lí đầu sách</div>
      <div className="add-book-box">
        <div className="add-book-member">
          <p>Tên sách:</p>
          <input id="bookname" placeholder="Nhập tên sách" defaultValue={detail ? detail.bookname : ''} />
        </div>
        <p id="warning1" className="warning hidden">Cần nhập tên sách</p>
        <div className="add-book-member">
          <p>Mô tả:</p>
          <textarea id="description" placeholder="Nhập mô tả nội dung sách" defaultValue={detail ? detail.description : ''} />
        </div>
        <p id="warning2" className="warning hidden">Cần nhập mô tả</p>
        <div className="add-book-member">
          <p>Ảnh:</p>
          <input id="picture" placeholder="Nhập đường dẫn ảnh" defaultValue={detail ? detail.picture : ''} />
        </div>
        <p id="warning3" className="warning hidden">Cần nhập đường dẫn ảnh</p>
        <div className="add-book-member">
          <p>Tác giả:</p>
          <input 
            id="author" 
            placeholder="Nhập tác giả" 
            defaultValue={detail ? detail.author.map((e, index) => index === detail.author.length - 1 ? `${e}` : `${e}, `) : ''} 
          />
        </div>
        <div className="add-book-note">Nếu có nhiều tác giả thì nhập cách nhau bởi ", " (VD: Abc, Def, Ghi)</div>
        <p id="warning4" className="warning hidden">Cần nhập tác giả</p>
        <div className="add-book-member">
          <p>Năm xuất bản:</p>
          <input id="publishyear" type='number' placeholder="Nhập năm xuất bản" defaultValue={detail ? detail.publishyear : ''} />
        </div>
        <p id="warning5" className="warning hidden">Cần nhập năm xuất bản</p>
        <div className="add-book-member">
          <p>Số trang:</p>
          <input id="pages" type='number' placeholder="Nhập số trang" defaultValue={detail ? detail.pages : ''} />
        </div>
        <p id="warning6" className="warning hidden">Cần nhập số trang</p>
        <div className="add-book-member">
          <p>Thể loại:</p>
          <div className="grid-container-category">
            {categoryList.map((e, index) =>
              <div key={index} className='box-checkbox-add-book'>
                <input type="checkbox" className="checkbox-add-book" onChange={() => HandleSelect(index)}/>
                {e}
              </div>
            )}
          </div>
        </div>
        <p id="warning7" className="warning hidden">Cần chọn ít nhất 1 thể loại</p>
        <p className="response">{response}</p>
      </div>
      {id ?
        <button onClick={HandleModifyBookTitle}>Chỉnh sửa</button>
        :
        <button onClick={HandleCreateBookTitle}>Thêm đầu sách</button>
      }
    </div>
  )
}

export default BookTitle