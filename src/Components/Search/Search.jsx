import { Button, Card, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import CustomNavbar from "../Navbar/CustomNavbar";
import './Search.css';
import { Link } from "react-router-dom";

const API_KEY = process.env.REACT_APP_API_KEY;

export default function Search(){
    document.title = 'Search | Watch TV+';

    const[isLoaded, setLoaded] = useState(false);
    const[results, setResults] = useState([]);
    const[searchQuery, setSearchQuery] = useState('');

    function handleChange(e){
        console.log(searchQuery);
        setSearchQuery({searchQuery: e.target.value});
    }

    function handleSubmit(e){
        const url = `https://api.themoviedb.org/3/search/movie/?api_key=${API_KEY}&language=en-US&query=${searchQuery.searchQuery}&page=1&include_adult=false`;
        e.preventDefault();
        fetch(url)
        .then(results => results.json())
        .then(data => {
            setResults(data.results);
            setLoaded(true);
            console.log(data);
        });
    }
    if(!isLoaded){
        return(
        <div>
            <CustomNavbar/>
            <div className="custom-container-search">
                <h3 className="search-title">What are you looking for?</h3>
                <p className="search-subtitle">We have everything you're looking for!</p>
                <Form className="d-flex" onSubmit={handleSubmit}>
                    <FormControl type="search" placeholder="Enter search term..." onChange={handleChange} className="input-search"/>
                    <Button className="custom-button" type="submit">Search</Button>
                </Form>
            </div>
        </div>
    );
    }else{
        return(
            <div>
            <CustomNavbar/>
                <Row>
                    {results.map(results => 
                        <div key={results.id} className="mapped-results col-sm-3 col-sm-pull-12">
                        <Link to={`/view/movie/${results.id}`}>
                            <img src={`https://image.tmdb.org/t/p/w500/${results.poster_path}`} className="mapped-image" alt={results.original_title} />
                        </Link>
                        </div>
                    )}
                    <Card>

                    </Card>

                </Row>

            </div>
        );
    }
    
}