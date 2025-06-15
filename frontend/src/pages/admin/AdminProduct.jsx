import { useEffect, useState } from "react";
import { Table, Button, Form, Container, Alert, Spinner, Image } from "react-bootstrap";
import axios from "axios";
import { isAdmin } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

export default function AdminProduct() {
  const [products, setProducts] = useState([]);
  const [catalogs, setCatalogs] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    catalog_id: "",
  });
  const [file, setFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const fetchProducts = () => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch(() => setError("Lỗi khi tải sản phẩm"))
      .finally(() => setLoading(false));
  };

  const fetchCatalogs = () => {
    axios.get("http://localhost:5000/api/catalogs").then((res) => setCatalogs(res.data));
  };

  useEffect(() => {
    if (!isAdmin()) {
      alert("Bạn không có quyền truy cập!");
      navigate("/");
    } else {
      fetchProducts();
      fetchCatalogs();
    }
  }, [navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    try {
      let imageName = "";

      if (file) {
        const formData = new FormData();
        formData.append("image", file);

        const upload = await axios.post("http://localhost:5000/api/upload", formData);
        imageName = upload.data.filename;
      }

      const dataToSend = {
        ...form,
        image: imageName ? `/uploads/${imageName}` : form.image,
      };

      if (editingId) {
        await axios.put(`http://localhost:5000/api/products/${editingId}`, dataToSend);
      } else {
        await axios.post("http://localhost:5000/api/products", dataToSend);
      }

      fetchProducts();
      resetForm();
    } catch (err) {
      alert("Thao tác thất bại!");
      console.error(err);
    }
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditingId(product.id);
    setFile(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Xác nhận xóa sản phẩm?")) {
      axios
        .delete(`http://localhost:5000/api/products/${id}`)
        .then(() => fetchProducts())
        .catch(() => alert("Xoá thất bại"));
    }
  };

  const resetForm = () => {
    setForm({ name: "", price: "", image: "", description: "", catalog_id: "" });
    setFile(null);
    setEditingId(null);
  };

  return (
    <Container className="mt-4">
      <h2>Quản lý Sản phẩm</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleCreateOrUpdate}>
        <Form.Group className="mb-2">
          <Form.Label>Tên sản phẩm</Form.Label>
          <Form.Control
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Giá</Form.Label>
          <Form.Control
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Ảnh sản phẩm</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Mô tả</Form.Label>
          <Form.Control
            name="description"
            as="textarea"
            rows={2}
            value={form.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Danh mục</Form.Label>
          <Form.Select
            name="catalog_id"
            value={form.catalog_id}
            onChange={handleChange}
            required
          >
            <option value="">-- Chọn danh mục --</option>
            {catalogs.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button className="mt-2 me-2" type="submit">
          {editingId ? "Lưu" : "Thêm"}
        </Button>
        {editingId && (
          <Button className="mt-2" variant="secondary" onClick={resetForm}>
            Hủy
          </Button>
        )}
      </Form>

      {loading ? (
        <div className="text-center mt-4">
          <Spinner animation="border" />
        </div>
      ) : (
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>ID</th>
              <th>Ảnh</th>
              <th>Tên</th>
              <th>Giá</th>
              <th>Danh mục</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>
                  {p.image && (
                    <Image src={`http://localhost:5000${p.image}`} height={50} />
                  )}
                </td>
                <td>{p.name}</td>
                <td>{parseInt(p.price).toLocaleString()}₫</td>
                <td>{p.catalog_id}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(p)}
                  >
                    Sửa
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(p.id)}
                  >
                    Xóa
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
