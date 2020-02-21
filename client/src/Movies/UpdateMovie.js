import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'

const UpdateMovie = (props) => {
    const { id } = props.match.params;
    const history = useHistory();
    const [movie, setMovie] = useState({
        title: "",
        director: "",
        metascore: "",
        stars: []
    })

    const [newStar, setNewStar] = useState("")
    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
            .then(res => setMovie(res.data))
            .catch(err => console.log(err))
    }, [id])

    const handleChanges = e => {
        setMovie({ ...movie, [e.target.name]: e.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${id}`, movie)
            .then(() => {
                setMovie({
                    title: "",
                    director: "",
                    metascore: ""
                })
                history.push('/')
            })
            .catch(res => console.log(res))
    }

    const deleteStar = oldStar => {
        let newStars = movie.stars.filter(star => star !== oldStar)
        setMovie({...movie, stars: newStars })
    }

    return (
        <div>
            <form onSubmit={e => handleSubmit(e)}>
                <input name="title" value={movie.title} onChange={e => handleChanges(e)}/>
                <input name="director" value={movie.director} onChange={e => handleChanges(e)}/>
                <input type="number" name="metascore" value={movie.metascore} onChange={e => handleChanges(e)}/>
                <div>
                    <h2>Stars:</h2>
                    <h4>Add New Star</h4>
                    <input name="new-star" value={newStar} onChange={e => setNewStar(e.target.value)}/>
                    {/* <button onClick={() => addStar(newStar)}>Add Star</button> */}
                    {movie.stars ? movie.stars.map((star, i) => {
                        return <div key={i}>
                            <h3>{star}</h3>
                            <button onClick={() => deleteStar(star)}>Delete Star</button>
                        </div>
                    }) : null}
                </div>
                <button type="submit">Update Movie</button>
                <button>Update Movie</button>
            </form>
        </div>
    )
}

export default UpdateMovie 