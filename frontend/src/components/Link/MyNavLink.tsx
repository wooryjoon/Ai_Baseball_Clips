import { NavLink } from 'react-router-dom';
import './MyNavLink.scss';
import { memo } from 'react';
type MyNavLink = {
    children: string;
    to: string;
};

function MyNavLink({ to, children }: MyNavLink) {
    return (
        <span className="navlink-container">
            <NavLink end to={to}>
                {children}
            </NavLink>
        </span>
    );
}
export default memo(MyNavLink);
