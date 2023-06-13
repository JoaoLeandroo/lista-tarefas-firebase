import { useState, useEffect } from 'react'
import '../Admin/admin.css'
import { toast } from 'react-toastify'

import { auth, db } from '../../firebaseConnection'
import { signOut } from 'firebase/auth'
import { 
    addDoc,
    collection,
    onSnapshot,
    query,
    orderBy,
    where,
    doc,
    deleteDoc,
    updateDoc,
  } from 'firebase/firestore'
  

export default function Admin() {
    const [tarefaInput, setTarefaInput] = useState('')
    const [user, setUser] = useState({})
    const [edit, setEdit] = useState({})

    const [tarefas, setTarefas] = useState([])

    useEffect(() => {
        async function loadTarefas() {
            const userDetail = localStorage.getItem("@detailUser")
            setUser(JSON.parse(userDetail))

            if(userDetail) {
                const data = JSON.parse(userDetail)

                const tarefaRef = collection(db, "tarefas")
                const q = query(tarefaRef, orderBy("created", "desc"), where("userUid", "==", data?.uid))

                const unsub = onSnapshot(q, (snapshot) => {
                    let lista = []
                    
                    snapshot.forEach((item) => {
                        lista.push({
                            id: item.id,
                            tarefa: item.data().tarefa,
                            userUid: item.data().userUid
                        })
                    })                    
                    setTarefas(lista)
                })
            }
        }
        loadTarefas()
    }, [])

    async function handleRegisterTarefa(e) {
        e.preventDefault()

        if(tarefaInput === '') {
            toast.warn("informe uma tarefa")
            return
        }

        if(edit?.id) {
            handleUpdateTarefa()
            return
        }

        await addDoc(collection(db, "tarefas"), {
            tarefa: tarefaInput,
            created: new Date(),
            userUid: user?.uid,
        })
        .then(() => {
            toast.success("Tarefa Registrada com sucesso")
            setTarefaInput('')
        })
        .catch((erro) => {
            console.log(erro)
            toast.error("Erro, tente novamente.")
        })

    }

    async function handleLogout() {
        await signOut(auth)
        toast.success("Deslogado com Sucesso!")
    }

    // Como deletar do banco de dados
    async function deletarTarefa(id) {
        const docRef = doc(db, "tarefas", id)
        await deleteDoc(docRef)
        toast.success("Tarefa Deletada com Sucesso")
    }   

    function editTarefa(item) {
        setTarefaInput(item.tarefa)
        setEdit(item)
    }

    async function handleUpdateTarefa() {
        const docRef = doc(db, "tarefas", edit?.id )
        await updateDoc(docRef, {
            tarefa: tarefaInput
        })
        .then(() => {
            toast.success("Tarefa Atualizada")
            setTarefaInput("")
            setEdit({})
        })
        .catch(() => toast.error("A tarefa não foi atualizada, erro."))
    }

    return(
        <div className='admin--container'>
            <h1>Minhas Tarefas</h1>

            <form className='form' onSubmit={handleRegisterTarefa}>
                <textarea
                maxLength={300}
                className='text-tarefas'
                placeholder='Digite sua tarefa... Até 300 caracteres.'
                value={tarefaInput}
                onChange={(e) => setTarefaInput(e.target.value)}
                />

                {Object.keys(edit).length > 0 ? (
                 <button className='btn-register' type='submit'>Atualizar Tarefa</button>
                ) :  
                <button className='btn-register' type='submit'>Registrar Tarefa</button>}

            </form>

            {tarefas.map((item) => (
                <article key={item.id}>
                    <p>     
                        {item.tarefa}
                    </p>
                    <div>
                        <button className="btn-edit" onClick={() => editTarefa(item)}>Editar</button>
                        <button className="btn-delete" onClick={() => deletarTarefa(item.id)}>Deletar</button>
                    </div>
                </article>             
            ))}

            <button className='btn-logout' onClick={handleLogout}>Sair</button>
        </div>
    )
}