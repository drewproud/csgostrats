if (Meteor.isClient) {
  Template.main.onCreated(function() {
    StratState.setDefaults({
      map: 'Inferno',
      side: 'ct',
    });
  });

  Template.main.helpers({
    selectedMap: function() {
      return StratState.getMap();
    },

    mapList: function () {
      return Strats;
    },

    map: function () {
      return StratState.getMap();
    },

    availableStrats: function() {
      return StratState.getAvailableStrats();
    },

    mapUrl: function() {
      return StratState.getStratImgUrl();
    },

    btnClass: function(thisButtonSide) {
      var side = StratState.getSide();
      if (side === thisButtonSide) {
        return 'btn-info';
      }

      return 'btn-default';
    },

    isSelectedStrat: function(thisStratName) {
      var stratName = StratState.getStratName();

      if (thisStratName === stratName) {
        return 'btn-info';
      }

      return 'btn-default';
    },
  });

  Template.main.events({
    'click .strat-name': function (e) {
      e.preventDefault();
      StratState.setStrat(this.stratName);
    },

    'click .ct-strat-btn': function (e) {
      e.preventDefault();
      StratState.setSide('ct');
      $(e.target).blur();
    },

    'click .t-strat-btn': function (e) {
      e.preventDefault();
      StratState.setSide('t');
      $(e.target).blur();
    },

    'change #map-select': function(e) {
      var mapName = $(e.target).val();
      StratState.setMap(mapName);
    }
  });
}

StratState = {
  _map: null,
  _stratName: null,
  _side: 'ct',
  _dep: new Deps.Dependency(),

  setDefaults: function(def) {
    this._map = def.map;
    this._side = def.side;
    // this._stratName = def.stratName;
    this._dep.changed();
  },

  setMap: function(mapName) {
    this._map = mapName;
    this._stratName = null;
    this._dep.changed();
  },

  setSide: function(side) {
    this._side = side;
    this._stratName = null;
    this._dep.changed();
  },

  setStrat: function(stratName) {
    if (stratName === 'None') {
      this._stratName = null;
    } else {
      this._stratName = stratName;
    }
    this._dep.changed();
  },

  getStratImgUrl: function() {
    this._dep.depend();

    var mapName = this._map;
    var side = this._side;
    var stratName = this._stratName;

    var map = _.findWhere(Strats, { mapName: mapName });
    var strat = !!map ? _.findWhere(map.strats, { side: side, stratName: stratName }) : null;

    if (strat) {
      return strat.url;
    } else if (stratName) {
      return '';
    } else if (map) {
      return map.defaultMapUrl;
    } else {
      return '';
    }
  },

  getMap: function() {
    this._dep.depend();
    return this._map;
  },

  getStratName: function() {
    this._dep.depend();
    return this._stratName;
  },

  getSide: function() {
    this._dep.depend();
    return this._side;
  },

  getAvailableStrats: function() {
    this._dep.depend();
    var side = this._side;
    var mapName = this._map;

    var mapStrats = _.findWhere(Strats, { mapName: mapName });

    if (!mapStrats) {
      return [];
    }

    var strats = _.where(mapStrats.strats, { side: side });

    strats.unshift({
      stratName: 'None',
      side: null,
      url: null,
    });

    return strats;
  },
};

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
