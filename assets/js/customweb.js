function bestseller() {
    $("#bestseller_slide").length > 0 && $("#bestseller_slide").owlCarousel({
        items: 2,
        itemsDesktop: [1199, 2],
        itemsDesktopSmall: [991, 1],
        itemsTablet: [767, 2],
        itemsMobile: [479, 1],
        navigation: !0,
        pagination: !1
    })
}

function latest() {
    $("#latest_slide").length > 0 && $("#latest_slide").owlCarousel({
        items: 2,
        itemsDesktop: [1199, 2],
        itemsDesktopSmall: [991, 1],
        itemsTablet: [767, 2],
        itemsMobile: [479, 1],
        navigation: !0,
        pagination: !1
    })
}

function scrolltop_arrow() {
    $(window).scroll(function() {
        var e = $("#scrollup"),
            t = $("header");
        $(this).scrollTop() > 250 ? e.fadeIn(300) : e.fadeOut(300), $(this).scrollTop() > 43 ? t.addClass("header-fixed") : t.removeClass("header-fixed")
    }), $("#scrollup").on("click", function() {
        return $("html, body").animate({
            scrollTop: 0
        }, 1e3), !1
    })
}
$(document).ready(function() {
    function e() {
        1 == o ? (a.hide(), t.removeClass("is-open"), t.addClass("is-closed"), o = !1) : (a.show(), t.removeClass("is-closed"), t.addClass("is-open"), o = !0)
    }
    $("#tabs a").tabs();
    var t = $(".hamburger"),
        a = $(".overlay"),
        o = !1;
    t.click(function() {
        e()
    }), $('[data-toggle="offcanvas"]').click(function() {
        $("#wrapper").toggleClass("toggled")
    }), $(".search-opener").click(function() {
        $(".top-search-bar").hasClass("open") ? $(".top-search-bar").removeClass("open") : $(".top-search-bar").addClass("open")
    }), $(".footer-static-block span.opener").on("click", function() {
        return $(this).hasClass("plus") ? ($(this).parent().find(".footer-block-contant").slideDown(), $(this).removeClass("plus"), $(this).addClass("minus")) : ($(this).parent().find(".footer-block-contant").slideUp(), $(this).removeClass("minus"), $(this).addClass("plus")), !1
    }), $(".sidebar-box span.opener").on("click", function() {
        var e = $(this);
        return e.hasClass("plus") ? (e.parent().find(".sidebar-contant").slideDown(), e.removeClass("plus"), e.addClass("minus")) : (e.parent().find(".sidebar-contant").slideUp(), e.removeClass("minus"), e.addClass("plus")), !1
    })
}), $(document).ready(function() {
    var e = $("#menu");
    $(".ochow-menu-item-toggle").on("click", function() {
        var t = $(this);
        e.find(".dropdown").removeClass("open").find(".ochow-open").removeClass("ochow-open").addClass("ochow-close"), t.hasClass("ochow-close") ? t.removeClass("ochow-close").addClass("ochow-open").parent().addClass("open") : t.removeClass("ochow-open").addClass("ochow-close").parent().removeClass("open")
    })
}), $(document).ready(function() {
    $(".thumbnails-image img").elevateZoom({
        zoomType: "inner",
        cursor: "crosshair",
        gallery: "gallery_01",
        galleryActiveClass: "active",
        imageCrossfade: !0,
        responsive: !0
    })
}), $(document).ready(function() {
    $(".contact-page-contact,.contact-map").wrapAll('<div class="add-map"><div class="row m-0">'), $(".pagination-bar ul").removeClass("pagination"), $(".pagination-bar ul").addClass("pagination-list")
}), $(document).ready(function() {
    bestseller()
}), $(document).ready(function() {
    latest()
}), $(document).ready(function() {
    $("#featured_slide").length > 0 && $("#featured_slide").owlCarousel({
        items: 4,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [980, 3],
        itemsTablet: [620, 2],
        itemsMobile: [479, 1],
        autoPlay: !1,
        navigation: !0,
        pagination: !1
    })
}), $(document).ready(function() {
    $("#special_slide").length > 0 && $("#special_slide").owlCarousel({
        items: 4,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [980, 3],
        itemsTablet: [768, 2],
        itemsMobile: [479, 1],
        autoPlay: !1,
        navigation: !0,
        pagination: !1
    })
}), $(document).ready(function() {
    $(".blog-carousel").length > 0 && $(".blog-carousel").owlCarousel({
        items: 3,
        singleItem: !1,
        navigation: !1,
        navigationText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        pagination: !1,
        itemsDesktop: [1e3, 2],
        itemsDesktopSmall: [979, 2],
        itemsTablet: [768, 2]
    })
}), $(document).ready(function() {
    $(".testimonial-data").length > 0 && $(".testimonial-data").owlCarousel({
        items: 1,
        itemsCustom: !1,
        itemsDesktop: [1199, 1],
        itemsDesktopSmall: [980, 1],
        itemsTablet: [768, 1],
        itemsTabletSmall: !1,
        itemsMobile: [479, 1],
        singleItem: !1,
        itemsScaleUp: !1,
        singleItem: !1,
        navigation: !0,
        navigationText: ['<div class="prev-button">prev</div>', '<div class="next-button">next</div>'],
        pagination: !1,
        animateOut: "fadeOut",
        stagePadding: 30,
        smartSpeed: 450
    })
}), $(document).ready(function() {
    $(".product-additional").length > 0 && $(".product-additional").owlCarousel({
        navigation: !0,
        pagination: !1,
        slideSpeed: 1e3,
        goToFirstSpeed: 1500,
        autoHeight: !0,
        items: 5,
        itemsDesktop: [1199, 4],
        itemsDesktopSmall: [991, 3],
        itemsTablet: [767, 3],
        itemsMobile: [479, 2]
    })
}), $(document).ready(function() {
    $("#related_slide").length > 0 && $("#related_slide").owlCarousel({
        items: 3,
        itemsCustom: !1,
        itemsDesktop: [1199, 4],
        itemsDesktopSmall: [980, 3],
        itemsTablet: [768, 2],
        itemsTabletSmall: !1,
        itemsMobile: [479, 1],
        singleItem: !1,
        itemsScaleUp: !1,
        singleItem: !1,
        navigation: !0,
        pagination: !1
    })
}), $(document).ready(function() {
    $(window).scroll(function() {
        $(this).scrollTop() > 100 ? $("#toTop").fadeIn() : $("#toTop").fadeOut()
    }), $("#toTop").click(function() {
        return $("html, body").animate({
            scrollTop: 0
        }, 800), !1
    })
}), $(document).ready(function() {
    $(".iframe").length > 0 && $(".iframe").magnificPopup({
        type: "ajax",
        fixedContentPos: !0,
        fixedBgPos: !0,
        closeBtnInside: !0,
        closeOnContentClick: !1,
        preloader: !1,
        midClick: !1,
        removalDelay: 300,
        overflowY: "scroll"
    })
}), $(document).ready(function() {
    scrolltop_arrow()
}), $(window).on("load", function() {
    $(".se-pre-con").fadeOut("slow")
}), $(".tab-bar").on("click", ".tab-detail a", function() {
    var e = $(this).attr("data-filter");
    $container.main - pro - part({
        filter: e
    })
});