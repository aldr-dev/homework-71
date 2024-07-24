import {store} from './app/store';
import App from './App';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import {Provider} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ToastContainer position="bottom-right" theme="light" autoClose={3000} />
    <Provider store={store}>
      <App/>
    </Provider>
  </BrowserRouter>
);