import { Link, Typography } from "@material-ui/core";

export default function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center" className="mb-4">
        {'Copyright © '}
        <Link color="inherit" href="https://telkomathon.com/">
          Tim Eclipse
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }