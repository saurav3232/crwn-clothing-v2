import './sign-up-form.styles.scss';
import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from '../button/button.component';
import {
    createAuthUserWithEmailandPassword,
    createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
};
const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;
    // console.log(formFields);
    const resetFormFields=()=>{
        setFormFields(defaultFormFields);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        // const userDocRef= createUserDocumentFromAuth(response.user);
        if (password !== confirmPassword) {
            return;
        }
        try {
            const { user } = await createAuthUserWithEmailandPassword(
                email,
                password
            );
            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
            // console.log(user);
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                alert("User Already exists");
                resetFormFields();
            }
            else
            {
                console.log(error);
            }
        }

        // const userDocRef= createUserDocumentFromAuth(response.user);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };
    return (
        <div className="sign-up-container">
            <h2>Don't have an account ?</h2>
            <h2>Sign Up your email and password</h2>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Display Name" 
                    type="text"
                    name="displayName"
                    value={displayName}
                    onChange={handleChange}
                    required
                />
                <FormInput
                    label="Email" 
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    required
                />
                <FormInput
                    label="Password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    required
                />
                <FormInput
                    label="Confirm Password" 
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleChange}
                    required
                />
                <Button buttonType="inverted" type="submit">Sign Up</Button>
            </form>
        </div>
    );
};
export default SignUpForm;
