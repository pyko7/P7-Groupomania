const Login = () => {
    return (
        <div class="connect-container">
            <div>
                <h1 className="connect-title">Se connecter</h1>
            </div>
            <form class="register-form">
                <input type="text" id="pseudoLogin" placeholder="Pseudo" required />
                <input type="password" id="pseudoLogin" placeholder="Mot de passe" required />
                <input type="submit" class="submit-button" value="Se connecter" />
            </form>
            <h2 className="connect-change-form"><a href="#">Vous n'avez pas de compte ? Inscrivez-vous ici</a></h2>
        </div>
    );
};

export default Login;