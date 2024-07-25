import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {useEffect} from 'react';
import {getDishesData} from '../../store/admin/adminThunks';
import {selectDishesData, selectGetDataLoading} from '../../store/admin/adminSlice';
import CardAdminDishes from '../../components/CardAdminDishes/CardAdminDishes';
import Spinner from '../../components/Spinner/Spinner';
import {toast} from 'react-toastify';

const Dishes = () => {
  const dispatch = useAppDispatch();
  const dishesData = useAppSelector(selectDishesData);
  const getDataLoading = useAppSelector(selectGetDataLoading);

  useEffect(() => {
    const fetchDishesData = async () => {
      try {
        await dispatch(getDishesData()).unwrap();
      } catch (error) {
        toast.error('An unexpected error occurred, please try again later.');
        console.error('An unexpected error occurred, please try again later.');
      }
    };
    void fetchDishesData();
  }, [dispatch]);

  return (
    <div className="mb-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Dishes</h3>
        <Link to="/admin/dishes/add" className="btn btn-primary">Add new Dish</Link>
      </div>

      {dishesData.length === 0 && !getDataLoading && (
        <p>You haven't added one dish yet. The list is empty</p>
      )}

      {getDataLoading ? (
        <Spinner />
      ) : (
        dishesData.map((item) => (
          <CardAdminDishes key={item.id} dish={item} />
        ))
      )}
    </div>
  );
};

export default Dishes;