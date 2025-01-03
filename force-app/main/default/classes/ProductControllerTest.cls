@isTest
public with sharing class ProductControllerTest {
    @isTest
    public static void getAndSaveProductsTest() {
        Test.setMock(HttpCalloutMock.class, new MockHttpResponseDummyJson());
        List<ProductWrapper.product> products = ProductController.getAndSaveProducts();
        
        // Verify response has 30 products
        System.assertEquals(products.size(), 30);
        
        // Verify products were inserted
        List<Product2> productsInSalesforce = [Select ProductExternalId__c from Product2];
        Integer numberOfInsertedProducts = productsInSalesforce.size(); 
        System.assertEquals(numberOfInsertedProducts, 30);
    }
}