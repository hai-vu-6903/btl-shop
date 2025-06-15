// src/pages/admin/AdminLayout.jsx
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { isAdmin } from '../../utils/auth';

export default function AdminLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin()) {
      alert('Không có quyền truy cập admin');
      navigate('/');
    }
  }, []);

  return (
    <Container fluid className="mt-3">
      <Row>
        <Col md={2} className="bg-light vh-100 p-3">
          <h5>Quản trị</h5>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/admin/products">Sản phẩm</Nav.Link>
            <Nav.Link as={Link} to="/admin/orders">Đơn hàng</Nav.Link>
            <Nav.Link as={Link} to="/admin/catalogs">Danh mục</Nav.Link>
          </Nav>
        </Col>
        <Col md={10}>
          <Outlet /> {/* nơi render các trang con */}
        </Col>
      </Row>
    </Container>
  );
}
