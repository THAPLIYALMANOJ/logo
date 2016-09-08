d3.xml("logo.svg").mimeType("image/svg+xml").get(function (error, xml) {
  if (error) throw error;
  document
    .getElementById("logo")
    .appendChild(xml.documentElement);

  rotateProp();
});

function rotateProp(){
  var propCenterTransform = d3.select("#propCenter").attr("transform");
  var propCenter = getMatrixAsObject(propCenterTransform);

  // var propCenterDOMX = d3.transform(propCenterDOMTransform).translate;
  // var propCenterDOM = document.getElementById("propCenter").getBoundingClientRect();
  // var propCenterDOMX = ((propCenterDOM.right - propCenterDOM.left) / 2) + propCenterDOM.left;
  // var propCenterDOMY = ((propCenterDOM.top - propCenterDOM.bottom) / 2) + propCenterDOM.bottom;

  var prop = d3.select("#propeller");
  var originalTransform = prop.attr("transform");
  var startTransform = 'rotate(0,' + propCenter.x + "," + propCenter.y + ") " + originalTransform;
  var endTransform = 'rotate(3600,' + propCenter.x + "," + propCenter.y + ") " + originalTransform;
  var t1 = prop
   .transition()
   .duration(8000)
   .ease(d3.easeLinear);

  t1
   .attrTween("transform", function(){
      return d3.interpolateString(startTransform, endTransform);
   });
}


function createTransformTween(tweenFrom, tweenTo){
    return function(){
        // Return string interpolator
    };         
}

/**
 * Takes a string in form of "matrix(0.01,0,0,0.01,301.18303,421.24613)" and returns object
 */
function getMatrixAsObject(sMatrixTransform){
  var matrixValues = {};

  var openParens = sMatrixTransform.indexOf("(");
  var stringValues = sMatrixTransform.substring(openParens + 1);
  var stringValues = stringValues.substring(0, stringValues.length - 1);
  var arrayValues = stringValues.split(",");

  // TODO add other values later
  matrixValues.x = arrayValues[4];
  matrixValues.y = arrayValues[5];
  return matrixValues;

}