import React from 'react'
import CharacterForm from '@/components/CharacterForm/CharacterForm';
import { Link } from "react-router-dom";
import { MoveLeftIcon } from 'lucide-react';
import { data } from "@/lib/data";
import { Button } from '@/components/ui/button';
const CharacterFormPage = () => {


    const handleSubmit = (character) => {

        console.log('Submitted character:', character);
        data.push(character); // Append new character
    };
    return (
        <div className='flex flex-col items-center justify-center min-h-screen space-y-6'>
            <CharacterForm
                onSubmit={handleSubmit}
                initialValues={{
                    name: 'Deepak Prasad',
                    gender: 'Male'
                }}
            />
            <Link to="/" className='flex items-center'>
                <Button ><MoveLeftIcon />Back to List</Button>
            </Link>
        </div>
    )
}

export default CharacterFormPage