
//tabbed panels
$(function () {
    $("#tabs").tabs({
        heightStyle: "content",
        collapsible: true,
        hide: "slideUp",
        show: "slideDown"
    });
});

//move Buzzy
$(function () {
    $("#MoveBuzzy").draggable();
});