// 使数据变成3位一个逗号的显示方式
function formatMoney(num) {
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num))
        num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);
    cents = num % 100;
    num = Math.floor(num / 100).toString();
    if (cents < 10)
        cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
        num = num.substring(0, num.length - (4 * i + 3)) + ',' +
            num.substring(num.length - (4 * i + 3));
    return (((sign) ? '' : '-') + num + '.' + cents);
}

//如果selectit的值为selectit 那么将selectAny的值修改为true,
// 然后将结算的按钮的button修改成可点击,并且颜色变成天猫红,
// 如果值补位selectit 那么selectAny的值为false,然后button的值就为不可点击
//颜色是灰色
function syncCreateOrderButton() {
    var selectAny = false;
    $(".cartProductItemIfSelected").each(function () {
        if ("selectit" === $(this).attr("selectit")) {
            selectAny = true;
        }
    });
    var $button = $("button.createOrderButton");
    if (selectAny) {
        $button.css("background-color", "#C40000");
        $button.removeAttr("disabled");
    } else {
        $button.css("background-color", "#AAAAAA");
        $button.attr("disabled", "disabled");
    }
}

//判断所有的selectit是不是都是true,如果不是就为不勾全选,如果是就勾全选
function syncSelect() {
    var selectAll = true;
    $(".cartProductItemIfSelected").each(function () {
        if ("false" === $(this).attr("selectit")) {
            selectAll = false;
        }
    });
    if (selectAll)
        $("img.selectAllItem").attr("src", "https://how2j.cn/tmall/img/site/cartSelected.png");
    else
        $("img.selectAllItem").attr("src", "https://how2j.cn/tmall/img/site/cartNotSelected.png");
}

//将所有的商品总价和商品总数算出来给到总价框和总价数量框
function calcCartSumPriceAndNumber() {
    var sum = 0;
    var totalNumber = 0;
    $("img.cartProductItemIfSelected[selectit='selectit']").each(function () {
        var oiid = $(this).attr("oiid");
        var price = $(".cartProductItemSmallSumPrice[oiid=" + oiid + "]").text();
        price = price.replace(/,/g, "");
        price = price.replace(/￥/g, "");
        sum += new Number(price);
        var num = $(".orderItemNumberSetting[oiid=" + oiid + "]").val();
        totalNumber += new Number(num);
    });
    $("span.cartSumPrice").html("￥" + formatMoney(sum));
    $("span.cartTitlePrice").html("￥" + formatMoney(sum));
    $("span.cartSumNumber").html(totalNumber);
}

//拿到商品的编号,数量,单价,计算出小计总价,更新到小计总价框,并调用总计方法,更新总计框
function syncPrice(pid, num, price) {
    $(".orderItemNumberSetting[pid=" + pid + "]").val(num);
    var cartProductItemSmallSumPrice = formatMoney(num * price);
    $(".cartProductItemSmallSumPrice[pid=" + pid + "]").html("￥" + cartProductItemSmallSumPrice);
    calcCartSumPriceAndNumber();
}

$(function () {
    //点击勾选框事件,拿到selectit的值,
    // 如果等于selectit就修改成为图片为未点击在将selectit值修改成false在将它的父tr框背景修改为白色,
    //如果不等于selectit 就修改成为图片为点击在将selectit值修改成true在将它的父tr框背景修改为微黄色
    $("img.cartProductItemIfSelected").on("click", function () {
        var selectit = $(this).attr("selectit");
        if ("selectit" === selectit) {
            $(this).attr("src", "../../img/site/cartNotSelected.png");
            $(this).attr("selectit", "false");
            $(this).parents("tr.cartProductItemTR").css("background-color", "#fff");
        } else {
            $(this).attr("src", "../../img/site/cartSelected.png");
            $(this).attr("selectit", "selectit");
            $(this).parents("tr.cartProductItemTR").css("background-color", "#FFF8E1");
        }
        syncSelect();
        syncCreateOrderButton();
        calcCartSumPriceAndNumber();
    });
    //点击全选框,如果全选为ture,就将所有商品全部取消勾选,并修改颜色并将selectit的值更新为false
    //如果全选为false,那么久走下面的else将所有的商品全部勾选,并修改背景颜色将selectit的值更新为true
    $("img.selectAllItem").click(function () {
        var selectit = $(this).attr("selectit");
        var $img = $("img.selectAllItem");
        if ("selectit" === selectit) {
            $img.attr("src", "../../img/site/cartNotSelected.png");
            $img.attr("selectit", "false");
            $(".cartProductItemIfSelected").each(function () {
                $(this).attr("src", "../../img/site/cartNotSelected.png");
                $(this).attr("selectit", "false");
                $(this).parents("tr.cartProductItemTR").css("background-color", "#fff");
            });
        } else {
            $img.attr("src", "../../img/site/cartSelected.png");
            $img.attr("selectit", "selectit");
            $(".cartProductItemIfSelected").each(function () {
                $(this).attr("src", "../../img/site/cartSelected.png");
                $(this).attr("selectit", "selectit");
                $(this).parents("tr.cartProductItemTR").css("background-color", "#FFF8E1");
            });
        }
        syncCreateOrderButton();
        calcCartSumPriceAndNumber();
    });
    //点击增加数量的按钮将数量的上限值获取到然后给值一个上线,在调用syncPrice方法去更新总计 小计
    $(".numberPlus").on("click", function () {
        var pid = $(this).attr("pid");
        var stock = $("span.orderItemStock[pid=" + pid + "]").text();
        var price= $("span.orderItemPromotePrice[pid="+pid+"]").text();
        var num = $(".orderItemNumberSetting[pid=" + pid + "]").val();
        num++;
        if (num > stock) {
            num = stock;
        }
        syncPrice(pid,num,price);
    });
    //数量减的按钮,意思同上
    $(".numberMinus").on("click", function () {
        var pid = $(this).attr("pid");
        var stock = $("span.orderItemStock[pid=" + pid + "]").text();
        var price= $("span.orderItemPromotePrice[pid="+pid+"]").text();
        var num = $(".orderItemNumberSetting[pid=" + pid + "]").val();
        num--;
        if (num <= 0) {
            num = 1;
        }
        syncPrice(pid,num,price);
    });
    //数量框的数值的修改,功能如上
    $(".orderItemNumberSetting").on("keyup",function(){
        var pid=$(this).attr("pid");
        var stock= $("span.orderItemStock[pid="+pid+"]").text();
        var price= $("span.orderItemPromotePrice[pid="+pid+"]").text();
        var num= $(".orderItemNumberSetting[pid="+pid+"]").val();
        num = parseInt(num);
        if(isNaN(num))
            num= 1;
        if(num<=0)
            num = 1;
        if(num>stock)
            num = stock;
        syncPrice(pid,num,price);
    });
});