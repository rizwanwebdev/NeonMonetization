// 'use strict';
var flg = '0';
document.addEventListener('DOMContentLoaded', function () {
  // feather icon start
  feather.replace();
  // feather icon end
  
  // remove pre-loader start
  setTimeout(function () {
    document.querySelector('.loader-bg').remove();
  }, 400);

  // remove pre-loader end
  if (document.querySelector('body').hasAttribute('data-pc-layout')) {
    if (document.querySelector('body').getAttribute('data-pc-layout') == 'horizontal') {
      var docW = window.innerWidth;
      if (docW <= 1024) {
        add_scroller();
      }
    }
  } else {
    add_scroller();
  }

  var hamburger = document.querySelector('.hamburger:not(.is-active)');
  if (hamburger) {
    hamburger.addEventListener('click', function () {
      if (document.querySelector('.hamburger').classList.contains('is-active')) {
        document.querySelector('.hamburger').classList.remove('is-active');
      } else {
        document.querySelector('.hamburger').classList.add('is-active');
      }
    });
  }
  // Menu overlay layout start
  var temp_overlay_menu = document.querySelector('#overlay-menu');
  if (temp_overlay_menu) {
    temp_overlay_menu.addEventListener('click', function () {
      menu_click();
      if (document.querySelector('.pc-sidebar').classList.contains('pc-over-menu-active')) {
        remove_overlay_menu();
      } else {
        document.querySelector('.pc-sidebar').classList.add('pc-over-menu-active');
        document.querySelector('.pc-sidebar').insertAdjacentHTML('beforeend', '<div class="pc-menu-overlay"></div>');
        document.querySelector('.pc-menu-overlay').addEventListener('click', function () {
          remove_overlay_menu();
          document.querySelector('.hamburger').classList.remove('is-active');
        });
      }
    });
  }
  // Menu overlay layout end

  // Menu collapse click start
  var mobile_collapse_over = document.querySelector('#mobile-collapse');
  if (mobile_collapse_over) {
    mobile_collapse_over.addEventListener('click', function () {
      var temp_sidebar = document.querySelector('.pc-sidebar');
      if (temp_sidebar) {
        if (document.querySelector('.pc-sidebar').classList.contains('mob-sidebar-active')) {
          rm_menu();
        } else {
          document.querySelector('.pc-sidebar').classList.add('mob-sidebar-active');
          document.querySelector('.pc-sidebar').insertAdjacentHTML('beforeend', '<div class="pc-menu-overlay"></div>');
          document.querySelector('.pc-menu-overlay').addEventListener('click', function () {
            rm_menu();
          });
        }
      }
    });
  }
  // Menu collapse click end

  // Menu collapse click start
  var mobile_collapse = document.querySelector('.pc-horizontal #mobile-collapse');
  if (mobile_collapse) {
    mobile_collapse.addEventListener('click', function () {
      if (document.querySelector('.topbar').classList.contains('mob-sidebar-active')) {
        rm_menu();
      } else {
        document.querySelector('.topbar').classList.add('mob-sidebar-active');
        document.querySelector('.topbar').insertAdjacentHTML('beforeend', '<div class="pc-menu-overlay"></div>');
        document.querySelector('.pc-menu-overlay').addEventListener('click', function () {
          rm_menu();
        });
      }
    });
  }
  // Menu collapse click end
  // Horizontal menu click js start
  var topbar_link_list = document.querySelector('.pc-horizontal .topbar .pc-navbar>li>a');
  if (topbar_link_list) {
    topbar_link_list.addEventListener('click', function (e) {
      var targetElement = e.target;
      setTimeout(function () {
        targetElement.parentNodes.children[1].removeAttribute('style');
      }, 1000);
    });
  }
  // Horizontal menu click js end

  // header dropdown scrollbar start
  if (!!document.querySelector('.header-notification-scroll')) {
    new SimpleBar(document.querySelector('.header-notification-scroll'));
  }

  if (!!document.querySelector('.profile-notification-scroll')) {
    new SimpleBar(document.querySelector('.profile-notification-scroll'));
  }
  // header dropdown scrollbar end
  
  // component scrollbar start
  if (!!document.querySelector('.component-list-card .card-body')) {
    new SimpleBar(document.querySelector('.component-list-card .card-body'));
  }
  // component- dropdown scrollbar end

  var sidebar_hide = document.querySelector('#sidebar-hide');
  if (sidebar_hide) {
    sidebar_hide.addEventListener('click', function () {
      if (document.querySelector('.pc-sidebar').classList.contains('pc-sidebar-hide')) {
        document.querySelector('.pc-sidebar').classList.remove('pc-sidebar-hide');
      } else {
        document.querySelector('.pc-sidebar').classList.add('pc-sidebar-hide');
      }
    });
  }

  if (!!document.querySelector('.trig-drp-search')) {
    const search_drp = document.querySelector('.trig-drp-search');
    search_drp.addEventListener('shown.bs.dropdown', (event) => {
      document.querySelector('.drp-search input').focus();
    });
  }

});

// Menu click start
function add_scroller() {
  menu_click();
  // Menu scrollbar start
  if (!!document.querySelector('.navbar-content')) {
    new SimpleBar(document.querySelector('.navbar-content'));
  }
  // Menu scrollbar end
}

// Menu click start
function menu_click() {
  var vw = window.innerWidth;
  var elem = document.querySelectorAll('.pc-navbar li');
  for (var j = 0; j < elem.length; j++) {
    elem[j].removeEventListener('click', function () {});
  }

  var elem = document.querySelectorAll('.pc-navbar li:not(.pc-trigger) .pc-submenu');
  for (var j = 0; j < elem.length; j++) {
    elem[j].style.display = 'none';
  }

  var pc_link_click = document.querySelectorAll('.pc-navbar > li:not(.pc-caption).pc-hasmenu');
  for (var i = 0; i < pc_link_click.length; i++) {
    pc_link_click[i].addEventListener('click', function (event) {
      event.stopPropagation();
      var targetElement = event.target;
      if (targetElement.tagName == 'SPAN') {
        targetElement = targetElement.parentNode;
      }
      if (targetElement.parentNode.classList.contains('pc-trigger')) {
        targetElement.parentNode.classList.remove('pc-trigger');
        slideUp(targetElement.parentNode.children[1], 200);
        window.setTimeout(() => {
          targetElement.parentNode.children[1].removeAttribute('style');
          targetElement.parentNode.children[1].style.display = 'none';
        }, 200);
      } else {
        var tc = document.querySelectorAll('li.pc-trigger');
        for (var t = 0; t < tc.length; t++) {
          var c = tc[t];
          c.classList.remove('pc-trigger');
          slideUp(c.children[1], 200);
          window.setTimeout(() => {
            c.children[1].removeAttribute('style');
            c.children[1].style.display = 'none';
          }, 200);
        }
        targetElement.parentNode.classList.add('pc-trigger');
        var tmp = targetElement.children[1];
        if (tmp) {
          slideDown(targetElement.parentNode.children[1], 200);
        }
      }
    });
  }

  var pc_sub_link_click = document.querySelectorAll('.pc-navbar > li:not(.pc-caption) li.pc-hasmenu');
  for (var i = 0; i < pc_sub_link_click.length; i++) {
    pc_sub_link_click[i].addEventListener('click', function (event) {
      var targetElement = event.target;
      if (targetElement.tagName == 'SPAN') {
        targetElement = targetElement.parentNode;
      }
      event.stopPropagation();
      if (targetElement.parentNode.classList.contains('pc-trigger')) {
        targetElement.parentNode.classList.remove('pc-trigger');
        slideUp(targetElement.parentNode.children[1], 200);
      } else {
        var tc = targetElement.parentNode.parentNode.children;
        for (var t = 0; t < tc.length; t++) {
          var c = tc[t];
          c.classList.remove('pc-trigger');
          if (c.tagName == 'LI') {
            c = c.children[0];
          }
          if (c.parentNode.classList.contains('pc-hasmenu')) {
            slideUp(c.parentNode.children[1], 200);
          }
        }
        targetElement.parentNode.classList.add('pc-trigger');
        var tmp = targetElement.parentNode.children[1];
        if (tmp) {
          tmp.removeAttribute('style');
          slideDown(tmp, 200);
        }
      }
    });
  }
}

// hide menu in mobile menu
function rm_menu() {
  var temp_list = document.querySelector('.pc-sidebar');
  if (temp_list) {
    document.querySelector('.pc-sidebar').classList.remove('mob-sidebar-active');
  }
  if (document.querySelector('.topbar')) {
    document.querySelector('.topbar').classList.remove('mob-sidebar-active');
  }

  document.querySelector('.pc-sidebar .pc-menu-overlay').remove();
  if(document.querySelector('.topbar .pc-menu-overlay')){
    document.querySelector('.topbar .pc-menu-overlay').remove();
  }
}

// remove overlay
function remove_overlay_menu() {
  document.querySelector('.pc-sidebar').classList.remove('pc-over-menu-active');
  if (document.querySelector('.topbar')) {
    document.querySelector('.topbar').classList.remove('mob-sidebar-active');
  }
  document.querySelector('.pc-sidebar .pc-menu-overlay').remove();
  document.querySelector('.topbar .pc-menu-overlay').remove();
}

window.addEventListener('load', function () {
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
  var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
  var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
  });
  var toastElList = [].slice.call(document.querySelectorAll('.toast'));
  var toastList = toastElList.map(function (toastEl) {
    return new bootstrap.Toast(toastEl);
  });
});

// active menu item list start
var elem = document.querySelectorAll('.pc-sidebar .pc-navbar a');
for (var l = 0; l < elem.length; l++) {
  var pageUrl = window.location.href.split(/[?#]/)[0];
  if (elem[l].href == pageUrl && elem[l].getAttribute('href') != '') {
    elem[l].parentNode.classList.add('active');

    elem[l].parentNode.parentNode.parentNode.classList.add('pc-trigger');
    elem[l].parentNode.parentNode.parentNode.classList.add('active');
    elem[l].parentNode.parentNode.style.display = 'block';

    elem[l].parentNode.parentNode.parentNode.parentNode.parentNode.classList.add('pc-trigger');
    elem[l].parentNode.parentNode.parentNode.parentNode.style.display = 'block';
  }
}


// dark switch mode
function dark_mode() {
  if (document.getElementById('dark-mode').checked) {
    layout_change("dark");
  } else {
    layout_change("light");
  }
}


