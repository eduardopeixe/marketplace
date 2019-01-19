# Marktplace Summer Challenge

First things first: Please clone this Repository.
All the following instructions will assume you have a copy of this repository in you local machine and you are inside its directory.

```
git clone https://github.com/eduardopeixe/marktplace.git

cd marktplace
```

---

## Part 1: Build the barebones of an online marketplace.

To do this, build a server side web api that can be used to fetch products either one at a time or all at once.
Every product should have a title, price, and inventory_count.

Querying for all products should support passing an argument to only return products with available inventory.

Products should be able to be "purchased" which should reduce the inventory by 1. Products with no inventory cannot be purchased.

P.s. No need to make a frontend!

---

This is available in branch `barebones-api`.

Follow the instructions to checkout barebones-api

```
git checkout barebones-api
npm install
npm start
```

### what does it can do?

1. fetch all products
2. fetch a single product
3. fetch only products with available inventory
4. purchase a product - reduce inventory by 1

There are no requirements to add new products, update or delete them. So be careful to not run purchase all the inventory.

At this point you should be able to connect to [http://localhost:3000](http://localhost:3000)

If you get `Error: Page not found` you're in the right path.

Let's try and endpoint that should work[http://localhost:3000/v1/products](http://localhost:3000/v1/products)

Now, if everything is right, you seeing a list of products, which has title, price and inventory_count for each product

- Note 1: As per requirements inventory_count (snake case). I would rather use camelCase, which is default for JavaScript.
- Note 2: If you are seeing results in a browser and it looks clunky you may want to install a plugin to see it a little better. On Chrome, [JSONView](https://chrome.google.com/webstore/detail/jsonview/chklaanhfefbnpoihckbnefhakgolnmc?hl=en) will make things way better.
- Note 3: [Postman](https://www.getpostman.com/apps) is another amazing option. It will be pretty handy to test purchase.
