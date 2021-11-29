import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import wrapper from '../store/configureStore';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = ({Component}) => {
    //Component부분이 다른 page.js로 들어온다.
    //다른 페이지들의 부모
    return (
        <>
        <Head>
            <meta charSet = "utf-8"/>
            <title>picture-diary</title>
        </Head>
        <Component />
        </>
    );    
}
App.propTypes = { 
    Component: PropTypes.elementType.isRequired,
}

// export default wrapper.withRedux(App);
export default wrapper.withRedux(App);