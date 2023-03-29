import React from 'react';
import { Loading } from '../components/Loading';
import { useLoading } from '../state/hooks/useLoading';

export const LoadingProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { isVisible } = useLoading();
  return (
    <>
      {children}
      {isVisible && <Loading />}
    </>
  );
};
