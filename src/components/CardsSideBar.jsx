import Offcanvas from 'react-bootstrap/Offcanvas';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCardsThunk, updateRateThunk } from '../store/slices/cards.slice';

const CardsSideBar = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.cards);

  useEffect(() => {
    dispatch(getCardsThunk());
  }, []);

  const decrementRate = (card) => {
    if (card.rate > 1) {
      dispatch(updateRateThunk(card.id, card.quantity - 1));
    }

    const incrementRate = (card) => {
      if (card.rate > 1) {
        dispatch(updateRateThunk(card.id, card.quantity + 1));
      }
    };
    return (
      <div>
        <Offcanvas placement="end" show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Shoping Here</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <ul>
              {cards.map((products) => (
                <li key={products?.id}>
                  <h5>{products.product?.title}</h5>
                  <img
                    src={products.product?.images?.[1].url}
                    alt=""
                    className="img-fluid"
                    style={{ height: 50, objetFict: 'cover' }}
                  />
                  {/* <small>{products?.title}</small> */}
                  <br />
                  <button onClick={() => decrementRate(products)}>-</button>
                  {products.quantity}
                  <button onClick={() => incrementRate(products)}>+</button>
                </li>
              ))}
            </ul>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    );
  };
};

export default CardsSideBar;
