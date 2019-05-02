import Link from 'next/link';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import GestureIcon from '@material-ui/icons/Gesture';
import VideoGameAssetIcon from '@material-ui/icons/VideogameAsset';
import { Paper } from '@material-ui/core';

function ListItemLink(props) {
  return (
    <Link href={props.href} passHref>
      <ListItem component="a" button>
        {props.children}
      </ListItem>
    </Link>
  );
}

function Sidebar() {
  return (
    <Paper style={{ height: '100vh' }}>
      <List component="nav">
        <ListItemLink href="/">
          <ListItemText primary="Draw" />
          <ListItemIcon>
            <GestureIcon />
          </ListItemIcon>
        </ListItemLink>
        <ListItemLink href="/control">
          <ListItemText primary="Control" />
          <ListItemIcon>
            <VideoGameAssetIcon />
          </ListItemIcon>
        </ListItemLink>
      </List>
    </Paper>
  );
}

export default Sidebar;
