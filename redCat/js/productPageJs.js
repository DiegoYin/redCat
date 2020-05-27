$(function () {

    //隐藏评价的div
    $("div.productReviewDiv").hide();
    //点击评价div时显示评价div,隐藏详情div
    $("a.productDetailTopReviewLink").click(function () {
        $("div.productReviewDiv").show();
        $("div.productDetailDiv").hide();
    });
    //点击详情div时隐藏评价div,显示详情div
    $("a.productReviewTopPartSelectedLink").click(function () {
        $("div.productReviewDiv").hide();
        $("div.productDetailDiv").show();
    });


    // 拿到商品最大的数量,从后台拿的,这里暂时使用自定义
    var stock = 66;
    $(".productNumberSetting").keyup(function () {
        var num = $(".productNumberSetting").val();
        num = parseInt(num);
        if (isNaN(num)) {
            num = 1;
        }
        if (num <= 0) {
            num = 1;
        }
        if (num > stock) {
            num = stock;
        }
        $(".productNumberSetting").val(num);
    });
    $(".increaseNumber").click(function () {
        var num = $(".productNumberSetting").val();
        num++;
        if (num > stock)
            num = stock;
        $(".productNumberSetting").val(num);
    });
    $(".decreaseNumber").click(function () {
        var num = $(".productNumberSetting").val();
        --num;
        if (num <= 0)
            num = 1;
        $(".productNumberSetting").val(num);
    });


    // 给页面的小图片添加一个鼠标移入事件,
    // 将小图片中的自定义属性bigImageURL取出来赋值给bigImg的src.
    $("img.smallImage").mouseenter(function () {
        var bigImageURL = $(this).attr("bigImageURL");
        $("img.bigImg").attr("src", bigImageURL);
    });
    //这是起到了预加载的效果,将图片提前加载到隐藏的div里面,如果需要直接传值不用去获取
    $("img.bigImg").on("load", function () {
        $("img.smallImage").each(function () {
            var bigImageURL = $(this).attr("bigImageURL");
            img = new Image();
            img.src = bigImageURL;
            img.onload = function () {
                $("div.img4load").append($(img));
            };
        });
    });
    //放大镜的js
    $("div.cursor").on("mousemove", function (event) {
        var move = window.event || event;
        var move_left = move.offsetX;
        var move_top = move.offsetY;
        var box_left = move_left - 100;
        var box_top = move_top - 100;

        box_left = box_left < 0 ? 0 : box_left;
        box_left = box_left > 200 ? 200 : box_left;
        box_top = box_top < 0 ? 0 : box_top;
        box_top = box_top > 200 ? 200 : box_top;
        var magnifyingImg_left = box_left * -2;
        var magnifyingImg_top = box_top * -2;
        var box = $("div.box");
        var magnifyingImg = $("img.magnifyingImg");
        box.css("left",box_left);
        box.css("top",box_top);
        magnifyingImg.css("left",magnifyingImg_left);
        magnifyingImg.css("top",magnifyingImg_top);
    });
    $("img.smallImage").mouseenter(function () {
        var bigImageURL = $(this).attr("bigImageURL");
        $("img.magnifyingImg").attr("src", bigImageURL);
    });
    $("div.cursor").on("mouseover",function () {
        $("div.box").show();
        $("div.magnifyingScope").show();
    });
    $("div.cursor").on("mouseout",function () {
        $("div.box").hide();
        $("div.magnifyingScope").hide();
    });
});