

//init the app module
const ngApp = angular.module('QuizApp', ["ngRoute","ngAnimate"] );

//global scope
ngApp.run(['$rootScope',function($global) {
   
    $global.golbal = 'Global SCope';
 
 }]);
 ngApp.config(function($routeProvider){
     $routeProvider
     .when('/home',{
         templateUrl : 'dom/home.html'
     })
     .when('/learn',{
         templateUrl : 'dom/learn.html',
         controller : 'lernSection',
     })
     .when('/etest',{
         templateUrl : 'dom/test.html',
         controller : 'quizCtrl',
     })
     .otherwise({
         redirectTo:'/home'
     })

 });

 






