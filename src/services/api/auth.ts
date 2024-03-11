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
