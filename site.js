var app = angular.module('instantsearch',[]);

app.controller('instantSearchCtrl',function($scope,$http){
    // 'https://api.nasa.gov/planetary/apod?api_key=16zpS6CCNX5jXE83MCt3nAEOEj7oLQ0Lsu5BbLHk'
    // https://images-api.nasa.gov/search?q=apollo%2011&description=moon%20landing&media_type=image
    // data.json
    //alert('In controller');
    //$http.get('https://images-api.nasa.gov/search?q=apollo%2011&description=moon%20landing&media_type=image').success(function(data, status, headers, config) {
    //    $scope.items = data.data;
    //}).error(function(data, status, headers, config) {
    //    console.log("No data found..");
    //});
    $scope.search = function() {
    alert('In controller');
    $http.get('https://images-api.nasa.gov/search?q=apollo%2011&description=moon%20landing&media_type=image').success(function(data, status, headers, config) {
        $scope.items = data.data;
    }).error(function(data, status, headers, config) {
        console.log("No data found..");
    });
});

app.filter('searchFor', function(){
    return function(arr, searchString){
        if(!searchString){
            return arr;
        }
        var result = [];
        searchString = searchString.toLowerCase();
        angular.forEach(arr, function(item){
            if(item.title.toLowerCase().indexOf(searchString) !== -1){
            result.push(item);
        }
        });
        return result;
    };
});
