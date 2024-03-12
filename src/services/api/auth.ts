import supabase from '@/services/supabase';
import { type LoginTypes, type SignUpTypes } from '@/services/api/auth.types';

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
  const { data, error } = await supabase.auth.signUp({
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

  console.log('data :>> ', data);
}
