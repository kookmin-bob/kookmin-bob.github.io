var dataset_url = "https://api.jsonbin.io/b/5b0a87e87a973f4ce578489c/latest";

// detail.html이 호출될때 같이 인자로 넘어온 go의 값을 가져와야 함
// 이 값이 어떤 음식점이 선택됬는지 알려주고 있음
var urlParams = new URLSearchParams(window.location.search);
var target_id = urlParams.get("go");
var selected_tags = urlParams.get("tags").split(",");
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

function get_random_place(selected_tags, callback) {
    // 전제 음식점 목록을 json으로 받아옴
    $.ajax({
        url: dataset_url,
        type: 'GET',
        headers: { //Required only if you are trying to access a private bin
            'secret-key': "$2a$10$SkSaaKkfgtSNiIXcMXVNdukuLK..PoUusrTVSJEUwnwEEVVcsewWa"
        },
        success: function (data) {
            // data가 전체 받아온 음식점 리스트
            var randArray = [];
            // 1. 위에 있는 data 중에서 select tag에 부합하는 모든 음식점 검색
            for(var key in data){
                // console.log(data[key]);
                for(var tag_id in selected_tags){
                    var tag = selected_tags[tag_id];
                    // console.log(data[key]['hash_tags']+" "+tag+" "+data[key]['hash_tags'].includes(tag));
                    if(data[key]['hash_tags'].includes(tag)){
                        randArray[randArray.length] = key;
                        break;
                    }
                }
            }
            console.log(randArray);
            // 2. 선택된 음식점들중 random으로 하나 선택
            var final_place = randArray[Math.floor(Math.random()*randArray.length)];
            // 해당되는 음식점의 tag : 44444 를 리턴하면 됨
            callback(final_place, selected_tags);
        },
        error: function (err) {
            console.log(err);
        }
    });
}

// 이벤트 핸들러
function click_button(selected_tags) {
    // 인자로 선택된 테그들과, 랜덤 선택이 완료되었을때 callback 받을 함수를 지정함
    get_random_place(selected_tags, move_page)
}

// 페이지 이동하는 스크립트
function move_page(place_tag, selected_tags) {
    // 뒤에 인자로 go라는것을 주어서 다음페이지에서 어떤 음식점이 선택됬는지 알 수 있도록 함
    var url =  "detail.html?go="+place_tag+"&tags="+selected_tags.join(",");
    window.location.href = encodeURI(url);
    // console.log(place_tag);
}

$(document).ready(function () {
    $("#find_another_link").click(function () {
       click_button(selected_tags);
    });
});