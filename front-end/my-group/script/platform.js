$(function () {
    $(".menu-link").click(function () {
        $(".menu-link").removeClass("is-active");
        $(this).addClass("notify");
        $(this).addClass("is-active");
        $(this).addClass("notify");
    });
});

$(".search-bar input")
    .focus(function () {
        $(".header").addClass("wide");
    })
    .blur(function () {
        $(".header").removeClass("wide");
    });