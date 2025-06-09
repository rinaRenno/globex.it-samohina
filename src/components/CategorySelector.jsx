import React from "react";

export default function CategorySelector({ categories, selectedCategory, onSelect }) {
  return (
    <nav style={styles.categoriesNav}>
      {categories.map((cat) => (
        <button
          key={cat.id}
          style={{
            ...styles.categoryBtn,
            ...(selectedCategory === cat.id ? styles.categoryBtnActive : {}),
          }}
          onClick={() => onSelect(cat.id)}
        >
          {cat.name}
        </button>
      ))}
    </nav>
  );
}

const styles = {
  categoriesNav: {
    display: "flex",
    justifyContent: "center",
    gap: 15,
    marginBottom: 20,
    flexWrap: "wrap",
  },
  categoryBtn: {
    padding: "8px 15px",
    border: "1px solid #007bff",
    backgroundColor: "#fff",
    borderRadius: 20,
    cursor: "pointer",
    fontSize: 14,
    color: "#007bff",
    transition: "all 0.3s",
  },
  categoryBtnActive: {
    backgroundColor: "#007bff",
    color: "#fff",
  },
};
