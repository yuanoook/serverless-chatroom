$.extend({
  renderFilters: {
    "isFalse": function(val){
        return !val;
    },
    "dateFormat": function(timestamp){
        return moment(timestamp).format('MMMM Do YYYY, h:mm:ss a')
    }
  }
});