@isTest
global class MockHttpResponseDummyJson implements HttpCalloutMock {
    global HttpResponse respond(HttpRequest req) {
        StaticResource dummyJson = [select id,body from StaticResource Where Name = 'DummyJSON'];
        String responseBody = dummyJson.body.toString();
        
        // Create a fake response
        HttpResponse res = new HttpResponse();
        res.setHeader('Content-Type', 'application/json');
        res.setBody(responseBody);
        res.setStatusCode(200);
        return res;
    }
}