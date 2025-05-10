'use client';

import { ReactNode } from 'react';

const PageWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen w-full max-w-[430px] mx-auto px-4 pb-20">
      {children}
    </div>
  );
};

export default PageWrapper;
