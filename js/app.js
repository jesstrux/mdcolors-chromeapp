var app = angular.module("mdcolors", ['ngMaterial', 'mdcolors.services']);

app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('pink');
});

app.controller('AppCtrl', function($scope, Colors){
	$scope.activeColorIndex;
	$scope.color;
	$scope.colorLevels;
	$scope.curLevel;
	$scope.activeLevelIndex;

	Colors.all().then(function(colors){
		$scope.colors = colors;
		$scope.viewColor(0);
	});

	$scope.viewColor = function(index){
		$scope.activeColorIndex = index;
		$scope.color = $scope.colors[index];
		$scope.colorLevels = $scope.color.levels;
		$scope.curLevel = $scope.colorLevels[5];
		$scope.viewLevel(5);
	}

	$scope.viewLevel = function(index){
		$scope.activeLevelIndex = index;
		$scope.curLevel = $scope.color.levels[index];

		// start drawing our chart
		drawColorWheel($scope.colorLevels, index);
	}

	$scope.logColor = function(e) {
		var el = e.currentTarget;
	    var pos = findPos(el);
	    var x = e.pageX - pos.x;
	    var y = e.pageY - pos.y;
	    var coord = "x=" + x + ", y=" + y;
	    var c = el.getContext('2d');
	    var p = c.getImageData(x, y, 1, 1).data; 
	    var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);

	    $scope.disCoverLevel(hex);
	}

	$scope.disCoverLevel = function(hex){
		var levels = $scope.colorLevels;

		for (var i = 0; i < levels.length; i++) {
			if(levels[i].code === hex){
				$scope.viewLevel(i);
				break;
			}
		}
	}
});

function findPos(obj) {
    var curleft = 0, curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return { x: curleft, y: curtop };
    }
    return undefined;
}

function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}

function drawColorWheel(levels, currentLevel){
	var canvas = document.getElementById('colorWheel');
	var context = canvas.getContext('2d');
	canvas.width = canvas.height = "382"

	context.clearRect(0, 0, canvas.width, canvas.height);

	var x = canvas.width / 2;
	var y = canvas.height / 2;
	var days = 1;
	var hours = levels.length;
	var segmentWidth = 360 / hours;
	var pieAngle = 2 * Math.PI / hours;
	var segmentDepth = 190;

	for (var i = 1; i <= days; i++) {
        drawSegments(i * segmentDepth);
    }

	function drawSegments(radius) {
	    for (var i = 0; i < hours; i++) {
	        context.beginPath();
	        context.moveTo(x, y);
	        context.arc(x, y, radius, i*pieAngle, (i+1)*pieAngle, false);
	        context.lineWidth = segmentDepth;
	        // var hueValue = i * 15;
	        // context.fillStyle = 'hsl(' + hueValue + ',70%, 60%)';
	        // '#'+(Math.random()*0xFFFFFF<<0).toString(16);
	        context.fillStyle = levels[i].code;
	        context.fill();
	        context.lineWidth = 1;
	        context.strokeStyle = levels[i].code;
	        context.stroke();
	    }
	}
}