import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Search } from "lucide-react";
import { useFundSearch } from "@/hooks/useFundSearch";
import { cn } from "@/lib/utils";

interface FundSearchInputProps {
  value: string;
  schemeCode: string;
  onSelect: (schemeName: string, schemeCode: number) => void;
  label?: string;
}

export const FundSearchInput = ({ value, schemeCode, onSelect, label = "Fund Name" }: FundSearchInputProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { searchQuery, results, isLoading, handleSearchChange, clearSearch } = useFundSearch();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!schemeCode && value) {
      handleSearchChange(value);
    }
  }, [value, schemeCode]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onSelect(newValue, 0); // Clear scheme code when typing
    handleSearchChange(newValue);
    setIsOpen(true);
  };

  const handleSelectFund = (fundName: string, fundSchemeCode: number) => {
    onSelect(fundName, fundSchemeCode);
    clearSearch();
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <Label className="text-[10px]">{label}</Label>
      <div className="relative">
        <Input
          placeholder="Search fund name or code..."
          className="mt-1 h-7 text-xs pr-7"
          value={value}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          disabled={!!schemeCode}
        />
        {isLoading && (
          <Loader2 className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 animate-spin text-muted-foreground" />
        )}
        {!isLoading && !schemeCode && (
          <Search className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
        )}
      </div>

      {isOpen && results.length > 0 && !schemeCode && (
        <div className="absolute z-50 w-full mt-1 bg-card border border-border rounded-lg shadow-lg max-h-64 overflow-auto">
          {results.map((fund) => (
            <button
              key={fund.scheme_code}
              className="w-full text-left px-3 py-2 hover:bg-muted/50 transition-colors border-b border-border last:border-0"
              onClick={() => handleSelectFund(fund.scheme_name, fund.scheme_code)}
            >
              <div className="text-xs font-medium text-foreground">{fund.scheme_name}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">
                Code: {fund.scheme_code}
                {fund.category && ` • ${fund.category}`}
              </div>
            </button>
          ))}
        </div>
      )}

      {parseInt(schemeCode) > 0 && (
        <div className="text-[10px] text-muted-foreground mt-1">
          Scheme Code: {schemeCode}
        </div>
      )}
    </div>
  );
};
