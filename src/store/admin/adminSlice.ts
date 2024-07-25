import {ApiDishes, ApiDishFormMutation} from '../../types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {deleteOneDish, getDishesData, getFormData, postFormData, updateFormData} from './adminThunks';

export interface AdminState {
  dishesData: ApiDishes [];
  oneDish: null | ApiDishFormMutation;
  buttonIsLoading: boolean | string;
  getDataLoading: boolean;
}

const initialState: AdminState  = {
  dishesData: [],
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
  },
  selectors: {
    selectDishesData: (state: AdminState) => state.dishesData,
    selectOneDish: (state: AdminState) => state.oneDish,
    selectButtonIsLoading: (state: AdminState) => state.buttonIsLoading,
    selectGetDataLoading: (state: AdminState) => state.getDataLoading,
  }
});

export const adminReducer = adminSlice.reducer;
export const {updateStateDishesData} = adminSlice.actions;
export const {
  selectDishesData,
  selectOneDish,
  selectButtonIsLoading,
  selectGetDataLoading,
} = adminSlice.selectors;