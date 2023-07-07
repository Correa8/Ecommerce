import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios ';
import { setIsLoading } from './isLoading.slice';
import getConfig from '../../utils/getConfig';

export const cardsSlice = createSlice({
  name: 'cards',
  initialState: [],
  reducers: {
    setCards: (state, action) => {
      return action.payload;
    },
  },
});

export const { setCards } = cardsSlice.actions;

export default cardsSlice.reducer;

export const getCardsThunk = () => (dispatch) => {
  dispatch(setIsLoading(true));

  axios
    .get(`https://e-commerce-api-v2.academlo.tech/api/v1/cart `, getConfig())
    .then((res) => {
      console.log(res.data);
      dispatch(setCards(res.data));
    })
    .catch((error) => console.error(error))
    .finally(() => dispatch(setIsLoading(false)));
};

export const addFavoriteThunk = (otraCosa) => (dispatch) => {
  dispatch(setIsLoading(true));

  axios
    .post(`https://e-commerce-api-v2.academlo.tech/api/v1/cart`, otraCosa, getConfig())
    .then(() => dispatch(getCardsThunk()))
    .catch((error) => alert('Ups, Algo salio mal'))
    .finally(() => setIsLoading(false));
};

export const updateRateThunk = (id, quantity) => (dispatch) => {
  dispatch(setIsLoading(true));

  const body = {
    quantity: quantity,
  };

  axios
    .put(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${id}`, body, getConfig())
    .then(() => dispatch(getCardsThunk()))
    .catch((error) => console.ereror(error))
    .finally(() => setIsLoading(false));
};
