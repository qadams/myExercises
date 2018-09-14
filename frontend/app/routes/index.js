import Ember from 'ember';


var defaultitems = Ember.A([
  {
    title: 'CYBR 8470',
    description: 'Exciting stuff!',
    img: 'img/NGC-logo.png',
    link: '',
    link_external: 'http://mlhale.github.io/CYBR8470'

  },
	{
		title: 'Masonry-based Event Display Template',
		description: 'You are seeing this template, because you haven\'t loaded any data into your client yet. This Template will be used to display events as they load from your REST API.',
    img: 'img/template-icon.svg',
    link: 'index'

	},


]);

export default Ember.Route.extend({
  getData(){
    var items = Ember.A([]);
    return Ember.$.get('/api/events').then(function(events){
      events.forEach(function(event){
        // console.log(event);
        items.addObject({
          id: event.pk,
          eventtype: event.fields.eventtype,
          requestor: event.fields.requestor,
          timestamp: event.fields.timestamp,
          userid: event.fields.userid,
          img: 'img/event-icon.jpg',
          link: 'index'
        });
      });
      return items.reverse()
    }, function(msg){//error
      console.log('Error loading events:');
      console.log(msg.statusText);
    });
  },
	model() {
    return this.getData();
	},
  setupController(controller, model){
    this._super(controller, model);
    controller.set('defaultitems', defaultitems);
    var route = this;
    setInterval(Ember.run.later(route, function() {
      // code here will execute within a RunLoop about every minute
      if(controller.get('auth.isLoggedIn')){
        route.getData().then(function(data){
          if(data[0].id!=controller.get('content')[0].id){
            controller.get('content').insertAt(0, data[0]);
          }
        });
      }
    }, 5), 3000);
  }
});
