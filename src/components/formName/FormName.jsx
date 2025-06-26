import styles from './FormName.module.css';

const FormName = (props) => {
    return (
        <div className={styles.formName}>
            {props.name}
        </div>
    )
}
export default FormName;