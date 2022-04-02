import { Container } from "react-bootstrap";
import styled from "styled-components";
import ModalComponent from "../Modal/Modal";
import "./hero.css";

const HeroComponents = styled.header`
  padding: 2rem 0;
  height: 80vh;
  background-image: url("https://images.unsplash.com/photo-1640622658353-c6cecbe91488?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80");
  background-size: cover;
  background-position: center;
`;

const HeaderContainer = styled.div`
  background-color: rgba(5, 148, 112, 0.7);
  padding: 2rem;
  color: white;
`;
const Heading = styled.h1`
  font-size: 3.5rem;
`;

const SubHeading = styled.h3`
  margin: 1rem 0;
  font-weight: 400;
`;
const Hero = () => {
  return (
    <HeroComponents className="header">
      <Container>
        <div className="h-part">
          <HeaderContainer className="h-comp">
            <Heading>Feed your mind with the best</Heading>
            <SubHeading>
              Grow, learn, and become more successful by reading some of the top
              article by highly reputable individuals
            </SubHeading>
            <div className="btn-comp">
              <ModalComponent
                text="Sign Up"
                variant="outline-secondary"
                isSignUp={true}
              />
              <ModalComponent
                text="Log In"
                variant="success"
                isSignUp={false}
              />
            </div>
          </HeaderContainer>
        </div>
      </Container>
    </HeroComponents>
  );
};

export default Hero;
