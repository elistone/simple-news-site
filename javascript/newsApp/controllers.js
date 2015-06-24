
// Controllers

// navController Controller
newsApp.controller('navController', ['$scope', '$log', '$http', 'newsAppConfig', function($scope, $log, $http, newsAppConfig) {
            // get all news
        $http.get(newsAppConfig.apiUrl+'/category')
        .success(function (result) {
            
            // returned data
            var data = result.data;
            
            // push the home page title into the results 
            data.unshift({id: 0, title: "Home", description: "Home page"});
            
            $scope.categorys = data;
            $scope.dataSuccess = true;
            
            // log
            $log.debug('nav results:',result);
        }).error(function (data, status) {
            // if error create fake news to fill the data with information
            $scope.news = [{title:"There was a problem getting the category"}];
            $scope.dataSuccess = false;
            $log.error(data,status);// output error to the console
        });
    
        $scope.siteName = newsAppConfig.siteName;
}]);


// newsListings Controller
newsApp.controller('newsListingsController', ['$scope', '$log', '$http', '$location', 'newsAppConfig', 'NewsService', function($scope, $log, $http, $location, newsAppConfig, NewsService) {
    
        // get all news
        $http.get(newsAppConfig.apiUrl+'/news')
        .success(function (result) {

            // returned data
            var data = result.data;
            $scope.news = data;
            $scope.dataSuccess = true;
            NewsService.newsArticles = $scope.news;
            // log
            $log.debug('news results:',result);
        }).error(function (data, status) {
            // if error create fake news to fill the data with information
            $scope.news = [{content:data.message}];
            $scope.dataSuccess = false;
            NewsService.newsArticles = $scope.news;
            $log.error(data,status);// output error to the console
        });

        // function that converts the category id to a string
        $scope.convertIdToCategoryName = NewsService.convertIdToCategoryName;
    
        // changes the path
        $scope.showArticle = function(catId,newsId){            
            $location.path('/category/'+catId+'/news/'+newsId);
        }
        
                // function that converts the category id to a string
        $scope.convertIdToCategoryName = NewsService.convertIdToCategoryName;
}]);


// newsCategory Controller
newsApp.controller('newsCategoryController', ['$scope', '$log', '$http', '$routeParams', '$location', 'newsAppConfig', 'NewsService', function($scope, $log, $http, $routeParams, $location, newsAppConfig, NewsService) {
        // get all news
        $http.get(newsAppConfig.apiUrl+'/category/'+$routeParams.num+'/news/')
        .success(function (result) {

            // returned data
            var data = result.data;
            $scope.news = data;
            $scope.dataSuccess = true;

            // log
            $log.debug('category results:',result);
        }).error(function (data, status) {
            // if error create fake news to fill the data with information
            $scope.news = [{content:data.message}];
            $scope.dataSuccess = false;
            $log.error(data,status);// output error to the console
        });
        
    
        // function that converts the category id to a string
        $scope.convertIdToCategoryName = NewsService.convertIdToCategoryName;
        
        // changes the path
        $scope.showArticle = function(catId,newsId){
            $location.path('/category/'+catId+'/news/'+newsId);
        }
        
                // function that converts the category id to a string
        $scope.convertIdToCategoryName = NewsService.convertIdToCategoryName;
}]);


// news Controller
newsApp.controller('newsController', ['$scope', '$log', '$http', '$routeParams', '$location', 'newsAppConfig', 'NewsService', function($scope, $log, $http, $routeParams, $location, newsAppConfig, NewsService) {
        // get all news
        $http.get(newsAppConfig.apiUrl+'/category/'+$routeParams.catId+'/news/'+$routeParams.newsId)
        .success(function (result) {

            // returned data
            var data = result.data;
            $scope.article = data;
            $scope.dataSuccess = true;

            // log
            $log.debug('article result:',result);
        }).error(function (data, status) {
            // if error create fake news to fill the data with information
            $scope.article = [{content:data.message}];
            $scope.dataSuccess = false;
            $log.error(data,status);// output error to the console
        });
        
    
        // function that converts the category id to a string
        $scope.convertIdToCategoryName = NewsService.convertIdToCategoryName;
    
        // function to increament likes
        $scope.addLike = function(dataObject,catId,newsId){    
            var new_count = (parseInt(dataObject.likes) + 1);
            $http.put(newsAppConfig.apiUrl+'/category/'+catId+'/news/'+newsId, 
                       { content: dataObject.content, 
                        image: dataObject.image, 
                        title: dataObject.title, 
                        likes: new_count, 
                        dislikes: dataObject.dislikes })
            .success(function (result) {
                $log.debug(result);
                $scope.article.likes = new_count;
            })
            .error(function (data, status) {
                $log.error(data);
                $scope.article.likes = "Error Updating";
            });
        }
        
        // function to increament dislikes
        $scope.addDislike = function(dataObject,catId,newsId){
            var new_count = (parseInt(dataObject.dislikes) + 1);
            $http.put(newsAppConfig.apiUrl+'/category/'+catId+'/news/'+newsId, 
                       { content: dataObject.content, 
                        image: dataObject.image, 
                        title: dataObject.title, 
                        likes: dataObject.likes, 
                        dislikes:  new_count})
            .success(function (result) {
                $log.debug(result);
                $scope.article.dislikes = new_count;

            })
            .error(function (data, status) {
                $log.error(data);
                $scope.article.dislikes = "Error Updating";
            });
        }
}]);