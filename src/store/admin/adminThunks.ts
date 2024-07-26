import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {RootState} from '../../app/store';
import {ApiDishes, ApiDishFormMutation, ApiOrdersInfo} from '../../types';

export const postFormData = createAsyncThunk<void, ApiDishFormMutation, {state: RootState}>(
  'admin/postFormData', async (data: ApiDishFormMutation) => {
    await axiosApi.post<ApiDishFormMutation>('/dishes.json', data);
  }
);

export const getFormData = createAsyncThunk<ApiDishFormMutation | undefined, string, {state: RootState}>(
  'admin/getFormData', async (id: string) => {
    const response = await axiosApi.get<ApiDishFormMutation | undefined>(`/dishes/${id}.json`);

    if (response.data !== undefined) {
      return response.data;
    }
  }
);

export const updateFormData = createAsyncThunk<void, {id: string, dishDataMutation: ApiDishFormMutation}, {state: RootState}>(
  'admin/updateFormData', async ({id, dishDataMutation}) => {
    await axiosApi.put<ApiDishFormMutation>(`/dishes/${id}.json`, dishDataMutation);
  }
);

export const deleteOneDish = createAsyncThunk<void, string, {state: RootState}>(
  'admin/deleteOneDish', async (id: string) => {
    await axiosApi.delete<ApiDishFormMutation>(`/dishes/${id}.json`);
  }
);

export const getDishesData =
  createAsyncThunk<ApiDishes[] | null, void, { state: RootState }>(
    'admin/getDishesData', async () => {
      const response = await axiosApi.get<{ [key: string]: ApiDishes }>('/dishes.json');

      if (response.data !== null) {
        return Object.keys(response.data).map(key => ({
          ...response.data[key],
          id: key,
        }));
      } else {
        return [];
      }
    }
  );

export const getOrdersInfo = createAsyncThunk<ApiOrdersInfo | null, void, {state: RootState}>(
  'admin/getOrdersInfo', async () => {
   const response = await axiosApi.get<ApiOrdersInfo | null>('/orders.json');

   if (response.data !== null) {
     return response.data;
   } else {
     return null;
   }
  }
);

export const deleteOrderItem = createAsyncThunk<void, string, {state: RootState}>(
  'admin/deleteOrderItem', async (id: string) => {
    await axiosApi.delete<ApiOrdersInfo>(`/orders/${id}.json`);
  }
);