import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Character } from "@/lib/schema";
import { calculateAge,formatDisplayDate } from "@/lib/utils";

interface CharacterListProps {
  characters: Character[];
  onCharacterClick?: (character: Character) => void;
}

export default function CharacterList({ characters, onCharacterClick }: CharacterListProps) {
  return (
    <div className="rounded-md border ">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Born</TableHead>
            <TableHead>Died</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Allegiances</TableHead>
            <TableHead>Aliases</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {characters.map((character) => (
            <TableRow 
              key={character.name}
              className={onCharacterClick ? "cursor-pointer  hover:bg-gray-50" : ""}
              onClick={() => onCharacterClick?.(character)}
            >
              <TableCell className="font-medium">{character.name}</TableCell>
              <TableCell>{character.gender}</TableCell>
              <TableCell>{formatDisplayDate(character.born)}</TableCell>
              <TableCell>{formatDisplayDate(character.died)}</TableCell>
              <TableCell className={character.died ? "text-red-500" : ""}>
                {calculateAge(character.born, character.died)}
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {character.allegiances.length > 0 ? (
                    character.allegiances.map((allegiance) => (
                      <Badge key={allegiance} variant="secondary">
                        {allegiance}
                      </Badge>
                    ))
                  ) : (
                    "-"
                  )}
                </div>
              </TableCell>
              <TableCell className="text-xs">
                {character.aliases &&character.aliases?.length > 0 ? character.aliases.join(", ") : "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}