$(function () {
    $(".menu-link").click(function () {
        $(".menu-link").removeClass("is-active");
        $(this).removeClass("notify");
        $(this).addClass("is-active");
        $(this).addClass("notify");

        $(".my-script").addClass("invisible");
        let thisClass = $(this).attr('id');
        thisClass = thisClass.substr(2, thisClass.length);
        $("." + thisClass).removeClass("invisible");
    });
});

$(".search-bar input")
    .focus(function () {
        $(".header").addClass("wide");
    })
    .blur(function () {
        $(".header").removeClass("wide");
    });