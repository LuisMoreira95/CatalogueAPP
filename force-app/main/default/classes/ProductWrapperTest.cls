@isTest
public with sharing class ProductWrapperTest {
    @isTest
    static void parseTest() {
        StaticResource dummyJson = [select id,body from StaticResource Where Name = 'DummyJSON'];
        String responseBody = dummyJson.body.toString();
        ProductWrapper obj = ProductWrapper.parse(responseBody);
        System.assert(obj != null);
    }
}