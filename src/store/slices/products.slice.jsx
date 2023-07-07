import { createSlice } from '@reduxjs/toolkit';
import { setIsLoading } from './isLoading.slice';
import axios from 'axios';

export const productsSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {
    setProduct: (state, action) => {
      return action.payload;
    },
  },
});

export const { setProduct } = productsSlice.actions;

export default productsSlice.reducer;

//redux thunk / middlewares
// se ejecutan entre dispatch y la accion

export const getProductThunk = () => (dispatch) => {
  //Tareas  a realizar
  dispatch(setIsLoading(true));

  axios
    .get('https://e-commerce-api-v2.academlo.tech/api/v1/products')
    .then((res) => {
      dispatch(setProduct(res.data));
      console.log(res.data);
    })
    .catch((error) => console.error(error))
    .finally(() => dispatch(setIsLoading(false)));
};

export const filterCategoryThunk = (id) => (dispatch) => {
  dispatch(setIsLoading(true));

  axios
    .get(`https://e-commerce-api-v2.academlo.tech/api/v1/products?categoryId=${id}`)
    .then((res) => {
      dispatch(setProduct(res.data));
    })
    .catch((error) => console.error(error))
    .finally(() => dispatch(setIsLoading(false)));
};

export const filterTitleThunk = (value) => (dispatch) => {
  dispatch(setIsLoading(true));

  axios
    .get(`https://e-commerce-api-v2.academlo.tech/api/v1/products?title=${value}`)
    .then((res) => {
      dispatch(setProduct(res.data));
    })
    .catch((error) => console.error(error))
    .finally(() => dispatch(setIsLoading(false)));
};
