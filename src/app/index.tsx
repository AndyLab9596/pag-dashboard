/**
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider, LightMode } from '@chakra-ui/react';
import { GlobalStyle } from 'styles/global-styles';
import { AuthContextProvider } from './components/Auth/authContext';
import { useAuthProvider } from './pages/Login/useAuthProvider';
import { AdminLayout } from './routes/layouts/Admin.layout';
import { AuthLayout } from './routes/layouts/Auth.layout';
import { RoutesPath } from './routes/routesPath';
import theme from './theme/theme';

export function App() {
  const authProvider = useAuthProvider();

  return (
    <div className="bg-white text-black">
      <ChakraProvider theme={theme}>
        <LightMode>
          <BrowserRouter>
            <Helmet titleTemplate="%s - Dashboard - PAG" defaultTitle="Dashboard - PAG">
              <meta name="description" content="Dashboard - PAG" />
            </Helmet>

            <AuthContextProvider authProvider={authProvider}>
              <Routes>
                <Route path={RoutesPath.LOGIN + '/*'} element={<AuthLayout />} />
                <Route path={RoutesPath.ROOT + '*'} element={<AdminLayout />} />
              </Routes>
              <GlobalStyle />
            </AuthContextProvider>
          </BrowserRouter>
        </LightMode>
      </ChakraProvider>
    </div>
  );
}
