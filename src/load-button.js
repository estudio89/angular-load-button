angular.module('loadButton', ['ui.bootstrap'])

.directive('loadButton',['$modal',function($modal){
	return {
		restrict: 'A',
		replace: false,
		template: '',
		scope: {
			isToggled:'=',
			loadingMessage:'@?',
			feedbackMessage:'@?'
		},
		link: function(scope, element, attrs) {

			var original = element.html();

			function feedbackModal() {
				var message = scope.feedbackMessage;
				var scopeCopy = scope.$root.$new();
				scopeCopy.feedbackMessage = scope.feedbackMessage;
				$modal.open({
					scope: scopeCopy,
			        template: "<div class='modal-body'><h3 class='text-center'>{{ feedbackMessage }}</h3></div><div class='modal-footer'><button type='button' class='btn btn-default' ng-click='$close()'>OK</button></div>"
			    });
			};

			function _update(srcObj, destObj) {
				for (var key in destObj) {
					if(destObj.hasOwnProperty(key) && srcObj.hasOwnProperty(key)) {
						destObj[key] = srcObj[key];
					}
			  }
			}

			var showLoading = function (newVal, oldVal) {

				element.addClass("disabled");
				element.html(scope.loadingMessage || "<i class='fa fa-spinner fa-spin'></i> Processando...");
			}

			var showNormal = function (newVal, oldVal) {

				element.html(original);
				element.removeClass("disabled");

				if (newVal != oldVal && typeof scope.feedbackMessage !== 'undefined') {
					feedbackModal();
				}
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