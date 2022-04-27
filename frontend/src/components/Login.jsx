import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from "../validations/UserValidation";
import { Link } from "react-router-dom";
import logo from '../assets/images/icon-above-font-nobg.png';

/*function to login to the website*/

const Login = () => {
    const navigate = useNavigate();
    /*
       *register: allows to register an input or select element and apply validation,
       handleSubmit: This function receives the form data if form validation is successful,
       getValues: read form values,
       formState: contains information about the entire form state, errors displays an error message
       *mode: validation will trigger on the submit event and invalid inputs
       *resolver: allows to use YUP as external validation
      */
    const { register, handleSubmit, getValues, formState: { errors } } = useForm({
        /*if input invalid, it displays error message when user select another input*/
        mode: 'onSubmit',
        resolver: yupResolver(loginSchema)
    });

    const logUser = async () => {
        const user = getValues();
        const settings = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                ...user
            }),
        };
        try {
            const res = await fetch('https://jsonplaceholder.typicode.com/users', settings)
            const data = await res.json();
            console.log(user.email);
            console.log(user.password);
            return data;
        } catch (error) {
            return error
        }
    }

    const submitForm = async () => {
        await logUser();
        navigate("/");
    }
    return (
        <main className="connect-modal">
            <div className="connect-container">
                <div className="logo-container">
                    <img src={logo} />
                </div>
                <div>
                    <h1 className="connect-title">Se connecter</h1>
                </div>
                <form onSubmit={handleSubmit(submitForm)}>
                    <input type="email" name="email" placeholder="Adresse email" {...register("email")} />
                    <p className="invalid-message">{errors.email?.message}</p>
                    <input type="password" name="password" placeholder="Mot de passe" {...register("password")} />
                    <p className="invalid-message">{errors.password?.message}</p>
                    <input type="submit" name="submitButton" value="Se connecter" />
                </form>
                <h2 className="connect-change-form"><Link to="/signup">Vous n'avez pas de compte ? Inscrivez-vous ici</Link></h2>
            </div>
        </main>
    );
};

export default Login;