console.log("hello");

var video_wrapper=$("#video_wrapper");
// var video_ele=$("video");
var video_ele=document.getElementById("video");
var body_ele=$("body");
var nav_ele=$("nav");
var body_height=document.documentElement.clientHeight;
var body_width=document.documentElement.clientWidth;
var pages=$(".pages");
var page_titles=$("#nav_cont ul li");
var audio_show_title=$("#nav_cont audio");
// RENDERER.init();
videoAct();
function videoAct(){
	// video_wrapper.css("width",document.documentElement.clientWidth+"px");
	video_wrapper.css("height",body_height+"px");

	setTimeout(function(){
		// console.log("???");
		video_ele.setAttribute("controls","controls");
		video_ele.play();

		setTimeout(function(){
			video_wrapper.css("margin",body_height+"px 0 0 100%");
			// body_ele.css("background-color","#fff");
			setTimeout(function(){
				// video_wrapper.css("display","none");
				video_wrapper.remove();

				body_ele.css("overflow-y","scroll");
				// setHeight();
				pages.each(function(index){

					if(body_height>body_width){					
						$(this).css("height",body_height*0.4+"px");
					}
					else
						$(this).css("height",body_height+"px");
				});
				nav_ele.css("opacity",1);

				setTimeout(function(){
					var _left=20;
					var _time=1;
					// page_titles.each(function(index,ele){
					// 		$(ele).css("left",_left+"%");
					// 		_left+=4
					// });
					
					// for(var i=0;i<page_titles.length;i++){
					// 	setTimeout(function(){
					// 		page_titles.eq(i).css("left",_left+"%");
					// 	},_time);
					// 	_time+=2000;
					// 	_left+=4;
					// }
					// setTimeout(function(){
						page_titles.eq(0).css("left","28%");
					// },0);
					setTimeout(function(){
						page_titles.eq(1).css("left","32%");
						audio_show_title[0].play();
					},1000);
					setTimeout(function(){
						page_titles.eq(2).css("left","36%");
						audio_show_title[0].load();
						audio_show_title[0].play();
					},2000);
					setTimeout(function(){
						page_titles.eq(3).css("left","40%");
						audio_show_title[0].load();
						audio_show_title[0].play();
					},3000);
					setTimeout(function(){
						page_titles.eq(4).css("left","44%");
						audio_show_title[0].load();
						audio_show_title[0].play();
					},4000);
					setTimeout(function(){
						page_titles.eq(5).css("left","48%");
						audio_show_title[0].load();
						audio_show_title[0].play();
						setTimeout(function(){
							audio_show_title[0].load();
							audio_show_title[0].play();
							// RENDERER.init();
						},1000);

						setTimeout(function(){
							$("#nav_cont header").css("height","52%");
							// $("#nav_cont header").css("opcaity","none");
						},2000);
						setTimeout(function(){
							// $("#jsi-keyvisual-container").css("display","none");
							// RENDERER.init();
							// $("#jsi-keyvisual-container").css("display","block");
							// RENDERER.init();
							$("#jsi-keyvisual-container").css("background-color","transparent");
								// background-color:transparent;
							// $("#nav_cont header").css("opac")
							$("#nav_cont header").hover(function(){
								$(this).css("opacity",1);
							},function(){
								$(this).css("opacity",0);
							});

							$("#showHeaderNav").css("display","block");
							$("#showHeaderNav").mouseenter(function(){
								$("#all_nav").css("top","0px");
								$("#showHeaderNav").hide("slow");
							});
							$("#all_nav").mouseleave(function(){
								$("#all_nav").css("top","-66px");
								$("#showHeaderNav").show("slow");
							});
						},3000);
					},5000);
				},1000);

				//HEADER 
				// RENDERER.init();
				// 		$("#study").css("height",document.documentElement.clientHeight+"px");
				//   
				if(body_height>body_width)
					$("._article").css("font-size","26px");
					// $("._article").each(function(index){
					// 	$(this).css("font-size","18px");
					// });
				var newDate=new Date();
				$("#nowTime").html(newDate.getFullYear()+"年"+(newDate.getMonth()+1)+"月"+newDate.getDate()+"日");
				$("#studentTime").html(newDate.getFullYear()-2001+"年");
				
			},2000);
		}, 10);///这里是video时间
	},100);//这里是开始播放video时间
}


// 设置所有的分类高度与body高度相同
// function setHeight(){
	// nav_ele
// }

// 首页显示所有标题
// function showTitles(){

// }