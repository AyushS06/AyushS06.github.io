var app = angular.module('instantsearch',[]);

app.controller('instantSearchCtrl',function($scope,$http){
    $http.get('data.json').success(function(data, status, headers, config) {
        $scope.items = data.data;
    }).error(function(data, status, headers, config) {
        console.log("No data found..");
  });
});
