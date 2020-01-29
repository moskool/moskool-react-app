import React, { useState } from "react";

import * as ROUTES from "../../../constants/routes";
import AddIcon from "@material-ui/icons/Add";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import PeopleIcon from "@material-ui/icons/People";

const AdminNav = ({ history }) => {
	const [value, setValue] = useState(history.location.pathname);
	
	return (
		<BottomNavigation
			value={value}
			onChange={(event, newValue) => {
				setValue(newValue);
				history.push(newValue);
			}}
			showLabels
		>
			<BottomNavigationAction
				label="Users"
				value={ROUTES.ADMIN_USERS.path}
				icon={<PeopleIcon />}
			/>
			<BottomNavigationAction
				label="Questions"
				value={ROUTES.ADMIN_QUESTIONS.path}
				icon={<AddIcon />}
			/>
		</BottomNavigation>
	);
};

export default AdminNav;
