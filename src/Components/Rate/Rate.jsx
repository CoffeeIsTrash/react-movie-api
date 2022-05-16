import React, { useEffect, useState } from "react";
import "./Rate.css";
import { useNavigate, useParams } from "react-router-dom";
import CustomNavbar from "../Navbar/CustomNavbar";
import { Form, FormControl, Button } from "react-bootstrap";

const API_KEY = process.env.REACT_APP_API_KEY;

export default function Rate() {
  let params = useParams();
  const [rate, setRating] = useState("");
  const navigate = useNavigate();
  const [session, setSession] = useState("");

  useEffect(() => {
      fetch(`https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${API_KEY}`)
      .then(response => response.json())
      .then(data => setSession(data.guest_session_id))
  }, [])

  function handleSubmit(e) {
    e.preventDefault();
    navigate('/');
    const movieRating = { value: `${rate}` };
    fetch(
      `https://api.themoviedb.org/3/movie/${params.movieID}/rating?api_key=${API_KEY}&guest_session_id=${session}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movieRating),
      }
    );
    alert("Thank you for rating the movie");
  }

  return (
    <div>
      <CustomNavbar />
      <div className="main">
        <div className="custom-container-rate">
          <h1>Thank you for rating this movie.</h1>
          <h6>We're so happy that you're rating this movie.</h6>
          <Form onSubmit={handleSubmit} className="d-flex">
            <FormControl
              type="number"
              placeholder="Enter your rating..."
              className="custom-input"
              min="1"
              max="10"
              onChange={(e) => setRating(e.target.value)}
            />
            <Button type="submit" className="custom-button">
              Submit
            </Button>
          </Form>
          <p className="help-text-error">Sorry, only on a scale form 1/10</p>
        </div>
      </div>
    </div>
  );
}
