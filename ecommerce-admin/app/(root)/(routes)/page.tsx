'use client';

import { useEffect } from 'react';

import { useStoreModal } from '@/hooks/useStoreModal';

const SetupPage = () => {
  // const storeModal = useStoreModal();
  const isOpen = useStoreModal((state) => state.isOpen);
  const onOpen = useStoreModal((state) => state.onOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
};

export default SetupPage;
