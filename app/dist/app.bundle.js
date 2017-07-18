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
},{"controllers/main.js":2,"controllers/product.js":3,"controllers/user.js":4}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
module.exports = function ($scope, BackendService, $state, dataService) {

    var product = dataService.product();
    if (!isEmpty(product)) {
        console.log("product: ", product);
        $scope.product = product;
    } else {
        //var cookieWObject = $cookieStore.getObject('cookieName');
        console.log("empty");
    }
    console.log(product);

    function isEmpty(obj) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop))
                return false;
        }

        return true;
    }
}
},{}],4:[function(require,module,exports){
module.exports = function ($scope, BackendService, $state) {

    $scope.userName = "";
    $scope.password = "";
    $scope.messageToUser = "Dad's Shop";
    removeLocalStorage('user_login');
    $scope.loading = false;

    $scope.login = function () {
        if ($scope.userName != '' && $scope.password) {
            console.log($scope.userName, $scope.password);
            $scope.loading = true;
            var data = JSON.stringify({ userName: $scope.userName, password: $scope.password });
            BackendService.login(data).then(function (response) {
                if (response != null) {
                    if (response.data["Error"] != '') {
                        console.log("Error login funtion");
                        $scope.messageToUser = 'Email or Password not correct';
                    }
                    else {
                        console.log("good", response);
                        setLocalStorage('user_login', $scope.userName);
                        $scope.messageToUser = 'Welcome back ' + response.data.data.userName;
                        $state.go('main');
                    }
                    $scope.loading = false;
                }
            });
        }
    }

    $scope.register = function () {       
        var userName = $scope.r_userName;
        var email = $scope.r_email;
        var password = $scope.r_password;
        var password2 = $scope.r_passwordConfirm;

        if (!angular.isUndefined(userName) && !angular.isUndefined(email)
            && !angular.isUndefined(password) && !angular.isUndefined(password2)) {
            if (password == password2) {
                $scope.loading = true;
                var data = {};
                data.userName = userName;
                data.email = email;
                data.password = password;
                var jsonData = JSON.stringify(data);
                BackendService.register(data).then(function (response) {
                    if (response != null) {
                        if (response.data["Error"] != '') {
                            console.log("Error register funtion");
                        }
                        else {
                            console.log("ok", response);
                            setLocalStorage('user_login', $scope.r_userName);
                            $state.go('main');
                        }
                        $scope.loading = false;
                    }
                });
            } else {
                // passwords not the same
            }
        }
    }

    function setLocalStorage(key, value)
    {
        window.localStorage.setItem(key, value);
    }
    function getLocalStorage(key)
    {
        return window.localStorage.getItem(key);
    }   
    function removeLocalStorage(key)
    {
        window.localStorage.removeItem(key);
    }
    
    $scope.favorites = [];
    var userId = 12;
    BackendService.getFavorite(userId).then(function (response) {
        if (response != null) {
            if (response.data["Error"] != '') {
                console.log("Error getFavorite funtion");
            }
            else {
                console.log("ok 1", response);
                for (var i = 0; i < 5; i++) {
                    var favorite = {};
                    favorite.Pic = "";
                    favorite.Name = "name";
                    favorite.Price = "150";
                    favorite.Description = "description description";
                    $scope.favorites.push(favorite);
                }
            }
            $scope.loading = false;
        } else {
            console.log("getFavorite resopnse null");
        }
    });

    

}
},{}],5:[function(require,module,exports){
angular.module('dadsShop', ['ui.router', 'jkuri.datepicker', 'ui.bootstrap'])
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
},{"./config/routes.js":1,"./services/BackendService.js":6,"./services/api.js":7,"./services/dataService.js":8,"./services/menuService.js":9}],6:[function(require,module,exports){
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
},{}],7:[function(require,module,exports){
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
},{}],8:[function(require,module,exports){
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
},{}],9:[function(require,module,exports){
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
},{}]},{},[5])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvY29uZmlnL3JvdXRlcy5qcyIsImFwcC9jb250cm9sbGVycy9tYWluLmpzIiwiYXBwL2NvbnRyb2xsZXJzL3Byb2R1Y3QuanMiLCJhcHAvY29udHJvbGxlcnMvdXNlci5qcyIsImFwcC9lbnRyeS5qcyIsImFwcC9zZXJ2aWNlcy9CYWNrZW5kU2VydmljZS5qcyIsImFwcC9zZXJ2aWNlcy9hcGkuanMiLCJhcHAvc2VydmljZXMvZGF0YVNlcnZpY2UuanMiLCJhcHAvc2VydmljZXMvbWVudVNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcclxuICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy9tYWluJyk7XHJcblxyXG4gICAgLy9jb25zb2xlLmxvZyhcInJvdXRlc1wiKTtcclxuXHJcbiAgICAkc3RhdGVQcm92aWRlclxyXG4gICAgIC5zdGF0ZSgnbWFpbicsIHtcclxuICAgICAgICAgdXJsOiAnL21haW4nLFxyXG4gICAgICAgICB0ZW1wbGF0ZVVybDogJy9hcHAvdmlld3MvbWFpbi9tYWluLmh0bWwnLFxyXG4gICAgICAgICBjb250cm9sbGVyOiByZXF1aXJlKCdjb250cm9sbGVycy9tYWluLmpzJylcclxuICAgICB9KVxyXG4gICAgIC5zdGF0ZSgncHJvZHVjdFBhZ2UnLCB7XHJcbiAgICAgICAgdXJsOiAnL3Byb2R1Y3RQYWdlJyxcclxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC92aWV3cy9wcm9kdWN0UGFnZS9wcm9kdWN0UGFnZS5odG1sJyxcclxuICAgICAgICBjb250cm9sbGVyOiByZXF1aXJlKCdjb250cm9sbGVycy9wcm9kdWN0LmpzJylcclxuICAgICB9KVxyXG4gICAgLnN0YXRlKCdsb2dpbicsIHtcclxuICAgICAgICB1cmw6ICcvbG9naW4nLFxyXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL3ZpZXdzL3VzZXIvbG9naW4uaHRtbCcsXHJcbiAgICAgICAgY29udHJvbGxlcjogcmVxdWlyZSgnY29udHJvbGxlcnMvdXNlci5qcycpXHJcbiAgICB9KVxyXG4gICAgLnN0YXRlKCdyZWdpc3RlcicsIHtcclxuICAgICAgICB1cmw6ICcvcmVnaXN0ZXInLFxyXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL3ZpZXdzL3VzZXIvcmVnaXN0ZXIuaHRtbCcsXHJcbiAgICAgICAgY29udHJvbGxlcjogcmVxdWlyZSgnY29udHJvbGxlcnMvdXNlci5qcycpXHJcbiAgICB9KVxyXG4gICAgLnN0YXRlKCdmYXZvcml0ZScsIHtcclxuICAgICAgICB1cmw6ICcvZmF2b3JpdGUnLFxyXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL3ZpZXdzL3VzZXIvZmF2b3JpdGUuaHRtbCcsXHJcbiAgICAgICAgY29udHJvbGxlcjogcmVxdWlyZSgnY29udHJvbGxlcnMvdXNlci5qcycpXHJcbiAgICB9KVxyXG5cclxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgkc2NvcGUsIEJhY2tlbmRTZXJ2aWNlLCAkc3RhdGUsIGRhdGFTZXJ2aWNlKSB7XHJcblxyXG4gICAgJHNjb3BlLnNraXAgPSAwO1xyXG4gICAgJHNjb3BlLnRha2UgPSAzO1xyXG4gICAgJHNjb3BlLnByb2R1Y3RzID0gW107XHJcbiAgICAkc2NvcGUubG9hZGluZyA9IHRydWU7XHJcbiAgICBjb25zb2xlLmxvZyhcIm1haW4gY29udHJvbGxlclwiKTtcclxuXHJcbiAgICB2YXIgZGF0YSA9IEpTT04uc3RyaW5naWZ5KHsgc2tpcDogJHNjb3BlLnNraXAsIHRha2U6ICRzY29wZS50YWtlfSk7XHJcbiAgICBCYWNrZW5kU2VydmljZS5nZXRBbGxQcm9kdWN0cyhkYXRhKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgIGlmIChyZXNwb25zZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhW1wiRXJyb3JcIl0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnByb2R1Y3RzID0gcmVzcG9uc2UuZGF0YS5kYXRhO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJnZXRBbGxQcm9kdWN0cygpIGRhdGE6IFwiLCByZXNwb25zZS5kYXRhLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmxvYWRpbmcgPSBmYWxzZTsgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSXNzdWUgZ2V0QWxsUHJvZHVjdHMoKVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICRzY29wZS5sb2FkTW9yZSA9IGZ1bmN0aW9uKClcclxuICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImxvYWQgbW9yZVwiKTtcclxuICAgICAgICAkc2NvcGUubG9hZGluZyA9IHRydWU7XHJcbiAgICAgICAgJHNjb3BlLnNraXAgKz0gMztcclxuICAgICAgICB2YXIgZGF0YSA9IEpTT04uc3RyaW5naWZ5KHsgc2tpcDogJHNjb3BlLnNraXAsIHRha2U6ICRzY29wZS50YWtlIH0pO1xyXG4gICAgICAgIEJhY2tlbmRTZXJ2aWNlLmdldEFsbFByb2R1Y3RzKGRhdGEpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXNwb25zZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YVtcIkVycm9yXCJdICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcHIgPSByZXNwb25zZS5kYXRhLmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwcltpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5wcm9kdWN0cy5wdXNoKHByW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJsb2FkIG1vcmUgZGF0YTogXCIsIHJlc3BvbnNlLmRhdGEuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSXNzdWUgZ2V0QWxsUHJvZHVjdHMoKVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgICRzY29wZS5jbGlja09uUHJvZHVjdCA9IGZ1bmN0aW9uKHByb2R1Y3QpXHJcbiAgICB7XHJcbiAgICAgICAgZGF0YVNlcnZpY2Uuc2V0TmFtZShwcm9kdWN0Lm5hbWUpO1xyXG4gICAgICAgIGRhdGFTZXJ2aWNlLnNldFByaWNlKHByb2R1Y3QucHJpY2UpO1xyXG4gICAgICAgIGRhdGFTZXJ2aWNlLnNldEluZm8ocHJvZHVjdC5pbmZvKTtcclxuICAgICAgICBkYXRhU2VydmljZS5zZXRQaWMocHJvZHVjdC5waWMpO1xyXG4gICAgICAgICRzdGF0ZS5nbygncHJvZHVjdFBhZ2UnKTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuXHJcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgkc2NvcGUsIEJhY2tlbmRTZXJ2aWNlLCAkc3RhdGUsIGRhdGFTZXJ2aWNlKSB7XHJcblxyXG4gICAgdmFyIHByb2R1Y3QgPSBkYXRhU2VydmljZS5wcm9kdWN0KCk7XHJcbiAgICBpZiAoIWlzRW1wdHkocHJvZHVjdCkpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInByb2R1Y3Q6IFwiLCBwcm9kdWN0KTtcclxuICAgICAgICAkc2NvcGUucHJvZHVjdCA9IHByb2R1Y3Q7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vdmFyIGNvb2tpZVdPYmplY3QgPSAkY29va2llU3RvcmUuZ2V0T2JqZWN0KCdjb29raWVOYW1lJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJlbXB0eVwiKTtcclxuICAgIH1cclxuICAgIGNvbnNvbGUubG9nKHByb2R1Y3QpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGlzRW1wdHkob2JqKSB7XHJcbiAgICAgICAgZm9yICh2YXIgcHJvcCBpbiBvYmopIHtcclxuICAgICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wKSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG59IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoJHNjb3BlLCBCYWNrZW5kU2VydmljZSwgJHN0YXRlKSB7XHJcblxyXG4gICAgJHNjb3BlLnVzZXJOYW1lID0gXCJcIjtcclxuICAgICRzY29wZS5wYXNzd29yZCA9IFwiXCI7XHJcbiAgICAkc2NvcGUubWVzc2FnZVRvVXNlciA9IFwiRGFkJ3MgU2hvcFwiO1xyXG4gICAgcmVtb3ZlTG9jYWxTdG9yYWdlKCd1c2VyX2xvZ2luJyk7XHJcbiAgICAkc2NvcGUubG9hZGluZyA9IGZhbHNlO1xyXG5cclxuICAgICRzY29wZS5sb2dpbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoJHNjb3BlLnVzZXJOYW1lICE9ICcnICYmICRzY29wZS5wYXNzd29yZCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUudXNlck5hbWUsICRzY29wZS5wYXNzd29yZCk7XHJcbiAgICAgICAgICAgICRzY29wZS5sb2FkaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSBKU09OLnN0cmluZ2lmeSh7IHVzZXJOYW1lOiAkc2NvcGUudXNlck5hbWUsIHBhc3N3b3JkOiAkc2NvcGUucGFzc3dvcmQgfSk7XHJcbiAgICAgICAgICAgIEJhY2tlbmRTZXJ2aWNlLmxvZ2luKGRhdGEpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhW1wiRXJyb3JcIl0gIT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBsb2dpbiBmdW50aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUubWVzc2FnZVRvVXNlciA9ICdFbWFpbCBvciBQYXNzd29yZCBub3QgY29ycmVjdCc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImdvb2RcIiwgcmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRMb2NhbFN0b3JhZ2UoJ3VzZXJfbG9naW4nLCAkc2NvcGUudXNlck5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUubWVzc2FnZVRvVXNlciA9ICdXZWxjb21lIGJhY2sgJyArIHJlc3BvbnNlLmRhdGEuZGF0YS51c2VyTmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdtYWluJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAkc2NvcGUucmVnaXN0ZXIgPSBmdW5jdGlvbiAoKSB7ICAgICAgIFxyXG4gICAgICAgIHZhciB1c2VyTmFtZSA9ICRzY29wZS5yX3VzZXJOYW1lO1xyXG4gICAgICAgIHZhciBlbWFpbCA9ICRzY29wZS5yX2VtYWlsO1xyXG4gICAgICAgIHZhciBwYXNzd29yZCA9ICRzY29wZS5yX3Bhc3N3b3JkO1xyXG4gICAgICAgIHZhciBwYXNzd29yZDIgPSAkc2NvcGUucl9wYXNzd29yZENvbmZpcm07XHJcblxyXG4gICAgICAgIGlmICghYW5ndWxhci5pc1VuZGVmaW5lZCh1c2VyTmFtZSkgJiYgIWFuZ3VsYXIuaXNVbmRlZmluZWQoZW1haWwpXHJcbiAgICAgICAgICAgICYmICFhbmd1bGFyLmlzVW5kZWZpbmVkKHBhc3N3b3JkKSAmJiAhYW5ndWxhci5pc1VuZGVmaW5lZChwYXNzd29yZDIpKSB7XHJcbiAgICAgICAgICAgIGlmIChwYXNzd29yZCA9PSBwYXNzd29yZDIpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5sb2FkaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHZhciBkYXRhID0ge307XHJcbiAgICAgICAgICAgICAgICBkYXRhLnVzZXJOYW1lID0gdXNlck5hbWU7XHJcbiAgICAgICAgICAgICAgICBkYXRhLmVtYWlsID0gZW1haWw7XHJcbiAgICAgICAgICAgICAgICBkYXRhLnBhc3N3b3JkID0gcGFzc3dvcmQ7XHJcbiAgICAgICAgICAgICAgICB2YXIganNvbkRhdGEgPSBKU09OLnN0cmluZ2lmeShkYXRhKTtcclxuICAgICAgICAgICAgICAgIEJhY2tlbmRTZXJ2aWNlLnJlZ2lzdGVyKGRhdGEpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGFbXCJFcnJvclwiXSAhPSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciByZWdpc3RlciBmdW50aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJva1wiLCByZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRMb2NhbFN0b3JhZ2UoJ3VzZXJfbG9naW4nLCAkc2NvcGUucl91c2VyTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ21haW4nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gcGFzc3dvcmRzIG5vdCB0aGUgc2FtZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNldExvY2FsU3RvcmFnZShrZXksIHZhbHVlKVxyXG4gICAge1xyXG4gICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIHZhbHVlKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGdldExvY2FsU3RvcmFnZShrZXkpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xyXG4gICAgfSAgIFxyXG4gICAgZnVuY3Rpb24gcmVtb3ZlTG9jYWxTdG9yYWdlKGtleSlcclxuICAgIHtcclxuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgJHNjb3BlLmZhdm9yaXRlcyA9IFtdO1xyXG4gICAgdmFyIHVzZXJJZCA9IDEyO1xyXG4gICAgQmFja2VuZFNlcnZpY2UuZ2V0RmF2b3JpdGUodXNlcklkKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgIGlmIChyZXNwb25zZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhW1wiRXJyb3JcIl0gIT0gJycpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgZ2V0RmF2b3JpdGUgZnVudGlvblwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwib2sgMVwiLCByZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDU7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmYXZvcml0ZSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlLlBpYyA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGUuTmFtZSA9IFwibmFtZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlLlByaWNlID0gXCIxNTBcIjtcclxuICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZS5EZXNjcmlwdGlvbiA9IFwiZGVzY3JpcHRpb24gZGVzY3JpcHRpb25cIjtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZmF2b3JpdGVzLnB1c2goZmF2b3JpdGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICRzY29wZS5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJnZXRGYXZvcml0ZSByZXNvcG5zZSBudWxsXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIFxyXG5cclxufSIsImFuZ3VsYXIubW9kdWxlKCdkYWRzU2hvcCcsIFsndWkucm91dGVyJywgJ2prdXJpLmRhdGVwaWNrZXInLCAndWkuYm9vdHN0cmFwJ10pXHJcbiAgICAvLyBEaXJlY3RpdmVzXHJcbiAgICAvLy5kaXJlY3RpdmUoLi4uLilcclxuXHJcbiAgICAvLyBTZXJ2aWNlc1xyXG4gICAgLnNlcnZpY2UoJ0FQSScsIHJlcXVpcmUoJy4vc2VydmljZXMvYXBpLmpzJykpXHJcbiAgICAuc2VydmljZSgnQmFja2VuZFNlcnZpY2UnLCByZXF1aXJlKCcuL3NlcnZpY2VzL0JhY2tlbmRTZXJ2aWNlLmpzJykpXHJcbiAgICAuc2VydmljZSgnbWVudVNlcnZpY2UnLCByZXF1aXJlKCcuL3NlcnZpY2VzL21lbnVTZXJ2aWNlLmpzJykpXHJcbiAgICAuc2VydmljZSgnZGF0YVNlcnZpY2UnLCByZXF1aXJlKCcuL3NlcnZpY2VzL2RhdGFTZXJ2aWNlLmpzJykpXHJcblxyXG4gICAgLy8gUm91dGluZ1xyXG4gICAgLmNvbmZpZyhyZXF1aXJlKCcuL2NvbmZpZy9yb3V0ZXMuanMnKSlcclxuXHJcbiAgICAvLyBDb250cm9sbGVyc1xyXG4gICAgLmNvbnRyb2xsZXIoJ21haW5Db250cm9sbGVyJywgZnVuY3Rpb24gKCkgeyB9KVxyXG4gICAgLmNvbnRyb2xsZXIoJ2xvZ2luJywgZnVuY3Rpb24gKCkgeyB9KVxyXG4gICAgLmNvbnRyb2xsZXIoJ21haW4nLCBmdW5jdGlvbiAoKSB7IH0pXHJcbiAgICAuY29udHJvbGxlcigndXBsb2FkY29udGVudCcsIGZ1bmN0aW9uICgpIHsgfSlcclxuICAgIC5jb250cm9sbGVyKCdkZXBhcnRtZW50JywgZnVuY3Rpb24gKCkgeyB9KVxyXG4gICAgLmNvbnRyb2xsZXIoJ3Byb2R1Y3QnLCBmdW5jdGlvbiAoKSB7IH0pIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBiYWNrZW5kX3NlcnZpY2UoJHEsICRodHRwLCAkc3RhdGUpIHtcclxuXHJcbiAgICB0aGlzLmdldEFsbFByb2R1Y3RzID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICByZXR1cm4gJGh0dHAucG9zdCgnL2FwaS9wcm9kdWN0L2dldHByb2R1Y3RzJywgZGF0YSlcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2VcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICBmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgIGVyclsndGV4dCddID0gJ1NvbWV0aGluZyBoYXBwZW5zIG9uIGdldEFsbFByb2R1Y3RzJztcclxuICAgICAgICAgICAgJHN0YXRlLmdvKCdlcnJvcicsIHsgJ2Vycm9yX29iaic6IGVyciB9KTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubG9naW4gPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHJldHVybiAkaHR0cC5wb3N0KCcvYXBpL3VzZXIvbG9naW4nLCBkYXRhKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ2JhY2tlbmRfc2VydmljZSBsb2dpbicsIHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJlcnJvciBpbiBsb2dpbiBcIiAsIGVycik7XHJcbiAgICAgICAgICAgIGVyclsndGV4dCddID0gJ1NvbWV0aGluZyBoYXBwZW5zIG9uIGxvZ2luJztcclxuICAgICAgICAgICAgJHN0YXRlLmdvKCdlcnJvcicsIHsgJ2Vycm9yX29iaic6IGVyciB9KTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucmVnaXN0ZXIgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHJldHVybiAkaHR0cC5wb3N0KCcvYXBpL3VzZXIvcmVnaXN0ZXInLCBkYXRhKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJlcnJvciBpbiByZWdpc3RlciBcIiwgZXJyKTtcclxuICAgICAgICAgICAgZXJyWyd0ZXh0J10gPSAnU29tZXRoaW5nIGhhcHBlbnMgb24gcmVnaXN0ZXInO1xyXG4gICAgICAgICAgICAkc3RhdGUuZ28oJ2Vycm9yJywgeyAnZXJyb3Jfb2JqJzogZXJyIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5nZXRGYXZvcml0ZSA9IGZ1bmN0aW9uIChpZCkge1xyXG4gICAgICAgIHJldHVybiAkaHR0cC5nZXQoJy9hcGkvdXNlci9mYXZvcml0ZS8nICsgaWQpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICBlcnJbJ3RleHQnXSA9ICdTb21ldGhpbmcgaGFwcGVucyB3aGVuIEdldEZhdm9yaXRlJztcclxuICAgICAgICAgICAgJHN0YXRlLmdvKCdlcnJvcicsIHsgJ2Vycm9yX29iaic6IGVyciB9KTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZ2V0QWxsT3JkZXJzID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuXHJcbiAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoJy9hcGkvb3JkZXIvZ2V0b3JkZXJzLycsIGRhdGEpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICBlcnJbJ3RleHQnXSA9ICdTb21ldGhpbmcgaGFwcGVucyB3aGVuIG9idGFpbmluZyBkaWN0aW9uYXJ5IGZpbGUgZm9yIGxhbmd1YWdlcyEnO1xyXG4gICAgICAgICAgICAvLyAkc3RhdGUuZ28oJ2Vycm9yJywgeyAnZXJyb3Jfb2JqJzogZXJyIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5nZXRBbGxPcmRlcnNCdFJvdGF0aW9uID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICByZXR1cm4gJGh0dHAucG9zdCgnL2FwaS9vcmRlci9nZXRvcmRlcnMvJywgZGF0YSlcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2VcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICBmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgIGVyclsndGV4dCddID0gJ1NvbWV0aGluZyBoYXBwZW5zIHdoZW4gb2J0YWluaW5nIGRpY3Rpb25hcnkgZmlsZSBmb3IgbGFuZ3VhZ2VzISc7XHJcbiAgICAgICAgICAgIC8vICRzdGF0ZS5nbygnZXJyb3InLCB7ICdlcnJvcl9vYmonOiBlcnIgfSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgXHJcbiAgICB0aGlzLkdldEFsbFByb2R1Y3RzQnlDYXRlZ29yeU5hbWUgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgICAgICByZXR1cm4gJGh0dHAucG9zdCgnL2FwaS9vcmRlci9nZXRwcm9kdWN0c2NhdGVnb3J5LycsIGRhdGEpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICBlcnJbJ3RleHQnXSA9ICdTb21ldGhpbmcgaGFwcGVucyB3aGVuIG9idGFpbmluZyBkaWN0aW9uYXJ5IGZpbGUgZm9yIGxhbmd1YWdlcyEnO1xyXG4gICAgICAgICAgICAvLyAkc3RhdGUuZ28oJ2Vycm9yJywgeyAnZXJyb3Jfb2JqJzogZXJyIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5HZXRDYXRlZ29yaWVzID0gZnVuY3Rpb24gKGlkKSB7XHJcbiAgICAgICAgcmV0dXJuICRodHRwLmdldCgnL2FwaS9vcmRlci9nZXRjYXRlZ29yaWVzLycgKyBpZClcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2VcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICBmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgIGVyclsndGV4dCddID0gJ1NvbWV0aGluZyBoYXBwZW5zIHdoZW4gb2J0YWluaW5nIGRpY3Rpb25hcnkgZmlsZSBmb3IgbGFuZ3VhZ2VzISc7XHJcbiAgICAgICAgICAgICRzdGF0ZS5nbygnZXJyb3InLCB7ICdlcnJvcl9vYmonOiBlcnIgfSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnRyaWdnZXJBY2NvdW50aW5nID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAkaHR0cC5nZXQoJy9hcGkvb3JkZXIvdHJpZ2dlcmFjY291bnRpbmcnKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgZXJyWyd0ZXh0J10gPSAnU29tZXRoaW5nIGhhcHBlbnMgd2hpbGUgdHJpZ2dlciBhY2NvdW50aW5nICc7XHJcbiAgICAgICAgICAgICRzdGF0ZS5nbygnZXJyb3InLCB7ICdlcnJvcl9vYmonOiBlcnIgfSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIFxyXG4gICBcclxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgkcSwgJGh0dHApIHtcclxuICAgIGZ1bmN0aW9uIHJlcXVlc3QobWV0aG9kLCB1cmwsIGRhdGEpIHtcclxuICAgICAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xyXG5cclxuICAgICAgICAkaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogbWV0aG9kLFxyXG4gICAgICAgICAgICB1cmw6IHVybCxcclxuICAgICAgICAgICAgZGF0YTogZGF0YVxyXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UuZGF0YSk7XHJcbiAgICAgICAgfSwgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIGRlZmVycmVzLnJlamVjdCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBtb2NrKGZ1bmMsIHRpbWVvdXQpIHtcclxuICAgICAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKGYpIHtcclxuICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShmKCkpO1xyXG4gICAgICAgIH0sIHRpbWVvdXQsIGZ1bmMpO1xyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgLy8gQmFzaWMgZnVuY3Rpb25zXHJcbiAgICAgICAgR0VUOiBmdW5jdGlvbiAodXJsLCBkYXRhKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXF1ZXN0KCdHRVQnLCB1cmwsIGRhdGEpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgUE9TVDogZnVuY3Rpb24gKHVybCwgZGF0YSkge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVxdWVzdCgnUE9TVCcsIHVybCwgZGF0YSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8gRnVuY3Rpb25zXHJcbiAgICAgICAgZ2V0V29ya2VyczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvL3JldHVybiByZXF1ZXN0KCdHRVQnLCAnL2FwaS93b3JrZXIvYWxsJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBtb2NrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBvYmpzID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDEwOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmpzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBOYW1lOiBjaGFuY2UuZmlyc3QoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgQ3VzdG9tZXJJZDogaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBvYmpzO1xyXG4gICAgICAgICAgICB9LCAxNTAwKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCRzdGF0ZSkge1xyXG5cclxuICAgIHRoaXMucHJvZHVjdERhdGEgPSB7IH07XHJcblxyXG4gICAgdGhpcy5wcm9kdWN0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByb2R1Y3REYXRhO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLnNldFByaWNlID0gZnVuY3Rpb24gKHByaWNlKSB7XHJcbiAgICAgICAgdGhpcy5wcm9kdWN0RGF0YS5wcmljZSA9IHByaWNlO1xyXG4gICAgfTtcclxuICAgIHRoaXMuZ2V0UHJpY2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvZHVjdERhdGEucHJpY2U7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuc2V0TmFtZSA9IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICAgICAgdGhpcy5wcm9kdWN0RGF0YS5uYW1lID0gbmFtZTtcclxuICAgIH07XHJcbiAgICB0aGlzLmdldE5hbWUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvZHVjdERhdGEubmFtZTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5zZXRJbmZvID0gZnVuY3Rpb24gKGluZm8pIHtcclxuICAgICAgICB0aGlzLnByb2R1Y3REYXRhLmluZm8gPSBpbmZvO1xyXG4gICAgfTtcclxuICAgIHRoaXMuZ2V0SW5mbyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9kdWN0RGF0YS5pbmZvO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLnNldFBpYyA9IGZ1bmN0aW9uIChwaWMpIHtcclxuICAgICAgICB0aGlzLnByb2R1Y3REYXRhLnBpYyA9IHBpYztcclxuICAgIH07XHJcbiAgICB0aGlzLmdldFBpYyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9kdWN0RGF0YS5pbmZvO1xyXG4gICAgfTtcclxuXHJcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgkc3RhdGUpIHtcclxuXHJcblxyXG4gICAgY29uc29sZS5sb2coXCJkMTIzXCIpO1xyXG5cclxuICAgIHRoaXMudGVzdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInRlc3RcIik7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5nb1RvZGVwYXJ0bWVudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkc3RhdGUuZ28oJ2RlcGFydG1lbnQnKTtcclxuICAgIH1cclxuICAgIC8vJHNjb3BlLmdvVG9EZXBhcnRtZW50ID0gIGZ1bmN0aW9uKClcclxuICAgIC8ve1xyXG4gICAgLy8gICAgJHN0YXRlLmdvKCdkZXBhcnRtZW50Jyk7XHJcbiAgICAvL31cclxufSJdfQ==
