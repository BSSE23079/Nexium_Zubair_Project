import { supabase } from '../../lib/supabaseClient';
import styles from './Core.module.css';
import Button from './Button';

export default function Header({ user }) {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>Nexium_Zubair_Project</div>
      <div className={styles.userInfo}>
        <span>{user.email}</span>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </header>
  );
}