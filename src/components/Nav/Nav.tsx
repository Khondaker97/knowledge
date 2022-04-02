import React, { useContext } from "react";
import { Navbar, NavItem, NavLink } from "react-bootstrap";
import "./Nav.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context";
import styled from "styled-components";

const LeftNav = styled.div`
  margin-left: auto;
`;

const Nav = () => {
  const [state, setState] = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    setState({ data: null, loading: false, error: null });
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <Navbar className="nav">
      <NavItem>
        <Link to="/" className="nav-link">
          Home
        </Link>
      </NavItem>
      {state.data && (
        <LeftNav>
          <NavItem>
            <NavLink onClick={handleLogout}>Logout</NavLink>
          </NavItem>
        </LeftNav>
      )}
    </Navbar>
  );
};

export default Nav;
