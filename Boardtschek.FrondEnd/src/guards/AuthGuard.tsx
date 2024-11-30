import React from 'react';
// import { Navigate } from 'react-router-dom';
// import {getToken} from "@/lib/utils.ts";


const AuthGuard: React.FC<{ children: JSX.Element }> = ({ children }) => {
    // const token = getToken(); // Check token existence
    // return token ? children : <Navigate to="/login" replace />;
    return children;
};

export default AuthGuard;