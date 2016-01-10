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
      console.log(map);
      return map;
    },

    strat: function() {
      var stratName = Session.get('strat');
      var strat = _.findWhere(this.strats, { stratName: stratName });
      if (stratName && strat) {
        return strat;
      } else if (this.strats && this.strats.length) {
        // return default if none selected
        return this.strats[0];
      }
    }
  });

  Template.main.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
