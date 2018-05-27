/**
 * Created by codertimo on 2018. 5. 27..
 */

var dataset_url = 'https://api.jsonbin.io/b/5b0a87e87a973f4ce578489c/latest';

function get_random_place(selected_tags, callback) {

    $.ajax({
        url: dataset_url,
        type: 'GET',
        headers: { //Required only if you are trying to access a private bin
            'secret-key': "$2a$10$SkSaaKkfgtSNiIXcMXVNdukuLK..PoUusrTVSJEUwnwEEVVcsewWa"
        },
        success: function (data) {
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
        },
        error: function (err) {
            console.log(err);
        }
    });
}

function click_button(selected_tags) {
    get_random_place(selected_tags, move_page)
}


function move_page(place_tag) {
    window.location.href = "detail.html?go="+place_tag;
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

