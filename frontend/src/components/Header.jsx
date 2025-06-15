import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { isAdmin, getUser } from '../utils/auth';

export default function Header() {
  const user = getUser();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">🍷 WineShop</Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/">Trang chủ</Nav.Link>
          <Nav.Link as={Link} to="/products">Sản phẩm</Nav.Link>
          <Nav.Link as={Link} to="/cart">🛒 Giỏ hàng</Nav.Link>

          {isAdmin() && (
            <>
              <Nav.Link as={Link} to="/admin/products">QL Sản phẩm</Nav.Link>
              <Nav.Link as={Link} to="/admin/orders">QL Đơn hàng</Nav.Link>
              <Nav.Link as={Link} to="/admin/catalogs">QL Danh mục</Nav.Link>
            </>
          )}

          {user ? (
            <>
              <Nav.Link disabled>👤 {user.name}</Nav.Link>
              <Button variant="outline-light" size="sm" onClick={handleLogout}>Đăng xuất</Button>
            </>
          ) : (
            <Nav.Link as={Link} to="/login">Đăng nhập</Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
