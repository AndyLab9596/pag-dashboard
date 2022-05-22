import { useLocation } from 'react-router-dom';

export default function useQuery() {
  const { search } = useLocation();
  const query = new URLSearchParams(search);

  const [sa, cycleId, promoted, contributorId] = [
    query.get('sa'),
    query.get('cycleId'),
    query.get('promoted'),
    query.get('contributorId'),
  ];

  return {
    sa: sa === '1',
    cycleId: cycleId ? parseInt(cycleId) : undefined,
    promoted: promoted === 'true',
    contributorId: contributorId ? parseInt(contributorId) : undefined,
  };
}
