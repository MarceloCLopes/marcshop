import { Button, Grid, Paper, Typography, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import cartActions from "./store/actions/cart";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
  },
}));

export function Card({ product, children }) {
  const cart = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();
  const themes = useStyles();

  return (
    <Grid item xs={3}>
      <Paper className={themes.paper}>
        <Grid container direction="column">
          <Grid item>
            <img width="140px" src={product.image} alt={product.name_product} />
            <Typography variant="h6">{children}</Typography>
            <Typography variant="subtitle1">R$ {product.price}</Typography>
          </Grid>
          <Button
            variant="contained"
            onClick={() => dispatch(cartActions.Add(cart, product))}
          >
            Adicionar
          </Button>
        </Grid>
      </Paper>
    </Grid>
  );
}
