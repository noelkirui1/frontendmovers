import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ id: null, username: '', email: '', role: '' });
  const [company, setCompany] = useState({ id: null, name: '', email: '', role: '' });

  return (
    <UserContext.Provider value={{ user, setUser, company, setCompany }}>
      {children}
    </UserContext.Provider>
  );
};
