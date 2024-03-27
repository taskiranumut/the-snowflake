import { useScreenSizeContext } from '@/context';
import { useUser } from '@/features/auth/hooks';
import { useTranslation } from 'react-i18next';

const profilePicturesUrl = import.meta.env.VITE_SUPABASE_PROFILE_PICTURES_URL;

export function UserAvatar() {
  const { t } = useTranslation();
  const { isLoading, user } = useUser();
  const { isSm } = useScreenSizeContext();

  if (isLoading) return null;

  return (
    <div className="flex items-center gap-3 text-base text-gray-600 dark:text-gray-300">
      <img
        src={user?.user_metadata?.avatar || `${profilePicturesUrl}default.jpg`}
        alt={t('message.common.avatarAlt', {
          name: user?.user_metadata.full_name || t('label.common.user'),
        })}
        className="block aspect-square size-8 rounded-full object-cover object-center outline-2 outline-gray-100 sm:size-10"
      />
      {!isSm && (
        <span>{user?.user_metadata.full_name || t('label.common.user')}</span>
      )}
    </div>
  );
}
