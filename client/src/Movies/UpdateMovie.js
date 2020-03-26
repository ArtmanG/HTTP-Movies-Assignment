import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialMovie = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: [],
};

const UpdateMovie = props => {
    const { id } = useParams();
    const { push } = useHistory();

    const [update, setUpdate] = useState(initialMovie);
    const [movieList] = useState(props.movieList);

    console.log(movieList);

    useEffect(() => {
        const movieToUpdate = movieList.find(e => `${e.id}` === id);
        if (movieToUpdate) {
            setUpdate(movieToUpdate);
        }
    }, [movieList, id]);

    const handleChange = e => {
        e.preventDefault();
        setUpdate({
            ...update,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${id}`, update)
            .then(res => {
                props.setMovieList(res.movie);
                push(`/movies/${id}`);
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="id"
                    placeholder="id"
                    onChange={handleChange} 
                    value={update.id}
                />

                <input 
                    type="text" 
                    name="title" 
                    placeholder="title" 
                    onChange={handleChange} 
                    value={update.title} 
                />

                <input 
                    type="text" 
                    name="director"
                    placeholder="director" 
                    onChange={handleChange}
                    value={update.director} 
                />

                <input 
                    type="text" 
                    name="metascore" 
                    placeholder="metascore" 
                    onChange={handleChange} 
                    value={update.metascore} 
                />

                {/* <input 
                    type="text" 
                    name="stars" 
                    placeholder="Stars" 
                    onChange={handleChange} 
                    value={update.stars} 
                /> */}

                <button type="submit">Update</button>
            </form>
        </div>
    )
};

export default UpdateMovie;