/**
 * Created by codertimo on 2018. 5. 27..
 */

var dataset_url = "https://raw.githubusercontent.com/codertimo/kookmin-bab/master/data/dataset.json";

function get_random_place(selected_tags, callback) {
    $.getJSON(dataset_url, function (data) {
        // github에서 json을 가져온 결과 = data
        // 즉 모든 음식점 데이터가 data 안에 담겨 있음
        // 예시는 위에 선언된 json과 똑같음

        // tag에 부합하는 음식점태그를 저장하는 배열
        var randArray = [];
        // 1. 위에 있는 data 중에서 select tag에 부합하는 모든 음식점 검색
        for(var key in data){
            console.log(data[key]);
            for(var tag in selected_tags){
                if(tag in data[key]['hash_tags']){
                    randArray[randArray.length] = key;
                    break;
                }
            }
        }
        // 2. 선택된 음식점들중 random으로 하나 선택
        var final_place = randArray[Math.floor(Math.random()*randArray.length)];
        // 해당되는 음식점의 tag : 44444 를 리턴하면 됨
        callback(final_place);
    });
}

function click_button(selected_tags) {
    get_random_place(selected_tags, move_page)
}


function move_page(place_tag) {
    window.location.href = "http://kookmin-bob.github.io/detail.html?go="+place_tag;
    // console.log(place_tag);
}


$(document).ready(function () {
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

