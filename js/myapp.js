var mygrap=angular.module('mygrap',[]);

mygrap.filter('persent',function (){
    return function (num){
        var snum=num.toString();
        var end=4;
        if(snum.indexOf('.')>1)
        end=snum.indexOf('.')+2;
        var res=snum.slice(0,end);

        return res;
    };

});

mygrap.controller('appController',function ($scope,$http,$interval){
    $scope.curVal= 0;
    $scope.maxVal = 100;
    var url='http://jstechalliance.com/progressbar.php';
    function getData(){
        $http.get(url).then(function(data){
            $scope.data=data.data;
        });
    }
    getData()
    $interval(getData,2000);
});

mygrap.directive('progressBar', [function () {
    return {
      restrict: 'E',
      scope: {
        curVal: '@',
        maxVal: '@'
      },
      template: "<div class='progress-bar'>"+
                  "<div class='progress'></div>"+
                  "<div class='progress-text'></div>"+
                "</div>",
      link: function ($scope, element, attrs) {
            var progressBar=element[0].children[0];
            var progress=element[0].children[0].children[0];
            function updateProgress() {
              var prog = 0;          
              progress.style.width=$scope.curVal+'%';
              progress.style.background='green';
              if($scope.curVal<0){  
                progress.style.background='red';
                progress.style.width=0-$scope.curVal+0+'%';
              }
              progressBar.children[1].innerHTML=$scope.curVal+'%';
            }

            $scope.$watch('curVal', updateProgress);
            $scope.$watch('maxVal', updateProgress);        
      }
    };  
 }]);