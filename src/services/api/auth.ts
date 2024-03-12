import supabase from '@/services/supabase';
import { type LoginTypes } from '@/services/api/auth.types';

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
