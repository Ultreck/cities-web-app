// hooks/useAuth.ts
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '@/redux/userSlice';

export const useAuth = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const { details: user, isLoading } = useSelector(() => state.user);

  // Logout function that can be used anywhere
  const logout = () => {
    // Clear user from Redux
    dispatch(clearUser());
    
    // Clear any auth tokens from localStorage/sessionStorage if you have them
    localStorage.removeItem('auth_token');
    sessionStorage.removeItem('auth_token');
    localStorage.removeItem('redirectPath');
    
    // Redirect to login page
    router.push('/login');
  };

  // Check if user is authenticated
  const isAuthenticated = !!user;

  // Hook to redirect authenticated users away from auth pages
  const useRedirectIfAuthenticated = (defaultRedirectPath = '/n') => {
    useEffect(() => {
      if (!isLoading && user) {
        // Check if current page is an auth page
        const isAuthPage = pathname === '/login' || pathname.includes('/register') || pathname === 'forgot-password' || pathname === '/finish-setup';
        
        if (isAuthPage) {
          // Get the redirect URL from query params or localStorage
          const redirectParam = searchParams.get('redirect');
          const storedRedirect = localStorage.getItem('redirectPath');
          
          const redirectTo = redirectParam || storedRedirect || defaultRedirectPath;
          
          // Clear stored redirect path
          localStorage.removeItem('redirectPath');
          
          router.push(redirectTo);
        }
      }
    }, [user, isLoading, pathname, router, searchParams, defaultRedirectPath]);
  };

  return {
    user,
    isLoading,
    isAuthenticated,
    logout,
    useRedirectIfAuthenticated,
  };
};

// Hook to protect routes requiring authentication
export const useRequireAuth = (redirectPath = '/login') => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isLoading && !user) {
      // Store the current path for redirecting back after login
      if (pathname !== '/login' && !pathname.includes('/register')) {
        localStorage.setItem('redirectPath', pathname);
      }
      router.push(`${redirectPath}`);
    }
  }, [user, isLoading, router, redirectPath, pathname]);

  return { user, isLoading };
};