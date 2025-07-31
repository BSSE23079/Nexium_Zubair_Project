import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import styles from './Auth.module.css';
import Button from '../Core/Button';

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const { error } = await supabase.auth.signIn({ email });
      if (error) throw error;
      setMessage('Success! Check your email for the magic link.');
    } catch (error) {
      setMessage(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h1 className={styles.header}>Resume Tailor AI</h1>
        <p className={styles.description}>
          Sign in to start tailoring your resume with the power of AI.
        </p>
        <form onSubmit={handleLogin}>
          <input
            className={styles.inputField}
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" loading={loading} block>
            Send Magic Link
          </Button>
        </form>
        {message && <p className={styles.message}>{message}</p>}
      </div>
    </div>
  );
}