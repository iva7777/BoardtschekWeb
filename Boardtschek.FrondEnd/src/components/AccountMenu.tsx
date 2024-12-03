import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { logout } from "@/lib/utils.ts";
import { Button } from "@/components/ui/button";

const AccountMenu = () => {
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
          <span className="text-white">▼</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80">
        <div className="flex flex-col items-center gap-2 mt-2">
          <div className="w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold">
            M
          </div>
          <div>
            <p className="m-0 font-bold text-gray-800">Martin Iliev</p>
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
