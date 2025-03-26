```
# Character Management Components

React components for managing character information with form and list views.

## Components

### CharacterForm

A form component for creating/editing character information with validation.

#### Props

| Prop            | Type                      | Description                          |
|-----------------|---------------------------|--------------------------------------|
| `initialValues` | `Partial<Character>`      | Initial form values (optional)       |
| `onSubmit`      | `(character: Character) => void` | Called on valid form submission |
| `onReset`       | `() => void`              | Called when form is reset (optional) |
| `onCancel`      | `() => void`              | Called when cancelled (optional)     |

#### Usage

```jsx
import { CharacterForm } from './components/CharacterForm';

function App() {
  const handleSubmit = (character) => {
    console.log('Submitted:', character);
  };

  return (
    <CharacterForm 
      onSubmit={handleSubmit}
      initialValues={{ name: 'Jon Snow', gender: 'Male' }}
    />
  );
}
```

### CharacterList

A table component for displaying character information.

#### Props

| Prop                 | Type                               | Description                                   |
| -------------------- | ---------------------------------- | --------------------------------------------- |
| `characters`       | `Character[]`                    | Array of characters to display                |
| `onCharacterClick` | `(character: Character) => void` | Called when a character is clicked (optional) |

#### Usage

jsx

Copy

```
import { CharacterList } from './components/CharacterList';

function App() {
  const characters = [
    {
      name: 'Arya Stark',
      gender: 'Female',
      aliases: ['No One']
    }
  ];

  return <CharacterList characters={characters} />;
}
```

## Character Type

Both components use this interface:

typescript

Copy

```
interface Character {
  name: string;         // Required
  gender: string;       // Required
  born?: string;        // Optional
  died?: string;        // Optional
  allegiances: string[]; // Array of house names
  aliases: string[];     // Array of alternate names
}
```

## Features

* Form validation for required fields
* Date validation (death after birth)
* Responsive design
* TypeScript support
* Customizable initial values

## Installation

1. Copy the components folder to your project
2. Import components as needed

## Development

To run the components in your project:

1. Ensure you have React installed
2. Import the components
3. Pass required props

No additional dependencies needed beyond React.

Copy

```
This README provides:
- Clear component documentation
- Usage examples
- Type definitions
- Setup instructions
- Feature overview

It's focused solely on the components without any library packaging information.
```
