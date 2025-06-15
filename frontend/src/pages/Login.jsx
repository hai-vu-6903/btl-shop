// src/pages/Login.jsx
import { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      window.location.href = '/';
    } catch (err) {
      setMsg('Sai tài khoản hoặc mật khẩu');
    }
  };

//   localStorage.setItem('token', res.data.token);
//     localStorage.setItem('user', JSON.stringify(res.data.user));


  return (
    <Container className="mt-5" style={{ maxWidth: '500px' }}>
      <h2>Đăng nhập</h2>
      {msg && <Alert variant="danger">{msg}</Alert>}
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </Form.Group>
        <Button type="submit">Đăng nhập</Button>
      </Form>
    </Container>
  );
}
