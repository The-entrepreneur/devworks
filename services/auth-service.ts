'use client';

import { createClient } from '@/utils/supabase/client';
import { Provider } from '@supabase/supabase-js';

export class AuthService {
  private supabase = createClient();

  /**
   * Sign in with an OAuth provider
   * @param provider The OAuth provider to use
   * @returns A promise that resolves when the sign-in process is complete
   */
  async signInWithOAuth(provider: Provider) {
    const { data, error } = await this.supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      throw new Error(`OAuth sign in failed: ${error.message}`);
    }

    return data;
  }

  /**
   * Sign out the current user
   * @returns A promise that resolves when the sign-out process is complete
   */
  async signOut() {
    const { error } = await this.supabase.auth.signOut();
    
    if (error) {
      throw new Error(`Sign out failed: ${error.message}`);
    }
  }

  /**
   * Get the current user session
   * @returns The current session or null if not signed in
   */
  async getSession() {
    const { data, error } = await this.supabase.auth.getSession();
    
    if (error) {
      throw new Error(`Failed to get session: ${error.message}`);
    }
    
    return data.session;
  }
}

// Create a singleton instance
export const authService = new AuthService(); 