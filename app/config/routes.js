module.exports = function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/main');

    //console.log("routes");

    $stateProvider
        .state('main', {
            url: '/main',
            templateUrl: '/app/views/main/main.html',
            controller: require('controllers/main.js')
        })
        .state('initial', {
            url: '/initial',
            templateUrl: '/app/views/signUpForm/initial.html',
            controller: require('controllers/signup/InitialSignup.js'),
        })

        .state('initial.step1', {
            url: '/1',
            templateUrl: '/app/views/signUpForm/userStepOne.html',
            controller: require('controllers/signup/signupStep1.js') ,
            step: 1, // <- Identify the current step inside the SignupCtrl,

        })
        .state('initial.step2', {
            url: '/2',
            templateUrl: 'views/initial-step2.html',
            controller: 'InitialStep2Ctrl',
            step: 2, // <- Identify the current step inside the SignupCtrl,

        })

};