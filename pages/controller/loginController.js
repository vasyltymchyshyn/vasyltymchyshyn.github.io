angular.module('myApp')
    .controller('loginController', function($scope, $state, $http, loginManager){

        var li = document.getElementsByTagName('ul');
        for(var i=0; i<li.length;i++) {
            console.log('ciao ili')
            li[i].style.visibility= 'hidden';
        }

        $scope.email="";
        $scope.password="";
        $scope.showForm=true;
        var waiting = null;
        var requestResult = null;
        var timeout = 0;

        function lastSeconds() {
            if(requestResult != null){
                clearInterval(waiting);
                $state.go('home');
            }
            requestResult = sessionStorage.getItem('session');
            timeout++;
            if(timeout == 10) {
                alert('Connection timed out!');
                $scope.message = "";
                $scope.showSpinner = false;
                $scope.showForm = true;
                clearInterval(waiting);
                timeout = 0;
                $scope.$apply();
            }
        }

        $scope.login=function() {
            $scope.message = "Loading all these magnificent features";
            $scope.showSpinner = true;
            $scope.showForm = false;

            waiting = setInterval(lastSeconds,500);
            var hash = CryptoJS.SHA512($scope.password);
            var hash_Base64 = hash.toString(CryptoJS.enc.Base64);
            loginManager.getSessionKey($scope.email, hash_Base64);


            /*
            var data1 = $.param({
                email: $scope.email,
                password: hash_Base64

            });
            var config1 = {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }

            $http.post(sito1,
                data1,
                config1)
                .then(
                    function (response) {
                        if(response.data.success)
                            sessionStorage.setItem('session',response.data.data.session);
                        else
                            alert(response.data.errorCode+" "+response.data.errorMessage)
                    }
                );*/
        }

    });