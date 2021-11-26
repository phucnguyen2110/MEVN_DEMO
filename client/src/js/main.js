var map, marker, infowindow;
var markers = [];
var address_infos = {};

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: { lat: 10.4711794, lng: 106.3573862 },
        mapTypeControl: true,
        mapTypeId: "roadmap",
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.LEFT_BOTTOM,
        },
        gestureHandling: "cooperative",

    });

    //hình ảnh 45 độ
    map.setTilt(45);
    //lưu lượng giao thông
    const trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);
    //mạng lưới giao thông công cộng
    const transitLayer = new google.maps.TransitLayer();
    transitLayer.setMap(map);
    //biểu đồ hiển thị đường đi xe đạp đề xuất
    const bikeLayer = new google.maps.BicyclingLayer();
    bikeLayer.setMap(map);


    placeMarker({ lat: 10.4711794, lng: 106.3573862 });
    geocodeAddress(marker.position);
    map.panTo(marker.position);
    markers.push(marker);

    map.addListener("click", function (e) {
        clearMarkers();
        placeMarker(e.latLng);
        geocodeAddress(e.latLng);
        map.panTo(marker.position);
        markers.push(marker);

    });

    createInfoWindow();

    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    searchBox.addListener("places_changed", function () {
        searchBox.set("map", null);
        clearMarkers();

        const places = searchBox.getPlaces();
        if (places.length == 0) {
            return;
        }

        var bounds = new google.maps.LatLngBounds();

        if (places.length > 1) {
            places.forEach(function (place) {
                if (!place.geometry || !place.geometry.location) {
                    console.log("Returned place contains no geometry");
                    return;
                }

                const icon = {
                    url: place.icon,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(25, 25)
                };
                markers.push(
                    new google.maps.Marker({
                        map,
                        icon,
                        title: place.name,
                        position: place.geometry.location,
                        placeId: place.place_id,
                    })
                );

                marker.bindTo("map", searchBox, "map");
                marker.addListener("map_changed", function () {
                    if (!this.getMap()) {
                        this.unbindAll();
                    }
                });

                if (place.geometry.viewport) {
                    // Only geocodes have viewport.
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
            });

            map.fitBounds(bounds);
            searchBox.set("map", map);
            map.setZoom(Math.min(map.getZoom(), 15));
            // searchBox.setBounds(map.getBounds());
        } else {
            infowindow.close();
            var place = places[0];
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }

            placeMarker(place.geometry.location);

            marker.bindTo("map", searchBox, "map");
            marker.addListener("map_changed", function () {
                if (!this.getMap()) {
                    this.unbindAll();
                }
            });

            create_address_infos(place);
            google.maps.event.addListener(marker, "click", function () {
                infowindow.open(map, marker);
            })

            infowindow.setContent(
                "<div style='font-weight: bold; color:blue;'>" +
                "<b style='color: red;'><em>Location info &copy; Google Maps</em> </b>" + "<br>" +
                "<b style='color: green;'>Address: </b> " + place.formatted_address + "<br>" +
                "<b style='color: green;'>latLng: </b> (" + place.geometry.location.lat() + "," + place.geometry.location.lng() + ")<br>" +
                "</div>"
            );

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }

            map.fitBounds(bounds);
            searchBox.set("map", map);
            map.setZoom(Math.min(map.getZoom(), 15));
            infowindow.open(map, marker);
            markers.push(marker);
        }
    });

}

function placeMarker(latLng) {
    marker = new google.maps.Marker({
        position: latLng,
        map: map,
    });
}

function createInfoWindow() {
    if (infowindow) {
        infowindow.close();
    }
    infowindow = new google.maps.InfoWindow();
}

function geocodeAddress(latLng) {
    var geocoder = new google.maps.Geocoder;
    createInfoWindow();

    geocoder.geocode(
        { "location": latLng },
        function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    create_address_infos(results[0]);

                    infowindow.setContent(
                        "<div style='font-weight: bold; color:blue;'>" +
                        "<b style='color: red;'><em>Location info &copy; Google Maps</em> </b>" + "<br>" +
                        "<b style='color: green;'>Address: </b><em> " + address_infos["name"] + "</em><br>" +
                        "<b style='color: green;'>latLng: </b> (" + address_infos["latitude"] + "," + address_infos["longitude"] + ")<br>" +
                        "</div>"
                    );
                    // Sửa
                    google.maps.event.addListener(marker, "click", function () {
                        infowindow.open(map, marker);
                    })
                    //
                    infowindow.open(map, marker);
                } else {
                    console.log("No results found");
                }
            } else {
                console.log("Geocoder failed due to: " + status);
            }
        }
    );
}

function clearMarkers() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null)
    }
    markers = [];
}

function create_address_infos(address) {
    address_infos = {
        name: address.formatted_address.toString(),
        latitude: address.geometry.location.lat(),
        longitude: address.geometry.location.lng(),
        prefecture: "",
        city: "",
        town: "",
        choume: "",
        banchi: "",
        gou: ""
    }
}