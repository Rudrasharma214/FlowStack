import { useQuery } from '@tanstack/react-query';
import { authService } from '../../services/authService';

/**
 * User profile query hook
 */
export const useGetUser = (options = {}) => {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => authService.getProfile(),
    ...options,
  });
};