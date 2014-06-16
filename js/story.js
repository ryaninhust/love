var index = 0;
var dialog_template = "<div>{0}</div> <div>{1}</div> <div>{2}</div>";

String.prototype.format = String.prototype.f = function() {
    var s = this,
        i = arguments.length;

    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    }
    return s;
};

$(document).ready(function() {
    $(".dialog").click(function() {
        $("img").removeClass("show");
        var dialog = $(this);
        var newNode = dialog.clone(true);
        index += 1;
        var postNode = $('#{0}'.f(index))[0];
        newNode.html(postNode.innerHTML)
        dialog.before(newNode);
        $("." + dialog.attr("class") + ":last").remove();
        $("img").eq(index).addClass("show");
    });
});
