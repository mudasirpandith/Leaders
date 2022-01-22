import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { NavLink } from "react-router-dom";

export default function BasicCard(props) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
          {props.topic}
        </Typography>
        <Typography variant="p" component="div">
          Chaperwise fully NCERT based
        </Typography>
      </CardContent>
      <CardActions>
        <NavLink className="nav-link" to={props.link}>
          <Button size="small">Start Test</Button>
        </NavLink>
      </CardActions>
    </Card>
  );
}
