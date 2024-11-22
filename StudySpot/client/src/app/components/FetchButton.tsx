import styles from '../styles/FetchButton.module.css';

interface FetchButtonProps {
    onClick: () => void;
}

export default function FetchButton({ onClick }: FetchButtonProps) {
    return (
        <button onClick={onClick} className={styles.button}>
            Get Study Spots
        </button>
    );
}
