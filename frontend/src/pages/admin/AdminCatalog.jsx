import { useState, useEffect } from 'react';
import { Table, Button, Form, Container } from 'react-bootstrap';
import axios from 'axios';
import { isAdmin } from '../../utils/auth';
import { useNavigate } from 'react-router-dom'; // ✅ THÊM DÒNG NÀY

export default function AdminCatalog() {
  const [catalogs, setCatalogs] = useState([]);
  const [form, setForm] = useState({ name: '', description: '' });

  const navigate = useNavigate(); // ✅ Đặt lên trên

  // ✅ Phân quyền đặt sớm
  useEffect(() => {
    if (!isAdmin()) {
      alert('Bạn không có quyền truy cập!');
      navigate('/');
    }
  }, [navigate]);

  const fetchCatalogs = () => {
    axios.get('http://localhost:5000/api/catalogs')
      .then(res => setCatalogs(res.data));
  };

  useEffect(() => {
    fetchCatalogs();
  }, []);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleCreate = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/catalogs', form)
      .then(() => {
        fetchCatalogs();
        setForm({ name: '', description: '' });
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Xóa danh mục này?")) {
      axios.delete(`http://localhost:5000/api/catalogs/${id}`)
        .then(() => fetchCatalogs());
    }
  };

  return (
    <Container className="mt-4">
      <h2>Quản lý Danh mục sản phẩm</h2>
      <Form onSubmit={handleCreate} className="mb-3">
        <Form.Control
          placeholder="Tên danh mục"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <Form.Control
          placeholder="Mô tả"
          name="description"
          value={form.description}
          onChange={handleChange}
          className="mt-2"
        />
        <Button type="submit" className="mt-2">Thêm</Button>
      </Form>

      <Table striped bordered>
        <thead>
          <tr><th>ID</th><th>Tên</th><th>Mô tả</th><th>Xóa</th></tr>
        </thead>
        <tbody>
          {catalogs.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.description}</td>
              <td>
                <Button variant="danger" size="sm" onClick={() => handleDelete(c.id)}>X</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
