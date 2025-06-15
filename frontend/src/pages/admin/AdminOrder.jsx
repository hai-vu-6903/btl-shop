// import { useEffect, useState } from 'react';
// import { Table, Container, Form } from 'react-bootstrap';
// import axios from 'axios';
// import { isAdmin } from '../../utils/auth';
// import { useNavigate } from 'react-router-dom'; // ✅ Thêm dòng này

// export default function AdminOrder() {
//   const [orders, setOrders] = useState([]);
//   const navigate = useNavigate(); // ✅ Chuyển lên trên cho dễ đọc

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/orders')
//       .then(res => setOrders(res.data));
//   }, []);

//   const handleStatusChange = (id, status) => {
//     axios.put(`http://localhost:5000/api/orders/${id}`, { status })
//       .then(() => {
//         setOrders(prev =>
//           prev.map(o => o.id === id ? { ...o, status } : o)
//         );
//       });
//   };

//   useEffect(() => {
//     if (!isAdmin()) {
//       alert('Bạn không có quyền truy cập!');
//       navigate('/');
//     }
//   }, [navigate]);

//   return (
//     <Container className="mt-4">
//       <h2>Quản lý Đơn hàng</h2>
//       <Table striped bordered>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Người dùng</th>
//             <th>Tổng tiền</th>
//             <th>Trạng thái</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.map(o => (
//             <tr key={o.id}>
//               <td>{o.id}</td>
//               <td>{o.user_id}</td>
//               <td>{parseInt(o.total_price).toLocaleString()}₫</td>
//               <td>
//                 <Form.Select
//                   value={o.status}
//                   onChange={e => handleStatusChange(o.id, e.target.value)}
//                   required
//                 >
//                   <option value="pending">Chờ xác nhận</option>
//                   <option value="paid">Đã thanh toán</option>
//                   <option value="shipped">Đang giao</option>
//                   <option value="delivered">Đã nhận</option>
//                   <option value="cancelled">Đã hủy</option>
//                 </Form.Select>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </Container>
//   );
// }

// frontend/src/pages/admin/AdminOrder.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Container, Button } from 'react-bootstrap';

export default function AdminOrder() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/orders')
      .then(res => setOrders(res.data));
  }, []);

  return (
    <Container className="mt-4">
      <h2>Quản lý đơn hàng</h2>
      <Table bordered striped>
        <thead><tr><th>ID</th><th>Khách</th><th>Tổng tiền</th><th>Ngày tạo</th></tr></thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.user_id}</td>
              <td>{o.total_price.toLocaleString()}₫</td>
              <td>{new Date(o.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
