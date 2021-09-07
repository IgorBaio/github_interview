import React from "react";
import useStyles from "./styles";
import { Typography, Box, Link } from "@material-ui/core";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";

export default function SubHeader({ history, title, children, user }) {
  const styles = useStyles();
  return (
    <Box>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Box
          className={styles.userData}
        >
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          >
            <PersonOutlineIcon className={styles.iconUser} />
            <Typography align="center" className={styles.pageTitle}>
              {title}
            </Typography>
          </Box>
          {user && user.avatar_url && (
            <img
              className={styles.profileImage}
              src={user.avatar_url}
            />
          )}
        </Box>
        {user && user.id && (
          <Box
          className={styles.userData}
          >
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
              }}
            >
              <Typography align="center" className={styles.pageTitle}>
                UserName:
              </Typography>
              <Typography align="center" className={styles.pageTitle}>
                {user.login}
              </Typography>
            </Box>
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
              }}
            >
              <Typography align="center" className={styles.pageTitle}>
                Link:
              </Typography>

              <Link
                href={user.html_url}
                align="center"
                className={styles.linkPageTitle}
              >
                {user.html_url}
              </Link>
            </Box>
          </Box>
        )}
      </Box>
      {children}
    </Box>
  );
}
