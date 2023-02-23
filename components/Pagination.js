import Link from "next/link";
import styled from "styled-components";

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const PaginationLink = styled.a`
  padding: 2%;
  margin: 1%;
  background: ${(props) => (!props.disabled ? 'orange' : 'lightgray')};
  pointer-events: ${(props) => (!props.disabled ? 'all' : 'none')};
  cursor: ${(props) => (!props.disabled ? 'pointer' : 'not-allowed')};
  color: white;
  text-decoration: none;
  border-radius: 5px;
`;

function Pagination({ currentPage, hasMore }) {
  return (
    <PaginationContainer>
      <Link
        href={`?page=${parseInt(currentPage) - 1}`}
        passHref
        legacyBehavior
      >
        <PaginationLink disabled={currentPage <= 1}>Previous</PaginationLink>
      </Link>
      <Link
        href={`?page=${parseInt(currentPage) + 1}`}
        legacyBehavior
        passHref
      >
        <PaginationLink disabled={!hasMore}>Next</PaginationLink>
      </Link>
    </PaginationContainer>
  );
}

export default Pagination;
