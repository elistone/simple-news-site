
// Routing options

newsApp.config(['$routeProvider', 'newsAppConfig', function ($routeProvider,newsAppConfig) {
        
    // if / set - goto "home"
    $routeProvider.when('/', {
        templateUrl: newsAppConfig.pagesUrl+'/newsListings.html',
        controller: 'newsListingsController'
    })
    .when('/category/:num', {
        templateUrl: newsAppConfig.pagesUrl+'/newsListings.html',
        controller: 'newsCategoryController'
    })
    .when('/category/:catId/news/:newsId', {
        templateUrl: newsAppConfig.pagesUrl+'/news.html',
        controller: 'newsController'
    })
    
}]);