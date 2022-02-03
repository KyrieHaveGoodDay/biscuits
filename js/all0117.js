
$(function () {

  setTimeout(() => {
    $('.loading_mask').addClass('fadeOut').show().delay(100).fadeOut(0);
    page1Ani();
  }, 300);

  // ie GG
  if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0) {
    $('.ie-mask').removeClass('none');
  }

  // variables
  let $title = $('.game__first--title .title'),
    $chaco = $('.game__first--title .chaco'),
    $mainMask = $('.game__main--mask'),
    $heart = $('.game__first--title .heart'),
    $gameFooter = $('.game__footer'),
    $btns = $('.game__first--btns a'),
    $cookies = $('.cookie'),
    $openR = $('.open-r'),
    $openL = $('.open-l'),
    $result = $('.result'),
    $resultInner = $('.result__inner')
  let index = 0;
  let tl1 = gsap.timeline({ delay: 0.5 });

  // page1 動畫
  function page1Ani() {
    tl1.from($title, { duration: 0.2, stagger: 0.1, opacity: 0 })
      .from($title, { duration: 0.6, stagger: 0.1, scale: 0.6, ease: "back.out(1.7)" }, 0)
      .from($chaco, { duration: 0.6, stagger: 0.2, x: '100%', y: '100%', opacity: 0, ease: "back.out(1.7)" }, 0.6)
      .from($heart, { duration: 0.6, x: '-100%', y: '100%', opacity: 0 }, 0.7)
  }

  $('.btn__start').on('click', function () {
    $('.game__first').css('pointer-events', 'none')
    tl1.timeScale(2).reverse();
    gsap.to($gameFooter, { duration: 0.6, y: '100%', delay: 0.5 });
    gsap.to($btns, { duration: 1, stagger: 0.2, y: '-100%', opacity: 0, ease: "power3.out", delay: 0.2 })
    setTimeout(() => {
      $('.game__first').fadeOut(300)
      gameStart();
    }, 700);
  })

  // 開始遊戲場景動畫
  function gameStart() {
    let objdata = resultData.length-1;
    // console.log(resultData[objdata]);

    gsap.from($('.game__main--bg'), { duration: 2.5, scale: 0.6, ease: "power3.out", delay: 0.3 })
    $cookies.each(function () {
      let item = $(this);
      cookieAni(item);
    })
  }
  CustomEase.create("custom1", "M0,0 C0.14,0 0.382,0.3 0.474,0.47 0.556,0.622 0.68,0.963 0.688,1 0.696,0.985 0.734,0.952 0.784,0.952 0.842,0.952 0.858,0.985 0.872,0.998 0.883,0.994 0.904,0.97 0.94,0.97 0.972,0.97 1,1 1,1 ")
  function cookieAni(item) {
    let rdu = R(10, 20) / 10;
    let rdl = R(20, 80) / 100;
    let tl = gsap.timeline({ delay: rdl });

    // 亂數位置
    let itemWidthMain = R(-160, 107);
    let itemHeightMain = R(93, 540);
    // console.log('寬度：' + itemWidthMain, '高度：' + itemHeightMain);
    // 亂數擺放
    // gsap.set(item, { x: itemWidthMain, y: itemHeightMain })

    tl.from(item, { duration: 0.8, opacity: 0 })
      .from(item, { duration: 1.2, scale: 2, ease: "bounce.out" }, 0.2)
      .from(item, {
        duration: rdu, x: 0, y: 0, rotate: -300, onComplete: function () {
          item.removeClass('pointer-none')
        }
      }, 0.2)
    
  }
  
  // 點擊餅乾
  $cookies.on('click', function () {
    // index越高，越有機會抽到折價卷
    let resultNumber = R(index, 5)
    
    // 物件資料總長度
    let resultLong = resultData.length -1; 
    
    // console.log(resultData);
    
    // 抽到剩最後一個，直接指定折價卷
    if (index == resultLong) {
      resultNumber = resultLong;
    }
    index++
    // console.log(index);

    [resultLink, resultImg] = [resultData[resultNumber].link, resultData[resultNumber].img];
    $('.btn__link').attr('href', resultLink);
    $('.result__img').attr('src', `img/${resultImg}`);
    console.log(resultNumber);


    // 如果抽到折價卷就不能繼續抽
    // resultImg == 'discount_main.png'
    if (resultLong == resultNumber) {
      // console.log('true');
      // 當抽到折價卷之後...
      $('.result__btns > a').css('width', '46%')
      $('.btn_win').css({'width':'60%','display':'block','margin':'0 auto'})
      $('.btn__reload').css({'pointer-events':'none','display':'none'});
      $('.btn__link_img').attr('src', `img/btn_discount_main.png`);
      over('.btn__link_img');
    } else {
      // console.log('flase');
    }

    $(this).css({ 'z-index': 20, 'pointer-events': 'none' });
    $mainMask.css('display', 'block')
    $('.open').css('display', 'block')
    let $thisMain = $(this).find('.cookie__main');
    let $thisShadow = $(this).find('.cookie__shadow');
    let tl = gsap.timeline();
    

    tl.to($mainMask, { duration: 0.6, opacity: 1 })
      .to($(this), { duration: 0.6, top: '50%', left: '50%', x: '-50%', y: '-50%' }, 0)
      .to($thisMain, { duration: 0.6, rotation: -90 }, 0)
      .to($thisShadow, { duration: 0.6, rotation: -90, opacity: 0 }, 0)
      .to($(this), { duration: 0.05, rotation: 10, repeat: 6, yoyo: true }, 0.8)
      .to($(this), { duration: 0.1, opacity: 0 }, 1.2)
      .to($('.open'), { duration: 0.1, opacity: 1 }, 1.2)
      .to($openR, { duration: 0.3, rotation: 0, x: '5%', y: '-15%', ease: "power3.out" }, 1.25)
      .to($openL, {
        duration: 0.3, rotation: 0, x: '-5%', y: '-15%', ease: "power3.out", onComplete: function () {
          setTimeout(() => {
            result();

          }, 300);
        }
      }, 1.25)
  })

  // 不能玩 領折價卷
  function over(val) {
    let t6 = gsap.timeline({ yoyo: true, repeat: 4, delay: 3 })
    t6.from(val, { duration: 0.05, x: -10 })

  }
  
  //結果燈箱
  function result() {
    $('.open').css('display', 'none');
    $result.css('display', 'flex');
    gsap.to($resultInner, { duration: 0.5, opacity: 1, y: 0 })
    gsap.to($gameFooter, { duration: 0.5, y: 0 })

  }

  // 隨機整數 包含 min & mix
  function R(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  // 重新載入
  $('.btn__reload').on('click', function (e) {
    e.preventDefault();
    // location.reload();

    // 重新開始

    // 背景往下
    gsap.to($gameFooter, { duration: 0.6, y: '100%' });
    
    // if (index == 6) {
    //   index = 0
    //   location.reload();
    // }

    // $cookies.addClass('pointer-none');
    $result.css('display', 'none');
    $mainMask.css('display', 'none');
    $('.open').css('opacity', '0');
    $('.open-r').css('transform', 'rotate(-40deg)');
    $('.open-l').css('transform', 'rotate(-40deg)');
    // console.log('次數' + index);

    // 在執行一次餅乾掉落
    // $cookies.each(function () {
    //   let item = $(this);
    //   // console.log(item);
    //   cookieAni(item);
    // })

  })

  // 禁用手指雙擊縮放
  let lastTouchEnd = 0;
  document.documentElement.addEventListener('touchend', function (event) {
    let now = Date.now();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, false);
  document.body.addEventListener('touchmove', function (e) {
    e.preventDefault(); //阻止默認的處理方式(阻止下拉滑動的效果)
  }, { passive: false }); //passive 參數不能省略，用來兼容ios和android

});


