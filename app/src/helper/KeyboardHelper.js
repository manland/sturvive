define('KeyboardHelper', function() {

  var handlers = {};

  document.onkeydown = function(evt) {
    console.log('down', evt.keyCode);
    if(handlers[evt.keyCode]) {
      handlers[evt.keyCode].start.call(handlers[evt.keyCode].ctx);
    }
    //  else if(evt.keyCode === 32) {//SPACE
    //   var to;
    //   if(lastPickedEntity) {
    //     to = EntityHelper.getPosition(lastPickedEntity.beeDataComponent.flower);
    //   } else {
    //     to = {x:-10, y:-10, z:-10};
    //   }
    //   // lastBee = new BeeComponent(goo.world, EntityHelper.getPosition(camera.entity), to, first);
    //   // first = false;
    //   var d = EntityHelper.getDistance(camera.entity, sc.entity);
    //   console.log(d);
    // }
  };

  document.onkeyup = function(evt) {
    console.log('up', evt.keyCode);
    if(handlers[evt.keyCode]) {
      handlers[evt.keyCode].stop.call(handlers[evt.keyCode].ctx);
    }
  };

  return {
    listen: function(touch, startCallback, stopCallback, ctx) {
      handlers[touch] = {start: startCallback, stop: stopCallback, ctx: ctx};
    }
  };

});