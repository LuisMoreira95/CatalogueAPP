# Challenge

Create a front-end using Lightning Web Components (LWC) that fetches and displays product records from the API service "https://dummyjson.com/products". The product records should be filterable by title, category, and brand via the user interface. The product list should automatically refresh on page load and include a manual refresh option. The total number of products in stock must be displayed on the page. When the list is refreshed, it should be limited to a maximum of 100 products by category, or the total sum of their unitary prices should be under $10,000, without considering the number of products in stock.

## Requirements and Decisions

-Objective: Create a Lightning web component to visualize the products.
The products are displayed in a LWC Data Table. 

-All data must be fetched from https://dummyjson.com/
Created an apex class named ProductController that consumes the API.

-Data must be retrieved and stored in Salesforce
The Product2 standard object was used to store the retrieved records, utilizing the standard fields Name and Description, and custom fields ProductExternalId__c, Category__c, Price__c, Stock__c, and Brand__c, to store the relevant information. A product wrapper was created to manage the returned data in the ProductController to ensure the data structure is correctly set.

-The Component must have a way to filter by title, categories, brand, etc...
A text input was created to filter records by title, checking if the product contains the entered keywords. For filtering by category and brand, two select inputs were created, allowing the user to choose their desired search criteria. The search is triggered when the user presses the search button.

-The Component must provide a way to consume from API and refresh records in real-time
The search button in the filter refreshes the records. If no filters are selected, the full list of products is displayed.

-The Component must show product pictures (at least 1 thumbnail)
Thumbnails are shown on each product record in the data table.
 
-The Component must show the sum of all products in stock on the screen.
The total product stocks are computed and shown on a lightning card at the top of the page 

-Business requirement - Each category can have a maximum of 100 products or the total sum of unitary price under $10k, without considering the amount of products in stock
Once the products are retrieved from the Apex class, the conditions are applied to the data before it is displayed in the Data Table.

## To Improve/Reflect

- Pass some variables to the utilities file in the form of configurations.
- Add the feature of setting the columns where to search on configuration
- Pass the filter/search/limit logic to the backend
