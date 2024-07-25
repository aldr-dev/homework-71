import {Route, Routes} from 'react-router-dom';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Home from './containers/Home/Home';
import Admin from './containers/Admin/Admin';
import Dishes from './containers/Dishes/Dishes';
import Orders from './containers/Orders/Orders';
import PageDishForm from './containers/PageDishForm/PageDishForm';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/admin" element={<Admin/>}>
          <Route path="dishes" element={<Dishes />}/>
          <Route path="orders" element={<Orders />}/>
        </Route>
        <Route path="admin/dishes/add" element={<PageDishForm/>}/>
        <Route path="admin/dishes/:id/edit" element={<PageDishForm/>}/>
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
    </>
  );
};

export default App;