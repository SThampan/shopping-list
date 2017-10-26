var state=[];
//add items to state
function createItem(item) {
  return {
    name: item,
    isChecked: false,
    unCheck: function() {
      this.isChecked=!(this.isChecked);
    }
    }
  };
var addItem=function(state,newItem)
{
	var found=false;
	state.forEach(function (item){
		if (item.name===newItem)
			found=true;
	} )
	if (found===false)
		state.push(createItem(newItem));
}
//render functions
var renderShoppingList=function(state,element)
{
	
	
	var itemsHtml=state.map(function(item){
		var itemToggle ='';
	//	console.log(item.name + ' '+ item.isChecked);
		if (item.isChecked===true)
		{
			 itemToggle ='shopping-item__checked';
		}
			return '<li><span class="shopping-item '+itemToggle+' ">'+item.name+
        '</span> <div class="shopping-item-controls">'
          +'<button class="shopping-item-toggle ">'
           +'<span class="button-label">check</span>'
          +'</button>'
         +'<button class="shopping-item-delete">'
           +'<span class="button-label">delete</span>'
         +'</button></div></li>';});
	//console.log(itemsHtml);
	
	element.html(itemsHtml);
	
} 
//form submit
$('#js-shopping-list-form').submit(function(event)
{
	
	event.preventDefault();
	 addItem(state,$('#shopping-list-entry').val());
	renderShoppingList(state, $('.shopping-list'));
	$('#shopping-list-entry').val('');
});
$(".shopping-list").on('click','.shopping-item-toggle',function(event)
{



		var clickedElement=$(this);
		var closestElement=$(clickedElement).closest("li").children(".shopping-item");
		$(closestElement).toggleClass("shopping-item__checked");
		state.forEach(function(item){
			if (item.name===$(closestElement).text())
					item.unCheck();
		})
		renderShoppingList(state, $('.shopping-list'));
});
$(".shopping-list").on('click','.shopping-item-delete',function(event)
{
		//console.log('before delete',state);
	
	  	var clickedElement=$(this);
	 	var itemName=$(this).closest("li").children(".shopping-item").text();
	 	//console.log(itemName);
	 	var i=state.find(function(item){
	 		//console.log(item.name+' '+itemName);
	 			return (item.name===itemName);

		})
		//console.log(i);
		var deleteIndex=state.indexOf(i);
		//console.log(deleteIndex);
		 state.splice(deleteIndex,1);
		//console.log('after delete',state);
	renderShoppingList(state, $('.shopping-list')); 

});
