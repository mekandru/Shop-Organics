import React, { useContext, useEffect, useState } from 'react';
import errorMessages from './errorMessages';
import './login.css';
import { sendLogin } from './services';
import { ErrorContext, UserContext } from './storeContext';

const Login = () => {
    const { userState, setUserState } = useContext(UserContext);
    const { error, setError } = useContext(ErrorContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        setError('');
    }, []);

    const performLogin = () => {
        setUserState({
            loggingOut: false
        });
        setError('');

        if (!username) {
            setError('Please enter username');
            setPassword('');
            return;
        }

        if (!password) {
            setError('Please enter password');
            return;
        }

        sendLogin(username, password)
            .then((sessionInfo) => {
                setUserState({
                    isLoggedIn: true,
                    username: sessionInfo.username
                });

                setError('');
                setUsername('');
                setPassword('');
            })
            .catch((err) => {
                if (err.code !== 'PASSWORD_REQUIRED') {
                    setUsername('');
                }

                setPassword('');
                setError(errorMessages[err.code]);
            });
    };

    return (
        <div className="login">
            <form>
                <input value={username} className="login-username" onChange={(e) => setUsername(e.target.value)} required placeholder="Enter username" />
                <br />
                <input value={password} className="login-password" type="password" onChange={(e) => setPassword(e.target.value)} required placeholder="Enter password" />
                <br />
                <input className="submit" type="button" value="Login" onClick={performLogin} />
            </form>
        </div>
    );
};

export default Login;