
/*
创建时间：2017.05.04
项目描述：反平时用到的一些小程序整理出来。方便日后在其他项目中使用。

修改时间：2017.05.04
修改内容：使用暴力的方法添加投影、引入脚本

修改时间：2017.05.05
修改内容：使用ajax方法加载html
*/

(function($) {
	
	// 使用暴力的方法添加投影
	$.fn.powerShadow = function ( opts ) {
		var options = $.extend( {}, $.fn.powerShadow.defaults, opts );
		return this.each( function () {
			var element = $(this);
			var originX, originY,
				zE = 0,
				leftE = 0,
				rightE = 0,
				topE = 0,
				bottomE = 0;
			if ( element.css('right') == 'auto' ) {
				originX = element.css('left');
				leftE = 1;
				rightE = 0;
			}
			if ( element.css('left') == 'auto' ) {
				originX = element.css('right');
				leftE = 0;
				rightE = 1;
			}
			if ( element.css('bottom') == 'auto' ) {
				// console.log('top');
				originY = element.css('top');
				// console.log(originY);
				topE = 1;
				bottomE = 0;
			}
			if ( element.css('top') == 'auto' ) {
				// console.log('bottom');
				originY = element.css('bottom');
				// console.log(originY);
				topE = 0;
				bottomE = 1;
			}
			if ( element.css('z-index') ) {//在非0时和存在时
				zE = element.css('z-index');
			}
			for ( var i = 0; i < options.times; i++ ) {
				var elementC = element.clone();
				elementC.css({
					'position': 'absolute'
				});
				if ( topE && !bottomE ) {
					console.log("top为真");
					elementC.css({
						'top': parseInt(originY) + options.dissY * i + 'px'
					})
				} else {
					console.log("top为假");
					elementC.css({
						'bottom': parseInt(originY) + options.dissY * i + 'px'
					})
				}
				if ( leftE && !rightE ) {
					elementC.css({
						'left': parseInt(originX) + options.dissX * i + 'px'
					})
				} else {
					elementC.css({
						'right': parseInt(originX) + options.dissX * i + 'px'
					})
				}
				if ( zE ) {
					elementC.css({
						'z-index': options.times - i
					});
				} else {
					elementC.css({
						'z-index': - i
					});
				}
				elementC.css({
					'opacity': options.blur - options.dissBlur * i
				})
				elementC.insertAfter(element);
			}
		})
	};
	$.fn.powerShadow.defaults = {
		// object: null,
		dissX: 1,
		dissY: 1, 
		times: 5, 
		blur: 0.5,
		dissBlur: 0.1, 
		color: '#dd3300',
		// object 需要添加投影的元素
		// originX, originY object的位置
		// dissX, dissY 每个投影之间的距离。 以下为正，以右为正。
		// dissBlur 每个投影之间不透明度差值
		// color 投影的颜色
	};
	// object的祖先元素中必须有定位是relative的元素

	// 引入脚本
	// 使用DOM1级的方法编写。
	// 方法只能以内联脚本的形式使用
	function loadScript	( url ) {
		var script = document.createElement( "script" );
		script.type = "text/javascript";
		script.src = url;
		document.body.appendChild( script );
	}

})(jQuery)
