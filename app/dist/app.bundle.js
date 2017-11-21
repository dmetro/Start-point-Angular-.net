(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/main');

    //console.log("routes");

    $stateProvider
        .state('main', {
            url: '/main',
            templateUrl: '/app/views/main/main.html',
            controller: require('controllers/main.js')
        })
        .state('UserInfo', {
            url: '/User',
            templateUrl: '/app/views/signUpForm/userStepOne.html',
            controller: require('controllers/signup/signupStep1.js')
        })
        .state('UserInfoPart2', {
            url: '/moreUserInfo',
            templateUrl: '/app/views/signUpForm/userStepTwo.html',
            controller: require('controllers/signup/signupStep2.js')
        })
        .state('chooseProduct', {
            url: '/chooseProduct',
            templateUrl: '/app/views/signUpForm/ChooseProduct.html',
            controller: require('controllers/signup/chooseProduct.js')
        })
        //.state('initial', {
        //    url: '/initial',
        //    templateUrl: '/app/views/signUpForm/initial.html',
        //    controller: require('controllers/signup/InitialSignup.js'),
        //})

        //.state('initial.step1', {
        //    url: '/1',
        //    templateUrl: '/app/views/signUpForm/userStepOne.html',
        //    controller: require('controllers/signup/signupStep1.js') ,
        //    step: 1, // <- Identify the current step inside the SignupCtrl,

        //})
        //.state('initial.step2', {
        //    url: '/2',
        //    templateUrl: 'views/initial-step2.html',
        //    controller: 'InitialStep2Ctrl',
        //    step: 2, // <- Identify the current step inside the SignupCtrl,

        //})

};
},{"controllers/main.js":2,"controllers/signup/chooseProduct.js":3,"controllers/signup/signupStep1.js":4,"controllers/signup/signupStep2.js":5}],2:[function(require,module,exports){
module.exports = function ($scope, BackendService, $state, dataService) {

    $scope.loading = true;
    $scope.customer = {};
    $scope.customerStep = {};
    console.log("sss")

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

    $scope.FinishStepOne = function()
    {
        console.log("Customer Details", $scope.customer)
        $state.go('productPage');
    }

    $scope.goToSignUpForm = function ()
    {
        console.log("gotoSignUp formw")
        $state.go('UserInfo');
    }

    

}
},{}],3:[function(require,module,exports){
module.exports = function ($scope, BackendService, $state, $rootScope, $localStorage) {

    $scope.pensionProducts = [];
    $scope.histalmutProducts = [];
    $scope.gemelhisahon = [];

    var pensionProduct1 = {
        "name": "פנסיה",
        "company": "אלטשולר שחם",
        "img": "https://yt3.ggpht.com/-2EOQ5fgU0sQ/AAAAAAAAAAI/AAAAAAAAAAA/B06HX730x78/s900-c-k-no-mo-rj-c0xffffff/photo.jpg",
        "zvira": "0.5",
        "hafkada": "1.8",
        "productId": "1",

    }
    var pensionProduct2 = {
        "name": "פנסיה",
        "company": "פסגות",
        "img": "http://www.elidor.co.il/image.ashx?s=170354&sl=he&im=113513&st=c",
        "zvira": "0.6",
        "hafkada": "1.9",
        "productId": "2",
    }


    var hishtalmutProduct1 = {
        "name": "השתלמות",
        "company": "I B I ",
        "img": "https://upload.wikimedia.org/wikipedia/commons/6/68/IBI_Investment_House_logo.jpg",
        "zvira": "0.5",
        "hafkada": "0",
        "productId": "3",
    }
    var hishtalmutProduct2 = {
        "name": "השתלמות",
        "company": "פסגות",
        "img": "http://www.elidor.co.il/image.ashx?s=170354&sl=he&im=113513&st=c",
        "zvira": "0.6",
        "hafkada": "0",
        "productId": "4",
    }
    var hishtalmutProduct3 = {
        "name": "השתלמות",
        "company": "כלל",
        "img": "http://www.issf.org.il/wp-content/uploads/2015/12/clal-430x330.jpg",
        "zvira": "0.6",
        "hafkada": "0",
        "productId": "4",
    }
    var hishtalmutProduct4 = {
        "name": "השתלמות",
        "company": "מנורה",
        "img": "http://images.globes.co.il/images/NewGlobes/big_image_800/2015/MenoraMivtachim-CMYK-800.jpg",
        "zvira": "0.6",
        "hafkada": "0",
        "productId": "5",
    }



    var gemelProduct1 = {
        "name": "גמל",
        "company": "I B I ",
        "img": "https://upload.wikimedia.org/wikipedia/commons/6/68/IBI_Investment_House_logo.jpg",
        "zvira": "0.5",
        "hafkada": "0",
        "productId": "6",
    }
    var gemelProduct2 = {
        "name": "גמל",
        "company": "פסגות",
        "img": "http://www.elidor.co.il/image.ashx?s=170354&sl=he&im=113513&st=c",
        "zvira": "0.6",
        "hafkada": "0",
        "productId": "7",
    }
    var gemelProduct3 = {
        "name": "גמל",
        "company": "כלל",
        "img": "http://www.issf.org.il/wp-content/uploads/2015/12/clal-430x330.jpg",
        "zvira": "0.6",
        "hafkada": "0",
        "productId": "8",
    }

    $scope.pensionProducts.push(pensionProduct1);
    $scope.pensionProducts.push(pensionProduct2);

    $scope.histalmutProducts.push(hishtalmutProduct1);
    $scope.histalmutProducts.push(hishtalmutProduct2);
    $scope.histalmutProducts.push(hishtalmutProduct3);
    $scope.histalmutProducts.push(hishtalmutProduct4);



    $scope.gemelhisahon.push(gemelProduct1);
    $scope.gemelhisahon.push(gemelProduct2);
    $scope.gemelhisahon.push(gemelProduct3);
    // console.log("Pension products", $scope.pensionProducts);
}
},{}],4:[function(require,module,exports){
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
},{}],5:[function(require,module,exports){
module.exports = function ($scope, BackendService, $state, $rootScope, $localStorage) {

    $scope.user = $rootScope.user;
    $scope.fisnihSteptwo = function () {
        $rootScope.user = $scope.user;
        $localStorage.user = $rootScope.user;
        $state.go("chooseProduct");

    }



}
},{}],6:[function(require,module,exports){
angular.module('Getpensia', ['ui.router', 'ui.bootstrap', 'ngStorage',])
    // Directives
    //.directive(....)

    // Services
    .service('API', require('./services/api.js'))
    .service('BackendService', require('./services/BackendService.js'))
    .service('menuService', require('./services/menuService.js'))
    .service('dataService', require('./services/dataService.js'))

    // Routing
    .config(require('./config/routes.js'))

    // Controllers
    .controller('mainController', function () { })
    .controller('login', function () { })
    .controller('main', function () { })
    .controller('uploadcontent', function () { })
    .controller('department', function () { })
    .controller('product', function () { })
    .controller('signupStep1', function () { })

    .run(function ($rootScope) {
        $rootScope.user = {};

    });



},{"./config/routes.js":1,"./services/BackendService.js":7,"./services/api.js":8,"./services/dataService.js":9,"./services/menuService.js":10}],7:[function(require,module,exports){
module.exports = function backend_service($q, $http, $state) {

    this.getAllProducts = function (data) {
        return $http.post('/api/product/getproducts', data)
            .then(function (response) {
                return response
            },
        function (err) {
            err['text'] = 'Something happens on getAllProducts';
            $state.go('error', { 'error_obj': err });
        })
    }

    this.login = function (data) {
        return $http.post('/api/user/login', data)
            .then(function (response) {
                //console.log('backend_service login', response);
                return response
            },
        function (err) {
            console.log("error in login " , err);
            err['text'] = 'Something happens on login';
            $state.go('error', { 'error_obj': err });
        })
    }

    this.register = function (data) {
        return $http.post('/api/user/register', data)
            .then(function (response) {
                return response
            },
        function (err) {
            console.log("error in register ", err);
            err['text'] = 'Something happens on register';
            $state.go('error', { 'error_obj': err });
        })
    }

    this.getFavorite = function (id) {
        return $http.get('/api/user/favorite/' + id)
            .then(function (response) {
                return response
            },
        function (err) {
            err['text'] = 'Something happens when GetFavorite';
            $state.go('error', { 'error_obj': err });
        })
    }

    this.getAllOrders = function (data) {

        return $http.post('/api/order/getorders/', data)
            .then(function (response) {
                return response
            },
        function (err) {
            err['text'] = 'Something happens when obtaining dictionary file for languages!';
            // $state.go('error', { 'error_obj': err });
        })
    }

    this.getAllOrdersBtRotation = function (data) {
        return $http.post('/api/order/getorders/', data)
            .then(function (response) {
                return response
            },
        function (err) {
            err['text'] = 'Something happens when obtaining dictionary file for languages!';
            // $state.go('error', { 'error_obj': err });
        })
    }
   
    this.GetAllProductsByCategoryName = function (data) {

        return $http.post('/api/order/getproductscategory/', data)
            .then(function (response) {
                return response
            },
        function (err) {
            err['text'] = 'Something happens when obtaining dictionary file for languages!';
            // $state.go('error', { 'error_obj': err });
        })
    }

    this.GetCategories = function (id) {
        return $http.get('/api/order/getcategories/' + id)
            .then(function (response) {
                return response
            },
        function (err) {
            err['text'] = 'Something happens when obtaining dictionary file for languages!';
            $state.go('error', { 'error_obj': err });
        })
    }

    this.triggerAccounting = function () {
        return $http.get('/api/order/triggeraccounting')
            .then(function (response) {
                return response
            },
        function (err) {
            err['text'] = 'Something happens while trigger accounting ';
            $state.go('error', { 'error_obj': err });
        })
    }
    
   
};
},{}],8:[function(require,module,exports){
module.exports = function ($q, $http) {
    function request(method, url, data) {
        var deferred = $q.defer();

        $http({
            method: method,
            url: url,
            data: data
        }).then(function (response) {
            deferred.resolve(response.data);
        }, function (response) {
            deferres.reject();
        });

        return deferred.promise;
    }

    function mock(func, timeout) {
        var deferred = $q.defer();
        setTimeout(function (f) {
            deferred.resolve(f());
        }, timeout, func);
        return deferred.promise;
    }

    return {
        // Basic functions
        GET: function (url, data) {
            return request('GET', url, data);
        },
        POST: function (url, data) {
            return request('POST', url, data);
        },

        // Functions
        getWorkers: function () {
            //return request('GET', '/api/worker/all');
            return mock(function () {
                var objs = [];
                for (var i = 0; i < 10; i++) {
                    objs.push({
                        Name: chance.first(),
                        CustomerId: i
                        
                    });
                }
                return objs;
            }, 1500);
        }
    };
};
},{}],9:[function(require,module,exports){
module.exports = function ($state) {

    this.productData = { };

    this.product = function () {
        return this.productData;
    };

    this.setPrice = function (price) {
        this.productData.price = price;
    };
    this.getPrice = function () {
        return this.productData.price;
    };

    this.setName = function (name) {
        this.productData.name = name;
    };
    this.getName = function () {
        return this.productData.name;
    };

    this.setInfo = function (info) {
        this.productData.info = info;
    };
    this.getInfo = function () {
        return this.productData.info;
    };

    this.setPic = function (pic) {
        this.productData.pic = pic;
    };
    this.getPic = function () {
        return this.productData.info;
    };

}
},{}],10:[function(require,module,exports){
module.exports = function ($state) {


    console.log("d123");

    this.test = function () {
        console.log("test");
    }

    this.goTodepartment = function () {
        $state.go('department');
    }
    //$scope.goToDepartment =  function()
    //{
    //    $state.go('department');
    //}
}
},{}]},{},[6])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvY29uZmlnL3JvdXRlcy5qcyIsImFwcC9jb250cm9sbGVycy9tYWluLmpzIiwiYXBwL2NvbnRyb2xsZXJzL3NpZ251cC9jaG9vc2VQcm9kdWN0LmpzIiwiYXBwL2NvbnRyb2xsZXJzL3NpZ251cC9zaWdudXBTdGVwMS5qcyIsImFwcC9jb250cm9sbGVycy9zaWdudXAvc2lnbnVwU3RlcDIuanMiLCJhcHAvZW50cnkuanMiLCJhcHAvc2VydmljZXMvQmFja2VuZFNlcnZpY2UuanMiLCJhcHAvc2VydmljZXMvYXBpLmpzIiwiYXBwL3NlcnZpY2VzL2RhdGFTZXJ2aWNlLmpzIiwiYXBwL3NlcnZpY2VzL21lbnVTZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XHJcbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvbWFpbicpO1xyXG5cclxuICAgIC8vY29uc29sZS5sb2coXCJyb3V0ZXNcIik7XHJcblxyXG4gICAgJHN0YXRlUHJvdmlkZXJcclxuICAgICAgICAuc3RhdGUoJ21haW4nLCB7XHJcbiAgICAgICAgICAgIHVybDogJy9tYWluJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvYXBwL3ZpZXdzL21haW4vbWFpbi5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogcmVxdWlyZSgnY29udHJvbGxlcnMvbWFpbi5qcycpXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ1VzZXJJbmZvJywge1xyXG4gICAgICAgICAgICB1cmw6ICcvVXNlcicsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL2FwcC92aWV3cy9zaWduVXBGb3JtL3VzZXJTdGVwT25lLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiByZXF1aXJlKCdjb250cm9sbGVycy9zaWdudXAvc2lnbnVwU3RlcDEuanMnKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCdVc2VySW5mb1BhcnQyJywge1xyXG4gICAgICAgICAgICB1cmw6ICcvbW9yZVVzZXJJbmZvJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvYXBwL3ZpZXdzL3NpZ25VcEZvcm0vdXNlclN0ZXBUd28uaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6IHJlcXVpcmUoJ2NvbnRyb2xsZXJzL3NpZ251cC9zaWdudXBTdGVwMi5qcycpXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ2Nob29zZVByb2R1Y3QnLCB7XHJcbiAgICAgICAgICAgIHVybDogJy9jaG9vc2VQcm9kdWN0JyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvYXBwL3ZpZXdzL3NpZ25VcEZvcm0vQ2hvb3NlUHJvZHVjdC5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogcmVxdWlyZSgnY29udHJvbGxlcnMvc2lnbnVwL2Nob29zZVByb2R1Y3QuanMnKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy8uc3RhdGUoJ2luaXRpYWwnLCB7XHJcbiAgICAgICAgLy8gICAgdXJsOiAnL2luaXRpYWwnLFxyXG4gICAgICAgIC8vICAgIHRlbXBsYXRlVXJsOiAnL2FwcC92aWV3cy9zaWduVXBGb3JtL2luaXRpYWwuaHRtbCcsXHJcbiAgICAgICAgLy8gICAgY29udHJvbGxlcjogcmVxdWlyZSgnY29udHJvbGxlcnMvc2lnbnVwL0luaXRpYWxTaWdudXAuanMnKSxcclxuICAgICAgICAvL30pXHJcblxyXG4gICAgICAgIC8vLnN0YXRlKCdpbml0aWFsLnN0ZXAxJywge1xyXG4gICAgICAgIC8vICAgIHVybDogJy8xJyxcclxuICAgICAgICAvLyAgICB0ZW1wbGF0ZVVybDogJy9hcHAvdmlld3Mvc2lnblVwRm9ybS91c2VyU3RlcE9uZS5odG1sJyxcclxuICAgICAgICAvLyAgICBjb250cm9sbGVyOiByZXF1aXJlKCdjb250cm9sbGVycy9zaWdudXAvc2lnbnVwU3RlcDEuanMnKSAsXHJcbiAgICAgICAgLy8gICAgc3RlcDogMSwgLy8gPC0gSWRlbnRpZnkgdGhlIGN1cnJlbnQgc3RlcCBpbnNpZGUgdGhlIFNpZ251cEN0cmwsXHJcblxyXG4gICAgICAgIC8vfSlcclxuICAgICAgICAvLy5zdGF0ZSgnaW5pdGlhbC5zdGVwMicsIHtcclxuICAgICAgICAvLyAgICB1cmw6ICcvMicsXHJcbiAgICAgICAgLy8gICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9pbml0aWFsLXN0ZXAyLmh0bWwnLFxyXG4gICAgICAgIC8vICAgIGNvbnRyb2xsZXI6ICdJbml0aWFsU3RlcDJDdHJsJyxcclxuICAgICAgICAvLyAgICBzdGVwOiAyLCAvLyA8LSBJZGVudGlmeSB0aGUgY3VycmVudCBzdGVwIGluc2lkZSB0aGUgU2lnbnVwQ3RybCxcclxuXHJcbiAgICAgICAgLy99KVxyXG5cclxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgkc2NvcGUsIEJhY2tlbmRTZXJ2aWNlLCAkc3RhdGUsIGRhdGFTZXJ2aWNlKSB7XHJcblxyXG4gICAgJHNjb3BlLmxvYWRpbmcgPSB0cnVlO1xyXG4gICAgJHNjb3BlLmN1c3RvbWVyID0ge307XHJcbiAgICAkc2NvcGUuY3VzdG9tZXJTdGVwID0ge307XHJcbiAgICBjb25zb2xlLmxvZyhcInNzc1wiKVxyXG5cclxuICAgIC8vdmFyIGRhdGEgPSBKU09OLnN0cmluZ2lmeSh7IHNraXA6ICRzY29wZS5za2lwLCB0YWtlOiAkc2NvcGUudGFrZX0pO1xyXG4gICAgLy9CYWNrZW5kU2VydmljZS5nZXRBbGxQcm9kdWN0cyhkYXRhKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgLy8gICAgLy9pZiAocmVzcG9uc2UgIT0gbnVsbCkge1xyXG4gICAgLy8gICAgLy8gICAgaWYgKHJlc3BvbnNlLmRhdGFbXCJFcnJvclwiXSAhPSBudWxsKSB7XHJcbiAgICAvLyAgICAvLyAgICAgICAgJHNjb3BlLnByb2R1Y3RzID0gcmVzcG9uc2UuZGF0YS5kYXRhO1xyXG4gICAgLy8gICAgLy8gICAgICAgICRzY29wZS5sb2FkaW5nID0gZmFsc2U7ICAgICAgICAgICAgICAgXHJcbiAgICAvLyAgICAvLyAgICB9XHJcbiAgICAvLyAgICAvLyAgICBlbHNlIHtcclxuICAgIC8vICAgIC8vICAgICAgICBjb25zb2xlLmxvZyhcIklzc3VlIGdldEFsbFByb2R1Y3RzKClcIik7XHJcbiAgICAvLyAgICAvLyAgICB9XHJcbiAgICAvLyAgICAvL31cclxuICAgIC8vfSk7XHJcbiAgICAvL3tcclxuXHJcbiAgICAvLyAgICB2YXIgZGF0YSA9IEpTT04uc3RyaW5naWZ5KHsgc2tpcDogJHNjb3BlLnNraXAsIHRha2U6ICRzY29wZS50YWtlIH0pO1xyXG4gICAgLy8gICAgQmFja2VuZFNlcnZpY2UuZ2V0QWxsUHJvZHVjdHMoZGF0YSkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgIC8vICAgICAgICBpZiAocmVzcG9uc2UgIT0gbnVsbCkge1xyXG4gICAgLy8gICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YVtcIkVycm9yXCJdICE9IG51bGwpIHtcclxuICAgIC8vICAgICAgICAgICAgICAgIHZhciBwciA9IHJlc3BvbnNlLmRhdGEuZGF0YTtcclxuICAgIC8vICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHIubGVuZ3RoOyBpKyspIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwcltpXSk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnByb2R1Y3RzLnB1c2gocHJbaV0pO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJsb2FkIG1vcmUgZGF0YTogXCIsIHJlc3BvbnNlLmRhdGEuZGF0YSk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAkc2NvcGUubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgLy8gICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJJc3N1ZSBnZXRBbGxQcm9kdWN0cygpXCIpO1xyXG4gICAgLy8gICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgfVxyXG4gICAgLy8gICAgfSk7XHJcbiAgICAvL31cclxuXHJcbiAgICAkc2NvcGUuRmluaXNoU3RlcE9uZSA9IGZ1bmN0aW9uKClcclxuICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkN1c3RvbWVyIERldGFpbHNcIiwgJHNjb3BlLmN1c3RvbWVyKVxyXG4gICAgICAgICRzdGF0ZS5nbygncHJvZHVjdFBhZ2UnKTtcclxuICAgIH1cclxuXHJcbiAgICAkc2NvcGUuZ29Ub1NpZ25VcEZvcm0gPSBmdW5jdGlvbiAoKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZ290b1NpZ25VcCBmb3Jtd1wiKVxyXG4gICAgICAgICRzdGF0ZS5nbygnVXNlckluZm8nKTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuXHJcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgkc2NvcGUsIEJhY2tlbmRTZXJ2aWNlLCAkc3RhdGUsICRyb290U2NvcGUsICRsb2NhbFN0b3JhZ2UpIHtcclxuXHJcbiAgICAkc2NvcGUucGVuc2lvblByb2R1Y3RzID0gW107XHJcbiAgICAkc2NvcGUuaGlzdGFsbXV0UHJvZHVjdHMgPSBbXTtcclxuICAgICRzY29wZS5nZW1lbGhpc2Fob24gPSBbXTtcclxuXHJcbiAgICB2YXIgcGVuc2lvblByb2R1Y3QxID0ge1xyXG4gICAgICAgIFwibmFtZVwiOiBcItek16DXodeZ15RcIixcclxuICAgICAgICBcImNvbXBhbnlcIjogXCLXkNec15jXqdeV15zXqCDXqdeX151cIixcclxuICAgICAgICBcImltZ1wiOiBcImh0dHBzOi8veXQzLmdncGh0LmNvbS8tMkVPUTVmZ1Uwc1EvQUFBQUFBQUFBQUkvQUFBQUFBQUFBQUEvQjA2SFg3MzB4NzgvczkwMC1jLWstbm8tbW8tcmotYzB4ZmZmZmZmL3Bob3RvLmpwZ1wiLFxyXG4gICAgICAgIFwienZpcmFcIjogXCIwLjVcIixcclxuICAgICAgICBcImhhZmthZGFcIjogXCIxLjhcIixcclxuICAgICAgICBcInByb2R1Y3RJZFwiOiBcIjFcIixcclxuXHJcbiAgICB9XHJcbiAgICB2YXIgcGVuc2lvblByb2R1Y3QyID0ge1xyXG4gICAgICAgIFwibmFtZVwiOiBcItek16DXodeZ15RcIixcclxuICAgICAgICBcImNvbXBhbnlcIjogXCLXpNeh15LXldeqXCIsXHJcbiAgICAgICAgXCJpbWdcIjogXCJodHRwOi8vd3d3LmVsaWRvci5jby5pbC9pbWFnZS5hc2h4P3M9MTcwMzU0JnNsPWhlJmltPTExMzUxMyZzdD1jXCIsXHJcbiAgICAgICAgXCJ6dmlyYVwiOiBcIjAuNlwiLFxyXG4gICAgICAgIFwiaGFma2FkYVwiOiBcIjEuOVwiLFxyXG4gICAgICAgIFwicHJvZHVjdElkXCI6IFwiMlwiLFxyXG4gICAgfVxyXG5cclxuXHJcbiAgICB2YXIgaGlzaHRhbG11dFByb2R1Y3QxID0ge1xyXG4gICAgICAgIFwibmFtZVwiOiBcIteU16nXqtec157XldeqXCIsXHJcbiAgICAgICAgXCJjb21wYW55XCI6IFwiSSBCIEkgXCIsXHJcbiAgICAgICAgXCJpbWdcIjogXCJodHRwczovL3VwbG9hZC53aWtpbWVkaWEub3JnL3dpa2lwZWRpYS9jb21tb25zLzYvNjgvSUJJX0ludmVzdG1lbnRfSG91c2VfbG9nby5qcGdcIixcclxuICAgICAgICBcInp2aXJhXCI6IFwiMC41XCIsXHJcbiAgICAgICAgXCJoYWZrYWRhXCI6IFwiMFwiLFxyXG4gICAgICAgIFwicHJvZHVjdElkXCI6IFwiM1wiLFxyXG4gICAgfVxyXG4gICAgdmFyIGhpc2h0YWxtdXRQcm9kdWN0MiA9IHtcclxuICAgICAgICBcIm5hbWVcIjogXCLXlNep16rXnNee15XXqlwiLFxyXG4gICAgICAgIFwiY29tcGFueVwiOiBcItek16HXkteV16pcIixcclxuICAgICAgICBcImltZ1wiOiBcImh0dHA6Ly93d3cuZWxpZG9yLmNvLmlsL2ltYWdlLmFzaHg/cz0xNzAzNTQmc2w9aGUmaW09MTEzNTEzJnN0PWNcIixcclxuICAgICAgICBcInp2aXJhXCI6IFwiMC42XCIsXHJcbiAgICAgICAgXCJoYWZrYWRhXCI6IFwiMFwiLFxyXG4gICAgICAgIFwicHJvZHVjdElkXCI6IFwiNFwiLFxyXG4gICAgfVxyXG4gICAgdmFyIGhpc2h0YWxtdXRQcm9kdWN0MyA9IHtcclxuICAgICAgICBcIm5hbWVcIjogXCLXlNep16rXnNee15XXqlwiLFxyXG4gICAgICAgIFwiY29tcGFueVwiOiBcIteb15zXnFwiLFxyXG4gICAgICAgIFwiaW1nXCI6IFwiaHR0cDovL3d3dy5pc3NmLm9yZy5pbC93cC1jb250ZW50L3VwbG9hZHMvMjAxNS8xMi9jbGFsLTQzMHgzMzAuanBnXCIsXHJcbiAgICAgICAgXCJ6dmlyYVwiOiBcIjAuNlwiLFxyXG4gICAgICAgIFwiaGFma2FkYVwiOiBcIjBcIixcclxuICAgICAgICBcInByb2R1Y3RJZFwiOiBcIjRcIixcclxuICAgIH1cclxuICAgIHZhciBoaXNodGFsbXV0UHJvZHVjdDQgPSB7XHJcbiAgICAgICAgXCJuYW1lXCI6IFwi15TXqdeq15zXnteV16pcIixcclxuICAgICAgICBcImNvbXBhbnlcIjogXCLXnteg15XXqNeUXCIsXHJcbiAgICAgICAgXCJpbWdcIjogXCJodHRwOi8vaW1hZ2VzLmdsb2Jlcy5jby5pbC9pbWFnZXMvTmV3R2xvYmVzL2JpZ19pbWFnZV84MDAvMjAxNS9NZW5vcmFNaXZ0YWNoaW0tQ01ZSy04MDAuanBnXCIsXHJcbiAgICAgICAgXCJ6dmlyYVwiOiBcIjAuNlwiLFxyXG4gICAgICAgIFwiaGFma2FkYVwiOiBcIjBcIixcclxuICAgICAgICBcInByb2R1Y3RJZFwiOiBcIjVcIixcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIHZhciBnZW1lbFByb2R1Y3QxID0ge1xyXG4gICAgICAgIFwibmFtZVwiOiBcIteS157XnFwiLFxyXG4gICAgICAgIFwiY29tcGFueVwiOiBcIkkgQiBJIFwiLFxyXG4gICAgICAgIFwiaW1nXCI6IFwiaHR0cHM6Ly91cGxvYWQud2lraW1lZGlhLm9yZy93aWtpcGVkaWEvY29tbW9ucy82LzY4L0lCSV9JbnZlc3RtZW50X0hvdXNlX2xvZ28uanBnXCIsXHJcbiAgICAgICAgXCJ6dmlyYVwiOiBcIjAuNVwiLFxyXG4gICAgICAgIFwiaGFma2FkYVwiOiBcIjBcIixcclxuICAgICAgICBcInByb2R1Y3RJZFwiOiBcIjZcIixcclxuICAgIH1cclxuICAgIHZhciBnZW1lbFByb2R1Y3QyID0ge1xyXG4gICAgICAgIFwibmFtZVwiOiBcIteS157XnFwiLFxyXG4gICAgICAgIFwiY29tcGFueVwiOiBcItek16HXkteV16pcIixcclxuICAgICAgICBcImltZ1wiOiBcImh0dHA6Ly93d3cuZWxpZG9yLmNvLmlsL2ltYWdlLmFzaHg/cz0xNzAzNTQmc2w9aGUmaW09MTEzNTEzJnN0PWNcIixcclxuICAgICAgICBcInp2aXJhXCI6IFwiMC42XCIsXHJcbiAgICAgICAgXCJoYWZrYWRhXCI6IFwiMFwiLFxyXG4gICAgICAgIFwicHJvZHVjdElkXCI6IFwiN1wiLFxyXG4gICAgfVxyXG4gICAgdmFyIGdlbWVsUHJvZHVjdDMgPSB7XHJcbiAgICAgICAgXCJuYW1lXCI6IFwi15LXntecXCIsXHJcbiAgICAgICAgXCJjb21wYW55XCI6IFwi15vXnNecXCIsXHJcbiAgICAgICAgXCJpbWdcIjogXCJodHRwOi8vd3d3Lmlzc2Yub3JnLmlsL3dwLWNvbnRlbnQvdXBsb2Fkcy8yMDE1LzEyL2NsYWwtNDMweDMzMC5qcGdcIixcclxuICAgICAgICBcInp2aXJhXCI6IFwiMC42XCIsXHJcbiAgICAgICAgXCJoYWZrYWRhXCI6IFwiMFwiLFxyXG4gICAgICAgIFwicHJvZHVjdElkXCI6IFwiOFwiLFxyXG4gICAgfVxyXG5cclxuICAgICRzY29wZS5wZW5zaW9uUHJvZHVjdHMucHVzaChwZW5zaW9uUHJvZHVjdDEpO1xyXG4gICAgJHNjb3BlLnBlbnNpb25Qcm9kdWN0cy5wdXNoKHBlbnNpb25Qcm9kdWN0Mik7XHJcblxyXG4gICAgJHNjb3BlLmhpc3RhbG11dFByb2R1Y3RzLnB1c2goaGlzaHRhbG11dFByb2R1Y3QxKTtcclxuICAgICRzY29wZS5oaXN0YWxtdXRQcm9kdWN0cy5wdXNoKGhpc2h0YWxtdXRQcm9kdWN0Mik7XHJcbiAgICAkc2NvcGUuaGlzdGFsbXV0UHJvZHVjdHMucHVzaChoaXNodGFsbXV0UHJvZHVjdDMpO1xyXG4gICAgJHNjb3BlLmhpc3RhbG11dFByb2R1Y3RzLnB1c2goaGlzaHRhbG11dFByb2R1Y3Q0KTtcclxuXHJcblxyXG5cclxuICAgICRzY29wZS5nZW1lbGhpc2Fob24ucHVzaChnZW1lbFByb2R1Y3QxKTtcclxuICAgICRzY29wZS5nZW1lbGhpc2Fob24ucHVzaChnZW1lbFByb2R1Y3QyKTtcclxuICAgICRzY29wZS5nZW1lbGhpc2Fob24ucHVzaChnZW1lbFByb2R1Y3QzKTtcclxuICAgIC8vIGNvbnNvbGUubG9nKFwiUGVuc2lvbiBwcm9kdWN0c1wiLCAkc2NvcGUucGVuc2lvblByb2R1Y3RzKTtcclxufSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCRzY29wZSwgQmFja2VuZFNlcnZpY2UsICRzdGF0ZSwgZGF0YVNlcnZpY2UsICRsb2NhbFN0b3JhZ2UsICRyb290U2NvcGUpIHtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhcInNpZ24gdXAgaW5pdCBcIik7XHJcbiAgICAkc2NvcGUudXNlciA9IHt9O1xyXG4gICAgJHNjb3BlLnN0ZXBzID0gdHJ1ZTtcclxuXHJcblxyXG4gICAgJHNjb3BlLkZpbmlzaFN0ZXBPbmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICBcclxuICAgICAgICB2YXIgdXNlciA9ICRzY29wZS51c2VyO1xyXG4gICAgICAgIC8vY3JlYXRlIHVzZXIgaW4gREIgXHJcbiAgICAgICAgJGxvY2FsU3RvcmFnZS51c2VyID0gJHNjb3BlLnVzZXI7XHJcbiAgICAgICAgJHJvb3RTY29wZS51c2VyID0gJHNjb3BlLnVzZXI7XHJcbiAgICAgICAgJHN0YXRlLmdvKCdVc2VySW5mb1BhcnQyJyk7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcblxyXG59IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoJHNjb3BlLCBCYWNrZW5kU2VydmljZSwgJHN0YXRlLCAkcm9vdFNjb3BlLCAkbG9jYWxTdG9yYWdlKSB7XHJcblxyXG4gICAgJHNjb3BlLnVzZXIgPSAkcm9vdFNjb3BlLnVzZXI7XHJcbiAgICAkc2NvcGUuZmlzbmloU3RlcHR3byA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkcm9vdFNjb3BlLnVzZXIgPSAkc2NvcGUudXNlcjtcclxuICAgICAgICAkbG9jYWxTdG9yYWdlLnVzZXIgPSAkcm9vdFNjb3BlLnVzZXI7XHJcbiAgICAgICAgJHN0YXRlLmdvKFwiY2hvb3NlUHJvZHVjdFwiKTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbn0iLCJhbmd1bGFyLm1vZHVsZSgnR2V0cGVuc2lhJywgWyd1aS5yb3V0ZXInLCAndWkuYm9vdHN0cmFwJywgJ25nU3RvcmFnZScsXSlcclxuICAgIC8vIERpcmVjdGl2ZXNcclxuICAgIC8vLmRpcmVjdGl2ZSguLi4uKVxyXG5cclxuICAgIC8vIFNlcnZpY2VzXHJcbiAgICAuc2VydmljZSgnQVBJJywgcmVxdWlyZSgnLi9zZXJ2aWNlcy9hcGkuanMnKSlcclxuICAgIC5zZXJ2aWNlKCdCYWNrZW5kU2VydmljZScsIHJlcXVpcmUoJy4vc2VydmljZXMvQmFja2VuZFNlcnZpY2UuanMnKSlcclxuICAgIC5zZXJ2aWNlKCdtZW51U2VydmljZScsIHJlcXVpcmUoJy4vc2VydmljZXMvbWVudVNlcnZpY2UuanMnKSlcclxuICAgIC5zZXJ2aWNlKCdkYXRhU2VydmljZScsIHJlcXVpcmUoJy4vc2VydmljZXMvZGF0YVNlcnZpY2UuanMnKSlcclxuXHJcbiAgICAvLyBSb3V0aW5nXHJcbiAgICAuY29uZmlnKHJlcXVpcmUoJy4vY29uZmlnL3JvdXRlcy5qcycpKVxyXG5cclxuICAgIC8vIENvbnRyb2xsZXJzXHJcbiAgICAuY29udHJvbGxlcignbWFpbkNvbnRyb2xsZXInLCBmdW5jdGlvbiAoKSB7IH0pXHJcbiAgICAuY29udHJvbGxlcignbG9naW4nLCBmdW5jdGlvbiAoKSB7IH0pXHJcbiAgICAuY29udHJvbGxlcignbWFpbicsIGZ1bmN0aW9uICgpIHsgfSlcclxuICAgIC5jb250cm9sbGVyKCd1cGxvYWRjb250ZW50JywgZnVuY3Rpb24gKCkgeyB9KVxyXG4gICAgLmNvbnRyb2xsZXIoJ2RlcGFydG1lbnQnLCBmdW5jdGlvbiAoKSB7IH0pXHJcbiAgICAuY29udHJvbGxlcigncHJvZHVjdCcsIGZ1bmN0aW9uICgpIHsgfSlcclxuICAgIC5jb250cm9sbGVyKCdzaWdudXBTdGVwMScsIGZ1bmN0aW9uICgpIHsgfSlcclxuXHJcbiAgICAucnVuKGZ1bmN0aW9uICgkcm9vdFNjb3BlKSB7XHJcbiAgICAgICAgJHJvb3RTY29wZS51c2VyID0ge307XHJcblxyXG4gICAgfSk7XHJcblxyXG5cclxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBiYWNrZW5kX3NlcnZpY2UoJHEsICRodHRwLCAkc3RhdGUpIHtcclxuXHJcbiAgICB0aGlzLmdldEFsbFByb2R1Y3RzID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICByZXR1cm4gJGh0dHAucG9zdCgnL2FwaS9wcm9kdWN0L2dldHByb2R1Y3RzJywgZGF0YSlcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2VcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICBmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgIGVyclsndGV4dCddID0gJ1NvbWV0aGluZyBoYXBwZW5zIG9uIGdldEFsbFByb2R1Y3RzJztcclxuICAgICAgICAgICAgJHN0YXRlLmdvKCdlcnJvcicsIHsgJ2Vycm9yX29iaic6IGVyciB9KTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubG9naW4gPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHJldHVybiAkaHR0cC5wb3N0KCcvYXBpL3VzZXIvbG9naW4nLCBkYXRhKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ2JhY2tlbmRfc2VydmljZSBsb2dpbicsIHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJlcnJvciBpbiBsb2dpbiBcIiAsIGVycik7XHJcbiAgICAgICAgICAgIGVyclsndGV4dCddID0gJ1NvbWV0aGluZyBoYXBwZW5zIG9uIGxvZ2luJztcclxuICAgICAgICAgICAgJHN0YXRlLmdvKCdlcnJvcicsIHsgJ2Vycm9yX29iaic6IGVyciB9KTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucmVnaXN0ZXIgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHJldHVybiAkaHR0cC5wb3N0KCcvYXBpL3VzZXIvcmVnaXN0ZXInLCBkYXRhKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJlcnJvciBpbiByZWdpc3RlciBcIiwgZXJyKTtcclxuICAgICAgICAgICAgZXJyWyd0ZXh0J10gPSAnU29tZXRoaW5nIGhhcHBlbnMgb24gcmVnaXN0ZXInO1xyXG4gICAgICAgICAgICAkc3RhdGUuZ28oJ2Vycm9yJywgeyAnZXJyb3Jfb2JqJzogZXJyIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5nZXRGYXZvcml0ZSA9IGZ1bmN0aW9uIChpZCkge1xyXG4gICAgICAgIHJldHVybiAkaHR0cC5nZXQoJy9hcGkvdXNlci9mYXZvcml0ZS8nICsgaWQpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICBlcnJbJ3RleHQnXSA9ICdTb21ldGhpbmcgaGFwcGVucyB3aGVuIEdldEZhdm9yaXRlJztcclxuICAgICAgICAgICAgJHN0YXRlLmdvKCdlcnJvcicsIHsgJ2Vycm9yX29iaic6IGVyciB9KTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZ2V0QWxsT3JkZXJzID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuXHJcbiAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoJy9hcGkvb3JkZXIvZ2V0b3JkZXJzLycsIGRhdGEpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICBlcnJbJ3RleHQnXSA9ICdTb21ldGhpbmcgaGFwcGVucyB3aGVuIG9idGFpbmluZyBkaWN0aW9uYXJ5IGZpbGUgZm9yIGxhbmd1YWdlcyEnO1xyXG4gICAgICAgICAgICAvLyAkc3RhdGUuZ28oJ2Vycm9yJywgeyAnZXJyb3Jfb2JqJzogZXJyIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5nZXRBbGxPcmRlcnNCdFJvdGF0aW9uID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICByZXR1cm4gJGh0dHAucG9zdCgnL2FwaS9vcmRlci9nZXRvcmRlcnMvJywgZGF0YSlcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2VcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICBmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgIGVyclsndGV4dCddID0gJ1NvbWV0aGluZyBoYXBwZW5zIHdoZW4gb2J0YWluaW5nIGRpY3Rpb25hcnkgZmlsZSBmb3IgbGFuZ3VhZ2VzISc7XHJcbiAgICAgICAgICAgIC8vICRzdGF0ZS5nbygnZXJyb3InLCB7ICdlcnJvcl9vYmonOiBlcnIgfSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgXHJcbiAgICB0aGlzLkdldEFsbFByb2R1Y3RzQnlDYXRlZ29yeU5hbWUgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgICAgICByZXR1cm4gJGh0dHAucG9zdCgnL2FwaS9vcmRlci9nZXRwcm9kdWN0c2NhdGVnb3J5LycsIGRhdGEpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICBlcnJbJ3RleHQnXSA9ICdTb21ldGhpbmcgaGFwcGVucyB3aGVuIG9idGFpbmluZyBkaWN0aW9uYXJ5IGZpbGUgZm9yIGxhbmd1YWdlcyEnO1xyXG4gICAgICAgICAgICAvLyAkc3RhdGUuZ28oJ2Vycm9yJywgeyAnZXJyb3Jfb2JqJzogZXJyIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5HZXRDYXRlZ29yaWVzID0gZnVuY3Rpb24gKGlkKSB7XHJcbiAgICAgICAgcmV0dXJuICRodHRwLmdldCgnL2FwaS9vcmRlci9nZXRjYXRlZ29yaWVzLycgKyBpZClcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2VcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICBmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgIGVyclsndGV4dCddID0gJ1NvbWV0aGluZyBoYXBwZW5zIHdoZW4gb2J0YWluaW5nIGRpY3Rpb25hcnkgZmlsZSBmb3IgbGFuZ3VhZ2VzISc7XHJcbiAgICAgICAgICAgICRzdGF0ZS5nbygnZXJyb3InLCB7ICdlcnJvcl9vYmonOiBlcnIgfSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnRyaWdnZXJBY2NvdW50aW5nID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAkaHR0cC5nZXQoJy9hcGkvb3JkZXIvdHJpZ2dlcmFjY291bnRpbmcnKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgZXJyWyd0ZXh0J10gPSAnU29tZXRoaW5nIGhhcHBlbnMgd2hpbGUgdHJpZ2dlciBhY2NvdW50aW5nICc7XHJcbiAgICAgICAgICAgICRzdGF0ZS5nbygnZXJyb3InLCB7ICdlcnJvcl9vYmonOiBlcnIgfSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIFxyXG4gICBcclxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgkcSwgJGh0dHApIHtcclxuICAgIGZ1bmN0aW9uIHJlcXVlc3QobWV0aG9kLCB1cmwsIGRhdGEpIHtcclxuICAgICAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xyXG5cclxuICAgICAgICAkaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogbWV0aG9kLFxyXG4gICAgICAgICAgICB1cmw6IHVybCxcclxuICAgICAgICAgICAgZGF0YTogZGF0YVxyXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UuZGF0YSk7XHJcbiAgICAgICAgfSwgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIGRlZmVycmVzLnJlamVjdCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBtb2NrKGZ1bmMsIHRpbWVvdXQpIHtcclxuICAgICAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKGYpIHtcclxuICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShmKCkpO1xyXG4gICAgICAgIH0sIHRpbWVvdXQsIGZ1bmMpO1xyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgLy8gQmFzaWMgZnVuY3Rpb25zXHJcbiAgICAgICAgR0VUOiBmdW5jdGlvbiAodXJsLCBkYXRhKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXF1ZXN0KCdHRVQnLCB1cmwsIGRhdGEpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgUE9TVDogZnVuY3Rpb24gKHVybCwgZGF0YSkge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVxdWVzdCgnUE9TVCcsIHVybCwgZGF0YSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8gRnVuY3Rpb25zXHJcbiAgICAgICAgZ2V0V29ya2VyczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvL3JldHVybiByZXF1ZXN0KCdHRVQnLCAnL2FwaS93b3JrZXIvYWxsJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBtb2NrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBvYmpzID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDEwOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmpzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBOYW1lOiBjaGFuY2UuZmlyc3QoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgQ3VzdG9tZXJJZDogaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBvYmpzO1xyXG4gICAgICAgICAgICB9LCAxNTAwKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCRzdGF0ZSkge1xyXG5cclxuICAgIHRoaXMucHJvZHVjdERhdGEgPSB7IH07XHJcblxyXG4gICAgdGhpcy5wcm9kdWN0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByb2R1Y3REYXRhO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLnNldFByaWNlID0gZnVuY3Rpb24gKHByaWNlKSB7XHJcbiAgICAgICAgdGhpcy5wcm9kdWN0RGF0YS5wcmljZSA9IHByaWNlO1xyXG4gICAgfTtcclxuICAgIHRoaXMuZ2V0UHJpY2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvZHVjdERhdGEucHJpY2U7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuc2V0TmFtZSA9IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICAgICAgdGhpcy5wcm9kdWN0RGF0YS5uYW1lID0gbmFtZTtcclxuICAgIH07XHJcbiAgICB0aGlzLmdldE5hbWUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvZHVjdERhdGEubmFtZTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5zZXRJbmZvID0gZnVuY3Rpb24gKGluZm8pIHtcclxuICAgICAgICB0aGlzLnByb2R1Y3REYXRhLmluZm8gPSBpbmZvO1xyXG4gICAgfTtcclxuICAgIHRoaXMuZ2V0SW5mbyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9kdWN0RGF0YS5pbmZvO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLnNldFBpYyA9IGZ1bmN0aW9uIChwaWMpIHtcclxuICAgICAgICB0aGlzLnByb2R1Y3REYXRhLnBpYyA9IHBpYztcclxuICAgIH07XHJcbiAgICB0aGlzLmdldFBpYyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9kdWN0RGF0YS5pbmZvO1xyXG4gICAgfTtcclxuXHJcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgkc3RhdGUpIHtcclxuXHJcblxyXG4gICAgY29uc29sZS5sb2coXCJkMTIzXCIpO1xyXG5cclxuICAgIHRoaXMudGVzdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInRlc3RcIik7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5nb1RvZGVwYXJ0bWVudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkc3RhdGUuZ28oJ2RlcGFydG1lbnQnKTtcclxuICAgIH1cclxuICAgIC8vJHNjb3BlLmdvVG9EZXBhcnRtZW50ID0gIGZ1bmN0aW9uKClcclxuICAgIC8ve1xyXG4gICAgLy8gICAgJHN0YXRlLmdvKCdkZXBhcnRtZW50Jyk7XHJcbiAgICAvL31cclxufSJdfQ==
