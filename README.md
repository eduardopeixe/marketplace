# Marketplace Summer Challenge

First things first: Please clone this Repository.
All the following instructions will assume you have a copy of this repository in you local machine and you are inside its directory.

```
git clone https://github.com/eduardopeixe/marketplace.git

cd marketplace
```

---

## Part 1: Build the barebones of an online marketplace.

This is a server side web api that can be used to fetch products, either one at a time or all at once. I also make possible passing an argument to list only products with available inventory. In addition to that, products can be purchased, which will reduce inventory by 1.

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

At this point, you should be able to connect to [http://localhost:3000](http://localhost:3000)

If you get `"message": "The page you reach out to does not exist."` you're on the right path.

Let's try an endpoint that should work[http://localhost:3000/v1/products](http://localhost:3000/v1/products)

Now, if everything is right, you are seeing a list of products, which has title, price and inventory_count for each product. (it also has a link to open a single product's page)

- Note 1: As per requirements inventory_count (snake case). I would rather use camelCase, which is default for JavaScript.
- Note 2: If you are seeing results in a browser and it looks clunky you may want to install a plugin to see it a little better. On Chrome, [JSONView](https://chrome.google.com/webstore/detail/jsonview/chklaanhfefbnpoihckbnefhakgolnmc?hl=en) will make things way better.
- Note 3: [Postman](https://www.getpostman.com/apps) is another amazing option. It will be pretty handy to test purchase.

### 2. List Products With Available Inventory

Second endpoint is to list only products with available inventory. Please go to  
 [http://localhost:3000/v1/products?withInventory](http://localhost:3000/v1/products?withInventory)

### 3. List a Single Product

The third endpoint is to list a single product. Please go to [http://localhost:3000/v1/products/5c4133250610005cfdd312c8](http://localhost:3000/v1/products/5c4133250610005cfdd312c8)  
This will display T-shirt details. Please replace T-shirt's ID (5c4133250610005cfdd312c8) by any other product's ID to see product's details.

### 4. Purchase a Product

The fourth endpoint cannot be tested from a browser. It uses PATCH method to update products' inventory_count. I use Postman for that. Using PATCH method, please go to:  
[http://localhost:3000/v1/products/purchase/5c4133250610005cfdd312c8](http://localhost:3000/v1/products/purchase/5c4133250610005cfdd312c8).

If there is T-shirt available inventory you were presented with:  
`"message": "Product T-shirt purchased"`  
And T-shirt's inventory_count is reduced by one.

However, if there is _NO_ available inventory you were presented with:  
`"message": "Product T-shirt has no inventory available"`  
And T-shirt's inventory_count is still ZERO.

By replacing T-shirt's ID (5c4133250610005cfdd312c8) you can purchase any other product.

This is the end of barebones marketplace. The next section will explain shopping cart functionality.

---
