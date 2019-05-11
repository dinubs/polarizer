import TextField from '@material-ui/core/TextField';
import directSend from '../actions/directSend';
import { Chip, withStyles } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';

const styles = theme => ({
  chip: {
    marginBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
  }
});

class DirectControl extends React.Component {
  state = {
    input: '',
    commands: [],
  };

  commandBoxRef = React.createRef();

  onKeyPress = (e) => {
    const { commands } = this.state;

    if (e.key !== 'Enter' || e.target.value.trim() === '') {
      return;
    }

    directSend(e.target.value)
    .then(({ command }) => {
      commands.push(command);
      this.setState({ commands });
      this.commandBoxRef.current.scrollTop = this.commandBoxRef.current.scrollHeight;
    });
    e.target.value = '';
  }

  renderCommands() {
    const { commands } = this.state;
    const { classes } = this.props;

    return commands.map((command) => {
      return <div className={classes.chip}>
        <Chip
          deleteIcon={<DoneIcon />}
          label={command}
          style={{ minWidth: 120, justifyContent: 'start', padding: '0 6px' }}
        />
      </div>
    });
  }

  render() {
    return (
      <div>
        <div ref={this.commandBoxRef} style={{ height: 300, overflowY: 'scroll', boxSizing: 'border-box' }}>
          {this.renderCommands()}
        </div>
        <TextField
          placeholder="Send GCode directly to the Polargraph"
          fullWidth
          margin="normal"
          onKeyPress={this.onKeyPress}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
    );
  }
}

export default withStyles(styles)(DirectControl);;
