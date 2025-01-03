# Challenge

Create a front-end with Lightning Web Components that lists product records returned by the API service "https://dummyjson.com/products".
The records should be filtered by title, category, and brand through the interface. They should be refreshed on load and also manually on the interface. The total number of products must be displayed on the page.
Once the records are refreshed they must be limited by category to a maximum of 100 products or the total sum of the unitary price must be under $10k, without considering the number of products in stock.

## Requirements and Decisions

-Objective: Create a Lightning web component to visualize the products.
The products are displayed in a LWC Data Table. 

-All data must be fetched from https://dummyjson.com/
Created an apex class named ProductController that consumes the API.

-Data must be retrieved and stored in Salesforce
Used the product2 standard object to store retrieved records by using the standard fields Name and Description and creating the custom fields ProductExternalId_c, Categoryc, Pricec, Stockc, and Brand_c, to accommodate the relevant information.
To work with the returned data, a product wrapper was created, on the ProductController to set the correct data structure.

-Component must have a way to filter by title, categories, brand, etc...
To filter the records by title, a text input was created that checks if the product has the written words.
To filter the records by category and brand two select inputs were created that the user set according to the desired search. The search is then done once the search button is pressed.

-Component must provide a way to consume from API and refresh records in real-time
The search button created on the filter refreshes the records. If the filters are not selected the full list of products is shown.

-Component must show product pictures (at least 1 thumbnail)
Thumbnails are shown on each product record in the data table.
 
-Component must show the sum of all products in stock on the screen.
The total product stocks are computed and shown on a lightning card at top of the page 

-Business requirement - Each category can have a maximum of 100 products or the total sum of unitary price under $10k, without considering the amount of products in stock
Once the products are retrieved from the apex class these filters are applied to the data before being shown in the Data Table.

## To Improve/Reflect

- Pass some variables to the utilities file in the form of configurations.
- Add the feature of setting the columns where to search on configuration
- Pass the filter logic to the backend