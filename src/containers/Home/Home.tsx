import Layout from '../../components/Layout/Layout';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {useEffect} from 'react';
import {getDishesData} from '../../store/admin/adminThunks';
import {selectDishesData, selectGetDataLoading} from '../../store/admin/adminSlice';
import CardUserDishes from '../../components/CardUserDishes/CardUserDishes';
import {selectTotal} from '../../store/cart/cartSlice';
import Checkout from '../../components/Checkout/Checkout';
import Spinner from '../../components/Spinner/Spinner';

const Home = () => {
  const dispatch = useAppDispatch();
  const dishData = useAppSelector(selectDishesData);
  const getDataLoading = useAppSelector(selectGetDataLoading);
  const total = useAppSelector(selectTotal);



  useEffect(() => {
    dispatch(getDishesData());
  }, [dispatch]);

  return (
    <Layout>
      {getDataLoading ? (
        <Spinner/>
      ) : (
        <>
          {total > 0 ? (<Checkout total={total}/>) : null}
          {dishData.map((dish) => (
            <CardUserDishes key={dish.id} dish={dish}/>
          ))}
        </>
      )}
    </Layout>
  );
};

export default Home;