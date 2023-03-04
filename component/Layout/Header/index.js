import React from 'react'
import { Layout, Space } from 'antd';
function Header() {
  const { Header, Footer, Sider, Content } = Layout;
  const headerStyle = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 50,
    lineHeight: '64px',
    backgroundColor: '#7dbcea',
  };
  return (
   <Header style={headerStyle}>INi header</Header>
  )
}

export default Header