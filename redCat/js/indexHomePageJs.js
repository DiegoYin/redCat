//显示产品列表的函数
function showProductsAsideCategorys(cid) {
    $("div.eachCategory[cid=" + cid + "]").css("background-color", "white");
    $("div.eachCategory[cid=" + cid + "] a").css("color", "#87CEFA");
    $("div.productsAsideCategorys[cid=" + cid + "]").show();
}

//隐藏产品列表的函数
function hideProductsAsideCategorys(cid) {
    $("div.eachCategory[cid=" + cid + "]").css("background-color", "#e2e2e3");
    $("div.eachCategory[cid=" + cid + "] a").css("color", "#000");
    $("div.productsAsideCategorys[cid=" + cid + "]").hide();
}



$(function () {
    //catear 猫耳朵的出现和消失
    $("div.rightMenu span").mouseenter(function () {
        //拿到鼠标移入的那个span的left和top以及它本身的width
        var left = $(this).position().left;
        var top = $(this).position().top;
        var width = $(this).css("width");
        //鼠标移入的那个span的left在加上他本身宽度的一半就是catear出现的位置的left
        var destLeft = parseInt(left) + parseInt(width) / 2;
        $("img#catear").css("left", destLeft);
        //鼠标移入的那个span的top在减去catear的本身高度(20px)就是它的top
        $("img#catear").css("top", top - 20);
        // 在半秒内淡入猫耳朵图片
        $("img#catear").fadeIn(500);
    });
    $("div.rightMenu span").mouseleave(function () {
        $("img#catear").hide();
    })
    //-------------------------------------------------------------------
    //产品分类的出现和消失

    //鼠标移入时显示对应的产品列表
    $("div.eachCategory").mouseenter(function () {
        var cid = $(this).attr("cid");
        showProductsAsideCategorys(cid);
    });
    //鼠标移出时隐藏对应的产品列表
    $("div.eachCategory").mouseleave(function () {
        var cid = $(this).attr("cid");
        hideProductsAsideCategorys(cid);
    });
    //当鼠标移入产品列表的时候，显示对应的产品列表
    $("div.productsAsideCategorys").mouseenter(function () {
        var cid = $(this).attr("cid");
        showProductsAsideCategorys(cid);
    });
    //当鼠标移出产品列表的时候，隐藏对应的产品列表
    $("div.productsAsideCategorys").mouseleave(function () {
        var cid = $(this).attr("cid");
        hideProductsAsideCategorys(cid);
    });
    //产品里面随机一些a标签的颜色变成天蓝色

    //获取随机数为div.productsAsideCategorys div.row下的某些a标签添加颜色
    $(function () {
        $("div.productsAsideCategorys div.row a").each(function () {
            var v = Math.round(Math.random() * 6);
            if (v == 1)
                $(this).css("color", "#87CEFA");
        });
    });
    //-------------------------------------------------------------------
});

