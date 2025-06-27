// components/FullScreenToolContainer/FullScreenToolContainer.jsx
import styles from './FullScreenToolContainer.module.css';
import FormName from "../../components/formName/FormName.jsx";

const FullScreenToolContainer = (props) => {
    return (
        <div className={styles.fullScreenContainer}>
            <FormName name={props.name}/>
            <hr className={styles.sectionDivider}/>
            {props.children}
        </div>
    );
};

export default FullScreenToolContainer;