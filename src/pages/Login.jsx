import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {loginRequest} from "../redux/actions/authActions.js";
import ToolContainer from "../layouts/toolContainer/ToolContainer.jsx";
import LoginForm from "../components/loginForm/LoginForm.jsx";
import {useNavigate} from "react-router";


const Login = () => {
    const dispatch = useDispatch();
    const { loading, isAuthenticated } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ login: '', password: '' });

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dash');
        }
    }, [isAuthenticated, navigate]);


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginRequest(credentials));
    };
    return (
        <ToolContainer name="Авторизация">
            <LoginForm
                credentials={credentials}
                setCredentials={setCredentials}
                handleSubmit={handleSubmit}
                loading={loading}
            />
        </ToolContainer>
    );
};

export default Login;
