import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Fade from "@material-ui/core/Fade";
import { Link } from "react-router-dom";
import * as ROUTES from "../../../constants/routes";
import useStyles from "./styles";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const PageHeader = ({ title, course, topic, subTopic }) => {
	const classes = useStyles();
	return (
		<Fade in={true} timeout={{ enter: 1000 }}>
			<Typography variant="h5" gutterBottom className={classes.header}>
				<Box fontWeight="fontWeightLight" className={classes.linkText}>
					<Link
						to={`${ROUTES.LEARN.path}/${course}`}
						className={classes.linkText}
					>
						{course && <span>{course}</span>}
					</Link>
					<Link
						to={`${ROUTES.LEARN.path}/${course}/${topic}`}
						className={classes.linkText}
					>
						{topic && (
							<span>&nbsp;/&nbsp;{topic}</span>
						)}
					</Link>
					<Link className={classes.linkText}> 
						{subTopic && (
							<span>&nbsp;/&nbsp;{subTopic.replace(/-/g, " ")}</span>
						)}
						{title}
					</Link>
				</Box>
			</Typography>
		</Fade>
	);
};

export default PageHeader;
