var dataset_url = "https://api.jsonbin.io/b/5b0a87e87a973f4ce578489c/latest";
var urlParams = new URLSearchParams(window.location.search);
var target_id = urlParams.get("go");
var target_info = null;

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

$.ajax({
    url: dataset_url,
    type: 'GET',
    headers: { //Required only if you are trying to access a private bin
        'secret-key': "$2a$10$SkSaaKkfgtSNiIXcMXVNdukuLK..PoUusrTVSJEUwnwEEVVcsewWa"
    },
    success: function (data) {
        console.log(data);
        target_info = data[target_id];
        var title = $("#detail_title").text(target_info.name);
        title.html(title.html().replace(/\n/g, '<br/>'));
        $("#eng_title").text(target_info.eng_name);
        $("#address").text(target_info.address);
        $("#description").text(target_info.description);
        if(target_info.images.length!=0){
            console.log(target_info.images);
            $("#main_image").attr("src", target_info.images[0]);
        }
        else{
            $("#main_image").css("visibility", "hidden");
        }

        var tag_str = "";
        target_info.hash_tags.forEach(function (e) {
            tag_str += "#" + e + " ";
        });
        $("#tags").text(tag_str);

        target_info.menus.forEach(function (e) {
            $("#menus").add("<li>" + e.name + " - " + e.price + "원</li>");
        });
        initMap();
    },
    error: function (err) {
        console.log(err);
    }
});

