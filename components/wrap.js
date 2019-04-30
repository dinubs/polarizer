import { Grid, Paper, withStyles } from "@material-ui/core";

import Sidebar from "./sidebar";

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit * 2,
  },
});

function Wrap(props) {
  const { classes } = props;

  return (
    <Grid container className={classes.root} spacing={16}>
      <Grid item xs={2}>
        <Sidebar />
      </Grid>
      <Grid item xs={10}>
        <Paper className={classes.paper} >
          {props.children}
        </Paper>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(Wrap);
