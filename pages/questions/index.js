import styled from "styled-components";

const QuestionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 5%;
`;

function Questions() {
  return (
    <QuestionsContainer>
    <h2>Qustions</h2>
    </QuestionsContainer>
  )
}

export default Questions;
