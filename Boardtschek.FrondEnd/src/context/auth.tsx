// import React, { createContext, useContext, useState, useEffect } from "react";

// interface AuthContextType {
//   isAuthenticated: boolean;
//   userRole: string | null;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// interface AuthContextType {
//   isAuthenticated: boolean;
//   userRole: string | null;
//   setAuthState: (isAuthenticated: boolean, userRole: string | null) => void;
// }

// const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userRole, setUserRole] = useState<string | null>(null);

//   const setAuthState = (auth: boolean, role: string | null) => {
//     setIsAuthenticated(auth);
//     setUserRole(role);

//     if (auth) {
//       localStorage.setItem("token", "your-token");
//       localStorage.setItem("role", role || "");
//     } else {
//       localStorage.clear();
//     }
//   };

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const role = localStorage.getItem("role");
//     setIsAuthenticated(!!token);
//     setUserRole(role);
//   }, []);

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, userRole, setAuthState }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
