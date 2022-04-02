import React, { useState, useContext } from "react";
import axios from "axios";
import {
  Modal,
  Button,
  InputGroup,
  FormControl,
  FormText,
} from "react-bootstrap";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context";

interface ModalProps {
  text: string;
  variant: "outline-secondary" | "success";
  isSignUp: boolean;
}

const ErrorMsg = styled.p`
  color: red;
`;

const ModalComponent = ({ text, variant, isSignUp }: ModalProps) => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);
  const [state, setState] = useContext(UserContext);

  const handleClick = async () => {
    let response;
    if (isSignUp) {
      const { data: signUpData } = await axios.post(
        "https://knowledge4u.herokuapp.com/auth/signup",
        {
          email,
          password,
        }
      );
      response = signUpData;
    } else {
      const { data: loginData } = await axios.post(
        "https://knowledge4u.herokuapp.com/auth/login",
        {
          email,
          password,
        }
      );
      response = loginData;
      setState({
        data: {
          id: response.data.user.id,
          email: response.data.user.email,
          stripeCustomerId: response.data.user.stripeCustomerId,
        },
        loading: false,
        error: null,
      });
      navigate("/articles");
    }

    if (response.errors.length) {
      return setErrorMsg(response.errors[0].msg);
    }
    localStorage.setItem("token", response.data.token);
  };

  return (
    <>
      <Button onClick={handleOpen} variant={variant}>
        {text}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>{text}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-2">
            <InputGroup.Text>Email: </InputGroup.Text>
            <FormControl
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>
          <InputGroup className="mb-2">
            <InputGroup.Text>Password: </InputGroup.Text>
            <FormControl
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>

          {errorMsg ? (
            errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>
          ) : text === "Sign Up" ? (
            <FormText className="text-muted">
              Please input more than 5 characters.
            </FormText>
          ) : (
            ""
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleClick}>
            {text}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalComponent;
