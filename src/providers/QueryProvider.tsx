import { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider, focusManager } from '@tanstack/react-query';
import { AppState, AppStateStatus } from 'react-native';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 4,
      retryDelay: 2000,
    },
  },
});

export function QueryProvider({ children }: PropsWithChildren) {
  focusManager.setEventListener(handleFocus => {
    const handleAppChangeState = (state: AppStateStatus) => {
      handleFocus(state === 'active');
    };
    const subscription = AppState.addEventListener('change', handleAppChangeState);

    return () => {
      subscription.remove();
    };
  });
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
