/* eslint-disable react/prop-types */

import styled from "styled-components";


const ProductItem = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px); /* Lift the product card on hover */
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 5px;
`;

const ProductTitle = styled.h2`
  font-size: 1.2rem;
  margin: 10px 0;
`;

const ProductDescription = styled.p`
  font-size: 1rem;
  color: #555;
  margin-bottom: 15px;
`;

const ProductPrice = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  color: #007bff;
`;

const Product = ({ product }) => {
  
  return (
    <ProductItem>
      <ProductImage src={product.thumbnail} alt={product.title} />
      <ProductTitle>{product.title}</ProductTitle>
      <ProductDescription>{product.description}</ProductDescription>
      <ProductPrice>${product.price}</ProductPrice>
    </ProductItem>
  );
};

export default Product;
