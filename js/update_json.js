/**
 * Created by codertimo on 2018. 5. 27..
 */


$(document).ready(function () {
    $("#place_address").click(function () {
        new daum.Postcode({
            oncomplete: function (data) {
                $("#place_address").attr("value", data.jibunAddress);
                console.log(data.jibunAddress);
            }
        }).open();
    });
    $(window).keydown(function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            return false;
        }
    });

    $('#form').submit(function (evt) {
        evt.preventDefault();
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

        $.ajax({
            url: 'https://api.jsonbin.io/b/5b0a87e87a973f4ce578489c',
            type: 'GET',
            headers: { //Required only if you are trying to access a private bin
                'secret-key': "$2a$10$SkSaaKkfgtSNiIXcMXVNdukuLK..PoUusrTVSJEUwnwEEVVcsewWa"
            },
            success: function (data) {
                console.log(data);
                data[""+Object.keys(data).length] = info;
                console.log(data);

                $.ajax({
                    url: 'https://api.jsonbin.io/b/5b0a87e87a973f4ce578489c',
                    type: 'PUT',
                    contentType: 'application/json',
                    data: JSON.stringify(data),
                    headers: {"secret-key": "$2a$10$SkSaaKkfgtSNiIXcMXVNdukuLK..PoUusrTVSJEUwnwEEVVcsewWa"},
                    success: function (data) {
                        console.log(data);
                        // alert(JSON.stringify(data));
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

