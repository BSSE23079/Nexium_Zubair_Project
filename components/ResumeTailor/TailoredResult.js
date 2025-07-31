import styles from './ResumeEditor.module.css';

// This "export default" is the critical part
export default function TailoredResult({ content }) {
  return (
    <div className={styles.panel}>
      <h2 className={styles.panelHeader}>✨ Your Tailored Resume ✨</h2>
      <div className={styles.resultContent} dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}