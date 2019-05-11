import { Grid, Paper, withStyles } from "@material-ui/core";

import Sidebar from "./sidebar";

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
  },
  paper: {
    boxSizing: 'border-box',
    padding: theme.spacing.unit * 2,
  },
  body: {
    marginBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
  }
});

function Wrap(props) {
  const { classes, header } = props;

  return (
    <Grid container className={classes.root} spacing={32}>
      <Grid item xs={2}>
        <Sidebar />
      </Grid>
      <Grid className={classes.body} item xs={10}>
        {header}
        <Paper className={props.classes.paper}>
          {props.children}
        </Paper>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(Wrap);
