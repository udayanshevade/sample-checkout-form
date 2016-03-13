var app = {};
app = (function(win) {

  var doc = win.document;

  app.Model = function() {
    var that = this;

    that.shipping = {
      'shipping-name': '',
      'shipping-address-line1': '',
      'shipping-address-line2': '',
      'shipping-city': '',
      'shipping-state': '',
      'shipping-postal-code': '',
      'shipping-country': ''
    };

    that.billing = {
      'billing-name': '',
      'billing-address-line1': '',
      'billing-address-line2': '',
      'billing-city': '',
      'billing-state': '',
      'billing-postal-code': '',
      'billing-country': ''
    };

    that.cloneShipping = function(prefix) {
      var splitName, key;
      var shipping =  app.model.shipping,
        clonedObj = {};
      for (var prop in shipping) {
        splitName = prop.split('-');
        splitName.splice(0, 1, prefix);
        key = splitName.join('-');
        clonedObj[key] = shipping[prop];
      }
      return clonedObj;
    };

  };

  app.Controller = function() {

    var that = this;

    that.init = function() {
      app.model = new app.Model(that);
      app.view = new app.View(that);
    };

    that.applySameAddress = function() {
      app.view.getInfo(app.model.shipping);
      app.model.billing = app.model.cloneShipping('billing');
      app.view.setInfo(app.model.billing);
    };

    that.updateInput = function(e) {
      var el = e.srcElement;
      var id = el.id;
      var type = id.split('-')[0];
      app.model[type][id] = el.value;
      if (type === 'shipping' &&
        app.view.addressCheckbox.checked) {
        that.applySameAddress();
      }
    };

    that.verifyForm = function() {
      var input,
      inputs = doc.getElementsByTagName('input');
      for (var i = 0; i < inputs.length; i++) {
        input = inputs[i];
        if (input.required && !input.value) {
          input.setCustomValidity('Please complete this field.');
        }
      }
    };

    that.init();

  };

  app.View = function(controller) {

    var that = this;

    that.init = function() {
      that.initNav();
      that.initTabs();
      that.initAddressCheckbox();
      that.watchAddress('shipping');
      that.watchAddress('billing');
      that.initFormSubmit();
    };

    that.initNav = function() {
      that.navList = doc.getElementsByClassName('sections-nav__li');
      that.sectionNav = doc.getElementsByClassName('sections-nav__list')[0];
      var nav, navId;
      that.sectionNav.addEventListener('mouseover', function(e) {
        if (e.target && e.target.nodeName == 'LI') {
          navId = e.srcElement.id.split('-')[0];
          that.showActiveTab(navId);
          that.showActiveNav(navId);
        }
      });
      that.showActiveNav('ship');
    };

    that.initTabs = function() {
      that.tabList = doc.getElementsByClassName('form-division');
      that.showActiveTab('ship');
    };

    that.showActiveTab = function(id) {
      var tab, tabId;
      var thisId = id + '-tab';
      for (var i = 0; i < that.tabList.length; i++) {
        tab = that.tabList[i];
        tabId = tab.id;
        tab.classList.toggle('hidden', !(tabId === thisId));
      }
    };

    that.showActiveNav = function(id) {
      var nav, navId;
      var thisId = id + '-nav';
      for (var i = 0; i < that.navList.length; i++) {
        nav = that.navList[i];
        navId = nav.id;
        nav.classList.toggle('sections-nav__li--selected', (navId === thisId));
      }
    };

    that.initAddressCheckbox = function() {
      that.addressCheckbox = doc.getElementById('same-address-checkbox');
      that.addressCheckbox.addEventListener('change', function(e) {
        if (this.checked) {
          app.controller.applySameAddress();
        }
      });
    };

    that.setInfo = function(obj) {
      var detailEl;
      for (var detail in obj) {
        detailEl = doc.getElementById(detail);
        detailEl.value = obj[detail] || '';
      }
    };

    that.getInfo = function(obj) {
      var detailEl;
      for (var detail in obj) {
        detailEl = doc.getElementById(detail);
        obj[detail] = detailEl.value || '';
      }
    };

    that.watchAddress = function(type) {
      var section = doc.getElementById(type);
      var inputs = section.getElementsByClassName('form-entry__input');
      var i, inp, len;
      for (i = 0, len = inputs.length; i < len; i++) {
        inp = inputs[i];
        inp.onchange = controller.updateInput;
      }
    };

    that.initFormSubmit = function() {
      var form = doc.getElementById('main-form');
      form.submit = controller.verifyForm;
    };

    this.init();

  };

  app.controller = new app.Controller();


  return app;

})(this);