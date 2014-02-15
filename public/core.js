var yad2ScraperWebApp = angular.module('yad2ScraperWebApp', []);

function mainController($scope, $http) {
    $scope.formData = {};
    $scope.predicate = '-Date';
    $scope.query = {'IsRelevant':'true'};

    // when landing on the page, get all todos and show them
    $http.get('/api/ads')
        .success(function(data) {
            $scope.ads = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });


    $scope.isRelevant = function($event, id) {
        var checkbox = $event.target;
        var action = (checkbox.checked ? 'adIsNotRelevant' : 'adIsRelevant');

        $http.get('/api/' + action + '/' + id)
            .success(function(data) {
                $scope.ads = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.isAlive = function(lastSeenDate) {
        var now = new Date();
        now.setHours(0);
        now.setMinutes(0);
        now.setSeconds(0);

        var adLastSeenDate = new Date(lastSeenDate);
        adLastSeenDate.setHours(0);
        adLastSeenDate.setMinutes(0);
        adLastSeenDate.setSeconds(0);

        var numberOfDaysBetweenAdAndLastSeen = (now - adLastSeenDate) / 86400000;
        if (numberOfDaysBetweenAdAndLastSeen < 3)
            return true;
        else
            return false;
    };
}