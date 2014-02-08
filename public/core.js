var yad2ScraperWebApp = angular.module('yad2ScraperWebApp', []);

function mainController($scope, $http) {
	$scope.formData = {};
	$scope.predicate = '-Date';

	// when landing on the page, get all todos and show them
	$http.get('/api/ads')
		.success(function(data) {
			$scope.ads = data;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
}