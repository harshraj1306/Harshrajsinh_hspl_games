/**
 * Tic-Tac-Toe
 * -----------
 * https://codepen.io/leesharma/pen/XbBGEj
 *
 * author: Lee Sharma
 * licence: MIT
 *
 *   TODO: refactor (!!!)
 *   TODO: smart algorithms
 *   TODO: select difficulty (easy, medium, hard, impossible)
 *   TODO: select X or O
 */
 'use strict';

 /** Represents the tic-tac-toe game board object */
 var GameBoard = (function() {
   var board;
 
   function GameBoard() {
     board = [
       '', '', '',
       '', '', '',
       '', '', '',
     ];
   }
 
   GameBoard.prototype.addX = function(tile) {
     board[+tile] = 'X';
   };
 
   GameBoard.prototype.addO = function(tile) {
     board[+tile] = 'O';
   };
 
   GameBoard.prototype.listX = function() {
     var xPos = [];
     for (var tile in board) {
       if (board[tile] === 'X') {
         xPos.push(tile);
       }
     }
     return xPos;
   };
 
   GameBoard.prototype.listO = function() {
     var oPos = [];
     for (var tile in board) {
       if (board[tile] === 'O') {
         oPos.push(tile);
       }
     }
     return oPos;
   };
 
   GameBoard.prototype.remainingTiles = function() {
     var remaining = [];
     for (var index in board) {
       if (board[index] === '') {
         remaining.push(index);
       }
     }
     return remaining;
   }
 
   return GameBoard;
 })();
 
 
 // main
 (function($, _) {
   'use strict';
 
   var gameboard = new GameBoard(),
     $tiles = $('.tile'),
     difficulty = 'easy',
     wins = [
       // horizontal
       [0, 1, 2],
       [3, 4, 5],
       [6, 7, 8],
       // vertical
       [0, 3, 6],
       [1, 4, 7],
       [2, 5, 8],
       // diagonal
       [0, 4, 8],
       [2, 4, 6]
     ];
 
   $(document).ready(function() {
     // click interface
     $('.tile').click(function() {
       if ($(this).text() !== '') {
         return;
       }
 
       placeX(this);
       gameboard.addX($(this).attr('id'));
 
       var winner = checkForWin('X');
       if (winner) {
         flash(getTiles(winner));
         return;
       }
 
       console.log('Played:', gameboard.listX());
       console.log('Remaining:', gameboard.remainingTiles());
 
       var o = nextMove(difficulty);
       placeO(o);
       gameboard.addO(o.attr('id'));
       console.log('O move:', o.attr('id'));
 
       var winner = checkForWin('O');
       if (winner) {
         flash(getTiles(winner));
         return;
       }
 
       if (gameboard.remainingTiles().length === 0) {
         flash($('.tile'));
       }
     });
 
     $('#reset').click(function() {
       reset();
     });
   });
 
   function placeX(tile) {
     place('X', tile);
   }
 
   function placeO(tile) {
     place('O', tile);
   }
 
   function place(type, tile) {
     $(tile).text(type);
   }
 
   function check(type, tile) {
     return $('#' + tile).text() === type;
   }
 
   function getTiles(tileNums) {
     var tiles = _.map(tileNums, function(t) {
       return '#' + t;
     }).join(', ');
     return $(tiles)
   }
 
   function flash($tiles) {
     for (var i = 0; i < 3; i += 1) {
       $tiles
         .queue(function() {
           $(this).addClass('winningTile')
           $(this).dequeue()
         })
         .delay(100)
         .queue(function() {
           $(this).removeClass('winningTile')
           $(this).dequeue()
         })
         .delay(100);
     }
 
     $tiles.queue(function() {
       reset();
       $(this).dequeue();
     });
   }
 
   function reset() {
     console.log('Board Reset');
     $tiles.text('');
     gameboard = new GameBoard();
   }
 
   function checkForWin(type) {
     return _.find(wins, function(condition) {
       return condition.every(function(tile) {
         return check(type, tile);
       });
     });
   }
   
   function nextMove(difficulty) {
     switch (difficulty) {
       case ('easy'): return $('#' + _.sample(gameboard.remainingTiles()));
       case ('hard'):
         var $nextMove;
         // find winning move (H)
         // block opponent's winning move (H)
         // fork (create opportunity for two threats to win)
         // block opponant's fork
         // play center if open (M)
         // opposite corner(M)
         // empty corner(M)
         // empty side(M) 
         return $nextMove;
     };
   }
 })(jQuery, _);