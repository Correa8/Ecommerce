import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useDispatch, useSelector } from 'react-redux';
import { filterCategoryThunk } from '../store/slices/products.slice';
import ListGroup from 'react-bootstrap/ListGroup';
import Carousel from 'react-bootstrap/Carousel';
import { addFavoriteThunk } from '../store/slices/cards.slice';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [rate, setRate] = useState(1);
  const dispatch = useDispatch();
  const allProduct = useSelector((state) => state.products);
  const newsFiltered = allProduct.filter((products) => products.id !== Number(id));

  useEffect(() => {
    axios
      .get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);

        dispatch(filterCategoryThunk(res.data.category.id));
      });
  }, []);

  const decrement = () => {
    if (rate > 1) {
      setRate(rate - 1);
    }
  };

  const addToProducts = () => {
    const productico = {
      product: product.id,
      rate: rate,
    };

    dispatch(addFavoriteThunk(productico));
  };

  return (
    <div className="py-5">
      <h1>{product.title}</h1>
      <h3>{product.brand}</h3>

      <h3>Precio {product.price}</h3>

      <Button onClick={() => decrement()}>-</Button>
      <span>{rate}</span>
      <Button onClick={() => setRate(rate + 1)}>+</Button>

      <Button className="primary ms-3" onClick={addToProducts}>
        Comprar
      </Button>
      <Row className="pt-3">
        <Col lg={9}>
          {
            <Carousel>
              <Carousel.Item>
                <img
                  className="d-block w-30"
                  src={product?.images?.[0].url}
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-30"
                  src={product?.images?.[1].url}
                  alt="Second slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-50 h-30"
                  src={product?.images?.[2].url}
                  alt="Third slide"
                />
              </Carousel.Item>
            </Carousel>
          }
          <small className="mb-3 d-block">
            {product.iamges?.images?.[(0, 1, 2)].url}
          </small>
          <h4>{product.description}</h4>
        </Col>

        <Col lg={3}>
          <h3>Noticias Realacionadas</h3>

          <ListGroup>
            {newsFiltered.map((product) => (
              <ListGroup.Item key={product.id}>{product?.description}</ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetail;
