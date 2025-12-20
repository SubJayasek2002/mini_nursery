// src/App.tsx

import React, { useState } from 'react';
import type { Plant } from './types';
import PlantList from './Components/PlantList';
import PlantCard from './Components/PlantCard';
import PlantForm from './Components/PlantForm';
import Banner from './Components/Banner';
import Header from "./Components/Header";
import Footer from "./Components/Footer";

interface AppProps {
    plants: Plant[];
}

const App: React.FC<AppProps> = ({ plants }) => {
    // --- State for selected plant ---
    const [selectedId, setSelectedId] = useState<number | null>(
        plants.length > 0 ? plants[0].id : null
    );
    const [plantList, setPlantList] = useState<Plant[]>(plants);

    const selectedPlant = plantList.find((p) => p.id === selectedId);

    // --- Handle plant selection ---
    const handleSelectPlant = (id: number) => {
        setSelectedId(id);
    };

    // --- Handle adding new plant ---
    const handleAddPlant = (newPlant: Omit<Plant, 'id'>) => {
        const plantWithId: Plant = {
            ...newPlant,
            id: Math.max(...plantList.map(p => p.id), 0) + 1,
        };
        setPlantList([...plantList, plantWithId]);
    };

    return (
        <div className="app-container">
            
            {/* ---- Header ---- */}
            <Header />

            {/* ---- Banner ---- */}
            <Banner>
                <h2>Welcome to Your Mini Nursery</h2>
                <p>Manage your plant collection efficiently and effortlessly.</p>
            </Banner>

            {/* ---- Main App Content ---- */}
            <div className="container py-4">
                <header className="mb-4">

                    <input
                        type="search"
                        className="form-control form-control-lg"
                        placeholder="Search plants..."
                        aria-label="Search"
                        disabled
                    />
                </header>

                <div className="row">
                    {/* Left Column: Plant List */}
                    <div className="col-md-4">
                        <h4 className="mb-3">Plant Catalog</h4>
                        <PlantList
                            plants={plantList}
                            selectedId={selectedId}
                            onSelect={handleSelectPlant}
                        />
                    </div>

                    {/* Right Column: Plant Form + Featured Plant */}
                    <div className="col-md-8">
                        <div className="mb-4">
                            <PlantForm onAdd={handleAddPlant} />
                        </div>

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

            {/* ---- Footer ---- */}
            <Footer />
        </div>
    );
};

export default App;
