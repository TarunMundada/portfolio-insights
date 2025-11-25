import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchFunds, FundSearchResult } from "@/services/api";
import { debounce } from "@/lib/utils";

export const useFundSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setDebouncedQuery(value);
    }, 300),
    []
  );

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    debouncedSearch(value);
  };

  const { data: results = [], isLoading } = useQuery<FundSearchResult[]>({
    queryKey: ["fundSearch", debouncedQuery],
    queryFn: () => searchFunds(debouncedQuery),
    enabled: debouncedQuery.length >= 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    searchQuery,
    results,
    isLoading,
    handleSearchChange,
    clearSearch: () => {
      setSearchQuery("");
      setDebouncedQuery("");
    },
  };
};
