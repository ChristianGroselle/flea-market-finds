import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_BOOTH } from '../utils/mutations';

function BoothCreation() {
    const [formState, setFormState] = useState({ boothName: '', description: ''});
    const [addBooth] = useMutation(ADD_BOOTH);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const mutationResponse = await addBooth({
            variables: {
                boothName: formState.boothName,
                description: formState.description
            },
        });
        const token = mutationResponse.data.addBooth.token;
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    return (
        <div className='container my-1'>

            <h2>Booth Creation</h2>
            <form onSubmit={handleFormSubmit}>
                <div className='flex-row space-between my-2'>
                    <label htmlFor='boothName'>Booth Name:</label>
                    <input
                        placeholder="booth name"
                        name="boothName"
                        type="boothName"
                        id="boothName"
                        onChange={handleChange}
                    />
                </div>
                <div className='flex-row space-between my-2'>
                    <label htmlFor='description'>Booth Description:</label>
                    <input
                        placeholder="booth description"
                        name="description"
                        type="text"
                        id="description"
                        onChange={handleChange}
                    />
                </div>
                <div className='flex-row space-between my-2'>
                    <label htmlFor='logo'>Logo:</label>
                    <input
                        placeholder="logo"
                        name="logo"
                        type="file"
                        id="logo"
                        onChange={handleChange}
                    />
                </div>
                {/* <div className='flex-row space-between my-2'>
                    <label htmlFor='product'>Add Products:</label>
                    <input
                        placeholder="product"
                        name="product"
                        type="product"
                        id="product"
                        onChange={handleChange}
                    />
                </div> */}
                <div className='flex-row flex-end'>
                    <button type="submit">Create Booth</button>
                </div>
            </form>
        </div>
    );
}

export default BoothCreation;