import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom';
import SavedList from './Movies/SavedList';
import Movie from "./Movies/Movie.js";
import MovieList from "./Movies/MovieList.js"

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const getMovies = () => {
      axios
        .get('http://localhost:5000/api/movies')
        .then(response => {
          setMovieList(response.data);
        })
        .catch(error => {
          console.error('Server Error', error);
        });}
    getMovies();
  }, []);
  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  return (
    <div>
      <SavedList list={savedList} />
      <div>
        <Switch>
        <Route path="/movies/:id">
          <Movie movie={movieList} key={movieList.id}/>
        </Route>
        <Route path="/">
          <MovieList movies={movieList}/>
        </Route>
        </Switch>
      </div>
    </div>
  );
};

export default App;
