import { useState } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../../firebaseConnection'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    async function handleRegister(e) {
        e.preventDefault()

        if(email !== '' && password !== '') {
            
            await createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigate('/admin', { replace: true } )
                toast.success("Usuario cadastrado com sucesso")
            })
            .catch(() => {
                toast.warn("Ocorreu um erro no cadastro")
                setEmail('')
                setPassword('')
            })

        }else{
            toast.warn("Campo vazio")
        }

    }

    return(
        <div className='home--container'>
            <h1>Cadastre-se</h1>
            {/* <span>Gerencie sua agenda de forma fácil.</span> */}

            <form className='home--form' onSubmit={handleRegister}>
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

                <button type='submit'>Cadastrar</button>
            </form>

            <Link to="/" className='home--button-register'>
                Já Possui conta? Faça o Login
            </Link>
        </div>
    )
}