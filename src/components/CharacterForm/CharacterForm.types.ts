export interface Character {
    name: string;
    gender: string;
    born?: string;
    died?: string;
    allegiances: string[];
    aliases: string[];
  }
  
  export interface CharacterFormProps {
    initialValues?: Partial<Character>;
    onSubmit: (character: Character) => void;
    onReset?: () => void;
    onCancel?: () => void;
  }