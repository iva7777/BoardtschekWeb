import { Link, useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";
import { logout } from "@/lib/utils.ts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <header className="text-[#343A40] py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8">
        <Logo size="large" showText={true} />

        <nav className="space-x-8 text-sm font-medium">
          <Link to="/games" className="hover:text-[#333]">
            All Games
          </Link>
          <Link to="/my-rented-games" className="hover:text-[#333]">
            My Rented Games
          </Link>
        </nav>

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
              Setting
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
      </div>
    </header>
  );
}
