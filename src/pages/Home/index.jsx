import { useState } from 'react'
import { Link } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebaseConnection'
import { useNavigate } from 'react-router-dom'
import '../Home/home.css'
import { toast } from 'react-toastify'

export default function Home() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    async function handleLogin(e) {
        e.preventDefault()

        if(email !== '' && password !== '') {
            await signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigate('./admin', { replace: true } )
                toast.success("Usuario Logado com sucesso")
            })
            .cath(() => {
                toast.error("FALHA AO LOGAR")
                setEmail('')
                setPassword('')
            })
        }else{
            toast.warn("Preencha todos os campos")
        }

    }

    return(
        <div className='home--container'>
            <h1>Lista de Tarefas</h1>
            <span>Gerencie sua agenda de forma fácil.</span>

            <form className='form' onSubmit={handleLogin}>
                <input
                type="text"
                placeholder='Informe seu e-mail'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />

                <input
                autoComplete={false}
                type="password"
                placeholder='*******'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />

                <button type='submit'>Acessar</button>
            </form>

            <Link to="/register" className='home--button-register'>
                Não possui uma conta? Cadastre-se
            </Link>
        </div>
    )
}