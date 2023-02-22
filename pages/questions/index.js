import Card from "@/components/Card";
import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";

const QuestionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 5%;
`;

function Questions() {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetch(
        'https://api.stackexchange.com/2.2/questions?order=desc&sort=hot&tagged=reactjs&site=stackoverflow',
      );
      const result = await data.json();
      if (result) {
        setQuestions(result.items);
        setLoading(false)
      }
    }
    fetchData();
  }, []);

  return (
    <QuestionsContainer>
      <h2>Qustions</h2>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <div>
          {questions?.map((question) => (
            <Link
              key={question.question_id}
              href={`/questions/${question.question_id}`}
              passHref
              style={{ textDecoration: 'none' }}
            >
              <Card
                title={question.title}
                views={question.view_count}
                answers={question.answer_count}
              />
            </Link>
          ))}
        </div>
      )}
    </QuestionsContainer>
  )
}

export default Questions;
