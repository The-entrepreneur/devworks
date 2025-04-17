import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Type-safe database operations
export const databaseService = {
  // Create
  async create<T extends keyof Database['public']['Tables']>(
    table: T,
    data: Database['public']['Tables'][T]['Insert']
  ) {
    const { data: result, error } = await supabase
      .from(table as string)
      .insert(data)
      .select()
      .single();

    if (error) throw error;
    return result;
  },

  // Read
  async findOne<T extends keyof Database['public']['Tables']>(
    table: T,
    id: string
  ) {
    const { data, error } = await supabase
      .from(table as string)
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async findAll<T extends keyof Database['public']['Tables']>(
    table: T,
    query?: {
      column?: string;
      value?: any;
      orderBy?: string;
      ascending?: boolean;
    }
  ) {
    let queryBuilder = supabase.from(table as string).select('*');

    if (query?.column && query?.value) {
      queryBuilder = queryBuilder.eq(query.column, query.value);
    }

    if (query?.orderBy) {
      queryBuilder = queryBuilder.order(query.orderBy, {
        ascending: query.ascending ?? true,
      });
    }

    const { data, error } = await queryBuilder;

    if (error) throw error;
    return data;
  },

  // Update
  async update<T extends keyof Database['public']['Tables']>(
    table: T,
    id: string,
    data: Partial<Database['public']['Tables'][T]['Update']>
  ) {
    const { data: result, error } = await supabase
      .from(table as string)
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return result;
  },

  // Delete
  async delete<T extends keyof Database['public']['Tables']>(table: T, id: string) {
    const { error } = await supabase.from(table as string).delete().eq('id', id);
    if (error) throw error;
    return true;
  },
}; 