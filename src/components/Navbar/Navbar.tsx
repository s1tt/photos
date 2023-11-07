import { NavLink } from 'react-router-dom';
import styles from './Navbat.module.css';

const Navbar = () => {
	return (
		<nav className={styles.nav}>
			<ul className={styles.list}>
				<li className={styles.item}>
					<NavLink to={'/random'} className={styles.link}>
						Random
					</NavLink>
				</li>
				<li className={styles.item}>
					<NavLink to={'/top'} className={styles.link}>
						Top
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
