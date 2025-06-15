// src/components/ProductCard.jsx
import { Card, Button } from 'react-bootstrap';

export default function ProductCard({ product }) {
  return (
    <Card className="mb-4">
      <Card.Img variant="top" src={product.image} style={{ height: '200px', objectFit: 'cover' }} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description.slice(0, 80)}...</Card.Text>
        <Card.Text>
          <strong>Giá:</strong> {product.price.toLocaleString()}₫
        </Card.Text>
        <Button variant="primary">Thêm vào giỏ</Button>
      </Card.Body>
    </Card>
  );
}
