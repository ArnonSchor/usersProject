import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h1" sx={{ mb: 2, textAlign: "center" }}>
        Welcome to Your List
      </Typography>
      <Typography
        variant="body1"
        sx={{ maxWidth: "500px", mb: 4, textAlign: "center" }}
      >
        Explore the convenience of our dynamic list feature. Effortlessly add
        new items to your lists—be it a to-do list, a shopping list, or any
        collection you have in mind.
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={() => navigate("/sign-up")}
        >
          sign up
        </Button>
        <Button
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={() => navigate("/sign-in")}
        >
          sign in
        </Button>
      </Box>
    </Box>
  );
};
