import { useEffect, useState } from "react";
import { Table, Button, Form, Container } from "react-bootstrap";
import axios from "axios";
import { isAdmin } from "../../utils/auth";
import { useNavigate } from "react-router-dom"; // ✅ thêm dòng này

export default function AdminProduct() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    catalog_id: "",
  });

  const [file, setFile] = useState(null); // ✅ thêm dòng này

  const navigate = useNavigate();

  const fetchProducts = () => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!isAdmin()) {
      alert("Bạn không có quyền truy cập!");
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleCreate = async (e) => {
    e.preventDefault();

    let imageName = "";
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      const upload = await axios.post(
        "http://localhost:5000/api/upload",
        formData
      );
      imageName = upload.data.filename;
    }

    await axios.post("http://localhost:5000/api/products", {
      ...form,
      image: imageName ? `/uploads/${imageName}` : "",
    });

    fetchProducts();
    setForm({ name: "", price: "", description: "", catalog_id: "" });
    setFile(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Xác nhận xóa sản phẩm?")) {
      axios
        .delete(`http://localhost:5000/api/products/${id}`)
        .then(() => fetchProducts());
    }
  };

  return (
    <Container className="mt-4">
      <h2>Quản lý Sản phẩm</h2>

      <Form onSubmit={handleCreate}>
        <Form.Group>
          <Form.Label>Tên sản phẩm</Form.Label>
          <Form.Control
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Giá</Form.Label>
          <Form.Control
            name="price"
            value={form.price}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Ảnh sản phẩm</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Mô tả</Form.Label>
          <Form.Control
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Danh mục (ID)</Form.Label>
          <Form.Control
            name="catalog_id"
            value={form.catalog_id}
            onChange={handleChange}
          />
        </Form.Group>

        <Button className="mt-2" type="submit">
          Thêm
        </Button>
      </Form>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Giá</th>
            <th>Danh mục</th>
            <th>Xóa</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{parseInt(p.price).toLocaleString()}₫</td>
              <td>{p.catalog_id}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(p.id)}
                >
                  X
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
