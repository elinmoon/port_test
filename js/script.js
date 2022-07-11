//Full Page Slider - mousewheel() 이벤트
$(document).ready(function(){

    function resizeEvt(){
        var $win_width = $(window).width();
        console.log($win_width);

        if($win_width > 767){
            $("body").addClass("pc")
        }else{
            $("body").removeClass("pc");
        }

        const $pc = $("body").hasClass("pc");

        if($pc){

            console.log("PC");

            var elm = ".box";
            $(elm).each(function(index){
                $(this).on("mousewheel DOMMouseScroll", function(e){
                    e.preventDefault();
                    console.log(event.wheelDelta);
                    console.log(event.detail);

                    var delta = 0;
                    if(event.wheelDelta){
                        console.log("wheelDelta 값 발생")
                        delta = event.wheelDelta / 120;


                        if(window.opera){
                            delta = -delta;
                        }

                    }else if(event.detail){
                        // console.log("detail 값 발생");
                        delta = -event.detail/3;
                    }
                    console.log(delta);

                    var moveTo = $(window).scrollTop();
                    var elmIndex = $(elm).eq(index);
                    console.log(elmIndex);

                    if(delta < 0){

                        try{
                            if($(elmIndex).next() != undefined){
                                moveTo = $(elmIndex).next().offset().top;

                                $(elm).removeClass("active");
                                $(elmIndex).next().addClass("active");

                                var $cur_index = $(".box.active").index();
                                console.log($cur_index);
                                $("header li").removeClass("active");
                                $("header li").eq($cur_index).addClass("active");
                            }
                        }catch(error){
                            console.log(error);
                        }

                    }else if(delta > 0){
                        try{
                            if($(elmIndex).prev() != undefined){
                                moveTo = $(elmIndex).prev().offset().top;

                                $(elm).removeClass("active");
                                $(elmIndex).prev().addClass("active");

                                var $cur_index = $(".box.active").index();
                                console.log($cur_index);
                                $("header li").removeClass("active");
                                $("header li").eq($cur_index).addClass("active");
                            }
                        }catch(error){
                            // console.log(error);
                        }
                    }
                    $("html, body").stop().animate({scrollTop : moveTo + "px"}, 200);
                });

            });

            $("header li").click(function(){
                var $index  = $(this).index();

                $("header li").removeClass("active");
                $(this).addClass("active");
                
                $(".box").removeClass("active");
                $(".box").eq($index).addClass("active");

                $("html, body").stop().animate({scrollTop : $(".box").eq($index).offset().top}, 1000);

                return false;
            });

            var key_num = 0;

            $(document).on("keydown", function(evt){
                console.log(evt.keyCode);

                key_num = evt.keyCode;

                var $target = $(".box.active").index();
                console.log($target);

                if(key_num == 40 || key_num == 34){ 
                    if($target == $(".box").length - 1){

                    }else{
                        $("html, body").stop().animate({scrollTop : $(".box").eq($target + 1).offset().top}, 200);

                        $(".box").removeClass("active");
                        $(".box").eq($target + 1).addClass("active");
                        $("header li").removeClass("active");
                        $("header li").eq($target + 1).addClass("active");
                    }

                }else if(key_num == 38 || key_num == 33){

                    if($target == 0){

                    }else{
                        $("html, body").stop().animate({scrollTop : $(".box").eq($target - 1).offset().top}, 200);
                        $(".box").removeClass("active");
                        $(".box").eq($target - 1).addClass("active");
                        $("header li").removeClass("active");
                        $("header li").eq($target - 1).addClass("active");
                    }

                }else if(key_num == 36){
                    $("html, body").stop().animate({scrollTop : $(".box").first().offset().top}, 200);

                    $(".box").removeClass("active");
                    $(".box").first().addClass("active");
                    $("header li").removeClass("active");
                    $("header li").first().addClass("active");

                }else if(key_num == 35){
                    $("html, body").stop().animate({scrollTop : $(".box").last().offset().top}, 200);

                    $(".box").removeClass("active");
                    $(".box").last().addClass("active");
                    $("header li").removeClass("active");
                    $("header li").last().addClass("active");
                }

            });  //...키보드 이벤트 종료

            var $t_start;
            var $t_end;
            var $t_move;

            function prev(){
                var $target = $(".box.active").index();
                if($target != 0){
                    $("html, body").stop().animate({scrollTop : $(".box").eq($target - 1).offset().top}, 500, function(){
                        $(".box").removeClass("active");
                        $(".box").eq($target - 1).addClass("active");
                        $("header li").removeClass("active");
                        $("header li").eq($target - 1).addClass("active");
                    });
                }
            }

            function next(){
                var $target = $(".box.active").index();
                if($target != $(".box").length - 1){
                    $("html, body").stop().animate({scrollTop : $(".box").eq($target + 1).offset().top}, 500, function(){
                        $(".box").removeClass("active");
                        $(".box").eq($target + 1).addClass("active");
                        $("header li").removeClass("active");
                        $("header li").eq($target + 1).addClass("active");
                    });
                }
            }

            function touchmove(){
                $t_move = $t_start - $t_end;
                console.log($t_move);
                if($t_move > 10){ 
                    next();
                }else if($t_move < -10){
                    prev();
                }
            }

            $(".box").on("touchstart", function(evt){
                console.log(evt.changedTouches[0].clientY);
                $t_start = evt.changedTouches[0].clientY;
            });
            $(".box").on("touchend", function(evt){
                console.log(evt.changedTouches[0].clientY);
                $t_end = evt.changedTouches[0].clientY;

                touchmove();
            });

            var $m_down;
            var $m_up;
            var $m_move;

            function mousemove(){
                $m_move = $m_down - $m_up;
                console.log($m_move);
                if($m_move > 20){
                    next();
                }else if($m_move < -20){
                    prev();
                }
            }

            $(".box").on("mousedown", function(evt){
                console.log("마우스다운");
                console.log(evt);
                console.log(evt.clientY);
                $m_down = evt.clientY;
            });

            $(".box").on("mouseup", function(evt){
                console.log("마우스업");
                console.log(evt.clientY);
                $m_up = evt.clientY;
                mousemove();
            });
            
        }else{
            console.log("Mobile");
        }

    }//resizeEvt() 함수 종료


    resizeEvt();

    $(window).resize(function(){
        resizeEvt();
    });

    //// ##### Full Page Slider - mousewheel() 이벤트 종료 #####


    // /////////////////////////////////////////////

    
    // SKILLS -------------


    //#1. 배열 데이터

    var $skills_arr = [
        ["90", "HTML", "html.svg"],
        ["90", "CSS", "css.svg"],
        ["80", "Javasript", "js.svg"],
        ["80", "jQuery", "jquery.svg"],
        ["70", "PHP", "php.svg"],
        ["70", "Vue.js", "vue.svg"],
    ];

    var $eachSkill = [
        ["DISPLAY GRID", "displayGrid.png"],
        ["DISPLAY FLEX", "displayFlex.png"],
        ["SLIDER_JQUERY", "slider_jquery.png"],
        ["FOR문_JQUERY", "for_jquery.png"],

    ]

    
    //#3. 반복문
    for(v of $skills_arr){
        $("main .box > #skills").append(`
            <section id="circle_bar">
                <div class="frame">
                    <div class="bx">
                        <div class="cont">
                            <div class="top">
                                <svg>
                                    <circle cx="70" cy="70" r="70"/>
                                    <circle cx="70" cy="70" r="70"/>
                                </svg>
                                <div class="num">
                                    <h2>
                                        <span class="count" data-limit="${v[0]}"></span>
                                        <span>%</span>
                                    </h2>
                                </div>
                            </div>
                            <div class="bottom">
                                <h2 class="cont_text">${v[1]}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `);
    }

    for(e of $eachSkill){
        $(".popup #accor_03 ul").append(`
            <li>
                <div class="top">
                    <h4>${e[0]}</h4>
                    <span><img src="./img/arrowDown.svg" alt=""></span>
                </div>
                <div class="bottom">
                    <img src="./img/${e[1]}" alt="">
                </div>
            </li>
        `);
    }


// ---------------------------- SKILLS (3) - (% BAR)
    var startCount = 0;

    $(".box #skills #circle_bar").each(function(index){
        // console.log(index);
        var sel_count = $(this).find(".count").attr("data-limit");
        console.log(sel_count); //95 - 90 - 80

        $(this).find("circle:eq(1)").css("stroke-dashoffset", `calc(440 - 440 * ${sel_count} / 100)`);

        var counter = setInterval(function(){
            if(startCount < sel_count){

                startCount++;

                // console.log(startCount);

                $(".box #skills #circle_bar .bx").eq(index).find(".count").text(startCount);

            }else{

                clearInterval(counter);
                $(".box #skills #circle_bar .bx").eq(index).find(".count").text(sel_count);
            }

        }, 50);
    });

    //#5. 콘텐츠를 클릭시 팝업창을 보여줌
    $(".box #skills #circle_bar").click(function(){
        $(".dark").addClass("active");
        $(".popup").addClass("active");

    });


    $(document).on("click", "#accor_03 li .top", function(){
        
        var $open = $(this).closest("li").hasClass("open");

        if($open == false){ //아직 하부내용이 열리지 않은 상태 
            $("#accor_03 li .top > img").attr("src", "./img/arrowDown.svg");
            $(this).find("img").attr("src", "./img/arrowUp.svg");
    
            $("#accor_03 li .bottom").stop().slideUp();
            $(this).siblings().stop().slideDown();

            $("#accor_03 li").removeClass("open");
            $(this).closest("li").addClass("open");

        }else{ //하부내용이 열린 상태
            console.log(this);
            $(this).find("img").attr("src", "./img/arrowDown.svg");
            $("#accor_03 li .bottom").stop().slideUp();
            $("#accor_03 li").removeClass("open");
        }
    });

            
        

    //#6. 암막(.dark_bg) 과 닫기버튼(.close) 클릭시 다 닫기
    $("main .dark, main .popup .close").click(function(){
        $(".dark").removeClass("active");
        $(".popup").removeClass("active");
    });


    // /////////////////////////////////////////////

    // -------------------------- PROJECTS (4)
    // PROJECTS

    //#1. 배열 데이터

    var $projects_arr = [
        ["projects_05.png", "WEATHER APP", "https://elinmoon.github.io/weatherApp2022/", "HTML, CSS, JAVASCRIPT, JQUERY를 이용했습니다."],
        ["projects_06.png", "NATIONAL GEOGRAPHIC", "https://elinmoon.github.io/ngeo_2022/", "HTML, CSS, JAVASCRIPT, JQUERY, VUE.JS - ROUTER를 이용했습니다."],
        ["projects_09.png", "AUDITION", "https://elinmoon.github.io/20220701_auditionSite/", "HTML, CSS, JAVASCRIPT, JQUERY, VUE.JS - COMPONENT를 이용했습니다."],
        ["projects_07.png", "CHATTING APP", "http://elinmoon97.dothome.co.kr/chattingApp/", "HTML, CSS, JAVASCRIPT, JQUERY, PHP를 이용했습니다."],
        ["projects_08.png", "MOVIE", "https://elinmoon.github.io/20220530_ajax_website/", "HTML, CSS, JAVASCRIPT, JQUERY-AJAX를 이용했습니다.",],
        ["projects_01.png", "B&O", "https://elinmoon.github.io/20220422_website_b-o/", "HTML, CSS를 이용했습니다."],
        ["projects_02.png", "CAKEHOUSE", "https://elinmoon.github.io/20220331_cakehouse/", "HTML, CSS를 이용했습니다."],
        ["projects_03.png", "KULINER", "https://elinmoon.github.io/kuliner_2022/", "HTML, CSS, JAVASCRIPT를 이용했습니다."],
        // ["projects_04.png", "CASHMERE", "https://elinmoon.github.io/20220405_website_cashmere/", "HTML, CSS, JAVASCRIPT를 이용했습니다."],
        ["hotel.png", "HOTEL", "https://elinmoon.github.io/20220405_website_cashmere/", "HTML, CSS, JAVASCRIPT를 이용했습니다."],
        
    ];


    const coverSpace = document.querySelector(".cover");
    let coverCont = "";

   

    //#2. 반복문
    for(v of $projects_arr){
        coverCont += `
            <div id="proj_box">
                <div class="case">
                    <img src="./img/macbook.png" alt="">

                    <div class="incase">
                        <div class="portview"></div>
                    </div>
                </div>
                <div class="txt">
                    <h2>${v[1]}</h2>
                    <p>${v[3]}</p>
                    <a href="${v[2]}">GITHUB</a>
                </div>
            </div>
        `;
    }
    coverSpace.innerHTML = coverCont;

    $("main .box > #projects .cover #proj_box").each(function($index){

        $(this).find(".portview").css(`background-image`, `url(./img/${$projects_arr[$index][0]})`);

    });

    var $last_slid = $("#projects .cover #proj_box").last();
    $("#projects .cover").prepend($last_slid);
    $("#projects .cover #proj_box").eq(1).addClass("show");


    $(".box #projects .nextBtn").click(function(){

        var $first = $("#projects .cover #proj_box").first();
        $("#projects .cover").stop().animate({"margin-left" : "-200%"}, 500, function(){
            $("#projects .cover").append($first).css("margin-left", "-100%");

            var $show = $("#projects > .cover > #proj_box.show").index();
            console.log($show);
            $("#projects .cover #proj_box").removeClass("show");

            $("#projects .cover #proj_box").eq($show).next().addClass("show");

        });

        return false;
    });
    
    
    $(".box #projects .prevBtn").click(function(){

        var $last = $("#projects .cover #proj_box").last();
        $("#projects .cover").stop().animate({"margin-left" : "0"}, 500, function(){
            $("#projects .cover").prepend($last).css("margin-left", "-100%");

            var $show = $("#projects > .cover > #proj_box.show").index();
            $("#projects .cover #proj_box").removeClass("show");
        

            $("#projects .cover #proj_box").eq($show).prev().addClass("show");
 

        });

        return false;

    });


    // CONTACT ME (5) -------------------

    $(".box .waiting").click(function(){
        $(this).addClass("active");
        $(".box .sendMe").addClass("active");

        return false;
    });

    $(".close").click(function(){
        $(".thankyou_message").hide();
        
        $(".box .waiting").removeClass("active");
        $(".box .sendMe").removeClass("active");

        return false;
    });
    
});

