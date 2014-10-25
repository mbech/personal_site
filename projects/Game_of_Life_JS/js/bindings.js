var initialBindings = function(){
  $('#advance-board').on('click', function(){
    board.nextState();
    view.refresh(board);
  });

  $('#reset-board').on('click', function(){
    if(automate.active){
      $('#automate-board').text("Auto-advance");
      automate.disable();
    }  
    board.zero();
    view.refresh(board);
  });

  $('#randomize-board').on('click', function(){
    board.populateRandom();
    view.refresh(board);
  });

  $('#automate-board').on('click', function(){
    if(automate.active){
      $(this).text("Auto-advance");
      automate.disable();
    }else{
      $(this).text("Pause");
      automate.enable();
      automate.advance();
    }
  });

  $('#timestep-slider').on('change', function(){
    $('#timestep-textbox').text($(this).val());
    automate.set_timestep($(this).val());
  });

  $('#sidebar-hide-strip').on('click', function(){
    $('#sidebar').toggle();
    $('#sidebar-show-strip').toggle();
  });  

  $('#sidebar-show-strip').on('click', function(){
    $(this).toggle();
    $('#sidebar').toggle();
  });  

  $( document ).on('click', '.gol-square', function(){
    var $clicked_cell = $(this);
    var cell_loc = $clicked_cell.data("loc");
    if ($clicked_cell.hasClass("alive")){
      board.setDead(cell_loc);
    }else{
      board.setAlive(cell_loc);
    }
    view.refresh(board); 
  });

};
