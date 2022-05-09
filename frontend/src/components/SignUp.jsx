import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from "../validations/UserValidation";
import { Link } from "react-router-dom";
import logo from '../assets/images/icon-above-font-nobg.png';


/*function to register to the website*/
const Register = () => {
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
        resolver: yupResolver(registerSchema)
    });

    const createUser = async () => {
        const user = getValues();
        const settings = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({ ...user }),
        };
        try {
            const res = await fetch('http://localhost:3000/api/auth/signup', settings)
            const data = await res.json();
            // localStorage.setItem("user", JSON.stringify(data));
            if (!res.ok) return
            navigate("/");
            return data;
        } catch (error) {
            return error
        }
    }

    return (
        <main className="connect-modal">
            <div className="connect-container">
                <div className="logo-container">
                    <img src={logo} alt="logo" />
                </div>
                <h1 className="connect-title">Se connecter</h1>

                <form onSubmit={handleSubmit(createUser)}>
                    <input type="text" name="firstName" minLength={2} maxLength={35} placeholder="Prénom"{...register("firstName")} />
                    <p className="invalid-message">{errors.firstName?.message}</p>
                    <input type="text" name="lastName" minLength={2} maxLength={35} placeholder="Nom"{...register("lastName")} />
                    <p className="invalid-message">{errors.lastName?.message}</p>
                    <input type="email" name="email" placeholder="Adresse email" {...register("email")} />
                    <p className="invalid-message">{errors.email?.message}</p>
                    <input type="password" name="password" autoComplete="off" placeholder="Mot de passe" {...register("password")} />
                    <p className="invalid-message">{errors.password?.message}</p>
                    <input type="password" name="confirmPassword" autoComplete="off" placeholder="Confirmer le mot de passe" {...register("confirmPassword")} />
                    <p className="invalid-message">{errors.confirmPassword && "Les mots de passes doivent être similaires"}</p>
                    <input type="submit" name="submitButton" value="S'inscrire" />
                </form>

                <Link to="/auth/login">
                    <h2>Déjà inscrit ? Connectez-vous ici</h2>
                </Link>
            </div>
        </main>
    );
};

export default Register;
