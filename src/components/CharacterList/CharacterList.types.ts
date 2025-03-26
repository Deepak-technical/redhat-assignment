import { Character } from '../CharacterForm/CharacterForm.types';

export interface CharacterListProps {
  characters: Character[];
  onCharacterClick?: (character: Character) => void;
}