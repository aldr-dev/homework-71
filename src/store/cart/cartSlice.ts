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
    addDish: (state: CartState, { payload: dish }: PayloadAction<ApiDishes>) => {
      const index = state.cartDishes.findIndex(
        (cartDishItem: CartDish) => cartDishItem.dish.id === dish.id,
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
    totalPrice: (state: CartState) => {
      if (state.cartDishes.length > 0) {
        state.total = state.cartDishes.reduce((sum, cartDish) => {
          return sum + cartDish.amount * cartDish.dish.price;
        }, 150);
      }
    },
    clearTotalPrice: (state: CartState) => {
      state.total = 0;
    },
    deleteDishItem: (state: CartState, {payload: dish}: PayloadAction<ApiDishes>) => {
      state.cartDishes = state.cartDishes.filter((dishItem) => dishItem.dish.id !== dish.id);
    },
    clearCart: (state: CartState) => {
      state.cartDishes = [];
    },
  },
  selectors: {
    selectTotal: (state: CartState) => state.total,
    selectCartDishes: (state: CartState) => state.cartDishes,
  }
});

export const cartReducer = cartSlice.reducer;
export const {
  addDish,
  totalPrice,
  deleteDishItem,
  clearCart,
  clearTotalPrice,
} = cartSlice.actions;
export const {
  selectTotal,
  selectCartDishes,
} = cartSlice.selectors;