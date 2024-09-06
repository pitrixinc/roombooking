import React from "react";
import "@/styles/globals.css";
import { FixedPlugin } from "@/components/Home/fixed-plugin";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }) {
  return ( 
   <>
   <ToastContainer
          theme="light"
          position="top-right"
          autoClose={4000}
          closeOnClick
          pauseOnHover={false}
        /> 
     <Component {...pageProps} /> 
     <FixedPlugin />
   </>
  );
};
