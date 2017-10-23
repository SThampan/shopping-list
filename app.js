var state={
	listItems : []
};
//add items to state
var addItem=function(state,item)
{
	var found=false;
	for (var i=0; i<state.listItems.size;i++){
		if (item == state.listItems[i])
			 found= true;
	}
	if (found===false)
		state.listItems.push(item);
}
//render functions
var renderShoppingList=function(state,element)
{
	
	var itemsHtml=state.listItems.map(function(item){
		return '<li><span class="shopping-item">'+item+
        '</span> <div class="shopping-item-controls">'
          +'<button class="shopping-item-toggle">'
           +'<span class="button-label">check</span>'
          +'</button>'
         +'<button class="shopping-item-delete">'
           +'<span class="button-label">delete</span>'
         +'</button></div></li>';});
	
	element.html(itemsHtml);
	
} 
//form submit
$('#js-shopping-list-form').submit(function(event)
{
	
	event.preventDefault();
	 addItem(state,$('#shopping-list-entry').val());
	renderShoppingList(state, $('.shopping-list'));
});
$(".shopping-list").on('click','.shopping-item-toggle',function(event)
{
		var clickedElement=$(this);
		$(clickedElement).closest("li").children(".shopping-item").toggleClass("shopping-item__checked");
});
$(".shopping-list").on('click','.shopping-item-delete',function(event)
{
	 	var clickedElement=$(this);
	 	var itemName=$(this).closest("li").children(".shopping-item").val();
	 	$(this).closest("li").remove();
	 	state.listItems.pop(itemName);
});