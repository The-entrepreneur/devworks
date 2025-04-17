import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SignOutButton } from '@/components/sign-out-button';

export default async function ProtectedPage() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/sign-in');
  }

  const uniqueId = session.user.user_metadata?.unique_id || 'Not assigned yet';

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Protected Page</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">Welcome, {session.user.email}!</h2>
        <p className="text-gray-600 mb-4">
          This is a protected page. Only authenticated users can see this content.
        </p>
        <div className="mt-4 mb-6">
          <h3 className="font-medium mb-2">Your Unique ID:</h3>
          <div className="bg-gray-100 p-4 rounded">
            <code className="text-sm font-mono">{uniqueId}</code>
          </div>
        </div>
        <div className="mt-4 mb-6">
          <h3 className="font-medium mb-2">Your Session Info:</h3>
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {JSON.stringify(session, null, 2)}
          </pre>
        </div>
        <div className="max-w-xs">
          <SignOutButton />
        </div>
      </div>
    </div>
  );
}
