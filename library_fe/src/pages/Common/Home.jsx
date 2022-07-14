import  { useParams } from 'react-router-dom';
import { useState } from 'react';
// import {
//   ControlOutlined
// } from '@ant-design/icons'

import MiniListBook from '../../components/Home/MiniListBook';
import ListBook from '../../components/Home/ListBook';

const categoryList = ['Tiểu thuyết', 'Truyện tranh', 'Khoa học', 'Viễn tưởng', 'Học thuật'];

function Home(props) {
  const { type, param } = useParams();
  const [ filter, setFilter ] = useState('');
  // console.log(type);
  // console.log(param);

  const handleFilter = () => {
    setFilter(document.getElementById('author-input').value);
    console.log(document.getElementById('author-input').value);
    document.getElementById('filter-box').classList.add('close-filter');
  }

  if (!type || type === 'search' || type === 'type') {
    return (
      <div className='home'>
        <div className='main'>
          {!type ?
            <>
              <MiniListBook type={0} />
              <MiniListBook type={1} />
            </>
            :
            // <div style={{ color: 'white' }}>{param}</div>
            type === 'type' ?
            <ListBook type={Number(param)} filter={filter}/>
            :
            <ListBook search={param} filter={filter}/>
          }
        </div>
        <div className='filter'>
          <div id='filter-box' className='filter-box close-filter'>
            <div className='filter-title'>Bộ lọc</div>
            <div className='filter-item'>
              Thể loại
              {/* <div className='filter-item-title'>Thể loại</div> */}
              <div className='grid-container'>
                {categoryList.map((e, index) =>
                  <div key={index} className='box-checkbox'>
                    <input
                      className="input-checkbox"
                      type="checkbox"
                    // checked={index === check}
                    // onChange={() => setCheck(index)}
                    />
                    {e}
                  </div>
                )}
              </div>
            </div>
            <div className='line'></div>
            <div className='filter-item'>
              Số trang
              <div className='minmax-input'>
                <input type="number" />
                <p>-</p>
                <input type='number' />
              </div>
            </div>
            <div className='line'></div>
            <div className='filter-item'>
              Năm xuất bản
              <div className='minmax-input'>
                <input type="number" />
                <p>-</p>
                <input type='number' />
              </div>
            </div>
            <div className='line'></div>
            <div className='filter-item'>
              Tác giả
              <br />
              <input id='author-input' className='input-full' placeholder='Nhập tên tác giả' />
            </div>
            <button className='button-submit' onClick={handleFilter}>Lọc</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Home