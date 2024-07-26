import axiosApi from '../../axiosApi';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {OrderInfo} from '../../types';
import {RootState} from '../../app/store';

export const postOrderInfo = createAsyncThunk<void, OrderInfo, {state: RootState}>(
  'cart/postOrderInfo', async (orderInfo: OrderInfo) => {
    await axiosApi.post<OrderInfo>('/orders.json', orderInfo);
  }
);
