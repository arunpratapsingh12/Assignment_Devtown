import { useState, useEffect } from "react";
import ProductList from "./components/ProductList";
import Pagination from "./components/Pagination";
import axios from "axios";

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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeIn} 1s ease; /* Fade-in animation */
  

  @media (max-width: 768px) {
    padding: 20px; /* Add some padding for smaller screens */
  }
`;


const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 500px;
  margin-top: 20px;
`;

const SortSelect = styled.select`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: border 0.3s ease;

  &:focus {
    border: 1px solid #007bff;
    outline: none;
  }
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: border 0.3s ease;

  &:focus {
    border: 1px solid #007bff;
    outline: none;
  }

  &::placeholder {
    color: #aaa;
  }
`;

const App = () => {
  const [productsData, setProductsData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);
  const [filterText, setFilterText] = useState("");
  const [sortCriteria, setSortCriteria] = useState("name");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        setProductsData(response.data.products);
        setFilteredProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter products based on user input
    const filtered = productsData.filter(
      (product) =>
        product.title &&
        product.title
          .trim()
          .toLowerCase()
          .includes(filterText.trim().toLowerCase())
    );

    setFilteredProducts(filtered);
  }, [productsData, filterText]);

  useEffect(() => {
    // Sort products based on user selection
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (sortCriteria === "name") {
        return a.name && b.name ? a.name.localeCompare(b.name) : 0;
      } else if (sortCriteria === "price") {
        return a.price && b.price ? a.price - b.price : 0;
      }
      return 0;
    });

    // Update the state only if sorting results in a different order
    if (!areArraysEqual(sortedProducts, filteredProducts)) {
      setFilteredProducts(sortedProducts);
    }
  }, [sortCriteria, filteredProducts]);

  // Helper function to compare arrays
  function areArraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return false;
    }

    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i].id !== arr2[i].id) {
        return false;
      }
    }

    return true;
  }

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  console.table([indexOfFirstProduct, indexOfLastProduct, currentProducts]);

  return (
    <Container>
      <h1>Product List</h1>
      <FilterContainer>
        <Input
          type="text"
          placeholder="Filter by name"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
        <SortSelect
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value)}
        >
          <option value="name">Sort by Name</option>
          <option value="price">Sort by Price</option>
        </SortSelect>
      </FilterContainer>

      <ProductList products={currentProducts} />
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={filteredProducts.length}
        paginate={paginate}
      />
    </Container>
  );
};

export default App;
