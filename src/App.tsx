// src/App.tsx

import React, { useState, useMemo } from 'react';
import type { Plant, Difficulty } from './types';
import type { User } from './services/UserService';
import PlantList from './Components/PlantList';
import PlantCard from './Components/PlantCard';
import PlantForm from './Components/PlantForm';
import PeopleDropdown from './Components/PeopleDropDown';
import Banner from './Components/Banner';
import Header from "./Components/Header";
import Footer from "./Components/Footer";

interface AppProps {
    plants: Plant[];
}

const App: React.FC<AppProps> = ({ plants }) => {
    // ========== Application State ==========
    // Plants list
    const [plantList, setPlantList] = useState<Plant[]>(plants);
    
    // Selected plant
    const [selectedId, setSelectedId] = useState<number | null>(
        plants.length > 0 ? plants[0].id : null
    );
    
    // Search text
    const [searchText, setSearchText] = useState<string>('');
    
    // Difficulty filter
    const [difficultyFilter, setDifficultyFilter] = useState<'All' | Difficulty>('All');
    
    // Success message
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    
    // Selected user
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    // ========== Computed Values ==========
    const selectedPlant = plantList.find((p) => p.id === selectedId);

    // Filter plants by search text and difficulty using useMemo
    const filteredPlants = useMemo(() => {
        return plantList.filter((plant) => {
            const matchesSearch = plant.name.toLowerCase().includes(searchText.toLowerCase());
            const matchesDifficulty = difficultyFilter === 'All' || plant.difficulty === difficultyFilter;
            return matchesSearch && matchesDifficulty;
        });
    }, [plantList, searchText, difficultyFilter]);

    // ========== Event Handlers ==========
    
    // Handle selecting a plant
    const handleSelectPlant = (id: number) => {
        setSelectedId(id);
    };

    // Handle adding a new plant
    const handleAdd = (newPlant: Omit<Plant, 'id'>) => {
        const plantWithId: Plant = {
            ...newPlant,
            id: Math.max(...plantList.map(p => p.id), 0) + 1,
        };
        setPlantList([...plantList, plantWithId]);
        setSuccessMessage(`Plant "${plantWithId.name}" added successfully!`);
        
        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(null), 3000);
    };

    // Handle deleting a plant
    const handleDelete = (id: number) => {
        const plantToDelete = plantList.find(p => p.id === id);
        setPlantList(plantList.filter(p => p.id !== id));
        
        // Update selected plant if the deleted plant was selected
        if (selectedId === id) {
            setSelectedId(plantList.length > 1 ? plantList[0].id : null);
        }
        
        if (plantToDelete) {
            setSuccessMessage(`Plant "${plantToDelete.name}" deleted successfully!`);
            setTimeout(() => setSuccessMessage(null), 3000);
        }
    };

    // Handle selecting a user
    const handleSelectUser = (user: User) => {
        setSelectedUser(user);
    };

    // Handle resetting filters
    const handleResetFilters = () => {
        setSearchText('');
        setDifficultyFilter('All');
    };

    return (
        <div className="app-container d-flex flex-column min-vh-100">
            {/* ---- Header ---- */}
            <Header />

            {/* ---- Banner ---- */}
            <Banner>
                <h2>Welcome to Your Mini Nursery</h2>
                <p>Manage your plant collection efficiently and effortlessly.</p>
            </Banner>

            {/* ---- Main App Content ---- */}
            <div className="container py-4 flex-grow-1">
                {/* Success Message Alert */}
                {successMessage && (
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                        {successMessage}
                        <button 
                            type="button" 
                            className="btn-close" 
                            onClick={() => setSuccessMessage(null)}
                        ></button>
                    </div>
                )}

                {/* Search and Filter Header */}
                <div className="mb-4">
                    <div className="row gap-3">
                        <div className="col-md">
                            <input
                                type="search"
                                className="form-control form-control-lg"
                                placeholder="Search plants by name..."
                                aria-label="Search"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                        </div>
                        <div className="col-md-3">
                            <select
                                className="form-select form-select-lg"
                                value={difficultyFilter}
                                onChange={(e) => setDifficultyFilter(e.target.value as 'All' | Difficulty)}
                            >
                                <option value="All">All Difficulties</option>
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                            </select>
                        </div>
                        <div className="col-md-auto">
                            <button
                                className="btn btn-secondary"
                                onClick={handleResetFilters}
                            >
                                Reset Filters
                            </button>
                        </div>
                    </div>
                </div>

                {/* Two Column Layout */}
                <div className="row">
                    {/* Left Column: Plant List, Search, Filter, PeopleDropdown */}
                    <div className="col-md-4">
                        <h4 className="mb-3">Plant Catalog ({filteredPlants.length})</h4>
                        <PlantList
                            plants={filteredPlants}
                            selectedId={selectedId}
                            onSelect={handleSelectPlant}
                        />

                        {/* People Dropdown Section */}
                        <div className="mt-5">
                            <PeopleDropdown onSelect={handleSelectUser} />
                            {selectedUser && (
                                <div className="alert alert-info mt-3" role="alert">
                                    Selected user: <strong>{selectedUser.name}</strong>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Plant Form + Featured Plant Card */}
                    <div className="col-md-8">
                        <div className="mb-4">
                            <PlantForm onAdd={handleAdd} />
                        </div>

                        <h4 className="mb-3">Featured Plant Details</h4>
                        {selectedPlant ? (
                            <PlantCard plant={selectedPlant} onDelete={handleDelete} />
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

