import { NavLink } from 'react-router-dom';
import './MyNavLink.scss';
type MyNavLink = {
    children: string;
    to: string;
};

export default function MyNavLink({ to, children }: MyNavLink) {
    return (
        <span className="navlink-container">
            <NavLink to={to}>{children}</NavLink>
        </span>
    );
}
