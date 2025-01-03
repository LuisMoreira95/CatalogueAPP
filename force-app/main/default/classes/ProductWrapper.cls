public class ProductWrapper{
    @AuraEnabled
    public list<product> products;
    
    public class product {
        @AuraEnabled
        public Integer id;
        @AuraEnabled
        public String title;
        @AuraEnabled
        public String description;
        @AuraEnabled
        public String category;	
        @AuraEnabled
        public Double price;	
        @AuraEnabled
        public Integer stock;	
        @AuraEnabled
        public String brand;	
        @AuraEnabled
        public String thumbnail;
    }
    
    public static ProductWrapper parse(String json){
        return (ProductWrapper) System.JSON.deserialize(json, ProductWrapper.class);
    }
}