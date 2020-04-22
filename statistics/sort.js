
function sorting() {
  var lines = document.getElementById('sort').value.split('\n');
  lines = lines.filter(function(el) { return el; });
  var list = [];
  for (key in lines) {
    var object = lines[key].split(',');
    list.push({
      name: String(object[0].replace(/"/gi, '')),
      value: parseInt(object[1].replace(/"/gi, ''))
    });
  }
  var groupedListByValue = Object.assign([], groupBy('value', list)).reverse();

  var i = 1;
  for (key in groupedListByValue) {
      for (newKey in groupedListByValue[key]) {
        $('.result').append((newKey == 0 ? i + '. ' : '') + groupedListByValue[key][newKey].name + ' ' + groupedListByValue[key][newKey].value + '&#10;');
      }
      i++;
  }
  
}

function groupBy (key, array) {
    return array.reduce((objectsByKeyValue, obj) => {
        const value = obj[key];
        objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
        return objectsByKeyValue;
    }, {});
}

