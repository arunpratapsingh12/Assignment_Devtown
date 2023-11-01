/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */
import Product from "./Product";
import styled, { keyframes } from "styled-components";

// Keyframes for animations
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ProductListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 60px;
  width: 100%;
  margin-top: 1.2rem;
  animation: ${fadeIn} 1s ease; /* Fade-in animation for products */

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* Single column layout for smaller screens */
  }
`;

const ProductList = ({ products }) => {
  console.log("product in list page" , products)
  return (
    <ProductListContainer>
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </ProductListContainer>
  );
};

export default ProductList;

