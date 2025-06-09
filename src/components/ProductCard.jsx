const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-image"
          onError={(e) => {
            e.target.src = '/images/placeholder.jpg';
          }}
        />
      </div>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <div className="price">{product.price} руб.</div>
      <button onClick={() => addToCart(product)}>В корзину</button>
    </div>
  );
};

export default ProductCard;
