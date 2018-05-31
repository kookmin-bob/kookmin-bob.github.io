var dataset_url = "https://api.jsonbin.io/b/5b0a87e87a973f4ce578489c/latest";

// detail.html이 호출될때 같이 인자로 넘어온 go의 값을 가져와야 함
// 이 값이 어떤 음식점이 선택됬는지 알려주고 있음
var urlParams = new URLSearchParams(window.location.search);
var target_id = urlParams.get("go");
var target_info = null;

//구글 지도를 init해주는 함수
function initMap() {
    var geocoder = new google.maps.Geocoder();
    //지도 객체 선언, map이라는 id에 지도 객체 할당
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 17
    });

    // 원하는 주소를 입력해서 해당 주소에 마킹
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

// 데이터 저장소에서 json 파일 전체를 로딩, ajax를 사용함
$.ajax({
    url: dataset_url,
    type: 'GET',
    headers: { //Required only if you are trying to access a private bin
        'secret-key': "$2a$10$SkSaaKkfgtSNiIXcMXVNdukuLK..PoUusrTVSJEUwnwEEVVcsewWa"
    },
    // 받아오기에 성공시
    success: function (data) {
        // console.log(data);
        // 전체 데이터중 target_id 즉 선택된 음식점의 정보를 선택함.
        target_info = data[target_id];

        // 제목 동적 변환
        var title = $("#detail_title").text(target_info.name);
        title.html(title.html().replace(/\n/g, '<br/>'));

        //각 제목, 주소, 영문 타이틀 동적 변환
        $("#eng_title").text(target_info.eng_name);
        $("#address").text(target_info.address);
        $("#description").text(target_info.description);

        // 다중 이미지 또는 이미지가 없을때의 handling
        if(target_info.images.length!=0){
            // console.log(target_info.images);
            $("#main_image").attr("src", target_info.images[0]);
        }
        else{
            $("#main_image").css("visibility", "hidden");
        }

        // 테그들 생성하기
        var tag_str = "";
        target_info.hash_tags.forEach(function (e) {
            tag_str += "#" + e + " ";
        });
        $("#tags").text(tag_str);

        // 각 가격에 대한 동적 UI 할당
        target_info.menus.forEach(function (e) {
            $("#menus").append("<li>" + e.name + " - " + e.price + "원</li>");
            // console.log(e);
        });

        if(target_info.phone != null){
            $("#phone_number").text("전화 걸기 : "+ target_info.phone);
            $("#phone_number").attr("href", "tel:"+target_info.phone);
        }

        // 지도 생성 호출
        initMap();
    },
    error: function (err) {
        console.log(err);
    }
});

