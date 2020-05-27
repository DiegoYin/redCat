$(function () {
    //非数值或数值小于等于0处理方式
    $("input.sortBarPrice").keyup(function () {
        var price = $(this).val();
        price =parseInt(price);
        if(isNaN(price)||price<0){
            $(this).val("");
        }
        var beginPrice = $("input.beginPrice").val();
        var endPrice = $("input.endPrice").val();
        var $productUnit = $("div.productUnit");
        $productUnit.hide();
        if(beginPrice.length === 0){
            beginPrice = "0";
        }
        if(endPrice.length === 0){
            endPrice = "9999999";
        }
        beginPrice =parseInt(beginPrice);
        endPrice =parseInt(endPrice);
        $productUnit.each(function () {
            var price =$(this).attr("price");
            if(price >=beginPrice && price <= endPrice){
                $(this).show();
            }
        })
    });

});