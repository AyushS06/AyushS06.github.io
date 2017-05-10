var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', '$locationProvider',
function($routeProvider, $locationProvider) {
    
    /*
      Application Routing
     */
    $routeProvider.when('/search/', {
      templateUrl: 'page-search.html',
      controller: 'SearchController',
      reloadOnSearch: false
    }).otherwise({
      templateUrl: 'page-default.html'
    });
    
    // $locationProvider.html5Mode(true);
}]);

myApp.factory('SearchService', ["$location", "$http", function($location, $http) {
  
  var SearchService;
  SearchService = {};
  
  // The array that will contain search results
  SearchService.arrSearchResults = [];
  
  // The search term (for decoration)
  SearchService.searchTerm = "";
  
  // Control if user searched recently
  SearchService.userSearched = false;
  
  // Control the state of the search
  SearchService.typeOfSearch = "web";
  
  // Switch the search type/state
  SearchService.switchSearchType = function(aSearchType) {
    SearchService.typeOfSearch = aSearchType;
    
    // Check if user has a search term, if true then rerun search
    if (SearchService.searchTerm !== "") {
      console.log("rerunning search!");
      SearchService.arrSearchResults = [];
      SearchService.submitSearch(SearchService.searchTerm);
    }
  };
  
  // Clear the search
  SearchService.clearSearch = function() {
    SearchService.searchTerm = "";
    SearchService.arrSearchResults = [];
    SearchService.userSearched = false;
  };
  
  // Search function
  SearchService.submitSearch = function(aSearchTerm) {
  
    // Make sure aSearchTerm has content (always good to double check)
    if(aSearchTerm !== "") {
  
      // Alter URL to show new request
      $location.search('q', aSearchTerm);
      SearchService.searchTerm = aSearchTerm; 
      
      // Determine URL to request based on search type/state
      requestUrl = "";
      if (SearchService.typeOfSearch == "web") {
        requestUrl = "results-web.json";
      }
      else if (SearchService.typeOfSearch == "image") {
        requestUrl = "results-image.json";
      } 
      
      console.log("Making request to ", requestUrl);
      
      // Make a GET request to your URL that will 
      // return data for you to populate
      $http.get(requestUrl).
        success(function(data, status, headers, config) {
  
  
          SearchService.userSearched = true;
          console.log(data, status, headers, config);
          
          // this callback will be called asynchronously
          // when the response is available
  
          // Assuming the data returned is a list of items
          // or object items
          // (i.e. [ "Search Result1", "Search Result2", ... ]
          SearchService.arrSearchResults = data;
  
        }).
        error(function(data, status, headers, config) {
  
          SearchService.userSearched = true;
          console.log(data, status, headers, config);
          
          // called asynchronously if an error occurs
          // or server returns response with an error status.
  
          // Empty the array of search results 
          // to show no results
          SearchService.arrSearchResults = [];
        });
    }
  }
  
  return SearchService;
}]);

myApp.controller('ApplicationController', ['$scope', 'SearchService', 
function($scope, SearchService) {

  // Create a reference to the SearchService and add it to the 
  // $scope so it will be available on the page
  $scope.searchService = SearchService;
  
  $scope.user = "Anon";

}]);

myApp.controller('SearchController', ['$scope', 'SearchService', '$http', '$location', 
function($scope, SearchService, $http, $location) {

  // Your search input
  $scope.blab = "";
  
}]);
