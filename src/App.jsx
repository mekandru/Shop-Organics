import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Logout from './Logout';
import { fetchLoginStatus } from './services';
import Store from './Store';
import { ErrorContext, UserContext } from './storeContext';

const App = () => {
  const [userState, setUserState] = useState({ isLoggedIn: false });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLoginStatus()
      .then((username) => {
        setUserState({
          isLoggedIn: true,
          username
        });
        setError('');
      });
  }, []);

  return (
    <div className="app">
      <UserContext.Provider value={{ userState, setUserState }}>
        <ErrorContext.Provider value={{ error, setError }}>
          <div className="app-header">
            <div className="logo-header">
              <img className="logo" src="/logo_updated.png" alt="SO" />
              <Link to={"/"} className="store-header"> <h1>SHOP ORGANICS</h1> </Link>
            </div>
            {userState.isLoggedIn &&
              (
                <div className="home-actions">
                  <Link className="store-header-cart" to={"/mycart/"}><span> Cart </span></Link>
                  <Link className="store-header-orders" to={"/myorders/"}><span> My Orders </span></Link>
                  <Logout />
                </div>)
            }
          </div>
          {!userState.loggingOut && <p>{error}</p>}
          {userState.isLoggedIn ?
            < Store /> :
            <Login />}
        </ErrorContext.Provider>
      </UserContext.Provider>
    </div >
  );
};

export default App;