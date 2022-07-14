import { useNavigate } from 'react-router-dom'

import './home.css'
import BookItem from './BookItem'

const typeList = [
  "Đang hot",
  "Mới ra mắt"
]

const bookList = [
  {
    img: 'https://books.google.com/books/publisher/content/images/frontcover/kID4DwAAQBAJ?fife=w400-h600',
    name: 'Coffret Les Enquêtes de Lacey Doyle : La Mort et le Chien (Tome 2) et Crime au Café (Tome 3)'
  },
  {
    img: 'https://books.google.com/books/publisher/content/images/frontcover/1K_CDwAAQBAJ?fife=w400-h600',
    name: 'The Tell-Tale Heart'
  },
  {
    img: 'https://books.google.com/books/publisher/content/images/frontcover/RX-7CwAAQBAJ?fife=w400-h600',
    name: 'Conan: Membongkar Kedok Black Organization'
  },
  {
    img: 'https://books.google.com/books/publisher/content/images/frontcover/HD_3DwAAQBAJ?fife=w400-h600',
    name: 'The secrets of the Haunted House: Part 1 - The innocent wife'
  },
  {
    img: 'https://books.google.com/books/publisher/content/images/frontcover/lK_CDwAAQBAJ?fife=w400-h600',
    name: 'The Cask of Amontillado'
  },
  {
    img: 'https://books.google.com/books/publisher/content/images/frontcover/lK_CDwAAQBAJ?fife=w400-h600',
    name: 'The Cask of Amontillado'
  },
  {
    img: 'https://books.google.com/books/publisher/content/images/frontcover/lK_CDwAAQBAJ?fife=w400-h600',
    name: 'The Cask of Amontillado'
  },
  {
    img: 'https://cdn0.fahasa.com/media/catalog/product/n/g/nguoncoi.jpg',
    name: 'Nguồn cội'
  },
  {
    img: 'https://cdn0.fahasa.com/media/catalog/product/n/g/nguoncoi.jpg',
    name: 'Nguồn cội'
  },
  {
    img: 'https://cdn0.fahasa.com/media/catalog/product/n/g/nguoncoi.jpg',
    name: 'Nguồn cội'
  },
  {
    img: 'https://cdn0.fahasa.com/media/catalog/product/9/7/9786048400101_3.jpg',
    name: 'Little Stories - To Make You A Good Person'
  },
  {
    img: 'https://cdn0.fahasa.com/media/catalog/product/9/7/9786048400101_3.jpg',
    name: 'Little Stories - To Make You A Good Person'
  }
]

function MiniListBook(props) {
  const navigate = useNavigate();
  const handleMore = () => {
    navigate(`/type=${props.type}`);
  }

  return (
    <div className="wrap-list">
      <div className='title-list'>
        <div className='name-list'>{typeList[props.type]}</div>
        <button className='button-list' onClick={handleMore}>Xem thêm</button>
      </div>
      <div className='content-list'>
        {bookList.map((e, index) => <BookItem key={index} img={e.img} name={e.name} />)}
      </div>
    </div>
  )
}

export default MiniListBook