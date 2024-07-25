import React from 'react';
import {ApiDishes} from '../../types';
import './CardAdminDishes.css';
import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {deleteOneDish} from '../../store/admin/adminThunks';
import {selectButtonIsLoading, updateStateDishesData} from '../../store/admin/adminSlice';
import ButtonSpinner from '../Spinner/ButtonSpinner';
import {toast} from 'react-toastify';

interface Props {
  dish: ApiDishes;
}

const CardAdminDishes: React.FC<Props> = ({dish}) => {
  const dispatch = useAppDispatch();
  const buttonIsLoading = useAppSelector(selectButtonIsLoading);

  const handleDeleteDish = async () => {
    try {
      const confirmDeleteDish = confirm('Are you sure you want to remove the dish?');
      if (confirmDeleteDish) {
        await dispatch(deleteOneDish(dish.id)).unwrap();
        dispatch(updateStateDishesData(dish.id));
      }
    } catch (error) {
      toast.error('An unexpected error occurred, please try again later.');
      console.error('An unexpected error occurred, please try again later.');
    }
  };

  return (
    <div className="card mb-2">
      <div className="card-body row align-items-center">
        <div className="col-2">
          <img className="card-custom-img rounded-2" src={dish.image} alt={dish.title}/>
        </div>
        <div className="col-5 fw-semibold">
          {dish.title}
        </div>
        <div className="col-2 fw-bold">
          {dish.price} KGS
        </div>
        <div className="col-3 justify-content-end d-flex gap-2">
          <Link to={`${dish.id}/edit`} className="btn btn-primary">Edit</Link>
          <button
            onClick={() => handleDeleteDish()}
            disabled={buttonIsLoading ? buttonIsLoading === dish.id : false}
            className="btn btn-danger"
            type="button">
            {buttonIsLoading && buttonIsLoading === dish.id && (<ButtonSpinner />)} Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardAdminDishes;