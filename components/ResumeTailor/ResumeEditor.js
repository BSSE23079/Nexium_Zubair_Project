import { useState } from 'react';
import styles from './ResumeEditor.module.css';
import Button from '../Core/Button';
import TailoredResult from './TailoredResult';
import Loader from '../Core/Loader';
import Toast from '../Core/Toast';

export default function ResumeEditor() {
  const [resume, setResume] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [tailoredResume, setTailoredResume] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTailor = async () => {
  setLoading(true);
  setError('');
  setTailoredResume('');
  try {
    const response = await fetch('/api/tailor-resume', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resume, jobDescription }),
    });

    const data = await response.json();

    // THIS IS THE NEW LINE - IT WILL SHOW US THE AI'S RESPONSE
    console.log('Data received from API:', data); 

    if (!response.ok) throw new Error(data.error || 'An unknown error occurred');

    setTailoredResume(data.tailoredResume);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className={styles.editorContainer}>
      <div className={styles.panels}>
        <div className={styles.panel}>
          <h2 className={styles.panelHeader}>Your Resume</h2>
          <textarea
            className={styles.textArea}
            placeholder="Paste your full resume here..."
            value={resume}
            onChange={(e) => setResume(e.target.value)}
          />
        </div>
        <div className={styles.panel}>
          <h2 className={styles.panelHeader}>Job Description</h2>
          <textarea
            className={styles.textArea}
            placeholder="Paste the target job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.actions}>
        <Button onClick={handleTailor} loading={loading} disabled={!resume || !jobDescription}>
          Tailor My Resume
        </Button>
      </div>
      {loading && <Loader />}
      <Toast message={error} type="error" />
      {tailoredResume && <TailoredResult content={tailoredResume} />}
    </div>
  );
}