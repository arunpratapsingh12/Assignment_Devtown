/* eslint-disable react/prop-types */
 /* eslint-disable react/prop-types */

import styled from "styled-components";
const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const PaginationButton = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const Pagination = ({ productsPerPage, totalProducts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <PaginationContainer>
        {pageNumbers.map((number) => (
          <PaginationButton
            key={number}
            onClick={() => paginate(number)}
            href={number}
          >
            {number}
          </PaginationButton>
        ))}
      </PaginationContainer>
    </nav>
  );
};

export default Pagination;


