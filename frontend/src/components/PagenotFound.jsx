import pic from '/src/Images/404.png';
import './PagenotFound.css';
import { Link } from 'react-router-dom';
export default function PagenotFound() {
    return (
    <div className="center">
        <img src={pic} alt="404 pic" class="pic"/>
        <button className="btn"><Link to="/">Go Back</Link></button>
    </div>
    )
}