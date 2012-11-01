beforeEach(function() {
  this.addMatchers({
      toBeBetween : function(low, high) {
	  return (low <= this.actual && this.actual <= high);
      }
  });
});
