import Wrap from '../components/wrap';
import DirectControl from '../components/DirectControl';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';

class Control extends React.Component {
  state = {
    tab: 1,
  };

  handleChange = (_event, tab) => {
    this.setState({ tab });
  };

  renderHeader() {
    const { tab } = this.state;

    return (
      <Tabs value={tab} onChange={this.handleChange}>
        <Tab label="Quick" />
        <Tab label="Direct" />
      </Tabs>
    );
  }

  render() {
    const { tab } = this.state;

    return (
      <Wrap header={this.renderHeader()}>
        {tab === 0 && <Typography>Quick</Typography>}
        {tab === 1 && <DirectControl />}
      </Wrap>
    );
  }
}

export default Control;
