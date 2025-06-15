// src/components/ProductCard.jsx
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleDetail = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <Card className="mb-4">
      <Card.Img variant="top" src={product.image} style={{ height: '200px', objectFit: 'cover' }} onClick={handleDetail} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description.slice(0, 80)}...</Card.Text>
        <Card.Text>
          <strong>Giá:</strong> {product.price.toLocaleString()}₫
        </Card.Text>
        <Button variant="primary" onClick={handleDetail}>Xem chi tiết</Button>
      </Card.Body>
    </Card>
  );
}
