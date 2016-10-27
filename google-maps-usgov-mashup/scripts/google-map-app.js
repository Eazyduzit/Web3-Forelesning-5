$(function(){
   
    //HTML Objects (dette er ID'ene i index)
    var $getEarthquakesBtn;   //$ angir at dette er jQuery
    var $markerInformationSpan;
    var $googleMapSection;
    
    //Google Map object
    var googleMapObject;
    
    //US GOV API Url
    var usGovUrl = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson";
    
    //init
    var init = function(){
        
        var setHTMLObjects = function(){
            $getEarthquakesBtn = $("#getEarthquakesBtn");
            $markerInformationSpan = $("#markerInformationSpan");
            $googleMapSection = $("#googleMapSection").get(0);
        }();//end setHTMLObjects
        
        var setEvents = function(){
            $getEarthquakesBtn.on("click", function(){
               getUSGovFeed(); 
            })
        }();//end setEvents
        
        var initGoogleMap = function(){
            var googleMapConfig = {
                zoom: 2,
                center: new google.maps.LatLng(0, 0)
            };
            
            googleMapObject = new google.maps.Map($googleMapSection, googleMapConfig);
        }();//end initGoogleMap  
        
        createMarker(59.9138688, 10.7522454, "Oslo");
        createMarker(34.0522342, -118.2436849, "Los Angeles");
        createMarker(40.7143528, -74.0059731, "New York");
        createMarker(40.339852, 127.510093, "North Korea");
        
    }();//end init  (disse er selvkjørende, ser det på ();)
    
    //Application logic
    function getUSGovFeed(){
        $.getJSON(usGovUrl)
            .done(function(eqResult){
               createAllMarkers(eqResult.features); 
            })
            .fail(function(){
                alert("Fail!");
            });
    }
    
    function createAllMarkers(earthquakes){
        $.each(earthquakes, function(i, earthquakes){
            var title = earthquakes.properties.place; //disse (properties.place) er hentet ut ifra  eartquake txt fila som vi bruker så dette må hentes manuelt.
            var latitude = earthquakes.geometry.coordinates[1];
            var longitude = earthquakes.geometry.coordinates[0];
            
            createMarker(latitude, longitude, title);
        });
    }
    
    function createMarker(latitude, longitude, information){
        var newMarker = new google.maps.Marker(
            {
                title: information,
                label: "T",
                position: new google.maps.LatLng(latitude, longitude),
                map: googleMapObject,
                information: information
            }
        );
        newMarker.addListener("mouseover", function(){
            $markerInformationSpan.html(this.information);
        });
    }//end createMarker
});