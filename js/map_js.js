var dataset_url = "https://raw.githubusercontent.com/codertimo/kookmin-bab/master/data/dataset.json";
var urlParams = new URLSearchParams(window.location.search);
var target_id = urlParams.get("go");
var target_info = null;

$.getJSON(dataset_url, function (data) {
    console.log(data);
    target_info = data[target_id];
    var title = $("#detail_title").text(target_info.name);
    title.html(title.html().replace(/\n/g, '<br/>'));
    $("#eng_title").text(target_info.eng_name);
    $("#address").text(target_info.address);
    $("#description").text(target_info.description);
    $("#main_image").src=target_info.images[0];

    var tag_str = "";
    target_info.hash_tags.forEach(function (e) {
        tag_str += "#" + e + " ";
    });
    $("#tags").text(tag_str);

    target_info.menus.forEach(function (e) {
        $("#menus").add("<li>" + e.name + " - " + e.price + "원</li>");
    });
    initMap();
});

function initMap() {
    var geocoder = new google.maps.Geocoder();
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 17
    });

    geocoder.geocode({'address': target_info.address},
        function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);
                new google.maps.Marker({
                    position: results[0].geometry.location,
                    title: target_info.name,
                    map: map
                });
            }
        });

}