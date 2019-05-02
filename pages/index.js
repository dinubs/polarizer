import React from 'react';
import Button from '@material-ui/core/Button';

import Wrap from '../components/wrap';

class Home extends React.Component {
  render() {
    return (
      <Wrap>
        <Button variant="contained" color="primary">Hello World!</Button>
      </Wrap>
    );
  }
}

export default Home;
