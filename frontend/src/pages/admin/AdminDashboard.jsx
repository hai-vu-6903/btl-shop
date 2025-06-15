import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/stats')
      .then(res => setStats(res.data))
      .catch(err => {
        console.error('Lỗi khi lấy dữ liệu thống kê:', err);
        setError('Không thể tải dữ liệu thống kê từ máy chủ.');
      })
      .finally(() => setLoading(false));
  }, []);

  const items = [
    { title: 'Sản phẩm', value: stats.products },
    { title: 'Đơn hàng', value: stats.orders },
    { title: 'Người dùng', value: stats.users },
    {
      title: 'Doanh thu (₫)',
      value: typeof stats.revenue === 'number' ? stats.revenue.toLocaleString() : 0
    },
  ];

  return (
    <Container className="mt-4">
      <h3 className="mb-4">Tổng quan quản trị</h3>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Đang tải dữ liệu...</p>
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Row>
          {items.map((item, i) => (
            <Col key={i} md={3}>
              <Card className="mb-3 shadow-sm">
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text style={{ fontSize: '1.5rem' }}>
                    {item.value}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
