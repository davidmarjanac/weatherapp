//startovanje sa angularom,prvo deklarisanje weatherApp i dodjeljivanje kontrolera koji se prosledjuje u html//

//ukljucivanje modula u weatherApp,koristimo ngRoute i ngResource//



//MODULE



var weatherApp = angular.module('weatherApp',['ngRoute','ngResource']);



//ROUTES


weatherApp.config(function($routeProvider){
    
    
    $routeProvider
    
    
    .when('/',{
                    templateUrl:'pages/home.htm',
                    controller:'homeController'
                })
    
    .when('/forecast',{
                    templateUrl:'pages/forecast.htm',
                    controller:'forecastController'
                })
    
    .when('/forecast/:days',{
                    templateUrl:'pages/forecast.htm',
                    controller:'forecastController'
                })
});


    


//SERVICE

weatherApp.service('cityService',function(){
    
    this.city="banjaluka";
})



//CONTROLLERS



weatherApp.controller('homeController',['$scope','cityService',function($scope, cityService){
    
    $scope.city=cityService.city;
    
    $scope.$watch('city',function(){
        cityService.city=$scope.city;
    })
}]);


weatherApp.controller('forecastController',['$scope','$resource', '$routeParams','cityService', function($scope,$resource,$routeParams,       cityService){
    
 $scope.city=cityService.city;
    
 $scope.days = $routeParams.days || '2';
    
    
    //data from url
    $scope.weatherAPI=
        $resource("http://api.openweathermap.org/data/2.5/forecast/daily?id=3204541&APPID=e6176aaca98f4bac9fee7c11fa229356", {callback: "JSON_CALLBACK"}, {get:{method:"JSONP"}});
    
    $scope.weatherResult=$scope.weatherAPI.get({q:$scope.city,cnt: $scope.days });
    
    
    $scope.convertToCelzius = function(degK){
        return(degK - 273.15);
    }
    
    $scope.convertToDate=function(dt){            
        
        return new Date(dt * 1000);
    };
    
    console.log($scope.weatherResult);
    // Picture:  {{w.weather[0].icon}}
   // ng-src="{{w.weather[0].icon}}"> 
}]);   


 