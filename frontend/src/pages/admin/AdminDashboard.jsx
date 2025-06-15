import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
    revenue: 0
  });

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/stats')
      .then(res => setStats(res.data));
  }, []);

  const items = [
    { title: 'Sản phẩm', value: stats.products },
    { title: 'Đơn hàng', value: stats.orders },
    { title: 'Người dùng', value: stats.users },
    { title: 'Doanh thu (₫)', value: stats.revenue.toLocaleString() }
  ];

  return (
    <Container className="mt-4">
      <h3>Tổng quan quản trị</h3>
      <Row>
        {items.map((item, i) => (
          <Col key={i} md={3}>
            <Card className="mb-3 shadow-sm">
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text style={{ fontSize: '1.5rem' }}>{item.value}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
