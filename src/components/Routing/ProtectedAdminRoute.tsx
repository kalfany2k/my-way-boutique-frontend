import { useUser } from "../../contexts/UserContext";
import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from "../../services/apiClient";
import Cookies from "js-cookie";
import { useApi } from "../../contexts/ApiContext";

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

const ProtectedAdminRoute: React.FC<ProtectedAdminRouteProps> = ({
  children,
}) => {
  const { user, setUser } = useUser();
  const { handleLogOut } = useApi();
  const location = useLocation();
  const [isVerifying, setIsVerifying] = useState<boolean>(true);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  useEffect(() => {
    const verifyAdminStatus = async () => {
      const authToken = Cookies.get("authToken");
      if (!authToken) {
        setIsVerifying(false);
        return;
      }

      try {
        const response = await apiClient.get("/users/verify-admin", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (response.data?.status === "verified") {
          setIsAuthorized(true);
        }
      } catch (error: any) {
        if (error.response?.status === 401) {
          // Clear auth state if token is expired/invalid
          handleLogOut();
          setUser(null);
        }
        setIsAuthorized(false);
      }
      setIsVerifying(false);
    };

    verifyAdminStatus();
  }, []);

  if (isVerifying) {
    return (
      <div className="flex h-page-height w-screen items-center justify-center">
        <span className="text-xl">Verificam rolul tau...</span>
      </div>
    );
  }

  if (!user || !isAuthorized) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedAdminRoute;
