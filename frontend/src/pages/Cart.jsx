// frontend/src/pages/CartPage.jsx
import { useState } from 'react';
import { Container, Table, Button } from 'react-bootstrap';

export default function CartPage() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleRemove = (id) => {
    const updated = cart.filter(item => item.id !== id);
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const handleOrder = () => {
    alert('Chức năng đặt hàng sẽ kết nối backend sau');
  };

  return (
    <Container className="mt-4">
      <h2>Giỏ hàng</h2>
      {cart.length === 0 ? <p>Không có sản phẩm nào</p> :
        <>
          <Table striped bordered>
            <thead><tr><th>Tên</th><th>Giá</th><th>Số lượng</th><th>Xóa</th></tr></thead>
            <tbody>
              {cart.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td><td>{item.price}</td><td>{item.quantity}</td>
                  <td><Button size="sm" variant="danger" onClick={() => handleRemove(item.id)}>X</Button></td>
                </tr>
              ))}
            </tbody>
          </Table>
          <h4>Tổng tiền: {total.toLocaleString()}₫</h4>
          <Button onClick={handleOrder}>Đặt hàng</Button>
        </>
      }
    </Container>
  );
}
