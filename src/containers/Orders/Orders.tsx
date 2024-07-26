import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {getDishesData, getOrdersInfo} from '../../store/admin/adminThunks';
import {selectGetDataLoading, selectOrdersData} from '../../store/admin/adminSlice';
import Spinner from '../../components/Spinner/Spinner';
import CardAdminOrders from '../../components/CardAdminOrders/CardAdminOrders';
import {toast} from 'react-toastify';

const Orders = () => {
  const dispatch = useAppDispatch();
  const getDataLoading = useAppSelector(selectGetDataLoading);
  const ordersData = useAppSelector(selectOrdersData);

  useEffect(() => {
    const fetchInitialData =  async () => {
      try {
        await dispatch(getDishesData()).unwrap();
        await dispatch(getOrdersInfo()).unwrap();
      } catch (error) {
        toast.error('An unexpected error occurred, please try again later.');
        console.error('An unexpected error occurred, please try again later.');
      }
    };

    void fetchInitialData();
  }, [dispatch]);

  return (
    <div className="mb-5">
      <h3 className="mb-3">Orders</h3>
      {ordersData.length === 0 && !getDataLoading && (
      <p>The order list is empty. We haven't ordered more than one dish from you yet.</p>
      )}

      {getDataLoading ? (
        <Spinner/>
      ) : (
        ordersData.map((item) => (
          <CardAdminOrders key={item.id} orderDishList={item}/>
        ))
      )}
    </div>
  );
};

export default Orders;