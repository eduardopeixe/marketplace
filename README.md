# Marketplace Summer Challenge

First things first: Please clone this Repository.
All the following instructions will assume you have a copy of this repository in your local machine and you are inside its directory.

```
git clone https://github.com/eduardopeixe/marketplace.git

cd marketplace
```

---

## Part 1: Build the barebones of an online marketplace.

This is a server-side web API that fetches products, either one at a time or all at once. I also make possible passing an argument to list only products with available inventory. In additicion to that, products can be purchased, which will reduce inventory by 1.

This is available in branch `barebones`.

Follow the instructions to checkout barebones

```
git checkout barebones
npm install
npm start
```

### What does it can do?

1. fetch all products
2. fetch only products with available inventory
3. fetch a single product
4. purchase a product - reduce inventory by 1

There are no requirements to add new products, update or delete them. So be careful to not purchase all the inventory.

### 1. Fetch All Products

At this point, you should be able to connect to

[http://localhost:3000](http://localhost:3000)

If you get `"message": "The page you reach out to does not exist."` you're on the right path.

Let's try an endpoint that should work

[http://localhost:3000/v1/products](http://localhost:3000/v1/products)

Now, if everything is right, you are seeing a list of products, which has title, price and inventory_count for each product. (it also has a link to open a single product's page)

- Note 1: As per requirements inventory_count (snake case). I would rather use camelCase, which is default for JavaScript.
- Note 2: If you are seeing results in a browser and it looks clunky you may want to install a plugin to see it a little better. On Chrome, [JSONView](https://chrome.google.com/webstore/detail/jsonview/chklaanhfefbnpoihckbnefhakgolnmc?hl=en) will make things way better.
- Note 3: [Postman](https://www.getpostman.com/apps) is another amazing option. It will be pretty handy to test purchase.

### 2. List Products With Available Inventory

The second endpoint is to list only products with available inventory. Please go to

[http://localhost:3000/v1/products?withInventory](http://localhost:3000/v1/products?withInventory)

### 3. List a Single Product

The third endpoint is to list a single product. Please go to

[http://localhost:3000/v1/products/5c4133250610005cfdd312c8](http://localhost:3000/v1/products/5c4133250610005cfdd312c8)

This will display T-shirt details. Please replace the T-shirt's ID (5c4133250610005cfdd312c8) by any other product's ID to see product's details.

### 4. Purchase a Product

The fourth endpoint cannot be tested from a browser. It uses PATCH method to update products' inventory_count. I use Postman for that. Using PATCH method, please go to:
[http://localhost:3000/v1/products/purchase/5c4133250610005cfdd312c8](http://localhost:3000/v1/products/purchase/5c4133250610005cfdd312c8).

If there is T-shirt available inventory you were presented with:

`"message": "Product T-shirt purchased"`

And T-shirt's inventory_count is reduced by one.

However, if there is _NO_ available inventory you were presented with:

`"message": "Product T-shirt has no inventory available"`

And the T-shirt's inventory_count is still ZERO.

By replacing T-shirt's ID (5c4133250610005cfdd312c8) you can purchase any other product.

This is the end of the barebones marketplace. The next section will explain cart functionality.

---

## 2. Shopping Cart

Now you can add products to a cart. Inventory will be affected only when the cart is completed.

Let's get started. From the marketplace directory, please do the following:

```
git checkout feature/shopping-cart
npm install
npm start
```

### What does it can do?

1. List cart products
2. Add product to cart
3. Remove product from cart
4. Complete cart

### 1. List Cart Products

Go to

[http://localhost:3000/cart](http://localhost:3000/cart)

If there are items in the cart, you will see a list of products, however, if items no items in the cart you see will see this:

`"message": "Cart is empty. Please add products"`

If you see this message, please go to the next topic to know how to add products to cart.

### 2. Add Product to Cart

Using method 'POST', please go to

[http://localhost:3000/v1/cart/add/5c4133250610005cfdd312c8](http://localhost:3000/v1/cart/add/5c4133250610005cfdd312c8)

This will add a T-shirt to cart, however, if there is no T-shirt available inventory, it will display an error.

You can add any item with available inventory to cart up to the inventory_count limit.

### 3. Remove Product from Cart

Using method 'PATCH', please go to

[http://localhost:3000/v1/cart/remove/5c4133250610005cfdd312c8](http://localhost:3000/v1/cart/remove/5c4133250610005cfdd312c8)

This functionality will add a product to your cart with quantity equals 1. If the item is already in the cart it will increment quantity by 1.

### 4. Complete cart

Once more using 'POST', please go to

[http://localhost:3000/v1/cart/complete](http://localhost:3000/v1/cart/complete)

Depending on what is in your car it will respond accordingly

- Error if no items in the cart
- Error if items in the cart have a quantity greater than inventory in the store. It will ask to remove items from the cart.

If no error found, it will reduce inventory in store and remove all items from the cart.

---

## 3. Add Security

Let's required users to be logged in when buying products or handling shopping cart.

First checkout the branch:

```
git checkout secure
npm install
npm start
```

A couple of endpoints were created - all them POST method
Ensure to have a body in your calls, like :

```
{"email": "test@mail.com",
"password": "123"}
```

- signup [http://localhost:3000/v1/users/sigup](http://localhost:3000/v1/users/sigup)
- login [http://localhost:3000/v1/users/login](http://localhost:3000/v1/users/login)

Upon a successful login request, the response is a message and a token. To access secure endpoints please add the Token value to the request header as Authorization.

You can test the security of it with:

- Purchase Product
- Add Product to Cart
- Remove Product from Cart
- Complete Cart

In case you have Postman, please import a collection, file marktplace.coolection.json from the root folder. You will find all kind of tests in it.

I hope you enjoy my app and I am looking forward to hearing your comments.

Thank you for taking the time and consideration.
