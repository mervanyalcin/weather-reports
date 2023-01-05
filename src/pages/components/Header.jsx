import { Breadcrumbs, Container, Stack, Typography } from "@mui/material";
import * as React from "react";
import { Link, useParams } from "react-router-dom";

function Header() {
  const {city} = useParams();

  return (
    <Container maxWidth="lg">
      <div className="header-wrapper">
        <Link to={"/"}>
          <img
            src={`${process.env.PUBLIC_URL}/images/logo.png`}
            alt=""
            className="logo"
          />
        </Link>
        <div className="slogan">
          Helper that shows you the weather for 7 days, not for every day
        </div>
      </div>
      <Container maxWidth="lg" sx={{ mb: "2rem" }}>
        <Stack spacing={2}>
          <Breadcrumbs separator={(typeof city) === "undefined" ? "": ">"} aria-label="breadcrumb">
            <Link underline="hover" key="1" color="inherit" to="/">
              Weather Report
            </Link>
            {city && (
              <>
                <Typography key="3" color="text.primary">
                  {city}
                </Typography>
              </>
            )}
          </Breadcrumbs>
        </Stack>
      </Container>
    </Container>
  );
}
export default Header;
