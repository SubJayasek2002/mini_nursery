// src/App.tsx

import React, { useState } from 'react';
import type { Plant } from './types';
import PlantList from './Components/PlantList';
import PlantCard from './Components/PlantCard';
import PlantForm from './Components/PlantForm';

interface AppProps {
    plants: Plant[];
}

const App: React.FC<AppProps> = ({ plants }) => {
    // State for the currently selected plant ID, default to the first plant
    const [selectedId, setSelectedId] = useState<number | null>(
        plants.length > 0 ? plants[0].id : null,
    );

    const selectedPlant = plants.find((p) => p.id === selectedId);

    // Function to handle selection from PlantList
    const handleSelectPlant = (id: number) => {
        setSelectedId(id);
    };

    return (
        <div className="container py-4">
            <header className="mb-4">
                <h1 className="text-center text-primary">🌱 Mini Nursery Dashboard</h1>
                {/* Display a search input (UI-only) */}
                <input
                    type="search"
                    className="form-control form-control-lg"
                    placeholder="Search plants..."
                    aria-label="Search"
                    disabled
                />
            </header>

            {/* Use Bootstrap grid (row, col-md-4, col-md-8) */}
            <div className="row">
                {/* Left Column: PlantList (col-md-4) */}
                <div className="col-md-4">
                    <h4 className="mb-3">Plant Catalog</h4>
                    <PlantList
                        plants={plants}
                        selectedId={selectedId}
                        onSelect={handleSelectPlant}
                    />
                </div>

                {/* Right Column: PlantForm + PlantCard (col-md-8) */}
                <div className="col-md-8">
                    <div className="mb-4">
                        {/* Render PlantForm */}
                        <PlantForm />
                    </div>
                    {/* Render a featured PlantCard */}
                    <h4 className="mb-3">Featured Plant Details</h4>
                    {selectedPlant ? (
                        <PlantCard plant={selectedPlant} />
                    ) : (
                        <div className="alert alert-info">
                            Please select a plant from the list.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default App;