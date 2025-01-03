public class ProductController {
    
    @AuraEnabled
    public static List<ProductWrapper.product> getProductsService() {
        
        List<ProductWrapper.product> productsList = new List<ProductWrapper.product>(); 
        
        // Send the request, and return a response
        Http http = new Http();
        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://dummyjson.com/products');
        req.setMethod('GET');
        HttpResponse res = http.send(req);
        
        // Wrap the reponse in the proper structure to handle it easier
        ProductWrapper getProductsResponse = ProductWrapper.parse(res.getBody());
        productsList.addAll(getProductsResponse.products);
        
        return productsList;
    }
    
    @AuraEnabled
    public static List<ProductWrapper.product> getAndSaveProducts(){
        List<ProductWrapper.product> productList = getProductsService();
        saveProducts(productList);
        return productList;
    }
    
    public static void saveProducts(List<ProductWrapper.product> productList) {
        List<Product2> products = new list<Product2>();
        if (productList != null) {
            for (ProductWrapper.product product : productList) {
                products.add(new Product2(
                    ProductExternalId__c = product.id.format(),
                    Name = product.title,
                    Description = product.description,
                    Category__c = product.category,
                    Price__c = product.price,
                    Stock__c = product.stock,
                    Brand__c = product.brand
                ));
            }
        }
        
        try {
            upsert products ProductExternalId__c;
        } catch (DmlException e) {
            System.debug(e.getMessage());
        }
    }
}