
import '../style/style.css'

import 'mdb-react-ui-kit/dist/css/mdb.min.css'

import React from 'react';
import ReactDOM from "react-dom";
import App from "next/app";
import Head from "next/head";
import Router from "next/router";
import {AuthProvider} from "../hooks/auth"
function MyApp({ Component, pageProps }) {
    const Layout = Component.layout || (({ children }) => <>{children}</>);

  return (
    <React.Fragment>
    <Head>
      
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <title>Tested - ECU Solution</title>
      <link href="https://use.fontawesome.com/releases/v5.15.1/css/all.css" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css?family=Raleway:300,400,500,700&display=swap" rel="stylesheet" />
    </Head>
    <body className="body">
    <AuthProvider>
      
    <Layout>

      <Component {...pageProps} />
    </Layout>
    </AuthProvider>

    </body>

  </React.Fragment>)
}

export default MyApp