import { Link } from 'react-router-dom'
import './Navbar.style.css'

const Navbar = () => {
    return (
        <nav>
            <ul className='nav-items'>
                <li>
                    <Link to='/' className='nav-link'>Home</Link>
                </li>
                <li>
                    <Link to='/settings' className='nav-link'>Settings</Link>
                </li>
                <li >
                    <Link to='/history' className='nav-link'>History</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar