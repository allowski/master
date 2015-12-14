
var App = {
	
	"afterRenderMain" : function(){
		
		$("#qtde").text(this.getTodayVisitCount());
		
	}
	
	"getTodayVisitCount": function(){
		
		var retVal = 0;
		
		for(x in remember.collections.form_12){
			
			var currentRow = remember.collections.form_12[x];
			
			if(currentRow.control3 == "2015-12-14"){
				
				retVal+=1;
				
			}
			
		}
		
		return retVal;
		
	}
	
};
