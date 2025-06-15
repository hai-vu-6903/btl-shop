// src/pages/Cart.jsx
import { useEffect, useState } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import axios from 'axios';

export default function Cart() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:5000/api/cart', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setItems(res.data))
    .catch(err => console.log(err));
  }, []);

  const handleOrder = () => {
  const token = localStorage.getItem('token');
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const orderItems = items.map(i => ({
    product_id: i.product_id,
    quantity: i.quantity,
    price: i.price,
  }));

  axios.post('http://localhost:5000/api/orders', {
    items: orderItems,
    total_price: total
  }, {
    headers: { Authorization: `Bearer ${token}` }
  }).then(() => {
    alert("Đặt hàng thành công!");
    window.location.reload();
  });
};


  return (
    <Container className="mt-4">
      <h2>Giỏ hàng</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Sản phẩm</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Thành tiền</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.price.toLocaleString()}₫</td>
              <td>{item.quantity}</td>
              <td>{(item.price * item.quantity).toLocaleString()}₫</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="success" onClick={handleOrder}>Đặt hàng</Button>

    </Container>
  );
}
