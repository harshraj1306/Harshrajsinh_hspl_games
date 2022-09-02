var app = angular.module('StarWarsToe', []);


app.controller('swtController', function($scope) {
  
  
  
  $scope.sides = {
    '0': 'https://useful-info.github.io/sites/mamarada/images/cell-bg.jpg',
    '1': 'https://useful-info.github.io/sites/mamarada/images/obi.png',
    '2': 'https://useful-info.github.io/sites/mamarada/images/darth.png'
  };
   
  
  $scope.cells = ["0,0", "0,1", "0,2", "1,0", "1,1", "1,2", "2,0", "2,1", "2,2"];
  
  
  $scope.started = false;
  $scope.sideChosen = false;
  
  
  $scope.reset = function() {
    $scope.isWin = false;
    $scope.isDraw = false;
    $scope.isLose = false;
    $scope.myTurn = true;
    $scope.board = [['0', '0', '0'], ['0', '0', '0'], ['0', '0', '0']];
    for (var id = 0; id < 9; id++) {
      $('#' + id).removeClass('pressed');
    };
    
  };
  
  
  $scope.replay = function(classname) {
     $('.' + classname).fadeOut({
       duration: 200,
       done: function() {
         $scope.reset();
         $scope.$apply();
         $('.board').fadeIn({
           duration: 200,
           done: function() {
             $scope.sideChosen = true;
             $scope.$apply();
           }
         });
         
       }
     });
  };
  
  
  function ifWin() {
    if (($scope.board[0][0] === $scope.board[0][1] && $scope.board[0][1] === $scope.board[0][2] && $scope.board[0][0] !== '0') ||
       ($scope.board[1][0] === $scope.board[1][1] && $scope.board[1][1] === $scope.board[1][2] && $scope.board[1][0] !== '0') ||
       ($scope.board[2][0] === $scope.board[2][1] && $scope.board[2][1] === $scope.board[2][2] && $scope.board[2][0] !== '0') ||
       ($scope.board[0][0] === $scope.board[1][0] && $scope.board[1][0] === $scope.board[2][0] && $scope.board[0][0] !== '0') ||
       ($scope.board[0][1] === $scope.board[1][1] && $scope.board[1][1] === $scope.board[2][1] && $scope.board[0][1] !== '0') ||
       ($scope.board[0][2] === $scope.board[1][2] && $scope.board[1][2] === $scope.board[2][2] && $scope.board[0][2] !== '0') ||
       ($scope.board[0][0] === $scope.board[1][1] && $scope.board[1][1] === $scope.board[2][2] && $scope.board[0][0] !== '0') ||
       ($scope.board[0][2] === $scope.board[1][1] && $scope.board[1][1] === $scope.board[2][0] && $scope.board[0][2] !== '0')) {
      console.log('You win!');
      $scope.isWin = true;
    }
  };
  
  
  function ifDraw() {
    var empty1 = [];
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        if ($scope.board[i][j] === '0') {
          empty1.push([i, j]);
        }
      }
    }
    if (empty1.length === 0) {
      $scope.draw();
    } else {
      $scope.myTurn = true;
    }
  };
  
  
  $scope.start = function(classname) {
    $('.' + classname).fadeOut({
      duration: 200,
      done: function() {
        $scope.reset();
        $scope.started = false;
        $scope.sideChosen = false;
        $scope.$apply();
        $('.choose-block').fadeIn({
          duration: 200,
          done: function() {
            $scope.started = true;
            $scope.$apply();
          }
        });
        console.log('Let the battle begins!');
      }
    });
  };
  
  
  $('.obi').click(function() {
    $scope.side = '1';
    $scope.aiSide = '2';
    $scope.reset();
    $('.choose-block').fadeOut({
      duration: 200,
      done: function() {
        $scope.sideChosen = true;
        $scope.$apply();
      }
    })
    console.log('May the force be with you!');
  });
  
  
  $('.darth').click(function() {
    $scope.side = '2';
    $scope.aiSide = '1';
    $scope.reset();
    $scope.sideChosen = true;
    $scope.$apply();
    console.log('Do not fail me!');
  });
 
  
  $scope.lose = function() {
    $scope.myTurn = false;
    $scope.isLose = true;
    console.log('You lose!');
  };
  
  
  $scope.draw = function() {
    $scope.isDraw = true;
    $scope.myTurn = false;
    console.log('Draw!')
  };
  
  
  // Here is AI tactics
  $scope.aiTurn = function() {
    // First AI tries to find if it can win with this turn
    if ((($scope.board[0][1] === $scope.aiSide && $scope.board[0][2] === $scope.aiSide) || ($scope.board[1][0] === $scope.aiSide && $scope.board[2][0] === $scope.aiSide) || ($scope.board[1][1] === $scope.aiSide && $scope.board[2][2] === $scope.aiSide)) && !$('#0').hasClass('pressed')) {
      $scope.aiTakeTurn(0, 0, '#0');
      $scope.lose();
      return;
    } else if ((($scope.board[0][0] === $scope.aiSide && $scope.board[2][0] === $scope.aiSide) || ($scope.board[1][1] === $scope.aiSide && $scope.board[1][2] === $scope.aiSide)) && !$('#3').hasClass('pressed')) {
      $scope.aiTakeTurn(1, 0, '#3');
      $scope.lose();
      return;
    } else if ((($scope.board[0][0] === $scope.aiSide && $scope.board[1][0] === $scope.aiSide) || ($scope.board[2][1] === $scope.aiSide && $scope.board[2][2] === $scope.aiSide) || ($scope.board[1][1] === $scope.aiSide && $scope.board[0][2] === $scope.aiSide)) && !$('#6').hasClass('pressed')) {
      $scope.aiTakeTurn(2, 0, '#6');
      $scope.lose();
      return;
    } else if ((($scope.board[0][0] === $scope.aiSide && $scope.board[0][2] === $scope.aiSide) || ($scope.board[1][1] === $scope.aiSide && $scope.board[2][1] === $scope.aiSide)) && !$('#1').hasClass('pressed')) {
      $scope.aiTakeTurn(0, 1, '#1');
      $scope.lose();
      return;
    } else if ((($scope.board[0][0] === $scope.aiSide && $scope.board[2][2] === $scope.aiSide) || ($scope.board[2][0] === $scope.aiSide && $scope.board[0][2] === $scope.aiSide) || ($scope.board[0][1] === $scope.aiSide && $scope.board[2][1] === $scope.aiSide) || ($scope.board[1][0] === $scope.aiSide && $scope.board[1][2] === $scope.aiSide)) && !$('#4').hasClass('pressed')) {
      $scope.aiTakeTurn(1, 1, '#4');
      $scope.lose();
      return;
    } else if ((($scope.board[0][1] === $scope.aiSide && $scope.board[1][1] === $scope.aiSide) || ($scope.board[2][0] === $scope.aiSide && $scope.board[2][2] === $scope.aiSide)) && !$('#7').hasClass('pressed')) {
      $scope.aiTakeTurn(2, 1, '#7');
      $scope.lose();
      return;
    } else if ((($scope.board[0][0] === $scope.aiSide && $scope.board[0][1] === $scope.aiSide) || ($scope.board[1][2] === $scope.aiSide && $scope.board[2][2] === $scope.aiSide) || ($scope.board[1][1] === $scope.aiSide && $scope.board[2][0] === $scope.aiSide)) && !$('#2').hasClass('pressed')) {
      $scope.aiTakeTurn(0, 2, '#2');
      $scope.lose();
      return;
    } else if ((($scope.board[0][2] === $scope.aiSide && $scope.board[2][2] === $scope.aiSide) || ($scope.board[1][0] === $scope.aiSide && $scope.board[1][1] === $scope.aiSide)) && !$('#5').hasClass('pressed')) {
      $scope.aiTakeTurn(1, 2, '#5');
      $scope.lose();
      return;
    } else if ((($scope.board[0][2] === $scope.aiSide && $scope.board[1][2] === $scope.aiSide) || ($scope.board[2][0] === $scope.aiSide && $scope.board[2][1] === $scope.aiSide) || ($scope.board[1][1] === $scope.aiSide && $scope.board[0][0] === $scope.aiSide)) && !$('#8').hasClass('pressed')) {
      $scope.aiTakeTurn(2, 2, '#8');
      $scope.lose();
      return;
    } 
    // Then AI tries to prevent us from winning
    else if ((($scope.board[0][1] === $scope.side && $scope.board[0][2] === $scope.side) || ($scope.board[1][0] === $scope.side && $scope.board[2][0] === $scope.side) || ($scope.board[1][1] === $scope.side && $scope.board[2][2] === $scope.side)) && !$('#0').hasClass('pressed')) {
      $scope.aiTakeTurn(0, 0, '#0');
      ifDraw();
      return;
    } else if ((($scope.board[0][0] === $scope.side && $scope.board[2][0] === $scope.side) || ($scope.board[1][1] === $scope.side && $scope.board[1][2] === $scope.side)) && !$('#3').hasClass('pressed')) {
      $scope.aiTakeTurn(1, 0, '#3');
      ifDraw();
      return;
    } else if ((($scope.board[0][0] === $scope.side && $scope.board[1][0] === $scope.side) || ($scope.board[2][1] === $scope.side && $scope.board[2][2] === $scope.side) || ($scope.board[1][1] === $scope.side && $scope.board[0][2] === $scope.side)) && !$('#6').hasClass('pressed')) {
      $scope.aiTakeTurn(2, 0, '#6');
      ifDraw();
      return;
    } else if ((($scope.board[0][0] === $scope.side && $scope.board[0][2] === $scope.side) || ($scope.board[1][1] === $scope.side && $scope.board[2][1] === $scope.side)) && !$('#1').hasClass('pressed')) {
      $scope.aiTakeTurn(0, 1, '#1');
      ifDraw();
      return;
    } else if ((($scope.board[0][0] === $scope.side && $scope.board[2][2] === $scope.side) || ($scope.board[2][0] === $scope.side && $scope.board[0][2] === $scope.side) || ($scope.board[0][1] === $scope.side && $scope.board[2][1] === $scope.side) || ($scope.board[1][0] === $scope.side && $scope.board[1][2] === $scope.side)) && !$('#4').hasClass('pressed')) {
      $scope.aiTakeTurn(1, 1, '#4');
      ifDraw();
      return;
    } else if ((($scope.board[0][1] === $scope.side && $scope.board[1][1] === $scope.side) || ($scope.board[2][0] === $scope.side && $scope.board[2][2] === $scope.side)) && !$('#7').hasClass('pressed')) {
      $scope.aiTakeTurn(2, 1, '#7');
      ifDraw();
      return;
    } else if ((($scope.board[0][0] === $scope.side && $scope.board[0][1] === $scope.side) || ($scope.board[1][2] === $scope.side && $scope.board[2][2] === $scope.side) || ($scope.board[1][1] === $scope.side && $scope.board[2][0] === $scope.side)) && !$('#2').hasClass('pressed')) {
      $scope.aiTakeTurn(0, 2, '#2');
      ifDraw();
      return;
    } else if ((($scope.board[0][2] === $scope.side && $scope.board[2][2] === $scope.side) || ($scope.board[1][0] === $scope.side && $scope.board[1][1] === $scope.side)) && !$('#5').hasClass('pressed')) {
      $scope.aiTakeTurn(1, 2, '#5');
      ifDraw();
      return;
    } else if ((($scope.board[0][2] === $scope.side && $scope.board[1][2] === $scope.side) || ($scope.board[2][0] === $scope.side && $scope.board[2][1] === $scope.side) || ($scope.board[1][1] === $scope.side && $scope.board[0][0] === $scope.side)) && !$('#8').hasClass('pressed')) {
      $scope.aiTakeTurn(2, 2, '#8');
      ifDraw();
      return;
    } 
    // Then AI tries to get center
    else if (!$('#4').hasClass('pressed')) {
      $scope.aiTakeTurn(1, 1, '#4');
      return;
    }
    // Then AI checks free places
    var empty = [];
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        if ($scope.board[i][j] === '0') {
          empty.push([i, j]);
        }
      }
    }
    // If none - it is a draw
    if (empty.length === 0) {
      $scope.draw();
    } 
    // If just one - AI takes it (not sure if it is possible while player always plays first but just let it be here =) )
    else if (empty.length === 1) {
      $scope.board[empty[0][0]][empty[0][1]] = $scope.aiSide;
      $scope.draw();
    } 
    // Finally AI plays randomly
    else {
      var rnd = Math.floor(Math.random() * empty.length);
      var tempID = '#' + $scope.cells.indexOf(empty[rnd].toString());
      $scope.aiTakeTurn(empty[rnd][0], empty[rnd][1], tempID);
      $scope.myTurn = true;
    }
  };
    
  
  
  $scope.playTurn = function(a, b, id) {
    if ($scope.myTurn && !$('#' + id).hasClass('pressed')) {
      $('#' + id).fadeOut({
        duration: 100,
        done: function() {
          $scope.board[a][b] = $scope.side;
          $('#' + id).addClass('pressed');
          $('#' + id).fadeIn(100);
          $scope.myTurn = false;
          ifWin();
          if (!$scope.isWin) {
            $scope.aiTurn();
          }
          $scope.$apply();
        }
      });
    }
  };
  
  
  $scope.aiTakeTurn = function(a, b, id) {
    $(id).fadeOut({
      duration: 100,
      done: function() {
        $scope.board[a][b] = $scope.aiSide;
        $(id).addClass('pressed');
        $(id).fadeIn(100);
        $scope.myTurn = true;
        $scope.$apply();
      }
    });
  };
  
});