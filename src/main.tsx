import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "./index.css";
import "./App.css";
import type { Plant } from "./types";

const plants: Plant[] = [
  {
    id: 1,
    name: "Snake Plant",
    scientific: "Sansevieria trifasciata",
    difficulty: "Easy",
    light: "Low",
    water: "Low",
    rarity: "Common",
    description: "A hardy plant that thrives on neglect and low light."
  },
  {
    id: 2,
    name: "Fiddle Leaf Fig",
    scientific: "Ficus lyrata",
    difficulty: "Hard",
    light: "Bright",
    water: "Moderate",
    rarity: "Uncommon",
    description: "A popular indoor tree with large violin-shaped leaves."
  },
  {
    id: 3,
    name: "Peace Lily",
    scientific: "Spathiphyllum",
    difficulty: "Medium",
    light: "Medium",
    water: "Frequent",
    rarity: "Common",
    description: "A beautiful flowering plant that helps purify indoor air."
  }
];

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App plants={plants} />
  </React.StrictMode>
);
