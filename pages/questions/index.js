import Card from "@/components/Card";
import Link from "next/link";
import { useRouter } from "next/router";
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

  const router = useRouter();
  const { page } = router.query;

  useEffect(() => {
    async function fetchData() {
      const data = await fetch(
        `https://api.stackexchange.com/2.2/questions?${page ? `page=${page}&` : ''}order=desc&sort=hot&tagged=reactjs&site=stackoverflow`,
      );
      const result = await data.json();
      if (result) {
        console.log(result)
        setQuestions(result.items);
        setLoading(false)
      }
    }
    fetchData();
  }, [page]);

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
