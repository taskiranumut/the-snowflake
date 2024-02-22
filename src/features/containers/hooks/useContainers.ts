import { getContainers } from '@/services/api';
import { useQuery } from '@tanstack/react-query';

export function useContainers() {
  const { data: containers, isLoading } = useQuery({
    queryKey: ['containers'],
    queryFn: getContainers,
  });

  return { isLoading, containers };
}
