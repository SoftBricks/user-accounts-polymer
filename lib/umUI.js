this.UmUi = (function() {
  function UmUi() {}

  UmUi.dialog = {};

  UmUi.toast = function(text, className) {
    var toast;
    toast = $("[um-toast]")[0];
    toast.text = text;
    return toast.show();
  };

  UmUi.showDialog = function(opts) {
    this.dialog = $("[um-dialog]")[0];
    this.dialog.heading = opts.heading;
    Session.set("um.ui.dialogData", opts.data);
    Session.set("um.ui.dialogTemplate", opts.template);
    Session.set("um.ui.dialogFullOnMobile", opts.fullOnMobile != null);
    return Tracker.afterFlush((function(_this) {
      return function() {
        return _this.dialog.open();
      };
    })(this));
  };

  UmUi.closeDialog = function() {
    return this.dialog.close();
  };

  return UmUi;

})();

Router.onBeforeAction(function () {
  Session.set('globalFabVisible', false);
  Session.set('globalFabAttributes', {});
  Template.umGlobalFab.eventHandler = function(){};
  this.next();
});

Template.umPolymerLayout.helpers({
  umDialogTemplate: function() {
    return Session.get("um.ui.dialogTemplate");
  },
  umDialogData: function() {
    return Session.get("um.ui.dialogData");
  },
  umDialogFullOnMobile: function() {
    return Session.get("um.ui.dialogFullOnMobile");
  }
});

Template.umPolymerLayout.events({
  "core-overlay-close-completed [um-dialog]": function(e) {
    Session.set("um.ui.dialogTemplate", null);
    Session.set("um.ui.dialogData", null);
    return Session.set("um.ui.dialogFullOnMobile", null);
  },
  "tap [data-open-um-dialog]": function(e) {
    var node;
    node = $(e.target);
    return UmUi.showDialog({
      heading: node.data("heading"),
      template: node.data("template"),
      data: node.data("useContext") != null ? this : void 0,
      fullOnMobile: node.data("fullOnMobile")
    });
  }
});