import { useNavigate } from 'react-router-dom'
import { useState } from 'react';

import './home.css'
import BookItem from './BookItem'
import BookDetail from './BookDetail';

const typeList = [
  "Đang hot",
  "Mới ra mắt"
]

const bookList = [
  {
    booktitleid: 10,
    picture: 'https://books.google.com/books/publisher/content/images/frontcover/kID4DwAAQBAJ?fife=w400-h600',
    bookname: 'Coffret Les Enquêtes de Lacey Doyle : La Mort et le Chien (Tome 2) et Crime au Café (Tome 3)'
  },
  {
    booktitleid: 1,
    picture: 'https://books.google.com/books/publisher/content/images/frontcover/1K_CDwAAQBAJ?fife=w400-h600',
    bookname: 'The Tell-Tale Heart'
  },
  {
    booktitleid: 1,
    picture: 'https://books.google.com/books/publisher/content/images/frontcover/RX-7CwAAQBAJ?fife=w400-h600',
    bookname: 'Conan: Membongkar Kedok Black Organization'
  },
  {
    booktitleid: 1,
    picture: 'https://books.google.com/books/publisher/content/images/frontcover/HD_3DwAAQBAJ?fife=w400-h600',
    bookname: 'The secrets of the Haunted House: Part 1 - The innocent wife'
  },
  {
    booktitleid: 1,
    picture: 'https://books.google.com/books/publisher/content/images/frontcover/lK_CDwAAQBAJ?fife=w400-h600',
    bookname: 'The Cask of Amontillado'
  },
  {
    booktitleid: 1,
    picture: 'https://books.google.com/books/publisher/content/images/frontcover/lK_CDwAAQBAJ?fife=w400-h600',
    bookname: 'The Cask of Amontillado'
  },
  {
    booktitleid: 1,
    picture: 'https://books.google.com/books/publisher/content/images/frontcover/lK_CDwAAQBAJ?fife=w400-h600',
    bookname: 'The Cask of Amontillado'
  },
  {
    booktitleid: 1,
    picture: 'https://cdn0.fahasa.com/media/catalog/product/n/g/nguoncoi.jpg',
    bookname: 'Nguồn cội'
  },
  {
    booktitleid: 1,
    picture: 'https://cdn0.fahasa.com/media/catalog/product/n/g/nguoncoi.jpg',
    bookname: 'Nguồn cội'
  },
  {
    booktitleid: 1,
    picture: 'https://cdn0.fahasa.com/media/catalog/product/n/g/nguoncoi.jpg',
    bookname: 'Nguồn cội'
  },
  {
    booktitleid: 1,
    picture: 'https://cdn0.fahasa.com/media/catalog/product/9/7/9786048400101_3.jpg',
    bookname: 'Little Stories - To Make You A Good Person'
  },
  {
    booktitleid: 1,
    picture: 'https://cdn0.fahasa.com/media/catalog/product/9/7/9786048400101_3.jpg',
    bookname: 'Little Stories - To Make You A Good Person'
  }
]

function MiniListBook(props) {
  const navigate = useNavigate();
  const [ bookID, setBookID ] = useState(0);

  const handleMore = () => {
    navigate(`/type=${props.type}`);
  }

  const handleSeeDetail = (e) => {
    document.getElementById('detail').classList.remove('hidden');
    setBookID(e.currentTarget.attributes.bookid.nodeValue);
  }

  return (
    <div className="wrap-list">
      <div className='title-list'>
        <div className='name-list'>{typeList[props.type]}</div>
        <button className='button-list' onClick={handleMore}>Xem thêm</button>
      </div>
      <div className='content-list'>
        {bookList.map((e, index) => 
          <div 
            key={index} 
            className='wrap-item' 
            onClick={handleSeeDetail} 
            bookid={e.booktitleid}
          >
            <BookItem
              img={e.picture}
              name={e.bookname}
            />
          </div>
        )}
      </div>
      <div id='detail' className='wrap-book-detail hidden'>
        <BookDetail bookID={bookID} />
      </div>
    </div>
  )
}

export default MiniListBook