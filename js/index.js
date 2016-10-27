var app = angular.module('apple', []);
//左边li
app.directive('colorLi', function () {
    return {
        restrict: 'AE',
        transclude: true,
        replace: true,
        template: '<ul class="list-content "><div ng-transclude></div></ul>',
        link: function (scope, el) {
            $(el).on('click', 'li', function () {
                $(this).parent().find('.sc-outline').removeClass('backcolor');
                $(this).addClass('backcolor');
                //删除
                $(document).on('keyup', function (e) {
                    var id = parseInt($('.backcolor').attr('data-id'))
                    if (e.keyCode === 46) {
                        scope.$apply(function () {
                            scope.shuju = scope.shuju.filter(function (v, i) {
                                return v.id != id;
                            })
                        })
                    }
                })
            });
            $(el).on('mousdown', 'li', false);
            $(el).on('dblclick', 'li', function () {
                $(this).find('.sc-outline').removeClass('active');
                $(this).addClass('active');
                var $input = $(this).find('input');
                $input.val($(this).find('label').text());
                $input.focus()
            })
        }
    }
});
//选项框
app.directive('tiShi', function () {
    return {
        restrict: 'AE',
        transclude: true,
        replace: true,
        template: '<div class="tishi"><div ng-transclude></div></div>',
        link: function (scope, el) {
            $(el).on('click',false);
            $(el).on('click','li',function(){
                $(this).parent().find('li').removeClass('active');
                $(this).addClass('active');
            })
            $(el).find('.content .del').on('click',function(){
                scope.$apply(function(){
                    scope.shuju=scope.shuju.filter(function(v,i){
                        if(v.id==1){
                            alert('不能删除第一条')
                            return false ;
                        }else{
                            alert(2);
                            return v.id!=scope.curent.id
                        }
                    })
                    scope.curent=scope.shuju[0];
                })

            })
        }
    }
});
//已完成
app.directive('comPalted',function(){
    return {
        restrict: 'AE',
        transclude: true,
        replace: true,
        template: '<div><div ng-transclude></div></div>',
        link:function(scope,el){
            $(el).find('.ok .img').on('click',function(){
                $(this).toggleClass('block');
                 $(el).find('.outline').toggleClass('block');
            })
            $(el).find('.outline').on('click','li',function(){
                $(this).parent().find('li').removeClass('bg');
                $(this).addClass('bg')
            })
            $(el).find('.clear').on('click',function(){
                scope.$apply(function(){
                    scope.curent.todos = scope.curent.todos.filter(function (v, i) {
                        return v.status=0;
                    })
                })

            })
        }
    }
});
//myadd 右边添加
app.directive('myAdd',function(){
    return{
        restrict: 'AE',
        transclude: true,
        replace: true,
        template: '<div><div ng-transclude></div></div>',
        link:function(scope,el){
            $(el).find('.newobj').on('keyup',function(e){
                if (e.keyCode == 13) {
                    var min = -Infinity;
                    scope.curent.todos.forEach(function (v, i) {
                        if (min < v.id) {
                            min = v.id;
                        }
                    })
                    scope.title = $(this).val();
                    var th=scope.backcolor[min%7];
                    var item = {
                        id: min+1,
                        title: scope.title,
                        status: 0,
                        theme: th
                    };
                    scope.$apply(function(){
                        scope.curent.todos.push(item);

                    })
                    $(this).val('')
                    $(el).removeClass('none');

                }
            })
            $(el).find('.newobj').blur(function(){
                $(el).removeClass('none');
            })
            $(el).find('#cli').on('click',false);
            $(el).find('#cli').on('click',function(){
                $(el).find('.active').removeClass('none');
                $(el).find('.newobj').focus();
                $(el).find('.newobj').on('blur',function(){
                    if($(this).val().length==0){
                        $(el).find('.active').addClass('none');
                    }
                })
            })
        }
    }
})
app.controller('todo', ['$scope', function ($scope) {
    //左边小圆点的类
    $scope.colors = ['conlor1', 'conlor2', 'conlor3', 'conlor4', 'conlor5', 'conlor6', 'conlor7'];
    //right li 背景
    $scope.liback = ['color1 ','color2 ','color3 ','color4 ', 'color5 ','color6 ','color7 '];
    //font-color
    $scope.backcolor = ['color1', 'color2', 'color3', 'color4', 'color5', 'color6', 'color7'];
    //li 框
    $scope.likuang=['liback1','liback2','liback3','liback4','liback5','liback6','liback7'];
    $scope.shuju = [ {
            id: 1, title: '新列表1', color: 'conlor1', theme: 'color1',likuang:'liback1',
            todos: [
                {id: 1, title: '购物', status: 1, theme: 'color1'}
            ]
        }, {
        id: 2, title: '新列表2', color: 'conlor2', theme: 'color2',likuang:'liback2',
        todos: [
            {id: 2, title: '购物', status: 1, theme: 'color2'}
        ]
    }, {
        id: 3, title: '新列表3', color: 'conlor3', theme: 'color3',likuang:'liback3',
        todos: [
            {id: 3, title: '购物', status: 1, theme: 'color3'}
        ]
    }, {
        id: 4, title: '新列表4', color: 'conlor4', theme: 'color4',likuang:'liback4',
        todos: [
            {id: 4, title: '购物', status: 1, theme: 'color4'}
        ]
    },{
        id: 5, title: '新列表5', color: 'conlor5', theme: 'color5',likuang:'liback5',
        todos: [
            {id: 5, title: '购物', status: 0, theme: 'color5'}
        ]
    }
    ];
    //左边添加
    $scope.add = function () {
        var min = -Infinity;
        var id = $scope.shuju.forEach(function (v, i) {
            if (min < v.id) {
                min = v.id;
            }
        })
        var c = $scope.colors[min % 7];
        var d = $scope.backcolor[min % 7];
        var thum = {id: min + 1, title: '新列表' + ($scope.shuju.length + 1), color: c, theme: d, todos: []}
        $scope.shuju.push(thum);
    }
    //右侧数据
    $scope.curent = $scope.shuju[0];
    $scope.setcurent = function (v) {
        $scope.curent = v;
    }
    $scope.olddel = function (id) {
        $scope.curent.todos = $scope.curent.todos.filter(function (v, i) {
            return v.id != id;
        })
    }
    $scope.option = function () {
        $('.button-viw').on('click', false)
        $('.right-middle .tishi').show();

        $('.right-middle .quxiao').on('click', function () {
            $('.right-middle .tishi').hide();
        })
        $(document).on('click', function () {
            $('.right-middle .tishi').hide();
        })
    }
    $scope.setinput = function (i) {
        $scope.curent.theme=$scope.backcolor[i];
        $scope.curent.color=$scope.colors[i];
    }
    //已完成的数量求和
    $scope.mum=function(){
        var b=$scope.curent.todos.filter(function(v,i){
               return v.status==1;
        })
        return b.length
    }
}]);