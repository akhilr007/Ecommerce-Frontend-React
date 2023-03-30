import { ShoppingCartSharp } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Rating,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import Shimmer from "../components/Shimmer";
import { addToCart } from "../feature/cart-slice";
import { getProducts } from "../feature/products-slice";

const Home = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const searchTerm = searchParams.get("searchTerm");

  const theme = useTheme();
  const state = useSelector((store) => store.products);
  const { value: products } = state ?? {};
  const dispatch = useDispatch();

  if (!products?.length) {
    dispatch(getProducts());
  }

  function addProductToCart(product) {
    // dispatch an action
    dispatch(addToCart({ product, quantity: 1 }));
  }

  let filteredProducts =
    category && category !== "all"
      ? products.filter((product) => product.category === category)
      : products;

  filteredProducts = searchTerm
    ? filteredProducts.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredProducts;

  return products?.length === 0 ? (
    <Shimmer />
  ) : (
    <Container sx={{ py: 8 }} maxWidth="lg">
      <Grid container spacing={4}>
        {filteredProducts.map(
          ({ title, id, price, description, rating, image }) => {
            return (
              <Grid item key={id} xs={12} sm={6} md={3}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    padding: theme.spacing(2, 0),
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      alignSelf: "center",
                      width: theme.spacing(30),
                      height: theme.spacing(30),
                      objectFit: "contain",
                      pt: theme.spacing(),
                      pb: theme.spacing(),
                    }}
                    image={image}
                    alt={title}
                  />
                  <CardContent>
                    <Typography
                      variant="h5"
                      component="h2"
                      gutterBottom
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: "1",
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {title}
                    </Typography>
                    <Typography
                      color="text.secondary"
                      paragraph
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: "2",
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {description}
                    </Typography>
                    <Typography fontSize="large" paragraph>
                      $ {price}
                    </Typography>
                    <Rating readOnly precision={0.5} value={rating.rate} />
                  </CardContent>
                  <CardActions sx={{ alignSelf: "center" }}>
                    <Button
                      variant="contained"
                      onClick={() =>
                        addProductToCart({
                          title,
                          id,
                          price,
                          description,
                          rating,
                          image,
                        })
                      }
                    >
                      <ShoppingCartSharp />
                      Add to cart
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          }
        )}
      </Grid>
    </Container>
  );
};

export default Home;
