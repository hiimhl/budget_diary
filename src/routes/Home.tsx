import React from "react";
import styled from "styled-components";

const Wrapper = styled.div``;

function Home() {
  return (
    <Wrapper>
      <div>
        <h1>데이터 입력</h1>
        <form>
          <label htmlFor="date">지출일</label>
          <input type="datetime-local" />
          <input type="submit" value="submit" />
        </form>
      </div>
    </Wrapper>
  );
}

export default Home;
