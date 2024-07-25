import {Link, useNavigate, useParams} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import {ApiDishForm, ApiDishFormMutation} from '../../types';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {getFormData, postFormData, updateFormData} from '../../store/admin/adminThunks';
import {selectButtonIsLoading, selectGetDataLoading, selectOneDish} from '../../store/admin/adminSlice';
import Spinner from '../Spinner/Spinner';
import ButtonSpinner from '../Spinner/ButtonSpinner';
import {toast} from 'react-toastify';

const initialState: ApiDishForm = {
  title: '',
  price: '',
  image: '',
};

const DishForm = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const oneDish = useAppSelector(selectOneDish);
  const buttonIsLoading = useAppSelector(selectButtonIsLoading);
  const getDataLoading = useAppSelector(selectGetDataLoading);
  const [dishData, setDishData] = useState<ApiDishForm>(initialState);

  useEffect(() => {
    if (oneDish && id) {
      setDishData({
        ...oneDish,
        price: oneDish.price.toString(),
      });
    } else {
      setDishData(initialState);
    }
  }, [oneDish, id]);

  useEffect(() => {
    const fetchGetFormData = async () => {
      try {
        if (id) {
          await dispatch(getFormData(id)).unwrap();
        }
      } catch (error) {
        toast.error('An unexpected error occurred, please try again later.');
        console.error('An unexpected error occurred, please try again later.');
      }
    };
    void fetchGetFormData();
  }, [dispatch, id]);


  const onFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setDishData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const onFormSubmit = async (event: React.FormEvent) => {
    try {
      event.preventDefault();

      if (dishData.title.trim().length !== 0 && dishData.price.trim().length !== 0 && dishData.image.trim().length !== 0) {
        const dishDataMutation: ApiDishFormMutation = {
          ...dishData,
          price: parseFloat(dishData.price),
        };

        if (id) {
          await dispatch(updateFormData({id, dishDataMutation})).unwrap();
          navigate('/admin/dishes');
        } else {
         await dispatch(postFormData(dishDataMutation)).unwrap();

          setDishData({
            title: '',
            price: '',
            image: '',
          });
        }
      }
    } catch (error) {
      toast.error('An unexpected error occurred, please try again later.');
      console.error('An unexpected error occurred, please try again later.');
    }
  };

  return (
    <>
      {getDataLoading ? (<Spinner/>) : (
        <form onSubmit={onFormSubmit}>
          <h3>{id ? 'Edit Dish' : 'Add new Dish'}</h3>
          <div className="form-group mb-2">
            <label htmlFor="title">Title:</label>
            <input
              id="title"
              type="text"
              name="title"
              required
              className="form-control"
              value={dishData.title}
              onChange={onFieldChange}/>
          </div>
          <div className="form-group mb-2">
            <label htmlFor="price">Price:</label>
            <input
              id="price"
              type="number"
              name="price"
              required
              min="1"
              className="form-control"
              value={dishData.price}
              onChange={onFieldChange}/>
          </div>
          <div className="form-group mb-2">
            <label htmlFor="image">Image:</label>
            <input
              id="image"
              type="url"
              name="image"
              required
              className="form-control"
              value={dishData.image}
              onChange={onFieldChange}/>
          </div>
          <button
            type="submit"
            disabled={typeof buttonIsLoading === 'boolean' ? buttonIsLoading : false}
            className="btn btn-primary mt-2 me-2">
            {buttonIsLoading && (<ButtonSpinner/>)} Save
          </button>
          <Link to="/admin/dishes" type="submit" className="btn btn-primary mt-2">Back to Dishes</Link>
        </form>
      )}
    </>
  );
};

export default DishForm;