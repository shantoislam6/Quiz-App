
//global controller of  container
ngApp.controller("quizController",['$scope',function ($this) { 
    
    $this.getLearnt = function(){
        $("#hoveAnim").animate({
            left : $('#forGetStart').position().left,
            width : $('#forGetStart').outerWidth()
        })
    }

    $('#hoveAnim').animate({
        width :  $('#home').outerWidth() + 'px',
        left : $('#home').position().left + 'px'
    },0);

 }]);

 ngApp.controller('lernSection',['$scope','$http','$timeout','$location','dataService',learnCtrl]);
 function learnCtrl($this,$http,$timeout,$location,dataService){

         $("#hoveAnim").animate({
            left : $('#forGetStart').position().left,
            width : $('#forGetStart').outerWidth()
        })

        $this.serviceData = dataService.loading;
        $this.loader = true;
        $http.get('data/learn.json').then(function(response){
            $timeout(function(){
                $this.loader = false ;
                $this.turtles  = response.data;
            },1000);

        })
        $this.activeReadMore = function(obj) {
                $this.activeTurtle = obj;
        }

        $this.goToQuiz = function(){
            $location.path('/etest');

            $("#hoveAnim").animate({
                left : $('#goToTheQuiz').position().left,
                width : $('#goToTheQuiz').outerWidth()
            });

        }

        $this.userfound = false;
        $this.searhcResult = function(e){
            $this.userfound = false;
            let val = e.target.value.toLowerCase();
            let domElem = Array.from(document.querySelectorAll('.learnhome-grid'));
           if(domElem.length == 0){
                $this.userfound = true;
           }

        }
 };

 ngApp.controller('quizCtrl',['$scope','$http','$timeout','dataService','$interval', quizCtrl]);

 function quizCtrl($this,$http,$timeout,dataService,$interval){

    $this.loader = true;

    $("#hoveAnim").animate({
        left : $('#goToTheQuiz').position().left,
        width : $('#goToTheQuiz').outerWidth()
    });    

    $http.get('data/quiz.json').then(function(response){

       $timeout(function(){

            $this.serviceData = dataService.loading;
            $this.loader = false;
            $this.quizDatas = response.data;
            $this.activeQuestion = 0;
            $this.score = 0;
            $this.error = false;
            $this.whenCompleted = true;
            $this.allComplete = false;
            $this.numQuestionAnswered = 0 ;
            $this.stopedChanged = true;
            $this.quizStart = false;
            $this.initCount = 0;
            $this.userCheked = true;
            $this.showTime = '0:00'
            let s='', m = 0;

                 let breakOut = false;
               
                 $this.startAllQuize = function (){

                    $this.quizStart = true;

                    $this.timer = $interval(function(){
                        $this.initCount++;
                       
                        if($this.initCount == 60){
                            m++;
                            $this.initCount = 0;
                        }
                        if($this.initCount < 10){
                            s = '0' + $this.initCount;
                        }else{
                            s =  $this.initCount;
                        }
                        
                        $this.showTime = m + ':'+s;
                        
    
                     },1000);

                 }
                 

                 $this.clearCountTime = function () {
                     
                        $interval.cancel($this.timer)

                        $this.initCount = 0;
                    
                    
                 }

           $this.changeQuestion = changeQuestion;

           function changeQuestion( ){

                 $this.userClicked();

                    while( breakOut ){

                        let Quizslength = $this.quizDatas.length;

                        $this.activeQuestion = $this.activeQuestion < Quizslength - 1 ? ++$this.activeQuestion : 0 ;


                        if($this.activeQuestion == 0){

                            $this.error = true;
                        }
                      
                        if( $this.quizDatas[$this.activeQuestion].selected === null  ) {
                     
                            breakOut = false;
                        }
             
             
                    }
           }

           $this.userClicked = function(){
                
               breakOut = true;

                if($this.quizDatas[$this.activeQuestion].selected !== null){

                    if($this.quizDatas[$this.activeQuestion].correct === $this.getAnswered){

                        $this.score++;
                    }
                     $this.numQuestionAnswered++

                     if($this.numQuestionAnswered > $this.quizDatas.length - 1 ){

                        breakOut = false;

                        $this.whenCompleted = false;

                    }
 
                }
 
               
           }
 
         $this.setActiveQuestion = setActiveQuestion; 


         function setActiveQuestion(getIndex){
           
                if( getIndex != undefined ){
                if($this.quizDatas[getIndex].selected == null){
                    
                    if(!$this.allComplete){

                        if($this.userCheked){

                            $this.userClicked();

                        }else{

                            if($this.quizDatas[$this.activeQuestion].correct === $this.getAnswered){
                                $this.score++;
                            }
                            $this.userCheked = true;

                        }
                        $this.activeQuestion = getIndex;
                    }
                    
                }

                    if($this.allComplete){

                        $this.activeQuestion = getIndex;
                    }
                    
                }
                
                
        }
         
         $this.choiceOption = choiceOption; 

        function choiceOption(getIndex){

             if(!$this.allComplete){

                $this.quizDatas[$this.activeQuestion].selected = getIndex;
                $this.getAnswered = getIndex;
                $this.error = false;

             }

         }

         $this.cancelResult = cancelResult;

         function cancelResult(){

           $this.clearCountTime();
           $this.allInit();
           $this.startAllQuize();

         }

         $this.sureResult = function() {

            $this.parcentage = $this.score*100/$this.quizDatas.length;
            $this.allComplete = true;
            $this.whenCompleted = true;
            $this.activeQuestion = 0;

            $this.clearCountTime();
          

        }

        $this.allrest = allrest;
        function allrest() {
            $this.showTime = '0:00';
            m=0;
            $this.initCount = 0;
            $this.quizStart = false;
            $this.allInit();
        }
         $this.allInit = function(){

            $this.numQuestionAnswered = 0 ;
            $this.activeQuestion = 0;
            $this.score = 0;
            $this.error = false;
            breakOut = false;
            $this.allComplete = false
            $this.parcentage = 0;
            $this.whenCompleted = true;

            for(let i=0; i<$this.quizDatas.length; i++){

                $this.quizDatas[i].selected = null;

            }
            
         }

      
       },1000);

    });

    
};

