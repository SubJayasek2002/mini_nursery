import React, { useState } from "react";
import type { Plant, Difficulty, Light, Water, Rarity } from "../types";

interface PlantFormProps {
  onAdd: (plant: Omit<Plant, "id">) => void;
}

const PlantForm: React.FC<PlantFormProps> = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    scientific: "",
    difficulty: "Easy" as Difficulty,
    light: "Medium" as Light,
    water: "Moderate" as Water,
    rarity: "Common" as Rarity,
    description: "",
  });

  const [errors, setErrors] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors("");

    // Validate that plant name is provided
    if (!formData.name.trim()) {
      setErrors("Plant name is required");
      return;
    }

    // Build a new plant object (without id)
    const newPlant: Omit<Plant, "id"> = {
      name: formData.name.trim(),
      scientific: formData.scientific.trim() || undefined,
      difficulty: formData.difficulty,
      light: formData.light,
      water: formData.water,
      rarity: formData.rarity,
      description: formData.description.trim(),
    };

    // Call onAdd(plant)
    onAdd(newPlant);

    // Clear form fields and reset selects to default values
    setFormData({
      name: "",
      scientific: "",
      difficulty: "Easy",
      light: "Medium",
      water: "Moderate",
      rarity: "Common",
      description: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4">
      <h3 className="mb-3">Add New Plant</h3>

      {errors && <div className="alert alert-danger">{errors}</div>}

      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Plant Name *
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g., Monstera Deliciosa"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="scientific" className="form-label">
          Scientific Name
        </label>
        <input
          type="text"
          className="form-control"
          id="scientific"
          name="scientific"
          value={formData.scientific}
          onChange={handleChange}
          placeholder="e.g., Monstera deliciosa"
        />
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="difficulty" className="form-label">
            Difficulty
          </label>
          <select
            className="form-select"
            id="difficulty"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="light" className="form-label">
            Light
          </label>
          <select
            className="form-select"
            id="light"
            name="light"
            value={formData.light}
            onChange={handleChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="Bright">Bright</option>
          </select>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="water" className="form-label">
            Water
          </label>
          <select
            className="form-select"
            id="water"
            name="water"
            value={formData.water}
            onChange={handleChange}
          >
            <option value="Low">Low</option>
            <option value="Moderate">Moderate</option>
            <option value="Frequent">Frequent</option>
          </select>
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="rarity" className="form-label">
            Rarity
          </label>
          <select
            className="form-select"
            id="rarity"
            name="rarity"
            value={formData.rarity}
            onChange={handleChange}
          >
            <option value="Common">Common</option>
            <option value="Uncommon">Uncommon</option>
            <option value="Rare">Rare</option>
          </select>
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          placeholder="Enter plant care details and description..."
        ></textarea>
      </div>

      <button type="submit" className="btn btn-primary">
        Add Plant
      </button>
    </form>
  );
};

export default PlantForm;
