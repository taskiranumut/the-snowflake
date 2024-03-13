import supabase from '@/services/supabase';
import {
  type LoginTypes,
  type SignUpTypes,
  type UpdateUserTypes,
} from '@/services/api/auth.types';
import { getImageInfo } from '@/services/api/utils';
import { type ImageInfo } from '@/services/api/containers.types';

const profilePicturesUrl = import.meta.env.VITE_SUPABASE_PROFILE_PICTURES_URL;

export async function login({ email, password }: LoginTypes) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error('User could not be logged in!');
  }

  return data?.user;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session?.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error('User could not be logged in!');
  }

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error('User could not be logged out!');
  }
}

export async function signUp({ fullName, email, password }: SignUpTypes) {
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        avatar: `${profilePicturesUrl}default.jpg`,
      },
    },
  });

  if (error) {
    throw new Error('User could not be created!');
  }
}

export async function updateCurrentUser({
  password = null,
  fullName = null,
  avatar = null,
}: UpdateUserTypes) {
  if (password === null && fullName === null && avatar === null) return;

  let udpatedData;
  if (password) udpatedData = { password };
  if (fullName) udpatedData = { data: { full_name: fullName } };

  if (avatar) {
    const imageInfo: ImageInfo = getImageInfo(avatar, 'profile');

    const { error: storageError } = await supabase.storage
      .from('profile_pictures')
      .upload(imageInfo.name, avatar);

    if (storageError) {
      throw new Error('Avatar could not be uploaded!');
    }

    udpatedData = { data: { ...udpatedData?.data, avatar: imageInfo.path } };
  }

  if (!udpatedData) return;

  const { data, error } = await supabase.auth.updateUser(udpatedData);

  if (error) {
    throw new Error(error.message);
  }

  return { data, resource: password ? 'Password' : 'User data' };
}
