module.exports = function ($scope, BackendService, $state, dataService, $localStorage, $rootScope) {

    console.log("sign up init ");
    $scope.user = {};
    $scope.steps = true;


    $scope.FinishStepOne = function () {
       
        var user = $scope.user;
        //create user in DB 
        $localStorage.user = $scope.user;
        $rootScope.user = $scope.user;
        $state.go('UserInfoPart2');

    }



}