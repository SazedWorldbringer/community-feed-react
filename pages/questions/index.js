import Card from "@/components/Card";
import Pagination from "@/components/Pagination";
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
  const [hasMore, setHasMore] = useState(false);

  const router = useRouter();
  const { page } = router.query;

  useEffect(() => {
    async function fetchData() {
      const data = await fetch(
        `https://api.stackexchange.com/2.2/questions?${page ? `page=${page}&` : ''}order=desc&sort=hot&tagged=reactjs&site=stackoverflow`,
      );
      const result = await data.json();
      if (result) {
        setQuestions(result.items);
        setHasMore(result.has_more)
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
        <>
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
          <Pagination currentPage={parseInt(page) || 1} hasMore={hasMore} />
        </>
      )}
    </QuestionsContainer>
  )
}

export default Questions;
