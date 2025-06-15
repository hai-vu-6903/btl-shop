// frontend/src/pages/ProductDetail.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Button, Image } from 'react-bootstrap';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`).then(res => setProduct(res.data));
  }, [id]);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const exist = cart.find(item => item.id === product.id);
    if (exist) {
      exist.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Đã thêm vào giỏ hàng');
  };

  if (!product) return <p>Đang tải...</p>;

  return (
    <Container className="mt-4">
      <h2>{product.name}</h2>
      <Image src={product.image} width={300} />
      <p>{product.description}</p>
      <h4>Giá: {product.price.toLocaleString()}₫</h4>
      <Button onClick={handleAddToCart}>Thêm vào giỏ</Button>
    </Container>
  );
}
