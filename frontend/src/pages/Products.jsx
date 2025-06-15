import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ Thêm trạng thái loading

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => {
        console.error('Lỗi khi tải sản phẩm:', err);
        setProducts([]); // fallback nếu lỗi
      })
      .finally(() => setLoading(false)); // ✅ Dừng loading
  }, []);

  return (
    <div className="container mt-4">
      <h2>Sản phẩm</h2>

      {loading ? (
        <p>Đang tải sản phẩm...</p>
      ) : products.length === 0 ? (
        <p>Không có sản phẩm nào.</p>
      ) : (
        <div className="row">
          {products.map(p => (
            <div key={p.id} className="col-md-3 mb-3">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
