import React, { useCallback } from 'react';
import Footer from './Home/footer';
import Navbar from './Home/navbar';

export default function Layout({ children }) {
  
  return (
    <React.Fragment>
        <Navbar />
      <main
        sx={{
          variant: 'layout.main',
        }}
      >
        {children}
      </main>
      <Footer />
    </React.Fragment>
  );
}
