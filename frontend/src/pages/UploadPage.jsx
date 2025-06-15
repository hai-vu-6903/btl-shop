import { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Image } from 'react-bootstrap';

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [uploaded, setUploaded] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('image', file);
    const res = await axios.post('http://localhost:5000/api/upload', form);
    setUploaded(res.data.filename);
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '500px' }}>
      <h3>Upload ảnh sản phẩm</h3>
      <Form onSubmit={handleUpload}>
        <Form.Group>
          <Form.Control type="file" onChange={e => setFile(e.target.files[0])} />
        </Form.Group>
        <Button type="submit" className="mt-2">Upload</Button>
      </Form>
      {uploaded && (
        <div className="mt-3">
          <Image src={`http://localhost:5000/uploads/${uploaded}`} fluid />
          <p><strong>URL:</strong> /uploads/{uploaded}</p>
        </div>
      )}
    </Container>
  );
}
