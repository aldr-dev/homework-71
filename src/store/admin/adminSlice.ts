import {ApiDishes, ApiDishFormMutation, ApiOrdersInfo, CartDish, OrderList} from '../../types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  deleteOneDish,
  deleteOrderItem,
  getDishesData,
  getFormData,
  getOrdersInfo,
  postFormData,
  updateFormData
} from './adminThunks';

export interface AdminState {
  dishesData: ApiDishes [];
  ordersData: OrderList [];
  oneDish: null | ApiDishFormMutation;
  buttonIsLoading: boolean | string;
  getDataLoading: boolean;
}

const initialState: AdminState  = {
  dishesData: [],
  ordersData: [],
  oneDish: null,
  buttonIsLoading: false,
  getDataLoading: false,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    updateStateDishesData: (state: AdminState, {payload: id}: PayloadAction<string>) => {
      state.dishesData = state.dishesData.filter((item) => item.id !== id);
    },
    updateStateOrdersData: (state: AdminState, {payload: id}: PayloadAction<string>) => {
      state.ordersData = state.ordersData.filter((item) => item.id !== id);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(postFormData.pending, (state: AdminState ) => {
      state.buttonIsLoading = true;
    });
    builder.addCase(postFormData.fulfilled, (state: AdminState ) => {
      state.buttonIsLoading = false;
    });
    builder.addCase(postFormData.rejected, (state: AdminState ) => {
      state.buttonIsLoading = false;
    });

    builder.addCase(getFormData.pending, (state: AdminState ) => {
      state.getDataLoading = true;
    });
    builder.addCase(getFormData.fulfilled, (state: AdminState, action: PayloadAction<ApiDishFormMutation | undefined>) => {
      state.getDataLoading = false;
      if (action.payload !== undefined) {
        state.oneDish = action.payload;
      }
    });
    builder.addCase(getFormData.rejected, (state: AdminState ) => {
      state.getDataLoading = false;
    });

    builder.addCase(updateFormData.pending, (state: AdminState ) => {
      state.buttonIsLoading = true;
    });
    builder.addCase(updateFormData.fulfilled, (state: AdminState) => {
      state.buttonIsLoading = false;
    });
    builder.addCase(updateFormData.rejected, (state: AdminState ) => {
      state.buttonIsLoading = false;
    });

    builder.addCase(deleteOneDish.pending, (state: AdminState, {meta: {arg: dishId }}) => {
      state.buttonIsLoading = dishId;
    });
    builder.addCase(deleteOneDish.fulfilled, (state: AdminState) => {
      state.buttonIsLoading = false;
    });
    builder.addCase(deleteOneDish.rejected, (state: AdminState ) => {
      state.buttonIsLoading = false;
    });

    builder.addCase(getDishesData.pending, (state: AdminState ) => {
      state.getDataLoading = true;
    });
    builder.addCase(getDishesData.fulfilled, (state: AdminState, action: PayloadAction<ApiDishes[] | null>) => {
      state.getDataLoading = false;
      if (action.payload !== null) {
        state.dishesData = action.payload;
      }
    });
    builder.addCase(getDishesData.rejected, (state: AdminState ) => {
      state.getDataLoading = false;
    });

    builder.addCase(getOrdersInfo.pending, (state: AdminState ) => {
      state.getDataLoading = true;
    });
    builder.addCase(getOrdersInfo.fulfilled, (state: AdminState, { payload: orders }: PayloadAction<ApiOrdersInfo | null>) => {
      state.getDataLoading = false;
      if (orders !== null) {
        state.ordersData = Object.keys(orders).map(orderId => {
          const order = orders[orderId];
          const orderDishes: CartDish[] = [];
          let totalCost = 0;

          state.dishesData.forEach(dish => {
            const amount = order[dish.id];
            if (amount) {
              const cost = dish.price * amount;
              totalCost += cost;
              orderDishes.push({
                dish: dish,
                amount: amount,
              });
            }
          });

          return {
            id: orderId,
            dishes: orderDishes,
            totalCost: totalCost,
          };
        });
      }
    });
    builder.addCase(getOrdersInfo.rejected, (state: AdminState ) => {
      state.getDataLoading = false;
    });

    builder.addCase(deleteOrderItem.pending, (state: AdminState, {meta: {arg: dishId }}) => {
      state.buttonIsLoading = dishId;
    });
    builder.addCase(deleteOrderItem.fulfilled, (state: AdminState) => {
      state.buttonIsLoading = false;
    });
    builder.addCase(deleteOrderItem.rejected, (state: AdminState ) => {
      state.buttonIsLoading = false;
    });
  },
  selectors: {
    selectDishesData: (state: AdminState) => state.dishesData,
    selectOneDish: (state: AdminState) => state.oneDish,
    selectButtonIsLoading: (state: AdminState) => state.buttonIsLoading,
    selectGetDataLoading: (state: AdminState) => state.getDataLoading,
    selectOrdersData: (state: AdminState) => state.ordersData,
  }
});

export const adminReducer = adminSlice.reducer;
export const {updateStateDishesData, updateStateOrdersData} = adminSlice.actions;
export const {
  selectDishesData,
  selectOneDish,
  selectButtonIsLoading,
  selectGetDataLoading,
  selectOrdersData,
} = adminSlice.selectors;