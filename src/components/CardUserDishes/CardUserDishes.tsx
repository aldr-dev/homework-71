import React from 'react';
import {ApiDishes} from '../../types';
import './CardUserDishes.css';
import {useAppDispatch} from '../../app/hooks';
import {addDish, totalPrice} from '../../store/cart/cartSlice';

interface Props {
  dish: ApiDishes;
}

const CardUserDishes: React.FC<Props> = ({dish}) => {
  const dispatch = useAppDispatch();

  const handleAddToCard = () => {
    dispatch(addDish(dish));
    dispatch(totalPrice());
  };

  return (
    <div onClick={() => handleAddToCard()} className="card mb-2 cursor-pointer">
      <div className="card-body row align-items-center">
        <div className="col-2">
          <img className="card-custom-img rounded-2" src={dish.image} alt={dish.title}/>
        </div>
        <div className="col-5 fw-semibold">
          {dish.title}
        </div>
        <div className="col-5 fw-bold text-end">
          {dish.price} KGS
        </div>
      </div>
    </div>
  );
};

export default CardUserDishes;