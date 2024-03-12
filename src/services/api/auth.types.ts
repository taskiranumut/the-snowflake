export type LoginTypes = {
  email: string;
  password: string;
};

export type SignUpTypes = {
  fullName: string;
} & LoginTypes;
