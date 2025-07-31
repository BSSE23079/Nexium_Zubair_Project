import styles from './Core.module.css';

export default function Button({ children, loading, block, ...props }) {
  return (
    <button
      className={`${styles.button} ${block ? styles.block : ''}`}
      disabled={loading}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
}