import './styles.css'
import { useState } from 'react'
import { useNavigate } from 'react-router'

export default function login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    function onSubmit() {
        if (email === '' || password === '') {
            alert('Preencha todos os campos');
            return;
        }
        else {
            navigate("/home");
        }
    }
    return (
        <div className="container-login">
            <form className="container-form-login">
                <h1>Login</h1>
                <p>Informe seus dados corretamente</p>

                <input type="text" placeholder="Email" value={email}
                    onChange={(evento) => setEmail(evento.target.value)} />
                <input type="password" placeholder="Senha" value={password}
                    onChange={(evento) => setPassword(evento.target.value)} />

                <button type="button" onClick={onSubmit}>Entrar</button>
            </form>
        </div>
    )
}