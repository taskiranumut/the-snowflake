import { useUser } from '@/features/auth/hooks';

const profilePicturesUrl = import.meta.env.VITE_SUPABASE_PROFILE_PICTURES_URL;

export function UserAvatar() {
  const { isLoading, user } = useUser();

  if (isLoading) return null;

  return (
    <div className="flex items-center gap-3 text-base text-gray-600">
      <img
        src={user?.user_metadata?.avatar || `${profilePicturesUrl}default.jpg`}
        alt={`Avatar of ${user?.user_metadata.full_name || 'user'}`}
        className="block aspect-square size-10 rounded-full object-cover object-center outline-2 outline-gray-100"
      />
      <span className="text-sm">{user?.user_metadata.full_name || 'user'}</span>
    </div>
  );
}
