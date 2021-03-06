# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index:  '/products' [GET] 
- Show:  '/products/:id' [GET]
- Create [token required]:  '/products' [POST]
- [OPTIONAL] Top 5 most popular products '/five_most_popular' [GET]
- [OPTIONAL] Products by category (args: product category): '/category/:category' [GET]

#### Users
- Index [token required]: '/users' [GET]
- Show [token required]: '/users/:id' [GET]
- Create [token required]: '/users' [POST]

#### Orders
- Current Order by user (args: user id)[token required]: '/orders/:user_id/current_orders' [GET]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]: '/orders/:user_id/completed_orders' [GET]

## Data Shapes
#### Product
- id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

## Database Tables:
#### products
products (
    id: Primary Key, 
    name: VarChar, 
    price: Integer, 
    category: VarChar
)

#### users
users (
    id: Primary Key,
    firstname: VarChar,
    lastname: VarChar,
    password: VarChar
)

#### orders
orders (
    id: Primary Key,
    status: VarChar,
    user_id: Integer [foreign key to users table]
)

#### orders_products
orders_products (
    id: Primary Key,
    quantity: Integer,
    order_id: Integer [foreign key to orders table],
    product_id: Integer [foreign key to products table]
)
