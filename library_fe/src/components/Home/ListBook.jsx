import { Button } from 'antd'

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
  }
]

function ListBook(props) {


  return (
    <div className="wrap-list">
      <div className='title-list'>
        <div className='name-list'>{typeList[props.type]}</div>
        <Button
          type='primary'
          className='button-list'
          style={{ height: '40px', width: '100px'}}
        >
          Xem thêm
        </Button>
      </div>
      <div className='wrap-content'>
        <div className='content-list'>
          {bookList.map(e => <BookItem img={e.img} name={e.name} />)}
        </div>
      </div>
    </div>
  )
}

export default ListBook