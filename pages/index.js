import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import Auth from '../components/Auth/Auth';
import ResumeEditor from '../components/ResumeTailor/ResumeEditor';
import Header from '../components/Core/Header';
import Footer from '../components/Core/Footer';
import Loader from '../components/Core/Loader';

export default function Home() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentSession = supabase.auth.session();
    setSession(currentSession);
    setLoading(false);

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setLoading(false);
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  if (loading) {
    return <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}><Loader /></div>;
  }

  if (!session) {
    return <Auth />;
  }

  return (
    <div>
      <Header user={session.user} />
      <main>
        <ResumeEditor />
      </main>
      <Footer />
    </div>
  );
}