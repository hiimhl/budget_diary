import React from "react";
import styled from "styled-components";

const Wrapper = styled.header`
  height: 100px;
  nav {
    border-bottom: 1px dashed green;
    display: flex;
    padding: 15px;
    justify-content: space-between;
    font-size: 25px;
  }
  aside {
    padding: 15px 10%;
    display: flex;
    justify-content: space-between;
    font-size: 18px;
  }
`;

function Header() {
  return (
    <Wrapper>
      <nav>
        <span>logo</span>
        <div>menu</div>
      </nav>
      <aside>
        <span>Today</span>
        <span>Week</span>
        <span>Month</span>
      </aside>
    </Wrapper>
  );
}

export default Header;
