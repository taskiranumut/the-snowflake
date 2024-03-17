import { getContainers } from '@/services/api';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { type DataContainer } from '@/services/api/containers.types';

type UseContainersOptions = {
  getCachedData?: boolean;
};

type QueryOptions = {
  queryKey: string[];
  queryFn: () => Promise<DataContainer[]>;
  initialData?: DataContainer[] | undefined;
  enabled?: boolean;
};

export function useContainers(
  options: UseContainersOptions = { getCachedData: false },
) {
  const queryClient = useQueryClient();
  const cachedData = queryClient.getQueryData<DataContainer[] | undefined>([
    'containers',
  ]);

  const queryOptions: QueryOptions = {
    queryKey: ['containers'],
    queryFn: getContainers,
  };

  if (options?.getCachedData) {
    queryOptions.initialData = cachedData;
    queryOptions.enabled = !!cachedData;
  }

  const { data: containers, isLoading } = useQuery(queryOptions);

  return { isLoading, containers };
}
