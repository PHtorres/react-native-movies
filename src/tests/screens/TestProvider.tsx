import React from 'react';
import { GenresProvider } from '../../providers/GenresProvider';
import { LoadingProvider } from '../../providers/LoadingProvider';
import { QueryProvider } from '../../providers/QueryProvider';

export function TestProvider({ children }: React.PropsWithChildren) {
  return (
    <QueryProvider>
      <LoadingProvider>
        <GenresProvider>{children}</GenresProvider>
      </LoadingProvider>
    </QueryProvider>
  );
}
