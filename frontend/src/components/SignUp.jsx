import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from "../validations/UserValidation";

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
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                ...user
            }),
        };
        try {
            const res = await fetch('https://jsonplaceholder.typicode.com/users', settings)
            const data = await res.json();
            console.log(user.username);
            console.log(user.email);
            console.log(user.password);
            console.log(user.confirmPassword);
            navigate("/");
            return data;
        } catch (error) {
            return error
        }
    }

    return (
        <form onSubmit={handleSubmit(createUser)}>
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
    );
};

export default Register;
