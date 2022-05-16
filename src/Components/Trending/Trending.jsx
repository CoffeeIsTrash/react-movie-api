import React from "react";
import './Trending.css';
import { Link } from "react-router-dom";


const API_KEY = process.env.REACT_APP_API_KEY;

export default class Trending extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            results: []
        };
    }

    componentDidMount(){
        console.log("componentdidmount started")
        fetch(`https://api.themoviedb.org/3/${this.props.media}/${this.props.timeframe}?api_key=${API_KEY}`)
        .then(results => results.json())
        .then(data => {
            console.log("component did mount")

            this.setState({
                isLoaded: true,
                data: data.results
                });
            },

        error => {
            console.log(error);
            this.setState({
                isLoaded: true,
                error
                });
            }
        );
    }
    
    render(){
        const { error, isLoaded, data } = this.state;

        
            return (
                <div className="scroll-tray">
                    {isLoaded? (<>{data.map(data => (
                        <div className="media-card" key={data.id}>
                            <Link to={`/${this.props.link}/${data.id}`}>
                                <img src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`} alt={data.name} key={data.id} className="scroll-tray-image"/>
                            </Link>
                        </div>
                    ))}</>) : 'LOADING'}
                </div>
            );
        }
    }

