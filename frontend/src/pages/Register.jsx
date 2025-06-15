// frontend/src/pages/RegisterPage.jsx
import { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', form);
      alert('Đăng ký thành công!');
      navigate('/login');
    } catch (err) {
      alert('Lỗi đăng ký');
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '500px' }}>
      <h3>Đăng ký tài khoản</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Họ tên</Form.Label>
          <Form.Control name="name" value={form.name} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control name="email" type="email" value={form.email} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control name="password" type="password" value={form.password} onChange={handleChange} required />
        </Form.Group>
        <Button type="submit">Đăng ký</Button>
      </Form>
    </Container>
  );
}
