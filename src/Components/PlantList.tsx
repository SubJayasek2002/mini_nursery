import React from "react";
import type { Plant } from "../types";

interface PlantListProps {
  plants: Plant[];
  selectedId: number | null;
  onSelect: (id: number) => void;
}

const PlantList: React.FC<PlantListProps> = ({ plants, selectedId, onSelect }) => {
  return (
    <ul className="list-group">
      {plants.map((plant) => (
        <li
          key={plant.id}
          className={`list-group-item d-flex justify-content-between align-items-start ${
            selectedId === plant.id ? "active" : ""
          }`}
          style={{ cursor: "pointer" }}
          onClick={() => onSelect(plant.id)}
        >
          <div>
            <div className="fw-bold">{plant.name}</div>
            <small className="text-muted">{plant.scientific}</small>
          </div>

          <div className="text-end">
            <span className="badge bg-primary me-2">{plant.difficulty}</span>
            {plant.rarity && <span className="badge bg-warning text-dark">{plant.rarity}</span>}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default PlantList;
