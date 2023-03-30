import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import {
  Autocomplete,
  TextField,
  Badge,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Select,
  MenuItem,
  useTheme,
  Menu,
} from "@mui/material";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingBagSharp";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { getItemCount } from "../utils";
import { styled, alpha } from "@mui/material/styles";
import { getCategories } from "../feature/categories-slice";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { useAuth } from "../firebase/Auth";

const Search = styled("section")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  display: "flex",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
}));

const StyleAutocomplete = styled(Autocomplete)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiTextField-root": {
    paddingRight: `calc(1em + ${theme.spacing(4)})`,
  },
  "& .MuiInputBase-input": {
    color: theme.palette.common.white,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "& .MuiSvgIcon-root": {
    fill: theme.palette.common.white,
  },
}));

const SearchIconWrapper = styled("section")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  right: 0,
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.common.white,
  textDecoration: "none",
}));

const SearchBar = () => {
  const theme = useTheme();
  const products = useSelector((store) => store.products?.value);
  const categories = useSelector((store) => store.categories?.value);
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const searchTerm = searchParams.get("searchTerm");

  useEffect(() => {
    setSelectedCategory(category ? category : "all");
  }, [category]);

  const dispatch = useDispatch();

  if (!categories.length) {
    dispatch(getCategories());
  }

  function handleCategoryChange(event) {
    const { value } = event.target;
    navigate(
      value === "all"
        ? "/"
        : `?category=${value}${searchTerm ? "&searchTerm=" + searchTerm : ""}`
    );
  }

  function handleSearchChange(searchText) {
    if (searchText) {
      navigate(
        selectedCategory === "all"
          ? `?searchTerm=${searchText}`
          : `/?category=${selectedCategory}&searchTerm=${searchText}`
      );
    } else {
      navigate(
        selectedCategory === "all" ? `/` : `/?category=${selectedCategory}`
      );
    }
  }

  return (
    <Search>
      <Select
        value={selectedCategory}
        size="small"
        sx={{
          m: 1,
          "&": {
            "::before": {
              ":hover": {
                border: "none",
              },
            },
            "::before, &::after": {
              border: "none",
            },
            ".MuiSelect-standard": {
              color: "common.white",
            },
            ".MuiSelect-icon": {
              fill: theme.palette.common.white,
            },
          },
          textTransform: "capitalize",
        }}
        variant="standard"
        labelId="selected-category"
        id="selected-category-id"
        onChange={handleCategoryChange}
      >
        <MenuItem
          sx={{
            textTransform: "capitalize",
          }}
          value="all"
        >
          all
        </MenuItem>
        {categories.map((category) => (
          <MenuItem
            sx={{
              textTransform: "capitalize",
            }}
            key={category}
            value={category}
          >
            {category}
          </MenuItem>
        ))}
      </Select>
      <StyleAutocomplete
        freeSolo
        onChange={(e, value) => {
          handleSearchChange(value?.label);
        }}
        disablePortal
        id="combo-box-demo"
        options={Array.from(
          selectedCategory === "all"
            ? products
            : products.filter((p) => p.category === selectedCategory),
          (prod) => ({
            id: prod.id,
            label: prod.title,
          })
        )}
        renderInput={(params) => <TextField {...params} />}
      />
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
    </Search>
  );
};

const Header = () => {
  const cartItems = useSelector((store) => store.cart?.value);
  const count = getItemCount(cartItems);
  const { user, signOut } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const navigate = useNavigate();
  function navigateToCart() {
    navigate("/cart");
  }

  function handleProfileMenuOpen(e) {
    setAnchorEl(e.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
  }

  async function logout() {
    await signOut();
    navigate("/login");
  }

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id="user-profile-menu"
      keepMounted
      transformOrigin={{
        horizontal: "right",
        vertical: "top",
      }}
      anchorOrigin={{
        horizontal: "right",
        vertical: "bottom",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My Account</MenuItem>
      <MenuItem onClick={logout}>Logout</MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          py: 1,
        }}
      >
        <Toolbar sx={{ display: "flex", gap: 2 }}>
          <Typography variant="h6" color="inherit">
            <StyledLink to="/"> BingeKart </StyledLink>
          </Typography>
          <SearchBar />
          <Box sx={{ display: { xs: "flex" } }}>
            <IconButton
              onClick={navigateToCart}
              size="large"
              aria-label="show cart items count"
              color="inherit"
            >
              <Badge badgeContent={count} color="error">
                <ShoppingCartSharpIcon />
              </Badge>
            </IconButton>
            {user ? (
              <Button onClick={handleProfileMenuOpen} color="inherit">
                Hello, {user?.displayName ?? user.email}
              </Button>
            ) : (
              <Button onClick={() => navigate("/login")} color="inherit">
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </>
  );
};

export default Header;
