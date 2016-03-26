var app = angular.module('mdcolors.directives', []);

app.directive('colorsParent', function() {
    return {
        restrict: 'E',
        scope: {},
        controller: "AppCtrl as mouseClicked"
    }
});

app.directive('colorsGridList', function() {
    return {
    	restrict : "E",
        require: "colorsParent",
        'template' : '<a>Game of thrones (click me)</a>',
        link: function(scope, element, attrs) {
            // mouseClickedCtrl.setBookType("EBOOK");
        }
    }
})
// .directive('colorTile', function() {
//     return {
//         require: "mouseClicked",
//         'template' : '<a>PC World (click me)</a>',
//         link: function(scope, element, attrs, mouseClickedCtrl) {
//             mouseClickedCtrl.setBookType("MAGAZINE");
//         }
//     }
// })