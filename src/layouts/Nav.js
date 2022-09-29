import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
	return (
		<div>
			<ul className="nav-ul">
				<li>
					<Link to="/">BillList</Link>
				</li>
				<li>
					<Link to="/addlist">Add Bill</Link>
				</li>
			</ul>
		</div>
	);
}

export default Nav;
