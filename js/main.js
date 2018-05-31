var dataset_url = 'https://api.jsonbin.io/b/5b0a87e87a973f4ce578489c/latest';

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

// 이벤트 핸들러들을 등록하기 위해서 window ready checking
$(document).ready(function () {
    // 메뉴가 클릭되었을 때 배경색 변경이 유지되도록
    $(".menu").click(function () {
        if($(this).attr("check")=="true"){
            $(this).attr("check", false);
            $(this).css("background-color", "transparent");
            $(this).css("border-color", "white");
        }
        else{
            $(this).attr("check", true);
            $(this).css("background-color", "#0093FF");
            $(this).css("border-color", "transparent");
        }
    });

    // 다 골랐을때 고른 테그들의 리스트를 모아서 click_button호출
    $("#finish_button").click(function () {
        var selected_tags = [];
        var menus = $(".menu");
        for(var i=0;i<menus.length;i++){
            if(menus.eq(i).attr("check")=="true"){
                selected_tags[selected_tags.length] = menus.eq(i).text();
            }
        }
        click_button(selected_tags);
    });
});

