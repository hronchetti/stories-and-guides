import React from 'react';

import { Footer } from './Footer';
import { Nav } from './Nav';

export const Layout = ({ children }) => {
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  );
};
