import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { logout } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown } from "lucide-react";
import { fetchUsers } from "@/api/user";
import { useState, useEffect } from "react";

interface User {
  firstName: string;
  lastName: string;
  imageUrl: string;
}

const AccountMenu = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const users = await fetchUsers();
        console.log("Fetched users:", users);
        if (users && users.length > 0) {
          setUser(users[0]);
        } else {
          console.error("No users found.");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex items-center px-6 py-3 bg-transparent hover:bg-background space-x-1">
          <Avatar className="w-9 h-9">
            <AvatarImage
              src={user?.imageUrl || ""}
              alt={`${user?.firstName} ${user?.lastName}`}
            />
            <AvatarFallback>{user?.firstName?.charAt(0) || "?"}</AvatarFallback>
          </Avatar>
          <div className="flex h-16 items-center justify-between">
            <span className="text-background-text font-medium text-lg">
              {user?.firstName} {user?.lastName}
            </span>
            <ChevronDown className="text-background-text w-5 h-5" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60">
        <div className="flex flex-col items-center gap-2 mt-2">
          <Avatar className="w-16 h-16">
            <AvatarImage
              src={user?.imageUrl || ""}
              alt={`${user?.firstName} ${user?.lastName}`}
            />
            <AvatarFallback>{user?.firstName?.charAt(0) || "?"}</AvatarFallback>
          </Avatar>
          <div>
            <p className="m-0 font-bold text-subtext">
              {user?.firstName} {user?.lastName}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            navigate("/settings");
          }}
        >
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            logout();
            alert("Logged out successfully!");
            navigate("/signout");
          }}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountMenu;
