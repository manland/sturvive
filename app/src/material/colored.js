define('material/Colored', [
  'goo/renderer/Material',
  'goo/renderer/shaders/ShaderLib'
], function(Material, ShaderLib) {

  var update = function update(mat, R, G, B, A) {
    mat.uniforms = {
      materialAmbient: [R, G, B, A],
      materialDiffuse: [R-0.1, G-0.1, B-0.1, A],
      materialEmissive: [0, 0, 0, A],
      materialSpecular: [0, 0, 0, A],
      materialSpecularPower: 2,
      opacity: A
    };
    return mat;
  };

  return {
    build: function(R, G, B, A) {
      var mat = Material.createMaterial( ShaderLib.simpleLit, 'BoxMaterial');
      update(mat, R, G, B, A);
      return mat;
    },
    update: function(mat, R, G, B, A) {
      return update(mat, R, G, B, A);
    },
    updateProp: function(mat, prop, val) {
      mat.uniforms[prop] = val;
      return mat;
    },
    buildToon: function() {
      var mat = Material.createMaterial( ShaderLib.toon, 'ToonMaterial');
      mat.uniforms = {
        HighlightColour: [0, 0.2, 0, 0],
        MidColour: [0, 0.1, 0, 0],
        ShadowColour: [0, 0.1, 0, 0],
        HighlightSize: 1,
        OutlineWidth: 1,
        ShadowSize: 0.12
      };
      return mat;
    },
    buildStem: function() {
      var mat = Material.createMaterial( ShaderLib.simpleLit, 'StemMaterial');
      mat.uniforms = {
        materialAmbient: [0, 0.2, 0, 0],
        materialDiffuse: [0, 0.1, 0, 0],
        materialEmissive: [0, 0.1, 0, 0],
        materialSpecular: [0, 0.1, 0, 0],
        materialSpecularPower: 1,
        opacity: 1
      };
      return mat;
    },
    buildSoil: function() {
      var mat = Material.createMaterial( ShaderLib.simpleLit, 'SoilMaterial');
      mat.uniforms = {
        materialAmbient: [0, 0.3, 0, 0],
        materialDiffuse: [0, 0.1, 0, 0],
        materialEmissive: [0, 0.1, 0, 0],
        materialSpecular: [0, 0, 0, 0],
        materialSpecularPower: 0,
        opacity: 1
      };
      return mat;
    },
    buildBee: function() {
      var mat = Material.createMaterial( ShaderLib.simpleLit, 'SoilMaterial');
      mat.uniforms = {
        materialAmbient: [0, 0, 0, 0],
        materialDiffuse: [1, 1, 0, 0],
        materialEmissive: [0, 0, 0, 0],
        materialSpecular: [0, 0, 0, 0],
        materialSpecularPower: 0,
        opacity: 1
      };
      return mat;
    },
    buildStar: function() {
      var mat = Material.createMaterial( ShaderLib.simpleLit, 'StarMaterial');
      mat.uniforms = {
        materialAmbient: [0.3, 0, 0, 0],
        materialDiffuse: [0.3, 0.7, 0, 0],
        materialEmissive: [0.4, 0, 0, 0],
        materialSpecular: [0, 0, 0, 0],
        materialSpecularPower: 0,
        opacity: 1
      };
      return mat;
    }
  };

});