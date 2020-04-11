import React from "react";

import { AuthUserContext } from "../Session";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import MoAvatar from "../shared/MoAvatar";
import MoMenu from "../shared/MoMenu";
import MoSkoolLogo from "../MoSkoolLogo";
import styles from "./styles";
import Toolbar from "@material-ui/core/Toolbar";
import withStyles from "@material-ui/core/styles/withStyles";
import AddCourse from "./AddCourse";

const Navigation = ({ classes }) => {
  return (
    <header className={classes.root}>
      <AppBar position="static" color="default" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Grid container className={classes.alignCenter}>
            <Grid item xs={6} sm={6} md={6} lg={6}>
              <MoSkoolLogo />
            </Grid>
            <Grid
              item
              xs={6}
              sm={6}
              md={6}
              lg={6}
              style={{ textAlign: "right" }}
            >
              <AuthUserContext.Consumer>
                {authUser => (
                  <>
                    {authUser && <AddCourse />}
                    <MoMenu authUser={authUser} />
                    <MoAvatar authUser={authUser} />
                  </>
                )}
              </AuthUserContext.Consumer>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default withStyles(styles)(Navigation);
