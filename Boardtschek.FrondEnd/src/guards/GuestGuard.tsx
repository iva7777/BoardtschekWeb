import React from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "@/lib/utils";

interface GuestGuardProps {
    children: JSX.Element;
}

const GuestGuard: React.FC<GuestGuardProps> = ({ children }) => {
    const token = getToken();
    if (token) {
        return <Navigate to="/homepage" replace />;
    }
    return children;
};

export default GuestGuard;
