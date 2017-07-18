module.exports = function ($scope, BackendService, $state, dataService) {

    $scope.skip = 0;
    $scope.take = 3;
    $scope.products = [];
    $scope.loading = true;
    console.log("main controller");

    var data = JSON.stringify({ skip: $scope.skip, take: $scope.take});
    BackendService.getAllProducts(data).then(function (response) {
        if (response != null) {
            if (response.data["Error"] != null) {
                $scope.products = response.data.data;
                console.log("getAllProducts() data: ", response.data.data);
                $scope.loading = false;               
            }
            else {
                console.log("Issue getAllProducts()");
            }
        }
    });

    $scope.loadMore = function()
    {
        console.log("load more");
        $scope.loading = true;
        $scope.skip += 3;
        var data = JSON.stringify({ skip: $scope.skip, take: $scope.take });
        BackendService.getAllProducts(data).then(function (response) {
            if (response != null) {
                if (response.data["Error"] != null) {
                    var pr = response.data.data;
                    for (var i = 0; i < pr.length; i++) {
                        console.log(pr[i]);
                        $scope.products.push(pr[i]);
                    }
                    console.log("load more data: ", response.data.data);
                    $scope.loading = false;
                }
                else {
                    console.log("Issue getAllProducts()");
                }
            }
        });
    }

    $scope.clickOnProduct = function(product)
    {
        dataService.setName(product.name);
        dataService.setPrice(product.price);
        dataService.setInfo(product.info);
        dataService.setPic(product.pic);
        $state.go('productPage');
    }

    

}