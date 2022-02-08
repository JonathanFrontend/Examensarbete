import React, { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext';

export const useUser = (userData) => {
    const { user, setUser } = useContext(UserContext);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
};