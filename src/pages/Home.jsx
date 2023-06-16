import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSelector, useDispatch } from 'react-redux';
import { getProductThunk } from '../store/slices/products.slice';
import { useEffect, useState } from 'react';
import axios from 'axios'

const Home = () => {
  const dispatch = useDispatch();
  const productsList = useSelector((state) => state.products);
  console.log(productsList);
  const [categories, setCategories] = useState([])

  useEffect(() => {
    dispatch(getProductThunk());

      axios.get('')
  }, []);

  return (
    <>
      <Row>
        <Col md={4} lg={3}>
          Filtrados
        </Col>
        <Col md={8} lg={9}>
          <h1>Productos</h1>
          <Row xs={1} md={2} lg={3}>
            <div>
              {/* {productsList.map((product) => (
                <Col className="mb-3" key={product.id}>
                  <Card style={{ width: '18rem' }}>
                    <Card.Img
                      variant="top"
                      src={product.images[0].url}
                      style={{ heigth: 200, objectFit: 'cover' }}
                    />
                    <Card.Body>
                      <Card.Title>{product.title}</Card.Title>
                      <Card.Text>{product.brand}</Card.Text>
                      <Button variant="primary">Ver Detalle</Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))} */}
            </div>
            <Col className="mb-3">
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Home;
