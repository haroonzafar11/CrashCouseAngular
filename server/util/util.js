exports.formatDate = function(date) {
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    return (Number(monthIndex) + 1) + '/' + day + '/' + year;
  }