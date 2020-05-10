import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './logout.css';
import { logoutUser } from './services';
import { UserContext } from './storeContext';

const Logout = () => {
    const { userState, setUserState } = useContext(UserContext);
    const history = useHistory();
    useEffect(() => {
    }, []);

    const performLogout = () => {
        logoutUser()
            .then(() => {
                setUserState({
                    isLoggedIn: false,
                    loggingOut: true
                });
                history.push("/");
            })
            .catch((err) => {
                setUserState({
                    isLoggedIn: false,
                    loggingOut: true
                });
                history.push("/");
            });
    };

    return (
        <div className="logout-container">
            <button className="logout" onClick={performLogout}>Logout</button>
        </div>
    );
};

export default Logout;