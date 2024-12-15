import { useState } from "react";

const RegisterComponent = () => {
    //---- Global state
    
    //---- Local state
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    //---- Constants
    const idConstants = {
        "FIRST_NAME": "register_first_name",
        "LAST_NAME": "register_last_name",
        "EMAIL": "register_email",
        "PASSWORD": "register_password",
        "CONFIRM_PASSWORD": "register_confirm_password"
    };

    //---- Actions
    const handleRegistrationSubmition = (e) => {
        e.preventDefault();
        console.log("First Name: " + firstName + " | Last Name: " + lastName + " | Email: " + email + " | Password: " + password);
        handleRegistrationApiSubmit();
    }

    const handleFieldInput = (e) => {
        console.log(e.target.id);
        const targetField = e.target.id;
        const targetValue = e.target.value;
        switch (targetField) {
            case idConstants["FIRST_NAME"]:
                setFirstName(targetValue);
                break;
            case idConstants["LAST_NAME"]:
                setLastName(targetValue);
                break;
            case idConstants["EMAIL"]:
                setEmail(targetValue);
                break;
            case idConstants["PASSWORD"]:
                setPassword(targetValue);
                break;
            case idConstants["CONFIRM_PASSWORD"]:
                setConfirmPassword(targetValue);
                break;
        }
    };

    //---- Other methods
    const handleRegistrationApiSubmit = async () => {
        const apiEndpoint = "http://localhost:3001/api/register";
        const httpMethod = "POST";
        const headersObject = {"Content-Type": "application/json"};
        const registrationDataObject = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        };
        const requestBody = JSON.stringify(registrationDataObject);

        try {
            const response = await fetch(
                apiEndpoint,
                {
                    method: httpMethod,
                    headers: headersObject,
                    body: requestBody
                }
            );

            if (response.status >= 200 && response.status < 300) {
                console.log("Registration Successful");
            } else {
                console.log("Registration Failed");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="appcontainer">
            <form onSubmit={handleRegistrationSubmition}>
                <label>First Name:</label>
                <input
                    id={idConstants["FIRST_NAME"]}
                    type="text"
                    placeholder="John"
                    value={firstName}
                    onChange={handleFieldInput}
                />
                <label>Last Name: </label>
                <input
                    id={idConstants["LAST_NAME"]}
                    type="text"
                    placeholder="Doe"
                    value={lastName}
                    onChange={handleFieldInput}
                />
                <br />
                <label>Email: </label>
                <input
                    id={idConstants["EMAIL"]}
                    type="email"
                    placeholder="johndoe@example.com"
                    value={email}
                    onChange={handleFieldInput}
                />
                <br />
                <label>Password: </label>
                <input
                    id={idConstants["PASSWORD"]}
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={handleFieldInput}
                />
                <br />
                <label>Confirm Password: </label>
                <input
                    id={idConstants["CONFIRM_PASSWORD"]}
                    type="password"
                    placeholder="password"
                    value={confirmPassword}
                    onChange={handleFieldInput}
                />
                <br />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterComponent;