import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from "../validations/UserValidation";
import { Link } from "react-router-dom";
import logo from '../assets/images/icon-above-font-nobg.png';


/*function to register to the website*/
const Register = () => {
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
        resolver: yupResolver(registerSchema)
    });

    const createUser = async () => {
        const user = getValues();
        const settings = {
            method: 'POST',
            body: JSON.stringify({
                ...user
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        };
        try {
            const res = await fetch('https://jsonplaceholder.typicode.com/users', settings)
            const data = await res.json();
            console.log(user.username);
            console.log(user.email);
            console.log(user.password);
            console.log(user.confirmPassword);
            return data;
        } catch (error) {
            return error
        }
    }


    const submitForm = async () => {
        await createUser();
        // window.location = "/"
    }


    return (
        <main className="connect-modal">
            <div className="connect-container">
                <div className="logo-container">
                    <img src={logo} />
                </div>
                <div>
                    <h1 className="connect-title">S'inscrire</h1>
                </div>
                <form onSubmit={handleSubmit(submitForm)}>
                    <input type="text" name="username" placeholder="Pseudo"{...register("username")} />
                    <p className="invalid-message">{errors.username?.message}</p>
                    <input type="email" name="email" placeholder="Adresse email" {...register("email")} />
                    <p className="invalid-message">{errors.email?.message}</p>
                    <input type="password" name="password" placeholder="Mot de passe" {...register("password")} />
                    <p className="invalid-message">{errors.password?.message}</p>
                    <input type="password" name="confirmPassword" placeholder="Confirmer le mot de passe" {...register("confirmPassword")} />
                    <p className="invalid-message">{errors.confirmPassword && "Les mots de passes doivent être similaires"}</p>
                    <input type="submit" name="submitButton" value="S'inscrire" />
                </form>
                <h2 className="connect-change-form"><Link to="/login">Déjà inscrit ? Connectez-vous ici</Link></h2>
            </div>
        </main>
    );
};

export default Register;
