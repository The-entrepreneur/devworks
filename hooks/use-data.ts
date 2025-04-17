import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { databaseService } from '@/services/database-service';
import { Database } from '@/types/supabase';

export function useData<T extends keyof Database['public']['Tables']>(
  table: T,
  id?: string
) {
  const queryClient = useQueryClient();

  // Fetch single item
  const { data: item, isLoading: isLoadingItem } = useQuery({
    queryKey: [table, id],
    queryFn: () => databaseService.findOne(table, id!),
    enabled: !!id,
  });

  // Fetch all items
  const { data: items, isLoading: isLoadingItems } = useQuery({
    queryKey: [table],
    queryFn: () => databaseService.findAll(table),
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: (data: Database['public']['Tables'][T]['Insert']) =>
      databaseService.create(table, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [table] });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<Database['public']['Tables'][T]['Update']>;
    }) => databaseService.update(table, id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [table] });
      if (id) {
        queryClient.invalidateQueries({ queryKey: [table, id] });
      }
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => databaseService.delete(table, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [table] });
      if (id) {
        queryClient.invalidateQueries({ queryKey: [table, id] });
      }
    },
  });

  return {
    item,
    items,
    isLoadingItem,
    isLoadingItems,
    create: createMutation.mutate,
    update: updateMutation.mutate,
    delete: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
} 