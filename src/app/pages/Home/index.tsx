import { useAuthContext } from 'app/components/Auth/authContext';
import { DashboardAdmin } from 'app/components/ui/dashboard/DashboardAdmin/Loadable';
import { DashboardEvaluation } from 'app/components/ui/dashboard/DashboardEvaluation/Loadable';

export function HomePage() {
  const { isAdminMode } = useAuthContext();
  if (isAdminMode) return <DashboardAdmin />;
  return <DashboardEvaluation />;
}

export default HomePage;
