//存放主要交互逻辑的js代码
// javascript 模块化(package.类.方法)

var seckill = {

    //封装秒杀相关ajax的url
    URL: {
        //返回系统时间
        now: function () {
            return '/seckill/time/now';
        },
        //暴露秒杀链接
        exposer: function (seckillId) {
            return '/seckill/' + seckillId + '/exposer';
        },
        //执行秒杀操作
        execution: function (seckillId, md5) {
            return '/seckill/' + seckillId + '/' + md5 + '/execution';
        }
    },

    //进入详情页面之前需要先验证手机号
    validatePhone: function (phone) {
        if (phone && phone.length == 11 && !isNaN(phone)) {
            return true;//直接判断对象会看对象是否为空,空就是undefine就是false; isNaN 非数字返回true
        } else {
            return false;
        }
    },

    //详情页秒杀逻辑
    detail: {
        //详情页初始化：①秒杀未开始进入倒计时 OR ②秒杀开启并暴露秒杀地址 OR ③秒杀结束
        init: function (params) {

            //先手机验证和登录,计时交互
            //在浏览器的cookie中查找手机号，如果删除本地的cookie那么需要重新输入手机号
            var killPhone = $.cookie('killPhone');
            //验证手机号
            if (!seckill.validatePhone(killPhone)) {
                //绑定手机 控制输出
                var killPhoneModal = $('#killPhoneModal');
                killPhoneModal.modal({
                    show: true,//显示弹出层
                    backdrop: 'static',//禁止位置关闭
                    keyboard: false//关闭键盘事件
                });

                //输入电话之后，click事件的处理过程
                $('#killPhoneBtn').click(function () {
                    var inputPhone = $('#killPhoneKey').val();
                    console.log("inputPhone: " + inputPhone);
                    if (seckill.validatePhone(inputPhone)) {
                        //电话写入cookie(7天过期)
                        $.cookie('killPhone', inputPhone, {expires: 7, path: '/seckill'});
                        //验证通过　　刷新页面
                        window.location.reload();
                    } else {
                        //todo 错误文案信息抽取到前端字典里
                        $('#killPhoneMessage').hide().html('<label class="label label-danger">手机号错误!</label>').show(300);
                    }
                });
            }

            //已经登录
            //计时交互
            var startTime = params['startTime'];
            var endTime = params['endTime'];
            var seckillId = params['seckillId'];

            //jquery get方法从服务器加载数据: $.get(URL,data,function(data,status,xhr),dataType)
            //data下面对应的{}表示，请求发送给服务器的数据
            //function中的data，也就是下面的result表示从服务器方返回的结果数据
            $.get(seckill.URL.now(), {}, function (result) {
                //请求成功
                if (result && result['success']) {
                    var nowTime = result['data'];//获得系统时间
                    //解决计时误差
                    var userNowTime = new Date().getTime();
                    console.log('nowTime:' + nowTime);
                    console.log('userNowTime:' + userNowTime);

                    //计算用户时间和系统时间的差，忽略中间网络传输的时间（本机测试大约为50-150毫秒）
                    var deviationTime = userNowTime - nowTime;
                    console.log('deviationTime:' + deviationTime);
                    //考虑到用户时间可能和服务器时间不一致，开始秒杀时间需要加上时间差
                    startTime = startTime + deviationTime;
                    //
                    //时间判断 计时交互
                    seckill.countDown(seckillId, nowTime, startTime, endTime);
                }
                //请求失败，并输入日志
                else {
                    console.log('result: ' + result);
                    alert('result: ' + result);
                }
            });
        }
    },

    //计时交互，显示秒杀结束/秒杀未开始/暴露秒杀地址
    countDown: function (seckillId, nowTime, startTime, endTime) {
        console.log(seckillId + '_' + nowTime + '_' + startTime + '_' + endTime);
        var seckillBox = $('#seckill-box');
        if (nowTime > endTime) {
            //秒杀结束
            seckillBox.html('秒杀结束!');
        } else if (nowTime < startTime) {
            //秒杀未开始,计时事件绑定
            var killTime = new Date(startTime);//todo 防止时间偏移
            //调用jQuery countdown函数，并监听倒计时结束事件
            seckillBox.countdown(killTime, function (event) {
                //时间格式
                var format = event.strftime('秒杀倒计时: %D天 %H时 %M分 %S秒 ');
                seckillBox.html(format);

            }).on('finish.countdown', function () {
                //时间完成后回调事件 .on('finish.countdown',function(){})是固定写法
                //获取秒杀地址,控制现实逻辑,执行秒杀
                console.log('______fininsh.countdown');
                seckill.handlerSeckill(seckillId, seckillBox);
            });
        } else {
            //秒杀开始
            seckill.handlerSeckill(seckillId, seckillBox);
        }
    },

    //暴露秒杀地址
    handlerSeckill: function (seckillId, node) {
        //获取秒杀地址,控制显示器,执行秒杀

        //隐藏seckillBox之前的内容，设置新的内容也即html中的内容
        node.hide().html('<button class="btn btn-primary btn-lg" id="killBtn">开始秒杀</button>');

        //第一次post请求用来请求秒杀地址
        $.post(seckill.URL.exposer(seckillId), {}, function (result) {
            //在回调函数种执行交互流程
            if (result && result['success']) {
                var exposer = result['data'];
                if (exposer['exposed']) {
                    //开启秒杀
                    //获取秒杀地址
                    var md5 = exposer['md5'];
                    var killUrl = seckill.URL.execution(seckillId, md5);
                    console.log("killUrl: " + killUrl);
                    //绑定一次点击事件
                    $('#killBtn').one('click', function () {
                        //执行秒杀请求
                        //1.先禁用按钮
                        $(this).addClass('disabled');//,<-$(this)===('#killBtn')->
                        //2.发送秒杀请求执行秒杀
                        $.post(killUrl, {}, function (result) {
                            if (result && result['success']) {
                                var killResult = result['data'];
                                var state = killResult['state'];
                                var stateInfo = killResult['stateInfo'];
                                //显示秒杀结果
                                node.html('<span class="label label-success">' + stateInfo + '</span>');
                            }
                        });
                    });
                    node.show();
                } else {
                    //未开启秒杀(由于浏览器计时偏差，以为时间到了，结果时间并没到，需要重新计时)
                    var now = exposer['now'];
                    var start = exposer['start'];
                    var end = exposer['end'];
                    var userNowTime = new Date().getTime();
                    var deviationTime = userNowTime - nowTime;
                    start = start + deviationTime;
                    seckill.countDown(seckillId, now, start, end);
                }
            } else {
                console.log('result: ' + result);
            }
        });
    }
}
