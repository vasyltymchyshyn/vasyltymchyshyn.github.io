/*
angular.module('myApp')
    .controller('detailsController', function($scope, $state, $stateParams, $http){

        console.log('sono preciso!');
        var sito2 = 'http://its-bitrace.herokuapp.com/api/v2/stores';
        var config2 = {
            headers: {'x-bitrace-session': sessionStorage.getItem('session')}


        }
        var map = null;


        $scope.guid = $stateParams.id;

        $http.get(sito2 + "/"+ $stateParams.id,
            config2)
            .then(
            function(response){
                $scope.negozio = response.data.data;
                initialize();
                console.log('ock2');
            },
            function(response){
                console.log('!ock2')
            });






        function initialize() {
            /*
            GMaps.geolocate({
                    success: function(position) {
                    var store = $scope.negozio;
                    console.log(store);
                    console.log(store.latitude+' '+store.longitude);

                    var storeLocation = new google.maps.LatLng(store.latitude,store.longitude);
                    var myLatitude = position.coords.latitude;
                    var myLongitude = position.coords.longitude;
                    var myLocation = new google.maps.LatLng(myLatitude, myLongitude);





                        map = new google.maps.Map(document.getElementById('map'), {
                        center: myLocation,

                        zoom: 15
                    });

                    var marker = new google.maps.Marker({
                        position: storeLocation,
                        map: map,
                        title: store.name
                    });

                    var marker1 = new google.maps.Marker({
                        position: myLocation,
                        map: map,
                        title: "You"
                    });


                        map.drawRoute({
                            origin: myLocation,
                            destination: storeLocation,
                            travelMode: 'driving',
                            strokeColor: '#131540',
                            strokeOpacity: 0.6,
                            strokeWeight: 6
                        });




                },
                error: function(error) {
                    alert('Geolocation failed: '+error.message);
                },
                not_supported: function() {
                    alert("Your browser does not support geolocation");
                },
                always: function() {
                    alert("Done!");
                }
            });
        }
















    });

 function initMap() {
 var chicago = {lat: 41.85, lng: -87.65};
 var indianapolis = {lat: 39.79, lng: -86.14};

 var map = new google.maps.Map(document.getElementById('map'), {
 center: chicago,
 scrollwheel: false,
 zoom: 7
 });

 var directionsDisplay = new google.maps.DirectionsRenderer({
 map: map
 });

 // Set destination, origin and travel mode.
 var request = {
 destination: indianapolis,
 origin: chicago,
 travelMode: google.maps.TravelMode.DRIVING
 };

 // Pass the directions request to the directions service.
 var directionsService = new google.maps.DirectionsService();
 directionsService.route(request, function(response, status) {
 if (status == google.maps.DirectionsStatus.OK) {
 // Display the route on the map.
 directionsDisplay.setDirections(response);
 }
 });
 }
 */

/*
* map.travelRoute({
 origin: [-12.044012922866312, -77.02470665341184],
 destination: [-12.090814532191756, -77.02271108990476],
 travelMode: 'driving',
 step: function(e) {
 $('#instructions').append('<li>'+e.instructions+'</li>');
 $('#instructions li:eq(' + e.step_number + ')').delay(450 * e.step_number).fadeIn(200, function() {
 map.drawPolyline({
 path: e.path,
 strokeColor: '#131540',
 strokeOpacity: 0.6,
 strokeWeight: 6
 });
 });
 }
 });
 */

/*
* map.drawRoute({
 origin: myLocation,
 destination: storeLocation,
 travelMode: 'driving',
 strokeColor: '#131540',
 strokeOpacity: 0.6,
 strokeWeight: 6
 });
 */

angular.module('myApp')
    .controller('detailsController', function($scope, $state, $stateParams, $http){

        console.log('sono preciso!');
        var sito2 = 'http://its-bitrace.herokuapp.com/api/v2/stores';
        var config2 = {
            headers: {'x-bitrace-session': sessionStorage.getItem('session')}


        }


        $scope.guid = $stateParams.id;

        $http.get(sito2 + "/"+ $stateParams.id,
            config2)
            .then(
            function(response){
                $scope.negozio = response.data.data;
                initialize();
                console.log('ock2');
            },
            function(response){
                console.log('!ock2')
            });






        function initialize() {
            /**/
            GMaps.geolocate({
                success: function(position) {
                    var store = $scope.negozio;
                    console.log(store);
                    console.log(store.latitude+' '+store.longitude);

                    var storeLocation = new google.maps.LatLng(store.latitude,store.longitude);
                    var myLatitude = position.coords.latitude;
                    var myLongitude = position.coords.longitude;
                    var myLocation = new google.maps.LatLng(myLatitude, myLongitude);




                    var map = new GMaps({
                        div: '#map',
                        lat: myLatitude,
                        lng: myLongitude,
                        zoom: 5
                    });
                    /*
                     map.drawRoute({
                     origin: [myLatitude, myLongitude],
                     destination: [store.latitude, store.longitude],
                     travelMode: 'driving',
                     strokeColor: '#131540',
                     strokeOpacity: 0.6,
                     strokeWeight: 6
                     });
                     */
                    console.log('origin: '+myLatitude+' '+myLongitude)
                    console.log('destination: '+store.latitude+' '+store.longitude)
                    map.travelRoute({
                        origin: [myLatitude, myLongitude],
                        destination: [store.latitude, store.longitude],
                        travelMode: 'driving',
                        step: function(e) {/*
                         $('#instructions').append('<li>'+e.instructions+'</li>');
                         $('#instructions li:eq(' + e.step_number + ')').delay(450 * e.step_number).fadeIn(200, function() {
                         map.drawPolyline({
                         path: e.path,
                         strokeColor: '#131540',
                         strokeOpacity: 0.6,
                         strokeWeight: 6
                         });
                         });*/
                            console.log('step');
                            map.drawPolyline({
                                path: e.path,
                                strokeColor: '#131540',
                                strokeOpacity: 0.6,
                                strokeWeight: 6
                            });
                        }
                    });

                    map.addMarker({
                        lat: store.latitude,
                        lng: store.longitude,
                        title: store.name,
                        click: function(e) {

                        }
                    });
                    map.addMarker({
                        lat: myLatitude,
                        lng: myLongitude,
                        title: "You",
                        click: function(e) {

                        }
                    });






                },
                error: function(error) {
                    alert('Geolocation failed: '+error.message);
                },
                not_supported: function() {
                    alert("Your browser does not support geolocation");
                },
                always: function() {

                }
            });
        }
















    });

