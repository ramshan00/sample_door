'use client';

import React from 'react';

// This will be useful for wrapping context providers, like Firebase Auth.
export function Providers({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
