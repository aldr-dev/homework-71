import {ApiDishes, CartDish} from '../../types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {postOrderInfo} from './cartThunks';

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
  extraReducers: (builder) => {
    builder.addCase(postOrderInfo.pending, (state: CartState) => {
      state.buttonIsLoading = true;
    });
    builder.addCase(postOrderInfo.fulfilled, (state: CartState) => {
      state.buttonIsLoading = false;
    });
    builder.addCase(postOrderInfo.rejected, (state: CartState) => {
      state.buttonIsLoading = false;
    });
  },
  selectors: {
    selectTotal: (state: CartState) => state.total,
    selectCartDishes: (state: CartState) => state.cartDishes,
    selectButtonIsLoading: (state: CartState) => state.buttonIsLoading,
  }
});

export const cartReducer = cartSlice.reducer;
export const {
  addDish,
  deleteDishItem,
  totalPrice,
  clearCart,
  clearTotalPrice,
} = cartSlice.actions;
export const {
  selectTotal,
  selectCartDishes,
  selectButtonIsLoading,
} = cartSlice.selectors;