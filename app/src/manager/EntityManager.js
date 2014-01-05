define('manager/EntityManager', 
  ['component/StarComponent', 'helper/EntityHelper'], 
  function(StarComponent, EntityHelper) {

    var entities = [];
    var onRemoveEntity;

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
      },
      checkCollision: function(entity) {
        for(var i=0, len=entities.length; i<len; i++) {
          if(EntityHelper.getDistance(entity, entities[i]) < 0) {
            entities[i].removeFromWorld();
            entities.splice(i, 1);
            entity.removeFromWorld();
            if(onRemoveEntity) {
              onRemoveEntity(len-1);
            }
            return;
          }
        }
      },
      onRemoveEntity: function(callback) {
        onRemoveEntity = callback;
      }
    };
  }
);