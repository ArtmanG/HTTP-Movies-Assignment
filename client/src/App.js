import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';


import Movie from './Movies/Movie';
import MovieList from './Movies/MovieList';
import SavedList from './Movies/SavedList';
import UpdateMovie from './Movies/UpdateMovie';



const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get('http://localhost:5000/api/movies')
      .then(res => {
        console.log(res.data)
        setMovieList(res.data)})
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path='/'>
        <MovieList movies={movieList} />
      </Route>

      <Route path='/movies/:id'>
        <Movie addToSavedList={addToSavedList}  movies={movieList} setMovieList={setMovieList} />
      </Route>

      <Route path='/update-movie/:id'>
        <UpdateMovie movieList={movieList} setMovieList={setMovieList} />
      </Route>
    </>
  );
};

export default App;
