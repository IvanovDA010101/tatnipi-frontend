import styles from "./LoginForm.module.css";

const LoginForm = (props) => {
    const { credentials, setCredentials, handleSubmit, loading } = props

    return (
        <form>
            <input className={styles.inputForm}
                type="text"
                value={credentials.login}
                onChange={(e) => setCredentials({...credentials, login: e.target.value})}
                placeholder="Username"
            />
            <input className={styles.inputForm}
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                placeholder="Password"
            />
            <button onClick={handleSubmit} disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
            </button>
            {/*{error && <p>{error}</p>}*/}
        </form>
    )
}

export default LoginForm;