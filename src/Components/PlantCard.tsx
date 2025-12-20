import React from "react";
import type { Plant } from "../types";

interface PlantCardProps {
  plant: Plant;
  onDelete?: (id: number) => void;
}

const PlantCard: React.FC<PlantCardProps> = ({ plant, onDelete }) => {
  // Light icons
  const lightIcons: Record<string, string> = {
    Low: "🌑",
    Medium: "⛅",
    Bright: "🌞",
  };

  // Water icons
  const waterIcons: Record<string, string> = {
    Low: "💧",
    Moderate: "💧💧",
    Frequent: "💧💧💧",
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h4 className="card-title">{plant.name}</h4>
        <h6 className="card-subtitle mb-2 text-muted">{plant.scientific}</h6>

        <p className="card-text mt-2">{plant.description}</p>

        {/* Difficulty + Rarity Badges */}
        <div className="mb-3">
          <span className="badge bg-primary me-2">{plant.difficulty}</span>
          {plant.rarity && (
            <span className="badge bg-warning text-dark">{plant.rarity}</span>
          )}
        </div>

        {/* Light & Water Icons */}
        <div className="mb-3">
          <div>
            <strong>Light:</strong> {lightIcons[plant.light]}
          </div>
          <div>
            <strong>Water:</strong> {waterIcons[plant.water]}
          </div>
        </div>

        {/* New Buttons */}
        <div className="d-flex gap-2">
          <button
            className="btn btn-primary"
            onClick={() => alert(`Viewing: ${plant.name}`)}
          >
            View Details
          </button>

          <button
            className="btn btn-danger"
            onClick={() => onDelete?.(plant.id)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlantCard;
