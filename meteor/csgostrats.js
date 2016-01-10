if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('map', 'Dust 2');
  Session.setDefault('side', 'ct');
  Session.setDefault('strat', 'Rash B No Stop');

  Template.main.helpers({
    mapList: function () {
      return Strats;
    },

    map: function () {
      var selectedMap = Session.get('map');
      var map = _.findWhere(Strats, { mapName: selectedMap });
      return map;
    },

    availableStrats: function() {
      var side = Session.get('side');
      return _.where(this.strats, { side: side });
    },

    strat: function() {
      var stratName = Session.get('strat');
      var side = Session.get('side');
      var strat = _.findWhere(this.strats, { stratName: stratName, side: side });

      if (stratName && strat) {
        return strat;
      // } else if (this.strats && this.strats.length) {
      //   // return default if none selected
      //   return this.strats[0];
      } else {
        return '';
      }
    },

    btnClass: function(thisButtonSide) {
      var side = Session.get('side');
      if (side === thisButtonSide) {
        return 'btn-info';
      }

      return 'btn-default';
    },

    isSelectedStrat: function(thisStratName) {
      var stratName = Session.get('strat');

      if (thisStratName === stratName) {
        return 'btn-info';
      }

      return 'btn-default';
    },
  });

  Template.main.events({
    'click .strat-name': function (e) {
      e.preventDefault();
      Session.set('strat', this.stratName);
    },

    'click .ct-strat-btn': function (e) {
      e.preventDefault();
      Session.set('side', 'ct');
      $(e.target).blur();
    },

    'click .t-strat-btn': function (e) {
      e.preventDefault();
      Session.set('side', 't');
      $(e.target).blur();
    },
  });

  function setDefaultStrat() {
    var stratName = Session.get('strat');
    var mapName = Session.get('map');
  }
}


if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
