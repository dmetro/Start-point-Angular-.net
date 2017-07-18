module.exports = function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/main');

    //console.log("routes");

    $stateProvider
     .state('main', {
         url: '/main',
         templateUrl: '/app/views/main/main.html',
         controller: require('controllers/main.js')
     })
     .state('productPage', {
        url: '/productPage',
        templateUrl: 'app/views/productPage/productPage.html',
        controller: require('controllers/product.js')
     })
    .state('login', {
        url: '/login',
        templateUrl: 'app/views/user/login.html',
        controller: require('controllers/user.js')
    })
    .state('register', {
        url: '/register',
        templateUrl: 'app/views/user/register.html',
        controller: require('controllers/user.js')
    })
    .state('favorite', {
        url: '/favorite',
        templateUrl: 'app/views/user/favorite.html',
        controller: require('controllers/user.js')
    })

};