angular.module('loadButton', [])

.directive('loadButton',[function(){
	return {
		restrict: 'A',
		replace: false,
		template: '',
		scope: {
			isToggled:'=',
			loadingMessage:'@?',
		},
		link: function(scope, element, attrs) {

			var original = element.html();

			var showLoading = function (newVal, oldVal) {

				element.addClass("disabled");
				element.html(scope.loadingMessage || "<i class='fa fa-spinner fa-spin'></i> Processando...");
			}

			var showNormal = function (newVal, oldVal) {

				element.html(original);
				element.removeClass("disabled");
			}

			scope.$watch(function(){
				return scope.isToggled;
			}, function(newVal, oldVal) {
				if (newVal) {
					showLoading(newVal, oldVal);
				} else if (oldVal !== newVal) {
					showNormal(newVal, oldVal);
				}
			});

		}
	};
}]);