import { Container } from "@mui/system";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

export default function MainLayout() {
  return (
    <>
      <Header />

      <Container maxWidth="lg">
        <Outlet />
      </Container>
    </>
  );
}
