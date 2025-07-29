import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MonitoredDestinations.css";
import { useNavigate } from "react-router-dom";

export default function MonitoredDestinations() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Form state for create/update
    const [form, setForm] = useState({
        id: null,
        location: "",
        riskLevel: "",
        lastChecked: "",
    });
    const [isEditing, setIsEditing] = useState(false);

    // Fetch all destinations
    const fetchAll = () => {
        setLoading(true);
        axios
            .get("/api/monitoredDestinations", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setDestinations(res.data))
            .catch(() => setError("Failed to load destinations."))
            .finally(() => setLoading(false));
    };

    useEffect(fetchAll, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((f) => ({...f, [name]: value }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await axios.put(`/api/monitoredDestinations/${form.id}`, form, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            } else {
                await axios.post("/api/monitoredDestinations", form, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            }
            setForm({ id: null, location: "", riskLevel: "", lastChecked: "" });
            setIsEditing(false);
            fetchAll();
        } catch {
            setError("Save failed.");
        }
    };

    const handleEdit = (dest) => {
        setForm(dest);
        setIsEditing(true);
    };

    const handleDelete = async(id) => {
        if (!window.confirm("Delete this destination?")) return;
        try {
            await axios.delete(`/api/monitoredDestinations/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchAll();
        } catch {
            setError("Delete failed.");
        }
    };

    if (loading) return <p > Loading... < /p>;
    if (error) return <p className = "error" > { error } < /p>;

    return ( <
        div className = "md-container" >
        <
        h2 > Monitored Destinations < /h2> <
        button className = "btn-add"
        onClick = {
            () =>
            setForm({ id: null, location: "", riskLevel: "", lastChecked: "" })
        } >
        +Add New <
        /button>

        <
        form className = "md-form"
        onSubmit = { handleSubmit } >
        <
        input name = "location"
        placeholder = "Location"
        value = { form.location }
        onChange = { handleChange }
        required /
        >
        <
        input name = "riskLevel"
        placeholder = "Risk Level"
        value = { form.riskLevel }
        onChange = { handleChange }
        required /
        >
        <
        input name = "lastChecked"
        type = "date"
        value = { form.lastChecked }
        onChange = { handleChange }
        required /
        >
        <
        button type = "submit"
        className = "btn-save" > { isEditing ? "Update" : "Create" } <
        /button> {
            isEditing && ( <
                button type = "button"
                className = "btn-cancel"
                onClick = {
                    () => {
                        setIsEditing(false);
                        setForm({
                            id: null,
                            location: "",
                            riskLevel: "",
                            lastChecked: "",
                        });
                    }
                } >
                Cancel <
                /button>
            )
        } <
        /form>

        <
        table className = "md-table" >
        <
        thead >
        <
        tr >
        <
        th > Location < /th> <
        th > Risk Level < /th> <
        th > Last Checked < /th> <
        th > Actions < /th> <
        /tr> <
        /thead> <
        tbody > {
            destinations.map((d) => ( <
                tr key = { d.id } >
                <
                td > { d.location } < /td> <
                td > { d.riskLevel } < /td> <
                td > { new Date(d.lastChecked).toLocaleDateString() } < /td> <
                td >
                <
                button className = "btn-edit"
                onClick = {
                    () => handleEdit(d) } >
                Edit <
                /button> <
                button className = "btn-delete"
                onClick = {
                    () => handleDelete(d.id) } >
                Delete <
                /button> <
                /td> <
                /tr>
            ))
        } <
        /tbody> <
        /table> <
        /div>
    );
}