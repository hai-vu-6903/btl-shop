// src/components/layout/MainLayout.jsx
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { Container } from 'react-bootstrap';

export default function MainLayout() {
  return (
    <>
      <Header />
      <Container style={{ paddingLeft: '100px', paddingRight: '100px', paddingTop: '80px' }}>
        <Outlet />
      </Container>
      <Footer />
    </>
  );
}
