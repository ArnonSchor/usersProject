import { Container, Typography } from "@mui/material";
import notFound from "../../assets/images/404.png";
import styles from "./ErrorPages.module.scss";

const PageNotFound = () => {
  return (
    <Container className={styles.container}>
      <Typography fontFamily={"Varela Round"} variant="h1">
        !אופס
      </Typography>
      <img className={styles.image} src={notFound} alt="404 Not Found" />
      <Typography variant="h3" fontFamily={"Varela Round"}>
        הדף שחיפשת לא נמצא
      </Typography>
    </Container>
  );
};

export default PageNotFound;
