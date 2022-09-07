//Thanks to AngularJS
//It uses external JS files which are my own creation
//Created by @ankit31894
//https://github.com/ankit31894
//Thanks to AngularJS v1.5.2

var app = angular.module("calculator", []);
app.factory('ajax', function($http) {
   return {
        getFoos: function(url) {
             //return the promise directly.
             return $http.get(url)
                       .then(function(result) {
                            //resolve the promise as the data
                            return result.data;
                        });
        }
   }
});
app.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                document.getElementById("=").click();
                event.preventDefault();
            }
        });
    };
});
app.filter('unsafe', function($sce) { return $sce.trustAsHtml; });
app.controller('calculatorController',function($scope,$element,ajax){
    $scope.ans=0;
    $scope.mem=0;
    $scope.ctx={flag:false};
    $scope.input="0";
    mexp.addToken([{show:"Ans",type:3,value:"Ans",token:"Ans"},{type:3,preced:0,value:"x",show:"x",token:"x"}]);
    $scope.result=0;
    $scope.formula='';
    $scope.mode='Radian';
    $scope.butVal=$element[0].getElementsByClassName("button");
    $scope.changeAngle=function(b){
        mexp.math.isDegree=b;
        $scope.mode=(b===true?'Degree':'Radian');
    }
//    setTimeout(function(){$scope.cal.input="#";},1000)
    $scope.changeState=function(event) {
        var $this=event.target;
        var id=$this.innerHTML;
		if(id==='1/x'||id==='&plusmn;'){
			$scope.input=$this.id+"("+$scope.input+")";
		}
		else if(id==='Del'){
			$scope.input=$scope.input.slice(0,-1);
		}
		else if(id==='='){
			try{
				var str=mexp.lex($scope.input);
				$scope.str2=str.toPostfix();
				$scope.ans=$scope.str2.postfixEval({Ans:$scope.ans});
				$scope.result=isNaN($scope.ans)?"Not defined":$scope.ans;
                $scope.formula=""+$scope.str2.formulaEval();
                if($scope.ctx.flag)
                    $scope.ctx.ctx.draw();
			}
			catch(e){
				$scope.formula=e.message;
			}
		}
		else if(id==='C'){
			str=[{value:'(',type:4}];
			$scope.result='';
			$scope.formula='';
			$scope.input='';
		}
		else if(id==='MS'){
			$scope.mem=$scope.ans;
		}
		else if(id==='MC'){
			$scope.mem=0;
		}
		else if(id==='MR'){
			$scope.cal.input+=$scope.mem;
		}
		else if(id==='M+'){
			$scope.mem+=$scope.ans;
		}
		else if(id==='M-'){
			$scope.mem-=$scope.ans;
		}
		else {
			$scope.input+=$this.id;
		}
    }
})