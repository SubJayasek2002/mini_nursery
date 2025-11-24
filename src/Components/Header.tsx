import React from "react";

const Header = () => {
  return (
    <header
      style={{
        padding: "16px",
        borderBottom: "1px solid #ddd",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
      }}
    >
      <h1 style={{ margin: 0 }}>🌱 Mini Plant Manager</h1>
    </header>
  );
};

export default Header;
