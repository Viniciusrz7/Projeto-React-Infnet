import './styles.css'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { USER_KEY } from '../../utils/storageKeys'

export interface ResponseAuth {
    "token": string;
    "usuario": { id: number, nome: string, email: string }
}

export default function login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function authLogin() {

        const response = await axios.post<Promise<ResponseAuth>>('http://localhost:3001/auth/login', { email, password })

        if (response.status !== 200) {
            alert('usuario ou senha incorretos')
            return;
        }

        localStorage.setItem(USER_KEY,JSON.stringify(response.data))
        navigate("/home")
    }

    function onSubmit() {
        if (email === '' || password === '') {
            alert('Preencha todos os campos');
            return;
        }
        else {
            authLogin();
            //  navigate("/home");
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