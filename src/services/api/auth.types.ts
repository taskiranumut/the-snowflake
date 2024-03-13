export type LoginTypes = {
  email: string;
  password: string;
};

export type SignUpTypes = {
  fullName: string;
} & LoginTypes;

export type UpdateUserTypes = {
  password?: string | null;
  fullName?: string | null;
  avatar?: File | null;
};
