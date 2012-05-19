/***************************/
//@Author: Adrian "yEnS" Mato Gondelle
//@website: www.yensdesign.com
//@email: yensamg@gmail.com
//@license: Feel free to use it, but keep this credits please!					
/***************************/
//About Page Pop Up
			var popupAboutStatus = 0;
			
			function loadPopupAbout(){
				if(popupAboutStatus==0){
					$("#popupAbout").fadeIn("slow");
					popupAboutStatus = 1;
				}
			}
			
			function disablePopupAbout(){
				if(popupAboutStatus==1){
					$("#popupAbout").fadeOut("slow");
					popupAboutStatus = 0;
				}
			}
			
			function centerPopupAbout(){
				var windowWidth = document.documentElement.clientWidth;
				var windowHeight = document.documentElement.clientHeight;
				var popupAboutHeight = $("#popupAbout").height();
				var popupAboutWidth = $("#popupAbout").width();
				$("#popupAbout").css({
					"position": "absolute",
					"top": windowHeight/2-popupAboutHeight/2,
					"left": windowWidth/2-popupAboutWidth/2
				});
			}
			
			
			$(document).ready(function(){
				$("#popupAbout").fadeOut();
				popupAboutStatus = 0;
				$("#about").click(function(){
				$("#popupAbout").css({
					"visibility": "visible"	});
					disablePopupProjects();
					disablePopupContact();
					disablePopupBlog();
					centerPopupAbout();
					loadPopupAbout();
				    $("#popupAbout").mCustomScrollbar("vertical",400,"easeOutCirc",1.05,"auto","yes","yes",10);	
				});
				$("#popupAboutClose").click(function(){
					disablePopupAbout();
				});
				$("#bg").click(function(){
					disablePopupAbout();
				});
				
				$(document).keyup(function(e){
				if(e.keyCode === 27)
					disablePopupAbout();
			});
			});
//Projects Page Pop Up
			var popupProjectsStatus = 0;
			
			function loadPopupProjects(){
				if(popupProjectsStatus==0){
					$("#popupProjects").fadeIn("slow");
					popupProjectsStatus = 1;
				}
			}
			
			function disablePopupProjects(){
				if(popupProjectsStatus==1){
					$("#popupProjects").fadeOut("slow");
					popupProjectsStatus = 0;
				}
			}
			
			function centerPopupProjects(){
				var windowWidth = document.documentElement.clientWidth;
				var windowHeight = document.documentElement.clientHeight;
				var popupProjectsHeight = $("#popupProjects").height();
				var popupProjectsWidth = $("#popupProjects").width();
				$("#popupProjects").css({
					"position": "absolute",
					"top": windowHeight/2-popupProjectsHeight/2,
					"left": windowWidth/2-popupProjectsWidth/2
				});
			}
			
			
			$(document).ready(function(){
				$("#popupProjects").fadeOut();
				popupProjectsStatus = 0;
				$("#projects").click(function(){
				$("#popupProjects").css({
					"visibility": "visible"	});
					disablePopupAbout();
					disablePopupContact();
					disablePopupBlog();					
					centerPopupProjects();
					loadPopupProjects();
				    $("#popupProjects").mCustomScrollbar("vertical",400,"easeOutCirc",1.05,"auto","yes","yes",10);						
				});
				$("#popupProjectsClose").click(function(){
					disablePopupProjects();
				});
				$("#bg").click(function(){
					disablePopupProjects();
				});
				$(document).keyup(function(e){
				if(e.keyCode === 27)
					disablePopupProjects();
			});
			});
//Photos Page Pop Up
			var popupPhotosStatus = 0;
			
			function loadPopupPhotos(){
				if(popupPhotosStatus==0){
					$("#popupPhotos").fadeIn("slow");
					popupPhotosStatus = 1;
				}
			}
			
			function disablePopupPhotos(){
				if(popupPhotosStatus==1){
					$("#popupPhotos").fadeOut("slow");
					popupPhotosStatus = 0;
				}
			}
			
			function centerPopupPhotos(){
				var windowWidth = document.documentElement.clientWidth;
				var windowHeight = document.documentElement.clientHeight;
				var popupPhotosHeight = $("#popupPhotos").height();
				var popupPhotosWidth = $("#popupPhotos").width();
				$("#popupPhotos").css({
					"position": "absolute",
					"top": windowHeight/2-popupPhotosHeight/2,
					"left": windowWidth/2-popupPhotosWidth/2
				});
			}

			
			
			$(document).ready(function(){
				$("#popupPhotos").fadeOut();
				popupPhotosStatus = 0;
				
      			var myAlbumsJSON = $("#my_albums_json").html(),
                myAlbums     = $.parseJSON(myAlbumsJSON);
				$("#photos").click(function(){
				$("#popupPhotos").css({
					"visibility": "visible"	});
					disablePopupAbout();
					disablePopupContact();
					disablePopupBlog();					
					centerPopupPhotos();
					loadPopupPhotos();
				    $("#popupPhotos").mCustomScrollbar("vertical",400,"easeOutCirc",1.05,"auto","yes","yes",10);						
				});
				$("#popupPhotosClose").click(function(){
					disablePopupPhotos();
				});
		        $('.photosclass').click(function(event){
                         
			        var myPhotosJSON = $("#my_albumphotos_json"+ event.target.id).html(),
                    myPhotos     = $.parseJSON(myPhotosJSON);
                    var albumname="test";
                	$.each(myAlbums, function (i, val) {
                		if (val.id == event.target.id){
                			albumname=val.name;
                		}
                		   
		            });
                    
                    if ($bgimg.attr("src").split("Signature")[0] != myPhotos[0].imagefile.url.split("Signature")[0]){
                        event.preventDefault();
	                    SwitchImage(myPhotos[0].imagefile.url);
	                    var $this=$("#outer_container a[href='"+myPhotos[0].imagefile.url+"']");
	                    GetNextPrevImages($this);
	                    $img_title.data("imageTitle", myPhotos[0].title); 
	                    $('#albumname h1').text(albumname);
                        totalContent=0;
	                    $thumbScroller_container.empty();
	                    $.each(myPhotos, function (i, val) {
	                    	var myImg = new Image();
	                    	$(myImg).attr("alt", val.title);
	                    	$(myImg).addClass('thumb');
	                    	$(myImg).attr("title",val.title);
                            $(myImg).load(function() {  	
                      		  var $this=$(this);
                       		  //alert('loading');
		                      totalContent+=$this.innerWidth();
		                      $this.wrap("<a href='"+ val.imagefile.url+"'></a>" )
		                      $thumbScroller_container.css("width",totalContent);
		                      $this.fadeTo(fadeSpeed, $thumbnailsOpacity);
		                      
	                          $outer_container.data("nextImage",$(".content").first().next().find("a").attr("href"));
	                          $outer_container.data("prevImage",$(".content").last().find("a").attr("href"));
                        
                              $("#outer_container a").click(function(event){
                             	event.preventDefault();
	                            var $this=$(this);
	                            GetNextPrevImages($this);
	                            GetImageTitle($this);
	                            SwitchImage(this);
	                            ShowHideNextPrev("show");
                              }); 
                            });
                            myImg.src=val.imagefile.thumb.url;
                            $thumbScroller_container.append($("<div>").addClass("content").append($("<div>").append($(myImg))));
	                    		               		   
		                });
		                
		                	
	                    var $the_outer_container=document.getElementById("outer_container");
	                    var $placement=findPos($the_outer_container);
	                    
                        disablePopupPhotos();
                        
	                       //GetImageTitle($this);
                    }
         			//var hidden = $('body').append('<div id="img-cache" style="display:none/>').children('#img-cache');
		        	//$.each(myPhotos, function (i, val) {
		        		//alert(val.imagefile.url);
			        //  $('<img/>').attr('src', val.imagefile.url).appendTo(hidden);
			        //});
                });
                
				$("#bg").click(function(){
					disablePopupPhotos();
				});
				$(document).keyup(function(e){
				if(e.keyCode === 27)
					disablePopupPhotos();
			});
			});
			
//Contact Page Pop Up
			var popupContactStatus = 0;
			
			function loadPopupContact(){
				if(popupContactStatus==0){
					$("#popupContact").fadeIn("slow");
					popupContactStatus = 1;
				}
			}
			
			function disablePopupContact(){
				if(popupContactStatus==1){
					$("#popupContact").fadeOut("slow");
					popupContactStatus = 0;
				}
			}
			
			function centerPopupContact(){
				var windowWidth = document.documentElement.clientWidth;
				var windowHeight = document.documentElement.clientHeight;
				var popupContactHeight = $("#popupContact").height();
				var popupContactWidth = $("#popupContact").width();
				$("#popupContact").css({
					"position": "absolute",
					"top": windowHeight/2-popupContactHeight/2,
					"left": windowWidth/2-popupContactWidth/2
				});
			}
			
			
			$(document).ready(function(){
				$("#popupContact").fadeOut();
				popupContactStatus = 0;
				$("#contact").click(function(){
				$("#popupContact").css({
					"visibility": "visible"	});
					disablePopupAbout();
					disablePopupProjects();
					disablePopupBlog();					
					centerPopupContact();
					loadPopupContact();
				    $("#popupContact").mCustomScrollbar("vertical",400,"easeOutCirc",1.05,"auto","yes","yes",10);						
				});
				$("#popupContactClose").click(function(){
					disablePopupContact();
				});
				$("#bg").click(function(){
					disablePopupContact();
				});
				$(document).keyup(function(e){
				if(e.keyCode === 27)
					disablePopupContact();
			});
			});
//Blog Page Pop Up
			var popupBlogStatus = 0;
			
			function loadPopupBlog(){
				if(popupBlogStatus==0){
					$("#popupBlog").fadeIn("slow");
					popupBlogStatus = 1;
				}
			}
			
			function disablePopupBlog(){
				if(popupBlogStatus==1){
					$("#popupBlog").fadeOut("slow");
					popupBlogStatus = 0;
				}
			}
			
			function centerPopupBlog(){
				var windowWidth = document.documentElement.clientWidth;
				var windowHeight = document.documentElement.clientHeight;
				var popupBlogHeight = $("#popupBlog").height();
				var popupBlogWidth = $("#popupBlog").width();
				$("#popupBlog").css({
					"position": "absolute",
					"top": windowHeight/2-popupBlogHeight/2,
					"left": windowWidth/2-popupBlogWidth/2
				});
			}
			
			
			$(document).ready(function(){
				$("#popupBlog").fadeOut();
				popupBlogStatus = 0;
				$("#blog").click(function(){
				$("#popupBlog").css({
					"visibility": "visible"	});
					disablePopupAbout();
					disablePopupProjects();					
					disablePopupContact();					
					centerPopupBlog();
					loadPopupBlog();
				    $("#popupBlog").mCustomScrollbar("vertical",400,"easeOutCirc",1.05,"auto","yes","yes",10);						
				});
				$("#popupBlogClose").click(function(){
					disablePopupBlog();
				});
				$("#bg").click(function(){
					disablePopupBlog();
				});
				$(document).keyup(function(e){
				if(e.keyCode === 27)
					disablePopupBlog();
			});
			});