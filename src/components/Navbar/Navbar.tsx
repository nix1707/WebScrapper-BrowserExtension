import { Link } from 'react-router-dom'
import './Navbar.style.css'
import { faClockRotateLeft, faGear, faHouse } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Navbar = () => {
    return (
        <nav>
            <ul className='nav-items'>
                <li>
                    <Link to='/' className='nav-link'>
                        {"Home  "}
                        <FontAwesomeIcon className='nav-link-icon' icon={faHouse} />
                    </Link>
                </li>
                <li>
                    <Link to='/settings' className='nav-link'>
                        {"Settings  "}
                        <FontAwesomeIcon className='nav-link-icon' icon={faGear} />
                    </Link>
                </li>
                <li >
                    <Link to='/history' className='nav-link'>
                        {"History  "}
                        <FontAwesomeIcon className='nav-link-icon' icon={faClockRotateLeft} />
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar