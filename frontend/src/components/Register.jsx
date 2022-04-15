import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { registerSchema } from "../validations/UserValidation";


/*function to register to the website*/
const Register = () => {

    /*
     *mode: if input invalid, it displays error message when user select another input
     *resolver: verify input validity compared to schema
    */
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onTouched',
        resolver: yupResolver(registerSchema)
    });
    const submitForm = data => console.log(data);

    return (
        <div className="connect-container">
            <div>
                <h1 className="connect-title">S'inscrire</h1>
            </div>
            <form className="register-form" onSubmit={handleSubmit(submitForm)}>
                <input type="text" name="pseudo" placeholder="Pseudo"{...register("pseudo")} />
                <p>{errors.pseudo?.message}</p>
                <input type="email" name="email" placeholder="Adresse email" {...register("email")} />
                <p>{errors.email?.message}</p>
                <input type="password" name="password" placeholder="Mot de passe" {...register("password")} />
                <p>{errors.password?.message}</p>
                <input type="password" className="invalid-input" name="confirmPassword" placeholder="Confirmer le mot de passe" {...register("confirmPassword")} />
                <p>{errors.confirmPassword && "Les mots de passes doivent être similaires"}</p>
                <input type="submit" name="submitButton" value="S'inscrire" />
            </form>
            <h2 className="connect-change-form"><a href="#">Déjà inscrit ? Connectez-vous ici</a></h2>
        </div>
    );
};

export default Register;
