import styles from '../styles/LoadingIndicator.module.css';

export default function LoadingIndicator() {
    return (
        <div className={styles.loader}>
            <div className={styles.spinner}></div>
            <span>Loading...</span>
        </div>
    );
}
