/**
 * Created by codertimo on 2018. 5. 27..
 */


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
        console.log(selected_tags);
    });
});
