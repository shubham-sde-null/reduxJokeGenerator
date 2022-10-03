import { makeStyles, Box, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Joke from "./Joke";
import axios from "axios";
import { useCallback } from "react";
const useStyles = makeStyles((theme) => ({
  jokesList: {
    display: "flex",
    width: "80%",
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
    // border: "1px solid black",
  },
  jokeSidebar: {
    backgroundColor: "#0097e6",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "30%",
    height: "100%",
    justifyContent: "center",
    textAlign: "center",
    boxShadow:
      " rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
    borderRadius: "10px",
    zIndex: 2,
  },
  jokeTitle: {
    fontSize: "3rem",
    color: "white",
    fontWeight: "700",
    margin: "60px",
    letterSpacing: 0,
  },
  sideBarImage: {
    width: "50%",
    boxShadow:
      "rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px",
    borderRadius: "40%",
  },
  jokeListJoke: {
    height: "90%",
    backgroundColor: "white",
    width: "60%",
    boxShadow:
      " rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px",
    overflow: "scroll",
    overflowX: "hidden",
    borderTopRightRadius: "7px",
    borderBottomRighttRadius: "7px",
  },
}));

function JokesList() {
  const [jokes, setJokes] = useState(null);
  async function getJokes() {
    let newJoke = [];
    // let id = 1;
    for (var i = 1; i < 8; i++) {
      let res = await axios.get("https://icanhazdadjoke.com/", {
        headers: { Accept: "application/json" },
      });
      newJoke.push({ id: i, text: res.data.joke, votes: 0 });
    }
    setJokes(newJoke);
  }
  const classes = useStyles();
  useEffect(() => {
    //here I am just calling the getjokes function when page gets loaded
    getJokes();
  }, []);
  //here if I have used normal function then it will be called for many times for every component and it will distrub the performance of our website, so to avoid that I am going to use the useCallback()
  const handleVote = useCallback(
    (id, offset) => {
      //here in filteredJokes we will strore all the jokes except that one on that arrow where we will pass id, here what is happening is when we click on the arrow up or down then we are sending the id over here and we will store all the jokes except that one which id we get
      let filteredJokes = jokes.filter((joke) => joke.id !== id);
      //   here we will only get that joke which matched the id, because finc method only gives only one value
      let joke = jokes.find((joke) => joke.id === id);
      //   once we stored the particular joke where arrow is pressed then we update the value of vote
      joke.votes += offset;
      //now we have changed the value of votes now we can add the particular joke into the filteredJokes
      filteredJokes.push(joke);
      //now sice we want to bring the joke with higer value to top we are going to use the sort method
      filteredJokes.sort((a, b) => b.votes - a.votes);
      //   now we will pass the filtersjokes into the setJokes, now in the setJokes we will have updated value
      setJokes(filteredJokes);
    },
    [jokes, setJokes]
  );
  if (jokes) {
    return (
      <Box className={classes.jokesList}>
        <Box className={classes.jokeSidebar}>
          <Typography className={classes.jokeTitle}>
            Dad
            <br />
            Jokes
          </Typography>
          <img
            className={classes.sideBarImage}
            src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"
            alt=""
          />
        </Box>
        <Box className={classes.jokeListJoke}>
          {jokes.map((joke) => {
            return (
              <Joke
                votes={joke.votes}
                text={joke.text}
                upvote={() => {
                  handleVote(joke.id, 1);
                }}
                downvote={() => {
                  handleVote(joke.id, -1);
                }}
                key={joke.id}
              />
            );
          })}
          {/* <Joke /> */}
        </Box>
      </Box>
    );
  } else {
    return <h1>Loading...</h1>;
  }
}

export default JokesList;
