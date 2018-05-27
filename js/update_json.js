$(document).ready(function () {
    // 다음 주소 찾기 라이브러리
    $("#place_address").click(function () {
        new daum.Postcode({
            oncomplete: function (data) {
                // 주소를 다 찾았다면 해당 주소의 주소 스트링 가져옴
                $("#place_address").attr("value", data.jibunAddress);
                console.log(data.jibunAddress);
            }
        }).open();
    });
    // form의 자동 완료 방지
    $(window).keydown(function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            return false;
        }
    });

    // form의 submit시 event handling
    $('#form').submit(function (evt) {
        evt.preventDefault();
        // 전체 정보를 json화 시키는 중임
        var info = {
            "name": $("#place_name").val(),
            "eng_name": $("#place_eng_name").val(),
            "address": $("#place_address").val(),
            "images": [$("#place_image").val()],
            "phone": $("#place_phone").val(),
            "hash_tags": $("#place_tag").val().replace("#", "").split(" "),
            "writer": {
                "name": $("#writer_name").val(),
                "email": $("#writer_email").val()
            },
            "menus": [
                {
                    "name": $("#menu_name_1").val(),
                    "price": $("#menu_price_1").val()
                },
                {
                    "name": $("#menu_name_2").val(),
                    "price": $("#menu_price_2").val()
                },
                {
                    "name": $("#menu_name_3").val(),
                    "price": $("#menu_price_3").val()
                }
            ]
        };

        // 전체 정보를 새로운 json에 할당하기 위해서 기존 json을 로딩함
        $.ajax({
            url: 'https://api.jsonbin.io/b/5b0a87e87a973f4ce578489c',
            type: 'GET',
            headers: { //Required only if you are trying to access a private bin
                'secret-key': "$2a$10$SkSaaKkfgtSNiIXcMXVNdukuLK..PoUusrTVSJEUwnwEEVVcsewWa"
            },
            success: function (data) {
                // 기존 데이터를 불러옴에 성공함
                console.log(data);

                // 기존 데이터 +1 번째에 데이터를 기입함
                data[""+Object.keys(data).length] = info;
                console.log(data);

                // 추가된 json을 다시 저장소에 update하기
                $.ajax({
                    url: 'https://api.jsonbin.io/b/5b0a87e87a973f4ce578489c',
                    type: 'PUT',
                    contentType: 'application/json',
                    // 데이터를 string 으로 export
                    data: JSON.stringify(data),
                    headers: {"secret-key": "$2a$10$SkSaaKkfgtSNiIXcMXVNdukuLK..PoUusrTVSJEUwnwEEVVcsewWa"},
                    success: function (data) {
                        console.log(data);
                        // alert(JSON.stringify(data));
                        // 등록 완료시 alert
                        alert("등록이 완료되었습니다! 감사합니다");
                    },
                    error: function (err) {
                        console.log(err.responseJSON);
                    }
                });
            },
            error: function (err) {
                console.log(err);
            }
        });
    });

});

