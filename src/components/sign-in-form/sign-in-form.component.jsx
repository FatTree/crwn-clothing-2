import { useState } from "react";
import { signInAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInWithGooglePopup } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-in-form.style.scss';

const defaultFormFields= {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFromFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            
            console.log(response);
            resetFromFields();
        } catch (err) {
            switch(err.code) {
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email')
                    break;
                default:
                    console.log(err);
            }
        }
    }

    const handleChange = (evt) => {
        const {name, value} = evt.target;
        setFormFields({...formFields, [name]: value })
    }

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign In with your email and password</span>
            <form onSubmit={ handleSubmit }>
                <FormInput
                    label="Email"
                    type="email" 
                    required 
                    onChange={handleChange} 
                    name="email"
                    value={email} />

                <FormInput
                    label="Password"
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="password"
                    value={password} />
                <div className="buttons-container">
                    <Button typr="sumit">Sign In</Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}>
                        Google sign in
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;