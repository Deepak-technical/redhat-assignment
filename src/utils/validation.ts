import { Character } from "@/components/CharacterForm/CharacterForm.types";

export const validateCharacter = (character: Partial<Character>): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!character.name?.trim()) {
    errors.name = 'Name is required';
  }

  if (!character.gender) {
    errors.gender = 'Gender is required';
  }

  if (character.born && character.died) {
    const bornDate = new Date(character.born);
    const diedDate = new Date(character.died);
    
    if (diedDate < bornDate) {
      errors.died = 'Date of death cannot be before date of birth';
    }
  }

  return errors;
};