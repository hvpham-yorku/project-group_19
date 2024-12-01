// import styles from '../styles/LoadingIndicator.module.css';

// export default function LoadingIndicator() {
//     return (
//         <div className={styles.loader}>
//             <div className={styles.spinner}></div>
//             <span>Loading...</span>
//         </div>
//     );
// }
import React from 'react';
import styles from '../styles/LoadingIndicator.module.css';

const Loading: React.FC = () => (
    <div className={styles.spinner}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default Loading;