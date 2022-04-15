import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { loginSchema } from "../validations/UserValidation";


/*function to login to the website*/

const Login = () => {
    /*
    *mode: if input invalid, it displays error message when user select another input
    *resolver: verify input validity compared to schema
    */
    const { register, handleSubmit, formState: { errors } } = useForm({
        /*if input invalid, it displays error message when user select another input*/
        mode: 'onTouched',
        resolver: yupResolver(loginSchema)
    });
    const submitForm = data => console.log(data);

    return (
        <div className="connect-container">
            <div>
                <h1 className="connect-title">Se connecter</h1>
            </div>
            <form className="register-form" onSubmit={handleSubmit(submitForm)}>
                <input type="email" name="email" placeholder="Adresse email" {...register("email")} />
                <p>{errors.email?.message}</p>
                <input type="password" name="password" placeholder="Mot de passe" {...register("password")} />
                <p>{errors.password?.message}</p>
                <input type="submit" name="submitButton" value="Se connecter" />
            </form>
            <h2 className="connect-change-form"><a href="#">Vous n'avez pas de compte ? Inscrivez-vous ici</a></h2>
        </div>
    );
};

export default Login;