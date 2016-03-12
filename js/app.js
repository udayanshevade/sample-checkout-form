(function(win) {

  var app = {};
  var doc = win.document;

  app.View = function(model) {

    var that = this;

    this.init = function() {
      that.initTabs();
    };

    that.initTabs = function() {
      that.sectionNav = doc.getElementsByClassName('sections-nav__li');
      that.shipNav = doc.getElementById('ship-nav');
      that.billNav = doc.getElementById('bill-nav');
      that.confirmNav = doc.getElementById('confirm-nav');
      that.navList = [that.shipNav, that.billNav, that.confirmNav];

      that.shipTab = doc.getElementById('ship-tab');
      that.billTab = doc.getElementById('bill-tab');
      that.confirmTab = doc.getElementById('confirm-tab');
      that.tabList = [that.shipTab, that.billTab, that.confirmTab];

      var nav, navId;
      for (var i = 0; i < 3; i++) {
        nav = that.sectionNav[i];
        nav.addEventListener('click', function(e) {
          navId = e.srcElement.id.split('-')[0];
          that.showActiveTabs(navId);
        });
      }
      that.showActiveTabs('ship');
    };

    that.showActiveTabs = function(id) {
      var tab, tabId;
      var thisId = id + '-tab';
      for (var i = 0; i < that.tabList.length; i++) {
        tab = that.tabList[i];
        tabId = tab.id;
        tab.classList.toggle('hidden', !(tabId === thisId));
      }
    };

    this.init();

  };

  app.View();

  return app;

})(this);