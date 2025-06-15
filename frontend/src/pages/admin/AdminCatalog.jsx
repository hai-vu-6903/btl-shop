// frontend/src/pages/admin/AdminCatalog.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Button, Form } from 'react-bootstrap';

export default function AdminCatalog() {
  const [catalogs, setCatalogs] = useState([]);
  const [form, setForm] = useState({ name: '', description: '' });

  const fetchCatalogs = () => {
    axios.get('http://localhost:5000/api/catalogs').then(res => setCatalogs(res.data));
  };

  useEffect(() => {
    fetchCatalogs();
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/catalogs', form);
    setForm({ name: '', description: '' });
    fetchCatalogs();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Xóa danh mục này?')) {
      await axios.delete(`http://localhost:5000/api/catalogs/${id}`);
      fetchCatalogs();
    }
  };

  return (
    <Container className="mt-4">
      <h2>Quản lý Danh mục</h2>
      <Form onSubmit={handleAdd} className="mb-4">
        <Form.Control name="name" placeholder="Tên danh mục" value={form.name} onChange={handleChange} required />
        <Form.Control name="description" placeholder="Mô tả" value={form.description} onChange={handleChange} className="mt-2" />
        <Button type="submit" className="mt-2">Thêm danh mục</Button>
      </Form>

      <Table bordered>
        <thead><tr><th>ID</th><th>Tên</th><th>Mô tả</th><th>Xóa</th></tr></thead>
        <tbody>
          {catalogs.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td><td>{c.name}</td><td>{c.description}</td>
              <td><Button variant="danger" size="sm" onClick={() => handleDelete(c.id)}>X</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
