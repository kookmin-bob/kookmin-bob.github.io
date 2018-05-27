/**
 * Created by codertimo on 2018. 5. 27..
 */
var dataset_url = "https://raw.githubusercontent.com/codertimo/kookmin-bab/master/data/dataset.json";

var example_data = {
    "44444": {
        "name": "길음역\n맥도날드",
        "eng_name": "Macdonald Gileum Station",
        "address": "서울특별시 강북구 상암로 158",
        "description": "길음역에 있는 맥도날드는 국민대 학생들에게 사랑받는 최고의 음식점으로 자리잡고 있다. (운영시간 8시-22시)",
        "hash_tags": ["햄버거", "아이스크림", "배달가능"],
        "images": [""],
        "phone": "031-973-4721",
        "menus": [
            {
                "name": "빅맥세트",
                "price": 7500
            },
            {
                "name": "상하이 스파이스 치킨버거",
                "price": 5000
            },
            {
                "name": "오레오 맥플러리",
                "price": 2500
            }
        ]
    }
};



function get_random_place(selected_tags, callback) {
    $.getJSON(dataset_url, function (data) {
        // github에서 json을 가져온 결과 = data
        // 즉 모든 음식점 데이터가 data 안에 담겨 있음
        // 예시는 위에 선언된 json과 똑같음
        console.log(data);

        // tag에 부합하는 음식점태그를 저장하는 배열
        var randArray = [];
        // 1. 위에 있는 data 중에서 select tag에 부합하는 모든 음식점 검색
        while(!data){
            if(selected_tags in data['hash_tags']){
                randArray[randArray.length] = Object.keys(data);
            }
        }
        // 2. 선택된 음식점들중 random으로 하나 선택
        var final_place = randArray[Math.random()*randArray.length];

        // 해당되는 음식점의 tag : 44444 를 리턴하면 됨
        callback(final_place);
    });
}



function click_button(selected_tags) {
    get_random_place(selected_tags, move_page)
}


function move_page(place_tag) {
    console.log("move place to "+place_tag);
}

var selected_tags = ["밥", "배달안됨"];
click_button(selected_tags);
