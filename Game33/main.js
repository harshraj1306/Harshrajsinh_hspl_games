var CardModel = Backbone.Model.extend({
    parameters: []
  });
  
  var CardView = Backbone.View.extend({
    
    model : CardModel,
  
    initialize: function(){
       this.listenTo(this.model, 'change', this.update);
    },
    
    update: function(){
      
      var data = this.model.toJSON().arguments;
  
      var $card = this.$el.find('.card');
      
      var classes = ['card'];
      
      var flip = _.find(data,function(i){ return i.name=="flip" });
      if(flip) classes.push('flip');
      
      var spin = _.find(data,function(i){ return i.name=="spin" });
      if(spin) classes.push('spin');
      
      var turn = _.find(data,function(i){ return i.name=="turn" });
      if(turn && turn.value!=='default') classes.push('turn-'+turn.value);
      
      var twist = _.find(data,function(i){ return i.name=="twist" });
      if(twist) classes.push('twist');
      
      $card[0].className = classes.join(' ');
      
      var _3d = _.find(data,function(i){ return i.name=="3d" });
      if(_3d) this.$el.addClass('cards--debug');
      else this.$el.removeClass('cards--debug');
      
      return;
    }
                                       
  });
    
  var CardFormView = Backbone.View.extend({
  
      model : CardModel,
   
    events: {
        'change input': 'onDataChange'
    },
    
    render: function(){
      return this;
    },
    
      initialize: function(options){    
      this.serializeData();
      },
    
    onDataChange: function(e){
      this.serializeData();
    },
    
    serializeData: function(){
  
      var $el = this.$el;
      console.log($el.serializeArray());
      var data = _.map(_.groupBy($el.serializeArray(),'name'), function(o){
        return { name: o[0].name, value: _.map(o,'value').join(',') }
      });
  
      console.log(data);
      
      this.model.set('arguments',data);
      
    }
  
  });
  
  
  var m = new CardModel();
  
  var v = new CardView({
    'el': $('.cards'),
    'model': m
  });
  
  var v = new CardFormView({
    'el': $('form'),
    'model': m
  });
  
  