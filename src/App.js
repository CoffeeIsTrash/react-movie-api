import "./App.css";
import { CustomNavbar, Trending } from "./Components";

export default function App() {
    return (
        <div className="main">
        <CustomNavbar />
        <div id="hero">
        <h3 className="trending hero">
        Everything you're looking for. All in one place
        </h3>
        <p className="trending">
        The biggest blockbusters, the boldest stories, and unforgettable
        classics that make us who we are.
        <br />
        <b>All this is available on Watch TV+</b>.
        </p>
        </div>
        <Trending media="trending/movie" timeframe="day" link="view/movie"/>
        <Trending media="trending/movie" timeframe="week" link="view/movie" />
        {/* <Trending media="trending/tv" timeframe="week" link="view/tv" /> */}
        {/* <Trending media="movie/top_rated" timeframe="week"/> */}
        <p className="legal">
        &copy; {new Date().getFullYear()} David
        Buday. All rights reserved.
        </p>
        </div>
        );
    }
    