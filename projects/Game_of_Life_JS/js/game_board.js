var board = {
  width: 21,
  height: 21,
  state: Array(441),
  age: 0,
  population: 0
};

board.setAlive = function(coord){
  if(typeof coord === "number"){
    this.state[coord] = 1;
  }else{
    this.state[coord[0]*this.width + coord[1]] = 1;
  }
};

board.setDead = function(coord){
  if(typeof coord === "number"){
    this.state[coord] = 0;
  }else{
    this.state[coord[0]*this.width + coord[1]] = 0;
  }
};

board.zero = function(){
  for (var i = 0; i < this.state.length; i++){
    this.state[i] = 0;
  }
  this.age = 0;
};

board.populateRandom = function(){
  for (var i = 0, l = board.state.length; i < l; i ++) {
    if (Math.random() >= 0.5){
      this.state[i] = 1;
    } else {
      this.state[i] = 0; 
    }
  }
  this.age = 0;
};

board.updatePopulation = function(){
  this.population = this.state.reduce(function(prevValue, currentValue) {
    return prevValue + currentValue;
  });
  return this.population;
};

board.nextState= function(){
  //Iterate over cells and figure out the next board state
  var new_board_state = [];
  for (var i = 0;  i < this.width; i++) {
    for (var j = 0; j < this.height; j++) {
      new_board_state[(i * this.width + j)] = this.nextCellState([i,j]);
    }
  }
  this.state = new_board_state;
  this.age += 1;
};

board.getState = function (cell_loc){
  var row = cell_loc[0];
  var col = cell_loc[1];

  //special boundary cases
  if(row === -1) { row = (this.height - 1);} //off the grid top, wrap to bot
  if(row === this.height) { row = 0 ;} //off the grid bot, wrap to top
  if(col === -1) { col = (this.width - 1);} //off the grid left, wrap to right
  if(col === this.width) { col = 0 ;} //off the grid right, wrap to left

  return this.state[(row * this.width + col)];
};

board.nextCellState = function (cell_loc){
  //return next state of passed-in cell
  //Acts as a sphere, top connects to bot, left to right edge
  var row = cell_loc[0];
  var col = cell_loc[1];
  var neighbors = [0,0,0,0,0,0,0,0]; //top, right, bottom, left, t-r, b-r, b-l, t-l

  //top neighbor check
  if(this.getState([(row - 1), col]) === 1){
    neighbors[0] = 1;
  }
  //right neighbor check
  if(this.getState([row, (col + 1)]) === 1){
    neighbors[1] = 1;
  }
  //bottom neighbor check
  if(this.getState([(row + 1), col]) === 1){
    neighbors[2] = 1;
  }
  //left neighbor check
  if(this.getState([row, (col - 1)]) === 1){
    neighbors[3] = 1;
  }

  //top-right neighbor check
  if(this.getState([(row + 1), (col + 1)]) === 1){
    neighbors[4] = 1;
  }
  //bottom-right neighbor check
  if(this.getState([(row - 1), (col + 1)]) === 1){
    neighbors[5] = 1;
  }
  //bottom-left neighbor check
  if(this.getState([(row - 1), (col - 1)]) === 1){
    neighbors[6] = 1;
  }
  //top-left neighbor check
  if(this.getState([(row + 1), (col - 1)]) === 1){
    neighbors[7] = 1;
  }

  var total_live_neighbors = neighbors.reduce(function(a, b) { return a + b; });
  //Rules are as follows for next state:
  //Any live cell with fewer than two live neighbours dies, as if caused by under-population.
  //Any live cell with more than three live neighbours dies, as if by overcrowding.
  //Any live cell with two or three live neighbours lives on to the next generation.
  //Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
  if(this.getState(cell_loc) === 1){
    if(total_live_neighbors === 2 || total_live_neighbors === 3){
      return 1;
    }
  }
  if(this.getState(cell_loc) === 0 && total_live_neighbors === 3){return 1;}
  //if (total_live_neighbors < 2 || total_live_neighbors > 3){return 0;}
  return 0;
}; 

board.populateDemo = function(){
  var demo1 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  var demo2 = [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; 

  if (Math.random() >= 0.5){
    board.state = demo1;
  } else {
    board.state = demo2;
  }
};

