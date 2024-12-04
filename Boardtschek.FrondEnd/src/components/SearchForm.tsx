import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface SearchFormProps {
  placeholder?: string;
  ariaLabel?: string;
  size?: "small" | "medium" | "large";
}

const SearchForm: React.FC<SearchFormProps> = ({
  placeholder = "What are you looking for?",
  ariaLabel = "Search for board games",
  size = "medium",
}) => {
  const sizes = {
    small: "max-w-sm",
    medium: "max-w-lg",
    large: "max-w-xl",
  };

  return (
    <div className={`w-full ${sizes[size]}`}>
      <form className="relative" autoComplete="off">
        <Input
          type="search"
          placeholder={placeholder}
          className="h-12 border border-subtext rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
          aria-label={ariaLabel}
        />

        <Button
          type="submit"
          size="icon"
          className="absolute right-0 top-0 h-12 w-12 rounded-lg flex items-center justify-center"
        >
          <Search className="h-5 w-5 text-white" />
          <span className="sr-only">Search</span>
        </Button>
      </form>
    </div>
  );
};

export default SearchForm;
