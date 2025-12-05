import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Container $isOpen={sidebarOpen}>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Main>
        <Outlet />
      </Main>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: ${({ $isOpen }) =>
    $isOpen ? "250px 1fr" : "80px 1fr"};
  height: 100vh;
  transition: grid-template-columns 0.3s ease;
`;

const Main = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  min-width: 0;
  min-height: 0;
`;
