module.exports = function ($scope, BackendService, $state, $rootScope, $localStorage) {

    $scope.user = $rootScope.user;
    $scope.fisnihSteptwo = function () {
        $rootScope.user = $scope.user;
        $localStorage.user = $rootScope.user;
        $state.go("chooseProduct");

    }



}