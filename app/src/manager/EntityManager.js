define('manager/EntityManager', 
  ['component/StarComponent', 'helper/EntityHelper'], 
  function(StarComponent, EntityHelper) {

    var entities = [];
    var onNewEntities;
    var onRemoveEntity = [];

    return {
      addToWorld: function(world, entitiesToAdd) {
        //clear old entities
        for(var j=0, l=entities.length; j<l; j++) {
          entities[j].removeFromWorld();
        }
        entities = [];
        //add new entities
        for(var i=0, len=entitiesToAdd.length; i<len; i++) {
          entities.push(new StarComponent(world, entitiesToAdd[i].position, i===0).entity);
        }
        if(onNewEntities) {
          onNewEntities(entities);
        }
      },
      checkCollision: function(entity) {
        for(var i=0, len=entities.length; i<len; i++) {
          if(EntityHelper.getDistance(entity, entities[i]) < 0) {
            entities[i].removeFromWorld();
            var e = entities[i];
            entities.splice(i, 1);
            entity.removeFromWorld();
            for(var c=0, l=onRemoveEntity.length; c<l; c++) {
              onRemoveEntity[c](e, len-1);
            }
            return;
          }
        }
      },
      redrawAllEntities: function(world) {
        var temp = [], i, len;
        for(i=entities.length-1; i>-1; i--) {
          entities[i].removeFromWorld();
          temp.push({position: EntityHelper.getPosition(entities[i])});
        }
        entities = [];
        for(i=0, len=temp.length; i<len; i++) {
          entities.push(new StarComponent(world, temp[i].position, i===0).entity);
        }
      },
      onNewEntities: function(callback) {
        onNewEntities = callback;
      },
      onRemoveEntity: function(callback) {
        onRemoveEntity.push(callback);
      }
    };
  }
);