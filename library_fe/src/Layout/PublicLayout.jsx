import 'antd/dist/antd.min.css'
import styled from 'styled-components'
import { Layout } from 'antd'
import NavBar from '../components/NavBar'
import './layout.css'

const { Header, Content } = Layout

const HeaderStyle = styled(Header)`
  position: fixed;
  top: 0;
  padding: 0px;
  background: rgb(230, 189, 156);
  width: 100%;
  align-items: center;
  justify-content: center;
`

function PublicLayout(props) {
  return (
    <div className='public-layout' >
      <Layout style={{ background: 'none', height: '100%' }}>
        <HeaderStyle style={{ lineHeight: '0px'}}>
          <NavBar />
        </HeaderStyle>
        <Content style={{ marginTop: '64px', height: '100%' }}>
          <div className='content'>
            {props.children}
          </div>
        </Content>
      </Layout>
    </div>
  )
}

export default PublicLayout