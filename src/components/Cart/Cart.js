import React from "react";
import { Container, Typography, Button, Grid } from "@material-ui/core";
import CartItem from "./CartItem/CartItem";
import { Link } from "react-router-dom";
import useStyles from "./styles";

const Cart = ({ cart, emptyCart, updateCart, removeFromCart }) => {
  const classes = useStyles();

  const EmptyCart = () => {
    return (
      <Typography variant='subtitle1'>
        {" "}
        Cart is empty <br />
        <Link to='/' className={classes.link}>
          Add something!
        </Link>
      </Typography>
    );
  };

  const FilledCart = () => {
    return (
      <>
        <Grid container spacing={3}>
          {cart.line_items.map((item) => (
            <Grid item xs={12} sm={6} key={item.id}>
              <CartItem
                item={item}
                updateCart={updateCart}
                removeFromCart={removeFromCart}
              />
            </Grid>
          ))}
        </Grid>
        <div className={classes.cartDetails}>
          <Typography variant='h4'>
            Subtotal: {cart.subtotal.formatted_with_symbol}
          </Typography>
          <div>
            <Button
              className={classes.emptyButton}
              size='large'
              type='button'
              variant='contained'
              color='secondary'
              onClick={() => emptyCart()}
            >
              Empty Cart
            </Button>
            <Button
              component={Link}
              to='/checkout'
              className={classes.checkoutButton}
              size='large'
              type='button'
              variant='contained'
              color='primary'
            >
              Checkout
            </Button>
          </div>
        </div>
      </>
    );
  };

  if (!cart.line_items) return "Loading...";

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant='h3' gutterBottom>
        Your shopping cart
      </Typography>
      {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
};

export default Cart;
