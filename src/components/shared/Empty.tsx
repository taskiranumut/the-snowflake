type EmptyProps = {
  resource: string;
};

export function Empty({ resource }: EmptyProps) {
  return <p>No {resource} could be found.</p>;
}
