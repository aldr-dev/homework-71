import React, {PropsWithChildren} from 'react';
import Navbar from '../Navbar/Navbar';

const Layout: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <>
      <Navbar />
      <main className="container-xxl">
        {children}
      </main>
    </>
  );
};

export default Layout;