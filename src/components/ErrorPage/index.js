import React from "react";
import Button from "@material-ui/core/Button";

const ErrorPage = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div>
        <h2 style={{ fontSize: "10vw", color: "red" }}>404</h2>
      </div>
      <div style={{ fontSize: "5vw", fontWeight: "600" }}>
        UH OH! You're lost.
      </div>
      <p
        style={{
          fontSize: "20px",
          fontWeight: "600",
          maxWidth: "600px",
          textAlign: "center",
        }}
      >
        The page you are looking for does not exist. How you got here is a
        mystery. But you can click the button below to go back to the homepage.
      </p>
      <Button variant="contained" color="primary">
        Home
      </Button>
    </div>
  );
};

export default ErrorPage;
