import axios from "axios";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface Article {
  _id: string;
  title: string;
  imageUrl: string;
  content: string;
}
const CardsContainer = styled.div`
  padding: 2rem 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  overflow: hidden;
`;
const Card = styled.div`
  height: 34rem;
  width: 225px;
  box-shadow: 0.1rem 0.1rem 1rem rgba(0, 0, 0, 0.2);
  padding: 0.2rem;
  border-radius: 0.5rem;
`;

const Image = styled.img`
  width: 100%;
  height: 18rem;
  border-radius: 0.5rem;
`;

const Header = styled.h2`
  margin-top: 1rem;
  padding: 0.5rem;
  font-size: 1.5rem;
`;
const Content = styled.p`
  padding: 0.5rem;
`;
const NoArtContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 0;
  flex-direction: column;
  & a {
    font-size: 2rem;
    text-decoration: none;
  }
`;
const ErrHeader = styled.h2`
  font-size: 3rem;
`;

const Articles = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  const fetchArticles = async () => {
    const { data: response } = await axios.get(
      "https://knowledge4u.herokuapp.com/articles"
    );

    setArticles(response);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <Container>
      {articles.length ? (
        <CardsContainer>
          {articles.map((article) => (
            <Card key={article._id}>
              <Image src={article.imageUrl} />
              <Header>{article.title}</Header>
              <Content>{article.content}</Content>
            </Card>
          ))}
        </CardsContainer>
      ) : (
        <NoArtContainer>
          <ErrHeader>You don't have a plan</ErrHeader>
          <Link to="/article-plans">Buy a Plan</Link>
        </NoArtContainer>
      )}
    </Container>
  );
};

export default Articles;
