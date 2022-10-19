import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function CardLayout(props) {
  const image = "https://picsum.photos/200/300?random=" + props.index;
  const link = "" + props.link;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={image}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" component="div">
          <strong>Candidates :</strong>
          {props.candidates.slice(0, 2).map((item, index) => {
            return (
              <Typography key={index}>
                {index + 1}. {item}
                {index === 1 && props.candidates.length > 2 && " ..."}
              </Typography>
            );
          })}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={link} state={{ info: props.info }}>
          <Button size="small">View Details</Button>
        </Link>
      </CardActions>
    </Card>
  );
}
