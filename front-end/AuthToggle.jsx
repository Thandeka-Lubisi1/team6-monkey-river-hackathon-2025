import React, { useState, useRef } from "react";
import "./AuthToggle.css";

function AuthToggle() {
    const [isRegister, setIsRegister] = useState(false);
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirm: "",
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const eyeRefs = [useRef(null), useRef(null)];

    const handleToggle = () => {
        setIsRegister((r) => !r);
        setForm({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirm: "",
        });
        setErrors({});
    };

    const validate = () => {
        let e = {};
        if (isRegister) {
            if (!form.firstName) e.firstName = "Required";
            if (!form.lastName) e.lastName = "Required";
            if (form.password.length < 8 || !/[!@#$%^&*]/.test(form.password))
                e.password = "8+ chars & special";
            if (form.password !== form.confirm) e.confirm = "Must match";
        }
        if (!/.+@.+\..+/.test(form.email)) e.email = "Invalid email";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        console.log(isRegister ? "Registering" : "Logging in", form);
    };

    const handleChange = (e) => {
        setForm((f) => ({...f, [e.target.name]: e.target.value }));
    };

    const focusEyes = (action) => {
        eyeRefs.forEach((ref) => {
            if (ref.current) {
                if (action === "open") {
                    ref.current.classList.remove("closed", "peeking");
                } else if (action === "close") {
                    ref.current.classList.add("closed");
                    ref.current.classList.remove("peeking");
                } else if (action === "peek") {
                    ref.current.classList.add("peeking");
                    ref.current.classList.remove("closed");
                }
            }
        });
    };

    return ( <
            div className = "auth-container" >
            <
            div className = "balls" >
            <
            div className = "ball eye-ball"
            ref = { eyeRefs[0] }
            /> <
            div className = "ball eye-ball"
            ref = { eyeRefs[1] }
            /> <
            /div>

            <
            div className = "toggle-buttons" >
            <
            button className = {!isRegister ? "active" : "" }
            onClick = { handleToggle } >
            Login <
            /button> <
            button className = { isRegister ? "active" : "" }
            onClick = { handleToggle } >
            Register <
            /button> <
            /div>

            <
            form onSubmit = { handleSubmit } > {
                isRegister && ( <
                    >
                    <
                    input name = "firstName"
                    placeholder = "First Name"
                    value = { form.firstName }
                    onChange = { handleChange }
                    onFocus = {
                        () => focusEyes("open") }
                    /> {
                        errors.firstName && < small > { errors.firstName } < /small>} <
                            input
                        name = "lastName"
                        placeholder = "Last Name"
                        value = { form.lastName }
                        onChange = { handleChange }
                        onFocus = {
                            () => focusEyes("open") }
                        /> {
                            errors.lastName && < small > { errors.lastName } < /small>} <
                                />
                        )
                    }

                    <
                    input name = "email"
                    placeholder = "Email Address"
                    value = { form.email }
                    onChange = { handleChange }
                    onFocus = {
                        () => focusEyes("open") }
                    /> {
                        errors.email && < small > { errors.email } < /small>}

                        <
                        div className = "password-wrapper" >
                            <
                            input
                        type = { showPassword ? "text" : "password" }
                        name = "password"
                        placeholder = "Password"
                        value = { form.password }
                        onChange = { handleChange }
                        onFocus = {
                            () => focusEyes("close") }
                        /> <
                        span
                        className = "password-toggle"
                        onClick = {
                                () => {
                                    setShowPassword((p) => !p);
                                    focusEyes("peek");
                                }
                            } >
                            { showPassword ? "🙈" : "👁️" } <
                            /span> <
                            /div> {
                                errors.password && < small > { errors.password } < /small>}

                                {
                                    isRegister && ( <
                                        >
                                        <
                                        div className = "password-wrapper" >
                                        <
                                        input type = { showConfirm ? "text" : "password" }
                                        name = "confirm"
                                        placeholder = "Confirm Password"
                                        value = { form.confirm }
                                        onChange = { handleChange }
                                        onFocus = {
                                            () => focusEyes("close") }
                                        /> <
                                        span className = "password-toggle"
                                        onClick = {
                                            () => {
                                                setShowConfirm((p) => !p);
                                                focusEyes("peek");
                                            }
                                        } >
                                        { showConfirm ? "🙈" : "👁️" } <
                                        /span> <
                                        /div> {
                                            errors.confirm && < small > { errors.confirm } < /small>} <
                                                />
                                        )
                                    }

                                    {
                                        !isRegister && < a href = "/forgot" > Forgot password ? < /a>}

                                        <
                                        button type = "submit" > { isRegister ? "Register" : "Log in" } < /button> <
                                            /form> <
                                            /div>
                                    );
                                }

                                export default AuthToggle;