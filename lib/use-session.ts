'use client';

import { useEffect, useState, useCallback } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const updateSession = async (nextSession: Session | null) => {
      if (!mounted) return;
      setSession(nextSession);

      if (nextSession) {
        const { data } = await supabase
          .from('admin_users')
          .select('user_id')
          .eq('user_id', nextSession.user.id)
          .maybeSingle();
        if (!mounted) return;
        setIsAdmin(Boolean(data));
      } else {
        setIsAdmin(false);
      }

      setLoading(false);
    };

    supabase.auth.getSession().then(({ data }) => void updateSession(data.session));

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      void updateSession(session);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  return { session, isAdmin, loading, signOut };
}
