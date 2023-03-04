import React from 'react'
import { Layout } from 'antd';
function Footer() {
  const { Header, Footer, Sider, Content } = Layout;
  const footerStyle = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#7dbcea',
  };
  return (
    <Footer style={footerStyle}>Footer</Footer>
  )
}

export default Footer