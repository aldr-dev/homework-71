import {Location, NavLink, useLocation} from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location: Location = useLocation();
  return (
    <header className="mb-4">
      <nav className="navbar bg-black">
        <div className="container-xxl">
          <NavLink
            to="/"
            className="navbar-brand text-white fs-3">
            {location.pathname === '/' ? 'Turtle Pizza' : 'Turtle Pizza Admin'}
          </NavLink>
          {location.pathname === '/admin' || location.pathname === '/admin/dishes' || location.pathname === '/admin/orders' ? (
            <div className="d-flex gap-2">
              <NavLink to="/admin/dishes" className="btn btn-primary on-dishes">Dishes</NavLink>
              <NavLink to="/admin/orders" className="btn btn-success on-orders">Orders</NavLink>
            </div>
          ) : null}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;