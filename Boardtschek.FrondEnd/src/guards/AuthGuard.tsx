// import React from 'react';
// // import { Navigate } from 'react-router-dom';
// // import {getToken} from "@/lib/utils.ts";
//
//
// const AuthGuard: React.FC<{ children: JSX.Element }> = ({ children }) => {
//     // const token = getToken(); // Check token existence
//     // return token ? children : <Navigate to="/login" replace />;
//     return children;
// };
//
// export default AuthGuard;



import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Header from "@/components/Shared/Header";

interface Props {
    children: JSX.Element;
}

const AuthGuard: React.FC<Props> = ({ children }) => {
    const location = useLocation();
    const isAuthenticated = !!localStorage.getItem("token");


    const hideHeaderRoutes = ["/create-account", "/login"];
    const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);

    if (!isAuthenticated && location.pathname !== "/create-account") {
        return <Navigate to="/login" replace />;
    }

    return (
        <>
            {}
            {!shouldHideHeader && <Header />}
            {children}
        </>
    );
};

export default AuthGuard;
