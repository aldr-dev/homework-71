import React from 'react';
import {OrderList} from '../../types';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {deleteOrderItem} from '../../store/admin/adminThunks';
import {selectButtonIsLoading, updateStateOrdersData} from '../../store/admin/adminSlice';
import {toast} from 'react-toastify';
import ButtonSpinner from '../Spinner/ButtonSpinner';

interface Props {
  orderDishList: OrderList;
}

const CardAdminOrders: React.FC<Props> = ({orderDishList}) => {
  const dispatch = useAppDispatch();
  const buttonIsLoading = useAppSelector(selectButtonIsLoading);
  const totalPrice = orderDishList.totalCost;

  const handleDeleteOrder = async (id: string) => {
    try {
      const confirmDelete = confirm('Confirm the completion of the order. Once completed, you will not be able to make changes.');
      if (confirmDelete) {
        await dispatch(deleteOrderItem(id)).unwrap();
        dispatch(updateStateOrdersData(id));
      }
    } catch (error) {
      toast.error('An unexpected error occurred, please try again later.');
      console.error('An unexpected error occurred, please try again later.');
    }
  };

  return (
    <div className="card mb-2 fw-medium">
      <div className="card-body">
        {orderDishList.dishes.map((orderItem) => (
          <div key={orderItem.dish.id} className="row">
            <div className="col-4">
              <span className="fw-medium">{orderItem.amount} x {orderItem.dish.title}</span>
            </div>
            <div className="col-4">
              <strong>{orderItem.dish.price} KGS</strong>
            </div>
          </div>
        ))}
        <div className="row align-items-center mt-3">
          <div className="col-4">
            <span>Delivery</span>
          </div>
          <div className="col-4">
            <strong>150 KGS</strong>
          </div>
        </div>
        <div className="row align-items-center border-top pt-3 mt-4">
          <div className="col-4">
            <span>Order total:</span>
          </div>
          <div className="col-4">
            <strong>{totalPrice + 150} KGS</strong>
          </div>
          <div className="col-4 text-end">
            <button
              onClick={() =>
                handleDeleteOrder(orderDishList.id)}
                disabled={buttonIsLoading ? buttonIsLoading === orderDishList.id : false}
                type="button"
                className="btn btn-success">
                {buttonIsLoading && buttonIsLoading === orderDishList.id && (<ButtonSpinner/>)} Complete order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardAdminOrders;
