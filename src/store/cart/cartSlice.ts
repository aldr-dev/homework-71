import {ApiDishes, CartDish} from '../../types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface CartState {
  cartDishes: CartDish[];
  total: number;
  buttonIsLoading: boolean;
}

const initialState: CartState = {
  cartDishes: [],
  total: 0,
  buttonIsLoading: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addDish: (state, { payload: dish }: PayloadAction<ApiDishes>) => {
      const index = state.cartDishes.findIndex(
        (cartDish) => cartDish.dish.id === dish.id,
      );

      if (index !== -1) {
        state.cartDishes[index].amount++;
      } else {
        state.cartDishes.push({
          amount: 1,
          dish,
        });
      }
    },
    totalPrice: (state) => {
      if (state.cartDishes.length > 0) {
        state.total = state.cartDishes.reduce((sum, cartDish) => {
          return sum + cartDish.amount * cartDish.dish.price;
        }, 150);
      }
    },
  },
  selectors: {
    selectTotal: (state) => state.total,
  }
});

export const cartReducer = cartSlice.reducer;
export const {
  addDish,
  totalPrice,
} = cartSlice.actions;
export const {selectTotal} = cartSlice.selectors;