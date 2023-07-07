import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useSelector, useDispatch } from 'react-redux';
import {
  getProductThunk,
  filterCategoryThunk,
  filterTitleThunk,
} from '../store/slices/products.slice';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const productsList = useSelector((state) => state.products);
  console.log(productsList);
  const [categories, setCategories] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    dispatch(getProductThunk());

    axios
      .get('https://e-commerce-api-v2.academlo.tech/api/v1/categories')
      .then((res) => setCategories(res.data))
      .catch((error) => console.error(error));
  }, []);

  const disponible = () => {
    filterTitleThunk ? dispatch(filterTitleThunk(searchValue)) : dispatch('NO EXISTE');
  };

  return (
    <>
      <Row className="pt-5">
        <Col md={4} lg={3}>
          <ListGroup className="w-100">
            {categories.map((category) => (
              <ListGroup.Item
                key={category.id}
                onClick={() => dispatch(filterCategoryThunk(category.id))}
              >
                {category.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={8} lg={9}>
          <h1>Productos</h1>

          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Busqda por nombre"
              aria-label="Busqda por nombre"
              aria-describedby="basic-addon2"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <Button
              variant="outline-secondary"
              id="button-addon2"
              onClick={() => disponible()}
            >
              Buscar
            </Button>
          </InputGroup>

          <Row xs={1} md={2} lg={3}>
            {productsList.map((product) => (
              <Col className="mb-3" key={product.id}>
                <Card className="w-100">
                  <Card.Img
                    variant="top"
                    src={product.images[0].url}
                    style={{ heigth: 100, objectFit: 'cover' }}
                  />
                  <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>{product.brand}</Card.Text>
                    <Button variant="primary" as={Link} to={`/product/${product.id}`}>
                      Ver Detalle
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Home;
