import { QueryProvider } from '@/providers/query-provider';
import { ProfileList } from '@/components/profile-list';

export default function ProfilesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Profiles Management</h1>
      <QueryProvider>
        <ProfileList />
      </QueryProvider>
    </div>
  );
} 