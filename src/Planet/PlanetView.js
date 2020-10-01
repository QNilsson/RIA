import React from 'react';
import PlanetList from './PlanetList'
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import HeightSharpIcon from '@material-ui/icons/HeightSharp';
import Divider from '@material-ui/core/Divider'
import WcIcon from '@material-ui/icons/Wc';
import AirplanemodeActiveSharpIcon from '@material-ui/icons/AirplanemodeActiveSharp';


import {Card, CardActionArea, CardActions, CardContent, Typography, CardMedia, Button} from '@material-ui/core'


//rep is plan
//planet is member
const useStyles = makeStyles ({
	root:{
		maxWidth:354,
		maxHeight:600,
		
	},
});
const PlanetView = props => {
  const planet = props.plan;
  const classes = useStyles()
  return (
	  <div>
    <ListItem button className={classes.root}>
		<ListItemText primary={`${planet.name}`}/>
		
		<ListItemSecondaryAction>
			<Checkbox edge='end'/>
		</ListItemSecondaryAction>
	</ListItem>

	
		<ListItem className={classes.root}>
			<ListItemAvatar>
			<Avatar>
				<WcIcon />
			</Avatar>
			</ListItemAvatar>
				<ListItemText primary={`${planet.gender}`} secondary="This is my gender"/>
				</ListItem>
				<Divider variant="insert" component="li"/>
				<ListItem>
					<ListItemAvatar>
						<Avatar>
							<HeightSharpIcon/>
						</Avatar>
					</ListItemAvatar>
					<ListItemText primary={`${planet.height}`} secondary="This is my height"/>
				</ListItem>
				<Divider variant = "insert" component="li"/>
				<ListItem>
					<ListItemAvatar>
						<Avatar>
							<AirplanemodeActiveSharpIcon/>
						</Avatar>
					</ListItemAvatar>
					<ListItemText primary={`${planet.vehicles.length}`} secondary="How many starcrafts I own"/>
				</ListItem>
				
			
		
	
	</div>
  );
};
export default PlanetView;
