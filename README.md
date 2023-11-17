# Marketplayr

## [Click here to enter!](https://marketplayr.adaptable.app/)

![./public/images/Marketplayr.png]

## Description

A buy and sell platform for videogames.

## User Stories

**NOTE -** List here all the actions a user can do in the app. Example:

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to see the catalogue of games the website offers to me as soon as I enter
- **platform** - As a user I want to be able to filter the games i want to see in the catalogue depending on their platform
- **sign up** - As a user I want to sign up on the webpage so that I can buy or sell games
- **login** - As a user I want to be able to log in on the webpage
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **search** - As a user I want to be able to search an specific title of game that I want to buy
- **profile** - As a user I want to see which games I have bought, which games I am selling, and edit some of my personal info
- **profile-add-product** - As a user I want to be able to add some product (games) to the website and sell them
- **profile-productId** - As a user I want to be able to see in details and be able to edit the games I published in the website
- **profile-my-orders** - As a user I want to see which games I have bought and some of their details
- **profile-my-sales** - As a user I want to see which games I have sold and the info about the buyer, to be able to contact him/her

## Backlog Functionalities

- **Make it Store** - Right now, Marketplayr is designed as a buy and sell platform, but we wanted to make it also an store, where you can buy games from it (first hand), or be able to buy used games (market).
- **Navigation buttons** - We wanted to implement some more buttons to navigate faster through the website
- **User-rating system** - As a place where users are the ones who are selling, being able to rate their services, and how accurate were their products to their description
- **User-query** - Being able to find products by its seller, and have views from each user's profile

## Technologies used

HTML, CSS, Javascript, Node, Express, Handlebars, Sessions & Cookies, Rawg API, Cloudinary, MongoDB, MongoDB Atlas

## Routes

**NOTE -** List here all the routes of your server. Example:

-**HOMEPAGE**

- GET /

  - renders the homepage

-**PLATFORM ROUTES**

- GET /platform/nintendo-switch

  - renders a list of games of the platform chosen

- GET /platform/playstation-5

  - renders a list of games of the platform chosen

- GET /platform/playstation-4

  - renders a list of games of the platform chosen

- GET /platform/xboxSeriesX

  - renders a list of games of the platform chosen

- GET /platform/xbox-one
  - renders a list of games of the platform chosen

-**SEARCH ROUTES**

- GET /search

  - renders the results of the query in the query field in the Nav. bar

-**AUTH ROUTES**

- GET /auth/register

  - renders the register form

  - body:
    - username
    - email
    - password

- POST /auth/register

  - gets the username, email and password info from the form

  - redirects to /auth/login

- GET /auth/login

  - body:
    - email
    - password

- POST /auth/login

  - gets the email and password info from the form

  - redirects to homepage

- GET /auth/logout

  - Remove the session

  - Redirect to homepage

-**PRODUCT ROUTES**

- GET /product/:productId

  - renders the details from the product chosen from the list

-**ORDER ROUTES**

- GET /order/:productId/details

  - finds the ID from the product chosen

  - renders the form to buy a product

- POST /order/:productId/details

  - finds the ID from the product chosen

  - creates a new order with the info from the form

  - redirects to /profile

-**PROFILE ROUTES**

- GET /profile

  - renders the profile view

- GET /profile/add-product

  - renders a form to add a product to the website to sell

- GET /profile/add-product-search

  - asks to the API the list of titles you introduce into the query field

- POST /profile/add-product

  - creates a product in the DB with the info from the form

  - redirects to /profile/:productId

- GET /profile/:productId

  - renders the details from the products created by the user

- GET /profile/:productId/edit

  - renders a form to edit the product the user created

- POST /profile/:productI/editProduct

  - edit the product with the info from the form

- POST /profile/:productId/delete

  - delete the product

- GET /profile/my-sales

  - renders the list of the products the user has sold, with the details of their buyers

- GET /profile/my-orders

  - renders the list of the orders from the products the user has bought

- GET /profile/my-orders/:orderId/details

  - renders the details of the order of the product selected

- POST /profile/upload-picture

  - changes the profile image from the user

-**ADMIN ROUTES**

- GET /admin

  - renders admin's profile

  - shows a list of users of the website and a link to their profiles

- GET /admin/:userID/details

  - renders a view in details of the chosen user from the list and their
    products selling

- POST /admin/:productId/delete-product

  - delete a user's product

  - redirect to the same user's profile

## Models

- **Order model**

  buyer:
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",

  seller:
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",

  product:
  type: mongoose.Schema.Types.ObjectId,
  ref: "Product",

  address:
  type: String,

  status:
  type: String,
  enum: ["En proceso", "En envío", "Recibido"],
  default: "En proceso",

  orderPrice: Number,
  timestamps: true

- **Product model**

  title:
  type: String,
  trim: true,
  required: true,

  platform:
  type: String,
  trim: true,
  required: true,
  enum: [
  "Nintendo Switch",
  "Playstation 5",
  "Playstation 4",
  "Xbox Series X",
  "Xbox One",
  ],

  edition:
  type: String,
  trim: true,
  required: false,

  releaseYear:
  type: Number,
  trim: true,
  required: false,

  developer:
  type: String,
  trim: true,
  required: false,

  publisher:
  type: String,
  trim: true,
  required: false,

  price:
  type: Number,
  required: true,

  genre:
  type: String,
  trim: true,
  required: false,

  stock:
  type: Number,
  required: true,
  default: 1,

  onSale:
  type: Boolean,
  default: true,

  productPic:
  type: String,
  required: true,

  seller:
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",

  apiId:
  type: Number,

  timestamps: true

- **User model**

  username:
  type: String,
  trim: true,
  required: false,
  unique: true,

  email:
  type: String,
  required: true,
  unique: true,
  lowercase: true,
  trim: true,

  password:
  type: String,
  required: true,

  role:
  type: String,
  enum: ["user", "admin"],
  default: "user",

  profilePic: String,
  timestamps: true

## Links

## Collaborators

[Adrián Siquier Vallés](https://github.com/Bluesaurio)

### Project

[Marketplayr](https://github.com/raulgarrigos/marketplayr)

[https://marketplayr.adaptable.app/](https://marketplayr.adaptable.app/)
