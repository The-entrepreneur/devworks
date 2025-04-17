'use client';

import { useData } from '@/hooks/use-data';
import { Database } from '@/types/supabase';

type Profile = Database['public']['Tables']['profiles']['Row'];

export function ProfileList() {
  const {
    items: profiles,
    isLoadingItems,
    create,
    update,
    delete: deleteProfile,
    isCreating,
    isUpdating,
    isDeleting,
  } = useData('profiles');

  if (isLoadingItems) {
    return <div>Loading profiles...</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Profiles</h2>
      
      {/* Create Profile Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          create({
            name: formData.get('name') as string,
            email: formData.get('email') as string,
          });
          e.currentTarget.reset();
        }}
        className="space-y-2"
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="border p-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          disabled={isCreating}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {isCreating ? 'Creating...' : 'Create Profile'}
        </button>
      </form>

      {/* Profiles List */}
      <div className="space-y-2">
        {profiles?.map((profile: Profile) => (
          <div
            key={profile.id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold">{profile.name}</h3>
              <p className="text-gray-600">{profile.email}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() =>
                  update({
                    id: profile.id,
                    data: { name: `${profile.name} (updated)` },
                  })
                }
                disabled={isUpdating}
                className="bg-yellow-500 text-white px-3 py-1 rounded text-sm disabled:opacity-50"
              >
                Update
              </button>
              <button
                onClick={() => deleteProfile(profile.id)}
                disabled={isDeleting}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm disabled:opacity-50"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 