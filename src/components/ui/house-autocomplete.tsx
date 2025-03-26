"use client";

import { useState } from "react";
import { useHousesAutocomplete } from "@/hooks/useHousesAutocomplete";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";

interface HouseAutocompleteProps {
  selectedHouses: string[];
  onSelect: (house: string) => void;
  onRemove: (house: string) => void;
}

export function HouseAutocomplete({
  selectedHouses,
  onSelect,
  onRemove,
}: HouseAutocompleteProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const { houses, loading, error } = useHousesAutocomplete(searchTerm);

  return (
    <div className="space-y-2">
 

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            Search for houses...
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-0">
          <Command shouldFilter={false}>
            <CommandInput
              placeholder="Search houses..."
              onValueChange={setSearchTerm}
            />
            {loading && (
              <div className="py-6 text-center text-sm">Loading...</div>
            )}
            {error && (
              <div className="py-6 text-center text-sm text-red-500">
                Error: {error}
              </div>
            )}
            <CommandEmpty>
              {searchTerm.length < 2
                ? "Type at least 2 characters to search"
                : "No houses found"}
            </CommandEmpty>
            <CommandGroup className="max-h-[300px] overflow-y-auto">
              {houses.map((house) => (
                <CommandItem
                  key={house.name}
                  value={house.name}
                  onSelect={() => {
                    onSelect(house.name);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={
                      selectedHouses.includes(house.name)
                        ? "mr-2 h-4 w-4 opacity-100"
                        : "mr-2 h-4 w-4 opacity-0"
                    }
                  />
                  <div>
                    <div className="font-medium">{house.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {house.region || "Unknown region"}
                    </div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      <div className="flex flex-col gap-2">
        {selectedHouses.map((house) => (
          <Badge
            key={house}
            variant="outline"
            className="cursor-pointer hover:bg-red-100"
            onClick={() => onRemove(house)}
          >
            {house} ×
          </Badge>
        ))}
      </div>
    </div>
  );
}