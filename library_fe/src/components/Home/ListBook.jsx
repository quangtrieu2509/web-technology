import { useEffect, useState } from 'react'

import './home.css'
import BookItem from './BookItem'
import BookDetail from './BookDetail';
import { SERVER_ADDR } from '../../api/serverAddr'

const typeList = [
  "Đang hot",
  "Mới ra mắt"
]

// const bookList = [
//   {
//     booktitleid: 1,
//     picture: 'https://books.google.com/books/publisher/content/images/frontcover/lK_CDwAAQBAJ?fife=w400-h600',
//     bookname: 'The Cask of Amontillado'
//   },
//   {
//     booktitleid: 2,
//     picture: 'https://books.google.com/books/publisher/content/images/frontcover/lK_CDwAAQBAJ?fife=w400-h600',
//     bookname: 'The Cask of Amontillado'
//   },
//   {
//     booktitleid: 2,
//     picture: 'https://books.google.com/books/publisher/content/images/frontcover/lK_CDwAAQBAJ?fife=w400-h600',
//     bookname: 'The Cask of Amontillado'
//   },
//   {
//     booktitleid: 2,
//     picture: 'https://books.google.com/books/publisher/content/images/frontcover/kID4DwAAQBAJ?fife=w400-h600',
//     bookname: 'Coffret Les Enquêtes de Lacey Doyle : La Mort et le Chien (Tome 2) et Crime au Café (Tome 3)'
//   },
//   {
//     booktitleid: 2,
//     picture: 'https://books.google.com/books/publisher/content/images/frontcover/1K_CDwAAQBAJ?fife=w400-h600',
//     bookname: 'The Tell-Tale Heart'
//   },
//   {
//     booktitleid: 2,
//     picture: 'https://books.google.com/books/publisher/content/images/frontcover/RX-7CwAAQBAJ?fife=w400-h600',
//     bookname: 'Conan: Membongkar Kedok Black Organization'
//   },
//   {
//     booktitleid: 2,
//     picture: 'https://books.google.com/books/publisher/content/images/frontcover/HD_3DwAAQBAJ?fife=w400-h600',
//     bookname: 'The secrets of the Haunted House: Part 1 - The innocent wife'
//   }
// ]

function ListBook(props) {
  const [ bookList, setBookList ] = useState({data: []});
  const [ bookID, setBookID ] = useState(0);

  useEffect(() => {
    // console.log('re-render');
    // console.log(props.type);

    const fetchData = async () => {
      console.log(`${SERVER_ADDR}/library_be/index.php?controller=booktitle&action=search${props.search ? `&bookName=${props.search}` : ''}${props.filter.minPage ? `&pageMin=${props.filter.minPage}` : ''}${props.filter.maxPage ? `&pageMax=${props.filter.maxPage}` : ''}${props.filter.minYear ? `&yearMin=${props.filter.minYear}` : ''}${props.filter.maxYear ? `&yearMax=${props.filter.maxYear}` : ''}${props.filter.author ? `&author=${props.filter.author}` : ''}`);
      
      const data = await fetch(`${SERVER_ADDR}/library_be/index.php?controller=booktitle&action=search${props.search ? `&bookName=${props.search}` : ''}${props.filter.minPage ? `&pageMin=${props.filter.minPage}` : ''}${props.filter.maxPage ? `&pageMax=${props.filter.maxPage}` : ''}${props.filter.minYear ? `&yearMin=${props.filter.minYear}` : ''}${props.filter.maxYear ? `&yearMax=${props.filter.maxYear}` : ''}${props.filter.author ? `&author=${props.filter.author}` : ''}`);
      
      const res = await data.json();
      console.log(res);
      setBookList(await res);
      // console.log(data);
    }
    fetchData();
  }, [props.filter, props.search, props.type])

  const handleSeeDetail = (e) => {
    document.getElementById('detail').classList.remove('hidden');
    setBookID(e.currentTarget.attributes.bookid.nodeValue);
  }

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
        {bookList.data.map((e, index) => 
          <div key={index} className='wrap-item' onClick={handleSeeDetail} bookid={e.booktitleid}>
            <BookItem
              img={e.picture}
              name={e.bookname}
            />
          </div>
        )}
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div id='detail' className='wrap-book-detail hidden'>
        <BookDetail bookID={bookID} />
      </div>
    </div>
  )
}

export default ListBook