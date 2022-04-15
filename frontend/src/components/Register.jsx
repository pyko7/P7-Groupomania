const Register = () => {
    return (
        <div class="connect-container">
            <div>
                <h1 className="connect-title">S'inscrire</h1>
            </div>
            <form class="register-form">
                <input type="text" id="pseudoRegister" placeholder="Pseudo" required />
                <input type="email" id="emailRegister" placeholder="Adresse email" required/>
                <input type="password" id="passwordRegister" placeholder="Mot de passe" required/>
                <input type="password" id="confirmPasswordRegister" placeholder="Confirmer le mot de passe" required/>
                <input type="submit" class="submit-button" value="S'inscrire" />
            </form>
            <h2 className="connect-change-form"><a href="#">Déjà inscrit ? Connectez-vous ici</a></h2>
        </div>
    );
};

export default Register;