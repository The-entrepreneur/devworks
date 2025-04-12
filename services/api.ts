import { createBrowserClient } from '@supabase/ssr';
import { ApiResponse } from '../types';

export class ApiService {
  private supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const { data, error } = await this.supabase
        .from(endpoint)
        .select('*');

      if (error) throw error;

      return {
        data: data as T,
        error: null,
        status: 200,
      };
    } catch (error) {
      return {
        data: null as T,
        error: error instanceof Error ? error.message : 'An error occurred',
        status: 500,
      };
    }
  }

  async post<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    try {
      const { data, error } = await this.supabase
        .from(endpoint)
        .insert(body)
        .select()
        .single();

      if (error) throw error;

      return {
        data: data as T,
        error: null,
        status: 201,
      };
    } catch (error) {
      return {
        data: null as T,
        error: error instanceof Error ? error.message : 'An error occurred',
        status: 500,
      };
    }
  }
} 