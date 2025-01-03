import { LightningElement, wire } from 'lwc';
import getAndSaveProducts from '@salesforce/apex/ProductController.getAndSaveProducts';
import {LABELS} from "c/customUtilities";

export default class CustomCatalogue extends LightningElement {
    testLimit = false;

    // Table
    products = [];
    filteredProducts = [];
    productsInStock;
    

    get columns() {
        return LABELS.DataTable.Columns;
    }
    
    // Filter
    brand = 'None';
    category = 'None';

    // Spinner
    loaded = true;

    // No Data
    get noData() {
        return !!this.filteredProducts.length;
    };

    // Debounce 
    timer;

    async connectedCallback() {
        await this.getProducts();
        this.sumProductsInStock();
    }

    async getProducts() {
        this.loaded = false;
        this.products = await getAndSaveProducts();
        this.filteredProducts = this.products;
        
        // Limit the products showed in each category
        this.filteredProducts = this.limitProducts();
        
        // FILTER
        if (this.brand != 'None') {
            this.filteredProducts = this.filteredProducts.filter((product) => {
                return product.brand == this.brand; 
            });
        }

        if (this.category != 'None') {
            this.filteredProducts = this.filteredProducts.filter((product) => {
                return product.category == this.category; 
            });
        }
        
        this.loaded = true;
    }

    handleFiltering(event) {
        this.brand = event?.detail?.brand;
        this.category = event?.detail?.category;   
        this.getProducts();
    };

    handleSearch(event) {
        const {value} = event.target;
        window.clearTimeout(this.timer);
        this.timer = window.setTimeout(() => {
            this.filteredProducts = this.products.filter( (product) => {
                return product["title"].toLowerCase().includes(value);
            })
        }, 500);
    }
    
    sumProductsInStock() {
        this.productsInStock = this.products.reduce((n, {stock}) => n + stock, 0);
    };

    limitProducts() {

        // Create more than 100 products for each category
        if(this.testLimit) {
            this.createProducts("beauty");
            this.createProducts("fragrances");
            this.createProducts("furniture");
            this.createProducts("groceries");
        }
        
        // Store the accumulator value for each category
        // Until our limits are reached
        const categories = {};     
        const filtered = [];
          
        for (const product of this.filteredProducts) {
            const { category, price } = product;
          
            // Set initial accumulator values for each category once
            if (!categories[category]) {
                categories[category] = { count: 0, cost: 0 };
            }
          
            const { count, cost } = categories[category];
          
            // Condition: The number of products for this category didn't reach 100
            // && Adding the current price to the total cost doesn't exceed 10000
            if (count < 100 && cost + price <= 10000) {
                filtered.push(product);
          
                categories[category].count += 1;
                categories[category].cost += price;
            }
            //   else {
            //     If the intention is not to fit the maximum number of products inside the 10k range, do this
            //     categories[category].count += 100;
            //   }
        }
        return filtered;
    };
    
    createProducts(category) {
        for (let index = 0; index < 105; index++) {
            this.filteredProducts.push({
                id: index,
                title: "Product " + index,
                description: "Product " + index,
                category,
                price: category == 'furniture' ? 4000 : 1,
                stock: 5,
                brand: "Essence",
                thumbnail: "https://cdn.dummyjson.com/products/images/groceries/Kiwi/thumbnail.png"
            });
        }
    }
}