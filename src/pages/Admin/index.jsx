import '../Admin/admin.css'
import { Link } from 'react-router-dom'

export default function Admin() {
    return(
        <div>
            <h2>USUARIO LOGADO</h2>
            <Link to="/">Return Home</Link>
        </div>
    )
}