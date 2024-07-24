import {Route, Routes} from 'react-router-dom';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Home from './containers/Home/Home';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
    </>
  );
};

export default App;