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

const AccountMenu = () => {
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex items-center px-6 py-3 bg-transparent hover:bg-backgorund space-x-2">
          <Avatar className="w-9 h-9">
            <AvatarImage
              src="https://careers.nemetschek.bg/storage/Images/SpeedItUp/mentors/Teodora-Zdravcheva.png"
              alt="User Avatar"
            />
            <AvatarFallback>J</AvatarFallback>
          </Avatar>
          <span className="text-black font-medium text-lg">Teodora</span>
          <ChevronDown className="text-black w-5 h-5 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60">
        <div className="flex flex-col items-center gap-2 mt-2">
          <Avatar className="w-16 h-16">
            <AvatarImage
              src="https://careers.nemetschek.bg/storage/Images/SpeedItUp/mentors/Teodora-Zdravcheva.png"
              alt="User Avatar"
            />
            <AvatarFallback>J</AvatarFallback>
          </Avatar>
          <div>
            <p className="m-0 font-bold text-gray-800">Teodora</p>
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
