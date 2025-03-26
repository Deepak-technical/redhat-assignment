import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CharacterList from "./CharacterList";
import { Character } from "@/lib/schema";

const mockCharacters: Character[] = [
  {
    name: "Jon Snow",
    gender: "Male",
    born: "In 283 AC",
    died: "",
    allegiances: ["House Stark", "Night's Watch"],
    aliases: ["Lord Snow", "The White Wolf"],
  },
  {
    name: "Daenerys Targaryen",
    gender: "Female",
    born: "In 284 AC",
    died: "In 305 AC",
    allegiances: ["House Targaryen"],
    aliases: ["Khaleesi", "Mother of Dragons"],
  },
];

test("renders character list correctly", () => {
  render(<CharacterList characters={mockCharacters} />);

  expect(screen.getByText("Jon Snow")).toBeInTheDocument();
  expect(screen.getByText("Daenerys Targaryen")).toBeInTheDocument();
  expect(screen.getByText("Male")).toBeInTheDocument();
  expect(screen.getByText("Female")).toBeInTheDocument();
  expect(screen.getByText("House Stark")).toBeInTheDocument();
  expect(screen.getByText("Mother of Dragons")).toBeInTheDocument();
});

test("calls onCharacterClick when a row is clicked", async () => {
  const user = userEvent.setup();
  const handleClick = jest.fn();

  render(<CharacterList characters={mockCharacters} onCharacterClick={handleClick} />);

  const jonRow = screen.getByText("Jon Snow").closest("tr");
  await user.click(jonRow!);

  expect(handleClick).toHaveBeenCalledWith(mockCharacters[0]);
});