import CharacterList from "@/components/CharacterList/CharacterList";
import { data } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PlusCircleIcon } from "lucide-react";

const CharacterListPage = () => {
    const handleCharacterClick = (character) => {
        console.log("Selected character:", character);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
            <h2 className="text-4xl mt-2 font-bold text-center">List of All Character Members</h2>
            <p className="mb-8 mt-4 text-xl font-center">Here are the list of all the character registered on our portal</p>
            <CharacterList characters={data} onCharacterClick={handleCharacterClick} />
            <Link to="/add" className="flex items-center">
            <Button ><PlusCircleIcon/>Add Character</Button>
            </Link>
        </div>
    );
};

export default CharacterListPage;
