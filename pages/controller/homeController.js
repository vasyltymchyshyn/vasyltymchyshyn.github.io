angular.module('myApp')
    .controller('homeController', function($scope, $state, loginManager){

        var li = document.getElementsByTagName('ul');
        for(var i=0; i<li.length;i++) {
            li[i].style.visibility= 'visible';
        }

        $scope.showForm1 = true;
        $scope.showSpinner1 = false;

        var waiting = null;
        var requestResult = null;
        $scope.data = "";

        if(sessionStorage.getItem('session')!=null) {
            loginManager.getData( sessionStorage.getItem('session') );
            waiting = setInterval(lastSeconds,500);
        } else {
            $state.go('login');
        }

        function lastSeconds() {
            if(requestResult != null){
                $scope.data = requestResult.data.data;
                clearInterval(waiting);
                $scope.$apply();
            }
            requestResult = JSON.parse(sessionStorage.getItem('dataItems'));
        }
       /* $scope.logout = function() {

            if (sessionStorage.getItem('session') != null) {
                sessionStorage.removeItem('session');
                $state.go('login');
            }

        };*/

        $scope.find = function(){
                var person = prompt("Name to search");
                var negozi = requestResult.data.data;
                if (person != null) {
                    for(var i=0; i<negozi.length; i++) {
                        if(negozi[i].name == person) {
                            console.log('found at: '+i);
                        }
                    }
                }
                else {
                    return 0;
                }

        }

        $scope.filtraRisultati = function() {
            var filtro = $scope.search;
            filtro = filtro.toUpperCase();

            var negozi = requestResult.data.data;
            var negoziGiusti = [];
            for(var i = 0; i<negozi.length; i++) {
                if(negozi[i].name.search(filtro)>-1) {
                    negoziGiusti.push(negozi[i]);
                }
            }
            $scope.data = negoziGiusti;
        }



        $scope.loading = function(){
            $scope.showForm1 = false;
            $scope.showSpinner1 = true;
        }

    });