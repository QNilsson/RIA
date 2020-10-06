import React from 'react'
import {
	Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography, makeStyles
} from '@material-ui/core'

const useStyles = makeStyles({
	root:{
		width:'100%',
	}
});

const CatView = (props) =>{
	const kitty = props.cat
	const classes = useStyles()

	return(
		
		<CardActionArea>
			<CardMedia
			className={classes.media}
			component="img"
			image="https://thumbs-prod.si-cdn.com/d4e3zqOM5KUq8m0m-AFVxuqa5ZM=/800x600/filters:no_upscale():focal(554x699:555x700)/https://public-media.si-cdn.com/filer/a4/04/a404c799-7118-459a-8de4-89e4a44b124f/img_1317.jpg"
			title="Beautiful cat"
			alt="cat"
			/>
			<CardContent>
				<Typography gutterBottom variant="h3" component="h2">
					{`${kitty.name}`}
				</Typography>
				<Typography variant="h5" component="p">
					Country of Origin: {`${kitty.origin}`}
				</Typography>
				<Typography variant="body2"  m="2rem" color="textSecondary" component="p" >
					{`${kitty.description}`}
				</Typography>
				
			</CardContent>
		
		<CardActions>
			<Button size="small" color="primary" href={kitty.wikipedia_url} target="_blank">
				Learn More
			</Button>
		</CardActions>
		</CardActionArea>
	)
}

export default CatView