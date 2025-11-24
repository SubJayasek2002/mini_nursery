import React from "react";

const PlantForm: React.FC = () => {
  return (
    <form className="card p-3 shadow-sm">
      <h4 className="mb-3">Add New Plant</h4>

      {/* Plant Name */}
      <div className="mb-3">
        <label className="form-label">Plant Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter plant name"
          disabled
        />
      </div>

      {/* Scientific Name */}
      <div className="mb-3">
        <label className="form-label">Scientific Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter scientific name"
          disabled
        />
      </div>

      {/* Difficulty */}
      <div className="mb-3">
        <label className="form-label">Difficulty</label>
        <select className="form-select" disabled>
          <option value="">Select difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      {/* Light */}
      <div className="mb-3">
        <label className="form-label">Light Level</label>
        <select className="form-select" disabled>
          <option value="">Select light level</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="Bright">Bright</option>
        </select>
      </div>

      {/* Water */}
      <div className="mb-3">
        <label className="form-label">Watering Needs</label>
        <select className="form-select" disabled>
          <option value="">Select water level</option>
          <option value="Low">Low</option>
          <option value="Moderate">Moderate</option>
          <option value="Frequent">Frequent</option>
        </select>
      </div>

      {/* Description */}
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          rows={3}
          placeholder="Enter description"
          disabled
        ></textarea>
      </div>

      {/* Buttons */}
      <div className="d-flex gap-2">
        <button className="btn btn-primary" disabled>
          Add Plant
        </button>
        <button className="btn btn-secondary" disabled>
          Clear
        </button>
      </div>
    </form>
  );
};

export default PlantForm;
