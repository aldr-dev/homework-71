import {configureStore} from '@reduxjs/toolkit';
import {adminReducer} from '../store/admin/adminSlice';
import {cartReducer} from '../store/cart/cartSlice';

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    cart: cartReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;