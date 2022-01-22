import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function MultiActionAreaCard(props) {
  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="150"
          image={props.image}
          alt="Chemistry"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.subject}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Compact and fully NCERT based questions for NEET/JEE MAIN.Based on
            Recent NTA pattern.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <NavLink className="nav-link" to={props.link}>
          <Button size="small" variant="contained">
            {" "}
            View All{" "}
          </Button>
        </NavLink>
      </CardActions>
    </Card>
  );
}
