import { useState } from "react";

const LoginComponent = () => {
    //---- Global states

    //---- Local states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //---- Constants
    const idConstants = {
        "EMAIL": "login_email",
        "PASSWORD": "login_password"
    };

    //---- Actions
    const handleLoginSubmition = (e) => {
        e.preventDefault();
        console.log("Email : " + email + " | Password : " + password);
        handleLoginApiSubmit();
    };

    const handleFieldInput = (e) => {
        console.log(e.target.id);
        const targetField = e.target.id;
        const targetValue = e.target.value;
        switch (targetField) {
            case idConstants["EMAIL"]:
                setEmail(targetValue);
                break;
            case idConstants["PASSWORD"]:
                setPassword(targetValue);
                break;
        }
    };

    //---- Other methods
    const handleLoginApiSubmit = async () => {
        const apiEndpoint = "http://localhost:3001/api/login";
        const httpMethod = "POST";
        const headersObject = {"Content-Type": "application/json"};
        const loginDataObject = {email: email, password: password};
        const requestBody = JSON.stringify(loginDataObject);
        try {
            const response = await fetch(
                apiEndpoint,
                {
                    method: httpMethod,
                    headers: headersObject,
                    body: requestBody
                }
            );
            console.log(response);
            if (response.status >= 200 && response.status < 300) {
                console.log("Login Success");
            } else {
                console.log("Login Failed");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <form onSubmit={handleLoginSubmition}>
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
                    placeholder="Password"
                    value={password}
                    onChange={handleFieldInput}
                />
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginComponent;