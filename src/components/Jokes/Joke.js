import { Box, makeStyles, Typography } from "@material-ui/core";
import React, { useCallback } from "react";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
const useStyles = makeStyles((theme) => ({
  joke: {
    display: "flex",
    borderBottom: "2px solid #eeeeee",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    padding: "1rem",
  },
  jokeButtons: {
    display: "flex",
    marginRight: "1rem",
    justifyContent: "center",
    width: "15%",
    alignItems: "center",
  },
  arrowIcon: {
    fontSize: "2rem",
    margin: "10px",
    cursor: "pointer",
  },
  votesLabel: {
    fontSize: "20px",
  },
  jokeText: {
    width: "75%",
    fontSize: "1.2rem",
  },
  jokeEmoji: {
    fontSize: "3rem",
    marginLeft: "auto",
    borderRadius: "50%",
    boxShadow:
      "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px",
  },
}));

function Joke(props) {
  const { votes, text, upvote, downvote } = props;
  const classes = useStyles();
  const getEmoji = useCallback((votes) => {
    if (votes >= 9) {
      return "em em-rolling_on_the_floor_laughing";
    } else if (votes >= 6) {
      return "em em-laughing";
    } else if (votes >= 3) {
      return "em em-slightly_smiling_face";
    } else if (votes >= 0) {
      return "em em-neutral_face";
    } else {
      return "em em-angry";
    }
  }, []);
  return (
    <Box className={classes.joke}>
      <Box className={classes.jokeButtons}>
        <ArrowUpwardIcon
          onClick={() => {
            upvote();
          }}
          className={classes.arrowIcon}
        />
        <Typography className={classes.voteLabel}>{votes}</Typography>
        <ArrowDownwardIcon
          onClick={() => {
            downvote();
          }}
          className={classes.arrowIcon}
        />
      </Box>
      <Box className={classes.jokeText}>{text}</Box>
      <Box className={classes.jokeEmoji}>
        <i className={getEmoji(votes)} />
      </Box>
    </Box>
  );
}

export default Joke;
