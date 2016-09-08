d3.xml("logo.svg").mimeType("image/svg+xml").get(function (error, xml) {
  if (error) throw error;
  document
    .getElementById("logo")
    .appendChild(xml.documentElement);

  rippleSurface();
  rotateProp();
});

function rotateProp(){

  var prop = d3.select("#propeller");
  var propCenter = getPropCenterVector();
  var originalTransform = prop.attr("transform");
  var startTransform = 'rotate(0,' + propCenter.x + "," + propCenter.y + ") " + originalTransform;
  var endTransform = 'rotate(3600,' + propCenter.x + "," + propCenter.y + ") " + originalTransform;
  var transition = prop
   .transition()
   .duration(30000)
   .ease(d3.easeLinear);

  transition
   .attrTween("transform", function(){
      return d3.interpolateString(startTransform, endTransform);
   });
}

function rippleSurface(){
  const halftime = 1500;
  var fluid = d3.select("#fluid");
  var originalPath = fluid.attr("d");
  var fluidReverse = d3.select("#fluid-reverse");
  var reversePath = fluidReverse.attr("d");

  repeat();

  function repeat(){
    fluid
      .transition()
      .ease(d3.easeLinear)
      .duration(halftime)
      .attr("d", reversePath)
      .transition()
      .ease(d3.easeLinear)
      .duration(halftime)
      .attr("d", originalPath)
      .on("end", repeat);
  }
}

function createTransformTween(tweenFrom, tweenTo){
    return function(){
        // Return string interpolator
    };         
}

/**
 * Returns object with x and y of propeller center
 */
function getPropCenterVector(sMatrixTransform){
  // Get prop center in form of "matrix(a,b,c,d,e,f)" 
  var sMatrixTransform = d3.select("#propCenter").attr("transform");

  // Convert string matrix transform to array of floats
  var openParens = sMatrixTransform.indexOf("(");
  var stringValues = sMatrixTransform.substring(openParens + 1);
  var stringValues = stringValues.substring(0, stringValues.length - 1);
  var arrayValues = stringValues.split(",");
  var arrayFloats = arrayValues.map(function(stringValue){
    return parseFloat(stringValue);
  })

  // Build vector object
  var vector = {};
  vector.x = arrayFloats[0] + arrayFloats[2] + arrayFloats[4];
  vector.y = arrayFloats[1] + arrayFloats[3] + arrayFloats[5];
  return vector;

}