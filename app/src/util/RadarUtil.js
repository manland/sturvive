define('util/RadarUtil', 
  ['helper/DomHelper', 'helper/EntityHelper', 'manager/EntityManager'],
  function(DomHelper, EntityHelper, EntityManager) {

	'use strict';

  var div;
  var lastEntities, heightZoneMax = 50, widthZoneMax = 50;
  var entityByDiv = {};
  var camera, fuelZone;
  var divCameraElem;

  var draw = function draw(c, f) {
    camera = c;
    fuelZone = f;
    if(!div) {
      div = DomHelper.addRadar();
      divCameraElem = DomHelper.buildDiv('radarCamera');
      div.appendChild(divCameraElem);
      camera.script.onRun(updateCamera);
    }
    if(lastEntities) {
      refresh(lastEntities);
    }
  };

  var updateCamera = function updateCamera() {
    var pos = EntityHelper.getPosition(camera.entity);
    divCameraElem.style.top = ((pos.z*heightZoneMax) + 50) + 'px';
    divCameraElem.style.left = ((pos.x*widthZoneMax) + 50) + 'px';
  };
      
  var refresh = function refresh(entities) {
    lastEntities = entities;
    if(div) {
      div.setAttribute('nbentities', entities.length);
      div.innerHTML = '';
      entityByDiv = {};
      var zoneSize = 100;
      var maxX=zoneSize, maxZ=zoneSize, i=0, len=entities.length, pos, divElem;
      for(i=0; i<len; i++) {
        pos = EntityHelper.getPosition(entities[i].entity);
        if(Math.abs(pos.x) > maxX) {
          maxX = pos.x;
        }
        if(Math.abs(pos.z) > maxZ) {
          maxZ = pos.z;
        }
      }
      heightZoneMax = zoneSize / (maxZ * 2);
      widthZoneMax = zoneSize / (maxX * 2);
      for(i=0; i<len; i++) {
        divElem = DomHelper.buildDiv('radarEntity');
        pos = EntityHelper.getPosition(entities[i].entity);
        divElem.style.top = ((pos.z*heightZoneMax) + 50) + 'px';
        divElem.style.left = ((pos.x*widthZoneMax) + 50) + 'px';
        div.appendChild(divElem);
        entityByDiv[entities[i].entity.name] = divElem;
      }

      divElem = DomHelper.buildDiv('radarFuelZone');
      pos = EntityHelper.getPosition(fuelZone.entity);
      divElem.style.top = ((pos.z*heightZoneMax) + 50) + 'px';
      divElem.style.left = ((pos.x*widthZoneMax) + 50) + 'px';
      div.appendChild(divElem);

      div.appendChild(divCameraElem);
      updateCamera();
    }
  };

  var remove = function remove(entity, len) {
    if(div && entity && entityByDiv[entity.name]) {
      div.removeChild(entityByDiv[entity.name]);
      delete entityByDiv[entity.name];
      div.setAttribute('nbentities', Object.keys(entityByDiv).length);
    }
  };

  EntityManager.onNewEntities(refresh);
  EntityManager.onRemoveEntity(remove);

  return {

    draw: function(camera, fuelZone) {
      draw(camera, fuelZone);
    }

  };

});