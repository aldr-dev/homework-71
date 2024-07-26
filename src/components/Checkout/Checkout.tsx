import React, {useEffect, useState} from 'react';
import Modal from '../Modal/Modal';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {
  clearCart,
  clearTotalPrice,
  deleteDishItem,
  selectButtonIsLoading,
  selectCartDishes,
  totalPrice
} from '../../store/cart/cartSlice';
import {CartDish, OrderInfo} from '../../types';
import {postOrderInfo} from '../../store/cart/cartThunks';
import {toast} from 'react-toastify';
import ButtonSpinner from '../Spinner/ButtonSpinner';

interface Props {
  total: number;
}

const Checkout: React.FC<Props> = ({total}) => {
  const [showModal, setShowModal] = useState(false);
  const cartDishes = useAppSelector(selectCartDishes);
  const buttonIsLoading = useAppSelector(selectButtonIsLoading);
  const dispatch = useAppDispatch();

  const newOrder = cartDishes.reduce<OrderInfo>((acc,CardDish) => {
      acc[CardDish.dish.id] = CardDish.amount;
      return acc;
  }, {});

  const handlePostNewOrder = async () => {
    try {
      await dispatch(postOrderInfo(newOrder)).unwrap();
      dispatch(clearCart());
      dispatch(clearTotalPrice());
      handleClickModal(false);
      toast.success('The order has been successfully created. They took me to the kitchen.');
    } catch (error) {
      toast.error('An unexpected error occurred, please try again later.');
      console.error('An unexpected error occurred, please try again later.');
    }
  };

  const handleClickModal = (status: boolean) => {
    setShowModal(status);
  };

  const handleDeleteDish = (dishItem: CartDish) => {
    dispatch(deleteDishItem(dishItem.dish));
    dispatch(totalPrice());
  };

  useEffect(() => {
    if (cartDishes.length === 0) {
      dispatch(clearCart());
      dispatch(clearTotalPrice());
    }
  }, [dispatch, cartDishes]);

  return (
    <>
      <div className="card mb-3">
        <div className="card-body d-flex align-items-center justify-content-between">
          <strong>Order total: <span className="fw-medium">{total - 150} KGS</span></strong>
          <button onClick={() => handleClickModal(true)} className="btn btn-primary" type="button">Checkout</button>
        </div>
      </div>

      {cartDishes.length !== 0 && (
        <Modal showModal={showModal} title="Your order:" onClose={() => handleClickModal(false)}>
          <div className="modal-body">
            {cartDishes.map((dishItem) => (
              <div key={dishItem.dish.id}>
                <div className="d-flex align-items-center">
                <span className="col-6">{dishItem.dish.title} <span
                  className="fw-medium">&nbsp;x {dishItem.amount}</span></span>
                  <strong className="col-5 text-end">{dishItem.amount * dishItem.dish.price} KGS</strong>
                  <button
                    onClick={() => handleDeleteDish(dishItem)}
                    className="border-0 bg-transparent p-0 text-end col-1"
                    type="button">
                    <i className="bi fs-4 bi-trash-fill"></i>
                  </button>
                </div>
              </div>
            ))}
            <div className="mt-4 d-flex flex-column">
              <div className="d-flex justify-content-between mb-1">
                <span>Delivery:</span>
                <strong>150 KGS</strong>
              </div>
              <div className="d-flex justify-content-between">
                <strong>Total:</strong>
                <strong>{total} KGS</strong>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              onClick={() => handleClickModal(false)}
              type="button"
              className="btn btn-danger w-25"
              data-bs-dismiss="modal">Cancel
            </button>
            <button onClick={handlePostNewOrder} disabled={buttonIsLoading} type="button" className="btn btn-primary w-25">
              {buttonIsLoading ? (<ButtonSpinner />) : null} Order
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Checkout;