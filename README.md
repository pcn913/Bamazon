-----------------------------------------
# Bamazon - Prasanth Nannapaneni
-----------------------------------------

#### Application Description
This is an Amazon-like storefront with a MySQL database backend.   


#### Application Details
There are 2 parts to this application

* Bamazon customer
	* to start this type 'node bamazonCustomer.js'
	* at this point you are presented with all the products from the Bamazon product table with a choice to buy a product.
		* enter product ID/units to buy
			* if purchase was successful, then application displays total price of transaction.
			* the products are shown once again with updated stock quantity
			* repeat
* Bamazon manager
	* to start this type 'node bamazonManager.js'
	* at this point you are prompted with 4 choices
		* view products for sale
			* lists all the products from products table
		* view low inventory
			* lists all the products that have less than 5 items in the inventory
		* add to inventory
			* prompted with ID/quantity to add to inventory; product table is updated with the additional inventory
		* add new product
			* prompt product name/department name/price/stock quantity; add new product to the prdoucts table

