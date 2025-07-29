import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";
import { useNavigate } from "react-router-dom";

const SA_AREAS = [
    "Gauteng",
    "Johannesburg",
    "Pretoria",
    "Western Cape",
    "Cape Town",
    "KwaZulu-Natal",
    "Durban",
    "Pietermaritzburg",
    "Eastern Cape",
    "Port Elizabeth",
    "East London",
    "Grahamstown",
    "Free State",
    "Bloemfontein",
    "Mpumalanga",
    "Nelspruit",
    "Limpopo",
    "Polokwane",
    "North West",
    "Mahikeng",
    "Northern Cape",
    "Kimberley",
];

export default function Profile() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        notificationThreshold: 50,
        preferredRegions: "",
    });
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    // Fetch profile
    useEffect(() => {
        axios
            .get("/api/user/profile", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                const { name, email, settings } = res.data;
                setForm({
                    name,
                    email,
                    password: "",
                    notificationThreshold: settings ? .notificationThreshold ? ? 50,
                    preferredRegions: (settings ? .preferredRegions ? ? []).join(", "),
                });
            })
            .catch(() => setMessage("Failed to load profile."))
            .finally(() => setLoading(false));
    }, [token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((f) => ({...f, [name]: value }));
    };

    const handleRegionInput = (e) => {
        const val = e.target.value;
        setForm((f) => ({...f, preferredRegions: val }));

        const parts = val.split(",");
        const last = parts[parts.length - 1].trim().toLowerCase();

        if (!last) {
            setSuggestions([]);
            return;
        }

        const matches = SA_AREAS.filter((area) =>
            area.toLowerCase().startsWith(last)
        );
        setSuggestions(matches);
    };

    const pickSuggestion = (suggestion) => {
        const parts = form.preferredRegions.split(",");
        parts.pop();
        const newList = [...parts.map((p) => p.trim()), suggestion]
            .filter(Boolean)
            .join(", ");
        setForm((f) => ({...f, preferredRegions: newList + ", " }));
        setSuggestions([]);
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        setMessage("Saving…");
        try {
            await axios.put(
                "/api/user/profile", {
                    ...form,
                    settings: {
                        notificationThreshold: Number(form.notificationThreshold),
                        preferredRegions: form.preferredRegions
                            .split(",")
                            .map((r) => r.trim())
                            .filter((r) => r),
                    },
                }, { headers: { Authorization: `Bearer ${token}` } }
            );
            setMessage("Profile updated!");
        } catch {
            setMessage("Failed to save changes.");
        }
    };

    if (loading) return <p className = "loading" > Loading your profile… < /p>;

    return ( <
        div className = "profile-container" >
        <
        div style = {
            { textAlign: "right", fontSize: "0.9em" } } >
        <
        button onClick = {
            () => navigate("/Homepagee") }
        style = {
            {
                background: "none",
                border: "none",
                color: "#007bff",
                cursor: "pointer",
                padding: 0,
                textDecoration: "underline",
            }
        } >
        ←Go to homepage <
        /button> <
        /div>

        <
        h1 className = "page-title" > Profile & amp; Preferences < /h1> {
            message && < div className = "alert" > { message } < /div>}

            <
            form onSubmit = { handleSubmit }
            className = "profile-form" >
                <
                label > Name < /label> <
                input
            type = "text"
            name = "name"
            value = { form.name }
            onChange = { handleChange }
            required
                /
                >

                <
                label > Email < /label> <
                input
            type = "email"
            name = "email"
            value = { form.email }
            onChange = { handleChange }
            required
                /
                >

                <
                label > New Password < /label> <
                input
            type = "password"
            name = "password"
            value = { form.password }
            onChange = { handleChange }
            placeholder = "Leave blank to keep current" /
                >

                <
                label > Notification Threshold( % ) < /label> <
                input
            type = "range"
            name = "notificationThreshold"
            min = "0"
            max = "100"
            value = { form.notificationThreshold }
            onChange = { handleChange }
            /> <
            div className = "range-value" > { form.notificationThreshold } % < /div>

            <
            label > Preferred Regions(comma - separated) < /label> <
                input
            type = "text"
            name = "preferredRegions"
            value = { form.preferredRegions }
            onChange = { handleRegionInput }
            placeholder = "e.g. Johannesburg, Cape Town…" /
                > {
                    suggestions.length > 0 && ( <
                        ul className = "suggestions" > {
                            suggestions.map((area) => ( <
                                li key = { area }
                                onClick = {
                                    () => pickSuggestion(area) } > { area } <
                                /li>
                            ))
                        } <
                        /ul>
                    )
                }

            <
            button type = "submit"
            className = "btn-save" >
                Save Changes <
                /button> <
                /form> <
                /div>
        );
    }