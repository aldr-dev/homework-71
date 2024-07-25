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
  const getDataLoading = useAppSelector(selectGetDataLoading);
  const dishesData = useAppSelector(selectDishesData);
  const total = useAppSelector(selectTotal);

  useEffect(() => {
    dispatch(getDishesData());
  }, [dispatch]);

  return (
    <Layout>
      {dishesData.length === 0 && !getDataLoading && (
        <p>The list of dishes is empty. We will update the information soon!</p>
      )}
      {getDataLoading ? (
        <Spinner/>
      ) : (
        <>
          {total > 0 ? (<Checkout total={total}/>) : null}
          {dishesData.map((dish) => (
            <CardUserDishes key={dish.id} dish={dish}/>
          ))}
        </>
      )}
    </Layout>
  );
};

export default Home;