import React from "react";
import { Link } from "react-router-dom";
import "./Homepagee.css";

export default function Homepagee() {
    return ( <
        div className = "home-container" >
        <
        header className = "home-header" >
        <
        h1 > Travel Risk Monitor < /h1> <
        nav className = "home-nav" >
        <
        Link to = "/home"
        className = "nav-link" >
        Home <
        /Link> <
        Link to = "/alerts"
        className = "nav-link" >
        Alerts <
        /Link> <
        Link to = "/destinations"
        className = "nav-link" >
        Destinations <
        /Link> <
        Link to = "/profile"
        className = "nav-link" >
        Profile <
        /Link> <
        /nav> <
        /header>

        <
        main className = "home-main" >
        <
        h2 > Welcome! < /h2> <
        p > Select a section from the navigation above to get started. < /p> <
        /main> <
        /div>
    );
}