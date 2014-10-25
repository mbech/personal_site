$( document ).ready( function(){
  board.zero();
  board.populateDemo();
  view.refresh(board);
  initialBindings();
});
