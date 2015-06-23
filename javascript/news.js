var newsListings = angular.module('newsListings', []); // enable angluar modules

// newslistings config
newsListings.config(['$logProvider',function($logProvider){
    newsListings.api_uri = 'http://api.newslistings.com'; // setup api uri
    newsListings.debug = true; // shows or hides logs
    newsListings.siteName = "News";
    
    $logProvider.debugEnabled(newsListings.debug);
}]);


// newslisting nav controller
newsListings.controller('navController', ['$scope', '$http', '$log', function ($scope, $http, $log) {
    
    // set the sitename in scope
    $scope.siteName = newsListings.siteName;
    
    // get the news listings categories 
    $http.get(newsListings.api_uri+'/category')
         .success(function (data) {
            $scope.categorys = data.data;
            $log.debug("category",$scope.categorys);
         })
         .error(function (data, status) {
            $scope.categorys = [{'title':'Error loading categories','id':0}];
            if(data.message){$log.error(data.message);}else{$log.error("Error "+status+" - Could not find news listings categories");}
         });
}]);


// newslisting news Controller
newsListings.controller('newsController', ['$scope', '$http', '$log', function ($scope, $http, $log) {
    
    // get the news listings categories 
    $http.get(newsListings.api_uri+'/news')
         .success(function (data) {
            $scope.news = data.data;
            $log.debug("news",$scope.news);
         })
         .error(function (data, status) {
            $scope.news = [{'title':'Error loading news','id':0}];
            if(data.message){$log.error(data.message);}else{$log.error("Error "+status+" - Could not find news listings categories");}
         });
}]);