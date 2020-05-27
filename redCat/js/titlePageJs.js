$(function () {
    // 给含有orderstatus的class的a标签添加点击事件,点击之后拿到class=orderStuatus判断
    // orderStuatus等于all就全部显示,否则就全部隐藏之后在显示orderStatus=当前值的订单
    $("a[orderstatus]").on("click",function () {
        var orderStatus = $(this).attr("orderstatus");
        if('all' == orderStatus){
            $("table[orderstatus]").show();
        }else {
            $("table[orderstatus]").hide();
            $("table[orderstatus="+orderStatus+"]").show();
        }
        // 通过修改class属性达到修改css样式的目的
        $("div.orderType div").removeClass("selectedOrderType");
        $(this).parent("div").addClass("selectedOrderType");
    });
});