import React from "react";
import { Button, Box, Typography } from "@material-ui/core";
import useStyles from "./styles";
import { getUserRepos, getUserStarred } from "../../../../store/actions";

export default function SearchButton({ mode, dispatch, user }) {
  const styles = useStyles();

  return (
    <Box className={styles.buttonsContainer}>
      <Button
        variant="contained"
        className={styles.repos}
        onClick={() => {
          dispatch(getUserRepos(user?.login?.toLowerCase()));
        }}
      >
        <Typography className={styles.textRepos}>Repositórios</Typography>
      </Button>
      <Button
        variant="contained"
        className={styles.starred}
        onClick={() => {
          dispatch(getUserStarred(user.login.toLowerCase()));
        }}
      >
        <Typography className={styles.text}>Starred</Typography>
      </Button>
    </Box>
  );
}
