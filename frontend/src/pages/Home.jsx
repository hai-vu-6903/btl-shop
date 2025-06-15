// src/pages/Home.jsx
import { Container, Carousel } from 'react-bootstrap';

export default function Home() {
  return (
    <>
      <Carousel>
        <Carousel.Item>
          <img className="d-block w-100" src="/images/banner1.jpg" alt="Banner 1" />
          <Carousel.Caption>
            <h3>Chào mừng đến với WineShop</h3>
            <p>Chuyên rượu vang nhập khẩu cao cấp</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="/images/banner2.jpg" alt="Banner 2" />
        </Carousel.Item>
      </Carousel>

      <Container className="mt-4">
        <h2>Sản phẩm nổi bật</h2>
        {/* Sau này bạn có thể gọi API để hiện sản phẩm nổi bật ở đây */}
      </Container>
    </>
  );
}
