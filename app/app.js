(function(angular){
	
var app = angular.module('bm-share', ['ngMaterial', 'firebase']);

app.controller('ListCtrl', function($scope, $firebaseArray) {
	$scope.limitNumb = 25;
	$scope.contentScrollBarShow = false;
	var firebaseRef = $firebaseArray(new Firebase('<FIREBASE_REF>'));

	firebaseRef.$loaded(function(snapshot) {
		firebaseRef = firebaseRef.reverse();
	});

	$scope.data = {
		appName: "Bookmark-Share",
		data: firebaseRef
	}

	$scope.loadItemInNumber = function(numb) {
		$scope.limitNumb = numb;
		$scope.contentScrollBarShow = true;
	};

	$scope.openUrl = function(url) {
		chrome.tabs.create({
			url: url,
			active: true
		});
	};

	$scope.delItem = function(itemId) {
		$scope.data.data.$remove(itemId).then(function(ref) { ref.key() === item.$id; });
	};
});

}(angular))