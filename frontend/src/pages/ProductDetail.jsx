// src/pages/ProductDetail.jsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.log(err));
  }, [id]);

  if (!product) return <p>Đang tải sản phẩm...</p>;

  return (
    <Container className="mt-4">
      <Row>
        <Col md={6}>
          <img src={product.image} className="img-fluid" alt={product.name} />
        </Col>
        <Col md={6}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <h4>{product.price.toLocaleString()}₫</h4>
          <Button>Thêm vào giỏ hàng</Button>
        </Col>
      </Row>
    </Container>
  );
}
