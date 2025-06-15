import { useEffect, useState } from 'react';
import { Container, Carousel, Row, Col, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import banner1 from '../assets/images/image1.jpg';
import banner2 from '../assets/images/image2.jpg';


export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setFeatured(res.data.slice(0, 4))) // Hiển thị 4 sản phẩm đầu tiên
      .catch(err => console.error('Lỗi khi tải sản phẩm:', err));
  }, []);

  return (
    <>
      <Carousel>
        <Carousel.Item>
          <img className="d-block w-100" src={banner1} alt="Banner 1" />
          <Carousel.Caption>
            <h3>Chào mừng đến với WineShop</h3>
            <p>Chuyên rượu vang nhập khẩu cao cấp</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={banner2} alt="Banner 2" />
        </Carousel.Item>
      </Carousel>

      <Container className="mt-4">
        <h2>Sản phẩm nổi bật</h2>
        <Row className="mt-3">
          {featured.map(product => (
            <Col key={product.id} md={3} className="mb-4">
              <Card>
                <Card.Img 
                  variant="top" 
                  src={product.image} 
                  height="200px" 
                  style={{ objectFit: "cover", borderRadius: "10px 10px 0 0" }} 
                />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>
                    {parseInt(product.price).toLocaleString()}₫
                  </Card.Text>
                  <Button 
                    variant="primary" 
                    href={`/products/${product.id}`}
                    className="w-100"
                  >
                    Xem chi tiết
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
