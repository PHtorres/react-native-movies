import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GenresProvider } from './providers/GenresProvider';
import { LoadingProvider } from './providers/LoadingProvider';
import { QueryProvider } from './providers/QueryProvider';
import { Routes } from './routes';

export function App() {
  return (
    <SafeAreaProvider>
      <QueryProvider>
        <LoadingProvider>
          <GenresProvider>
            <Routes />
          </GenresProvider>
        </LoadingProvider>
      </QueryProvider>
    </SafeAreaProvider>
  );
}
