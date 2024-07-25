import React, {useState} from 'react';
import Modal from '../Modal/Modal';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {clearTotalPrice, deleteDishItem, selectCartDishes} from '../../store/cart/cartSlice';

interface Props {
  total: number;
}

const Checkout: React.FC<Props> = ({total}) => {
  const [showModal, setShowModal] = useState(false);
  const cartDishes = useAppSelector(selectCartDishes);
  const dispatch = useAppDispatch();

  const handleClickModal = (status: boolean) => {
    setShowModal(status);
  };

  const handleClickCancelButton = () => {
    handleClickModal(false);
    dispatch(clearTotalPrice());
  };

  return (
    <>
      <div className="card mb-3">
        <div className="card-body d-flex align-items-center justify-content-between">
          <strong>Order total: <span className="fw-medium">{total - 150} KGS</span></strong>
          <button onClick={() => handleClickModal(true)} className="btn btn-primary" type="button">Checkout</button>
        </div>
      </div>

      <Modal showModal={showModal} title="Your order:" onClose={handleClickModal}>
        <div className="modal-body">
          {cartDishes.length > 0 ? (
            <>
              {cartDishes.map((dishItem) => (
                <div key={dishItem.dish.id}>
                  <div className="d-flex align-items-center">
                    <span className="col-6">{dishItem.dish.title} <span
                      className="fw-medium">&nbsp;x {dishItem.amount}</span></span>
                    <strong className="col-5 text-end">{dishItem.amount * dishItem.dish.price} KGS</strong>
                    <button
                      onClick={() => dispatch(deleteDishItem(dishItem.dish))}
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
            </>
          ) : (<p>Cart is empty, add something!</p>)}
        </div>
        <div className="modal-footer">
          {cartDishes.length > 0 ? (
            <>
              <button onClick={handleClickCancelButton} type="button" className="btn btn-danger w-25" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary w-25">Order</button>
            </>
          ) : (
            <button onClick={handleClickCancelButton} type="button" className="btn btn-primary w-25" data-bs-dismiss="modal">Close</button>
          )}
        </div>
      </Modal>
    </>
  );
};

export default Checkout;