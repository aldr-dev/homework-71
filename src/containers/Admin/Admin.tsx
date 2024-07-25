import Layout from '../../components/Layout/Layout';
import {Location, Outlet, useLocation} from 'react-router-dom';

const Admin = () => {
  const location: Location = useLocation();
  return (
    <Layout>
      {location.pathname === '/admin' ? (
        <h5 className="fw-normal d-flex align-items-center">
          <i className="bi bi-person-fill-gear fs-1 me-1"></i>
          Welcome to the admin panel of the "Turtle Pizza" app! <br/>
          Select an action from the navigation menu.
        </h5>
      ) : null}
      <Outlet/>
    </Layout>
  );
};

export default Admin;