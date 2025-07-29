import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AlertsDashboard.css";

export default function AlertsDashboard() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [alerts, setAlerts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");

    // Fetch alerts
    useEffect(() => {
        axios
            .get("/api/alerts", { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                setAlerts(res.data);
                setFiltered(res.data);
            })
            .catch(() => setError("Failed to load alerts."))
            .finally(() => setLoading(false));
    }, [token]);

    // Filter on search
    useEffect(() => {
        if (!search) return setFiltered(alerts);
        const term = search.toLowerCase();
        setFiltered(
            alerts.filter(
                (a) =>
                a.title.toLowerCase().includes(term) ||
                a.status.toLowerCase().includes(term)
            )
        );
    }, [search, alerts]);

    if (loading) return <p className = "loading" > Loading alerts… < /p>;
    if (error) return <p className = "error" > { error } < /p>;

    return ( <
        div className = "alerts-container" > { /* Top Nav with search and profile icon */ } <
        div className = "alerts-nav" >
        <
        input type = "text"
        placeholder = "Search alerts…"
        value = { search }
        onChange = {
            (e) => setSearch(e.target.value) }
        className = "alerts-search" /
        >
        <
        span className = "profile-icon"
        onClick = {
            () => navigate("/profile") } > 👤
        <
        /span> <
        /div>

        <
        h2 className = "alerts-title" > Alerts & Notifications < /h2>

        <
        table className = "alerts-table" >
        <
        thead >
        <
        tr >
        <
        th > Timestamp < /th> <
        th > Title < /th> <
        th > Status < /th> <
        /tr> <
        /thead> <
        tbody > {
            filtered.map((alert) => ( <
                tr key = { alert.id }
                className = { alert.status.toLowerCase() === "high" ? "high" : "" } >
                <
                td > { new Date(alert.timestamp).toLocaleString() } < /td> <
                td > { alert.title } < /td> <
                td > { alert.status } < /td> <
                /tr>
            ))
        } <
        /tbody> <
        /table> <
        /div>
    );
}