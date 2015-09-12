'use strict';
var $ = jQuery,
		isTouchDevice = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|Windows Phone)/);

$(window).load(function() {
  $('img:not(".logo-img")').each(function() {
		if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)){
			var ieversion=new Number(RegExp.$1);
			if (ieversion>=9)
				if (typeof this.naturalWidth === "undefined" || this.naturalWidth === 0)
					this.src = "http://placehold.it/" + ($(this).attr('width') || this.width || $(this).naturalWidth()) + "x" + (this.naturalHeight || $(this).attr('height') || $(this).height());
		} else {
			if (!this.complete || typeof this.naturalWidth === "undefined" || this.naturalWidth === 0)
				this.src = "http://placehold.it/" + ($(this).attr('width') || this.width) + "x" + ($(this).attr('height') || $(this).height());
		}
  });
});

//Calculating The Browser Scrollbar Width
var parent, child, scrollWidth, bodyWidth;

if (scrollWidth === undefined) {
  parent      = $('<div style="width: 50px; height: 50px; overflow: auto"><div/></div>').appendTo('body');
  child       = parent.children();
  scrollWidth = child.innerWidth() - child.height(99).innerWidth();
  parent.remove();
}

//Form Stylization
function formStylization() {
  var radio    = 'input[type="radio"]',
			checkbox = 'input[type="checkbox"]';
  
  $(radio).wrap('<div class="new-radio"></div>');
  $('.new-radio').append('<span></span>');
  $(checkbox).wrap('<div class="new-checkbox"></div>');
  $('.new-checkbox').append('<svg x="0" y="0" width="15px" height="15px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve"><polygon fill="#1e1e1e" points="9.298,13.391 4.18,9.237 3,10.079 9.297,17 17.999,4.678 16.324,3 "/></svg>');
  $(checkbox + ':checked').parent('.new-checkbox').addClass('checked');
  $(radio + ':checked').parent('.new-radio').addClass('checked');
  $(checkbox + ':disabled').parent().addClass('disabled');
  $(radio + ':disabled').parent().addClass('disabled');
  
  $('html').on('click', function(){
		$(radio).parent('.new-radio').removeClass('checked');
		$(radio + ':checked').parent('.new-radio').addClass('checked');
		$(checkbox).parent('.new-checkbox').removeClass('checked');
		$(checkbox + ':checked').parent('.new-checkbox').addClass('checked');
		$(radio).parent().removeClass('disabled');
		$(checkbox).parent().removeClass('disabled');
		$(radio + ':disabled').parent().addClass('disabled');
		$(checkbox + ':disabled').parent().addClass('disabled');
  });
  
  if($.fn.selectBox) {
		$('select:not(".without-styles")').selectBox();
  }
}

//Full Width Box
function fullWidthBox() {
  if ($('.full-width-box.auto-width').length) {
		var windowWidth    = $('body').outerWidth(),
				containerWidth = $('.header .container').width();
			
		$('.full-width-box.auto-width').each(function() {
			$(this)
				.css({
					left  : ( containerWidth - windowWidth) / 2,
					width : windowWidth
				})
				.addClass('loaded');
		});
  }
}

function loadingButton() {
  var loading = function(){
		if ($('.ladda-button.progress-button').length) {
			Ladda.bind('.ladda-button:not(.progress-button)', {
				timeout: 2000
			});
			
			Ladda.bind('.ladda-button.progress-button', {
				callback: function(instance) {
					var interval,
							progress = 0;
					
					return interval = setInterval(function() {
						progress = Math.min(progress + Math.random() * 0.1, 1);
						instance.setProgress(progress);
						if (progress === 1) {
							instance.stop();
							return clearInterval(interval);
						}
					}, 200);
				}
			});
		}
  }
  
  if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)){
		var ieversion = new Number(RegExp.$1);
		
		if (ieversion >= 9)
			loading();
  } else {
		loading();
  }
}

//Header Fixed
function headerCustomizer() {
  var body         = $('body'),
			topHeight    = 0,
			headerHeight = 0,
			scroll       = 0,
			fixedH       = $('.fixed-header');
  
  if ($('#top-box').length) {
		topHeight = $('#top-box').outerHeight();
  }
	
  headerHeight = $('.header').outerHeight();
  
  if (!isTouchDevice) {
		scroll = topHeight;
		
		if (body.hasClass('hidden-top')) {
			scroll = 8;
		}
		
		if (body.hasClass('padding-top')) {
			scroll = topHeight + 420;
		} else if (body.hasClass('boxed')) {
			scroll = topHeight + 20;
			if (body.hasClass('fixed-header') && body.hasClass('fixed-top')) {
				scroll = 20;
			}
		}
		
		$(window).scroll(function(){
			var $this = $(this);
			
			if (body.hasClass('fixed-header')) {
				if ($this.scrollTop() >= scroll)
					body.addClass('fixed');
				else
					body.removeClass('fixed');
			}
			
			if ($this.scrollTop() >= headerHeight)
				fixedH.addClass('background-opacity');
			else
				fixedH.removeClass('background-opacity');
		});
		
		$('.hidden-top .header, .hidden-top #top-box').not('.boxed .header, .boxed #top-box').hover(function(){
			$('.hidden-top').addClass('visible-top');
		}, function(){
			$('.hidden-top').removeClass('visible-top');
		});
		
		$(window).scroll(function(){
			var $this = $(this);
			
			if ((body.hasClass('visible-top')) && ($this.scrollTop() > 0))
				body.removeClass('visible-top');
		});
  }
  
  $(window).scroll(function(){
    if ($(this).scrollTop() >= topHeight + headerHeight)
			$('.top-fixed-box').addClass('fixed');
		else
			$('.top-fixed-box').removeClass('fixed');
  });
}

//Header Menu
function menu() {
  var body    = $('body'),
			primary = '.primary';
  
  $(primary).find('.parent > a .open-sub, .megamenu .title .open-sub').remove();
  
  if ((body.width() + scrollWidth) < 992 || $('.header').hasClass('minimized-menu'))
		$(primary).find('.parent > a, .megamenu .title').append('<span class="open-sub"><span></span><span></span></span>');
  else
		$(primary).find('ul').removeAttr('style').find('li').removeClass('active');
  
  $(primary).find('.open-sub').click(function(e){
		e.preventDefault();
		
		var item = $(this).closest('li, .box');
		
		if ($(item).hasClass('active')) {
			$(item).children().last().slideUp(600);
			$(item).removeClass('active');
		} else {
			var li = $(this).closest('li, .box').parent('ul, .sub-list').children('li, .box');
			
			if ($(li).is('.active')) {
				$(li).removeClass('active').children('ul').slideUp(600);
			}
			
			$(item).children().last().slideDown(600);
			$(item).addClass('active');
			
			if (body.width() + scrollWidth > 991) {
				var maxHeight = body.height() - ($(primary).find('.navbar-nav')).offset().top - 20;
				
				$(primary).find('.navbar-nav').css({
					maxHeight : maxHeight,
					overflow  : 'auto'
				});
			}
		}
  });

  $(primary).find('.parent > a').click(function(e){
		if (((body.width() + scrollWidth) > 991) &&  (isTouchDevice)) {
			var $this = $(this);
			
			if ($this.parent().hasClass('open')) {
				$this.parent().removeClass('open')
			} else {
				e.preventDefault();
				
				$this.parent().addClass('open')
			}
		}
  });

  body.on('click', function(e) {
		if (!$(e.target).is(primary + ' *')) {
			if ($(primary + ' .collapse').hasClass('in')) {
				$(primary + ' .navbar-toggle').addClass('collapsed');
				$(primary + ' .navbar-collapse').collapse('hide');
			}
		}
  });
  
  
  
  /* Top Menu */
  var topMenu = $('.top-navbar').find('.collapse');

  if ((body.width() + scrollWidth) < 992)
		topMenu.css('width', body.find('#top-box .container').width());
	else
		topMenu.css('width', 'auto');
}

//Modal Window
function centerModal() {
  $(this).css('display', 'block');
  
  var dialog = $(this).find('.modal-dialog'),
	    offset = ($(window).height() - dialog.height()) / 2;
	  
  if (offset < 10)
		offset = 10;
	
  dialog.css('margin-top', offset);
}

//Footer structure (max-width < 768)
function footerStructure() {
  var footer = $('#footer .footer-bottom');
  
  if (($('body').width() + scrollWidth) < 768) {
		if (!footer.find('.new-copyright').length) {
			footer.find('.address').after('<div class="new-copyright"></div>');
			footer.find('.copyright').appendTo('#footer .footer-bottom .new-copyright');
		}
  } else {
		if (footer.find('.new-copyright').length) {
			footer.find('.copyright').prependTo('#footer .footer-bottom .row');
			footer.find('.new-copyright').remove();
		}
  }
}

//Full Height Pages
function fullHeightPages() {
	var full = $('.full-height');
	
	full.removeClass('scroll');
	
	if (full.height() < $('.page-box').outerHeight()) {
		full.addClass('scroll');
	} else {
		full.removeClass('scroll');
	}
}

$(document).ready(function(){
  //Replace img > IE8
  if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)){
		var ieversion = new Number(RegExp.$1);
		
		if (ieversion < 9) {
			$('img[src*="svg"]').attr('src', function() {
				return $(this).attr('src').replace('.svg', '.png');
			});
		}
  }
  
  //IE 
  if (/MSIE (\d+\.\d+);/.test(navigator.userAgent))
		$('html').addClass('ie');

  //Touch device
  if( isTouchDevice )
		$('body').addClass('touch-device');

  //Bootstrap Elements
  $('[data-toggle="tooltip"], .tooltip-link').tooltip();
  
  $("a[data-toggle=popover]")
		.popover()
		.click(function(e) {
			e.preventDefault();
		});
  
  $('.btn-loading').click(function () {
    var btn = $(this);
	
    btn.button('loading');
	
    setTimeout(function () {
      btn.button('reset')
    }, 3000);
  });
  
  $('.disabled, fieldset[disabled] .selectBox').click(function () {
    return false;
  });

  $('.modal-center').on('show.bs.modal', centerModal);
  
	//Functions
  fullWidthBox();
  menu();
  footerStructure();
  headerCustomizer();
  formStylization();
  loadingButton();
  //Bootstrap Validator
  if($.fn.bootstrapValidator) {
		$('.form-validator').bootstrapValidator({
			excluded: [':disabled', ':hidden', ':not(:visible)'],
			feedbackIcons: {
				valid: 'glyphicon glyphicon-ok',
				invalid: 'glyphicon glyphicon-remove',
				validating: 'glyphicon glyphicon-refresh'
			},
			message: 'This value is not valid',
			trigger: null
		});
  }
  
  //Bootstrap Datepicker
  if($.fn.datepicker) {
		$('.datepicker-box').datepicker({
			todayHighlight : true,
			beforeShowDay: function (date){
				if (date.getMonth() == (new Date()).getMonth()) {
					switch (date.getDate()){
						case 4:
							return {
								tooltip: 'Example tooltip',
								classes: 'active'
							};
						case 8:
							return false;
						case 12:
							return 'green';
					}
				}
			}
		});
  }

  //Menu > Sidebar
  $('.menu .parent:not(".active") a').next('.sub').css('display', 'none');
  $('.menu .parent a .open-sub').click(function(e){
		e.preventDefault();
	
    if ($(this).closest('.parent').hasClass('active')) {
      $(this).parent().next('.sub').slideUp(600);
      $(this).closest('.parent').removeClass('active');
    } else {
      $(this).parent().next('.sub').slideDown(600);
      $(this).closest('.parent').addClass('active');
    }
  });
  
  // Scroll to Top
  $('#footer .up').click(function() {
    $('html, body').animate({
      scrollTop: $('body').offset().top
    }, 500);
    return false;
  });
  
  //JS loaded
  $('body').addClass('loaded');
  
  //Scrollbar
  if ($.fn.scrollbar)
		$('.minimized-menu .primary .navbar-nav').scrollbar();
  
  //Retina
  if('devicePixelRatio' in window && window.devicePixelRatio >= 2) {
    var imgToReplace = $('img.replace-2x').get();
  
    for (var i=0,l=imgToReplace.length; i<l; i++) {
      var src = imgToReplace[i].src;
			src = src.replace(/\.(png|jpg|gif)+$/i, '@2x.$1');
			imgToReplace[i].src = src;
			
			$(imgToReplace[i]).load(function(){
				$(this).addClass('loaded');
			});
    };
  }
});

//Window Resize
(function(){
  var delay = (function(){
		var timer = 0;
		return function(callback, ms){
			clearTimeout (timer);
			timer = setTimeout(callback, ms);
		};
  })();
  
  function resizeFunctions(){
		//Functions
		fullWidthBox();
		menu();
		footerStructure();
		if ($('.full-height').length && typeof fullHeightPages == 'function') fullHeightPages();
		$('.modal-center:visible').each(centerModal);
  }

	if(isTouchDevice) {
		$(window).bind('orientationchange', function(){
			delay(function(){
				resizeFunctions();
			}, 200);
		});
  } else {
		$(window).on('resize', function(){
			delay(function(){
				resizeFunctions();
			}, 500);
		});
  }
}());