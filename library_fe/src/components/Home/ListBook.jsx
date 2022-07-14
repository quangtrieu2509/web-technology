
import './home.css'
import BookItem from './BookItem'
import { useEffect } from 'react'

const typeList = [
  "Đang hot",
  "Mới ra mắt"
]

const bookList = [
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
  }
]

function ListBook(props) {
  useEffect(() => {
    console.log('re-render');
    console.log(props.type);
  })

  return (
    <div className="wrap-list">
      <div className='title-list'>
        {
          props.type || props.type === 0 ?
          <div className='name-list'>{typeList[props.type]}</div>
          :
          <div className='name-list'>Tìm kiếm cho {props.search}</div>
        }
      </div>
      <div className='content-list'>
        {bookList.map((e, index) => <BookItem key={index} img={e.img} name={e.name} />)}
      </div>
    </div>
  )
}

export default ListBook