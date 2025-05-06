'use client'

import React, {PropsWithChildren} from 'react';
import {SessionProvider} from "next-auth/react";

const AuthProvider = ({ children}: PropsWithChildren) => {
  return (
        <SessionProvider>{children}</SessionProvider>
  );
};

export default AuthProvider;
