$http.get('mdcolors4.json').success(function(data){
	var data = angular.fromJson(data);
	$scope.colors = data;
	var colors = [];
	var colorCount = 0;
	// angular.forEach(data, function(value, key, index) {
	// 	var color = {};
	// 	color.name = key;
	// 	color['l500'] = value[500];
	// 	color['isLight'] = isItLight(value[500]);
	// 	color.levels = [];
	// 	// console.log(colorCount);
	// 	var levelCount = 0;
	// 	if(colorCount < 19){
	// 		angular.forEach(value, function(value, key, index) {
	// 			var level = {};
	// 			level= {'level': key, 'code' : value, 'isLight' : isItLight(value)};
	// 			color.levels.push(level);
	// 			levelCount++;
	// 		});
	// 	}
	// 	colors.push(color);

	// 	colorCount++;
	// });
	// console.log(JSON.stringify(colors))
});

function isItLight(color){
	var toCheck = tinycolor(color);
	return toCheck.isLight();
}