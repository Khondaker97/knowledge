import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import axios from "axios";
import styled from "styled-components";
import { Card } from "react-bootstrap";

const CardsContainer = styled.div`
  margin-top: 4rem;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  height: 60vh;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
`;

const CardHeader = styled.div`
  height: 22rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PriceCircle = styled.div`
  border: 0.5rem solid white;
  width: 8.5rem;
  height: 8.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0.1rem 0.1rem 1rem rgba(19, 20, 19, 0.343);
`;
const PriceText = styled.p`
  font-size: 3rem;
  color: white;
  text-shadow: 0.1rem 0.1rem 1rem rgba(19, 20, 19, 0.343);
`;

const BgColors: any = {
  Basic: "rgb(104, 219, 104)",
  Standard: "rgba(185, 42, 23, 0.8)",
  Premium: "tomato",
};

const createSession = async (priceId: string) => {
  const { data: response } = await axios.post(
    "https://knowledge4u.herokuapp.com/subs/session",
    {
      priceId,
    }
  );
  window.location.href = response.url;
};

const ArticlePlans = () => {
  const [prices, setPrices] = useState<any[]>([]);

  const fetchPrices = async () => {
    const { data: response } = await axios.get(
      "https://knowledge4u.herokuapp.com/subs/prices"
    );
    setPrices(response.data);
  };

  useEffect(() => {
    fetchPrices();
  }, []);
  return (
    <Container>
      <CardsContainer>
        {prices.map((price: any, index) => (
          <Card
            style={{
              width: "15rem",
              height: "22rem",
              marginRight: "2rem",
            }}
            key={index}
          >
            <CardHeader style={{ backgroundColor: BgColors[price.nickname] }}>
              <PriceCircle>
                <PriceText>${price.unit_amount / 100}</PriceText>
              </PriceCircle>
            </CardHeader>
            <Card.Body>
              <Card.Title style={{ fontSize: "2rem" }}>
                {price.nickname} <br />
              </Card.Title>
              {price.recurring.interval_count} {price.recurring.interval} Basis
              Plan
              <Button
                variant="outline-success"
                className="mt-2"
                onClick={() => createSession(price.id)}
              >
                Buy Now
              </Button>
            </Card.Body>
          </Card>
        ))}
      </CardsContainer>
    </Container>
  );
};

export default ArticlePlans;
