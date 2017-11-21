module.exports = function ($scope, BackendService, $state, dataService, WizardHandler) {

    $scope.loading = true;
    $scope.customer = {};
    $scope.customerStep = {};

    var steps = {
        "formInit": false,
        "step1": false,
        "step2": false,
        "step3": false,
        "formFinished": false
    }
    
    $scope.customerStep = steps;
    //$scope.steps = steps;



    //var data = JSON.stringify({ skip: $scope.skip, take: $scope.take});
    //BackendService.getAllProducts(data).then(function (response) {
    //    //if (response != null) {
    //    //    if (response.data["Error"] != null) {
    //    //        $scope.products = response.data.data;
    //    //        $scope.loading = false;               
    //    //    }
    //    //    else {
    //    //        console.log("Issue getAllProducts()");
    //    //    }
    //    //}
    //});
    //{

    //    var data = JSON.stringify({ skip: $scope.skip, take: $scope.take });
    //    BackendService.getAllProducts(data).then(function (response) {
    //        if (response != null) {
    //            if (response.data["Error"] != null) {
    //                var pr = response.data.data;
    //                for (var i = 0; i < pr.length; i++) {
    //                    console.log(pr[i]);
    //                    $scope.products.push(pr[i]);
    //                }
    //                console.log("load more data: ", response.data.data);
    //                $scope.loading = false;
    //            }
    //            else {
    //                console.log("Issue getAllProducts()");
    //            }
    //        }
    //    });
    //}



    $scope.goToSignUpForm = function () {
        $scope.customerStep.formInit = true;
        localStorage.steps = JSON.stringify($scope.customerStep);
        $state.go('form');
    }



}