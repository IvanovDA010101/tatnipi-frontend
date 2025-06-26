import styles from './toolContainer.module.css';
import FormName from "../../components/formName/FormName.jsx";

const ToolContainer = (props) => {
    return (

        <div className={styles.toolContainer}>
            <FormName name={props.name}/>
            <hr className="section-divider"/>
            {props.children}
        </div>
    )
}

export default ToolContainer;