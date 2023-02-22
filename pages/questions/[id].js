import { useRouter } from 'next/router';
import styled from 'styled-components';

const QuestionDetailContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 5%;
`;

function QuestionDetail() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <QuestionDetailContainer>
      <h2>Question:{id}</h2>
    </QuestionDetailContainer>
  )
}

export default QuestionDetail;
