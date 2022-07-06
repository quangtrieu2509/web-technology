import  { useParams } from 'react-router-dom'

import ListBook from '../components/Home/ListBook';

function Home(props) {
  const { type } = useParams();

  if (!type) {
    return (
      <div style={{width: '100%'}}>
        <ListBook type={1} />
      </div>
    )
  }
}

export default Home