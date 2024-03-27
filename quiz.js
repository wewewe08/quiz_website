var startTime = new Date();
var interval;

const model = {
    "results": 
    {
        "QUIZ1" : {
            "QuizName" : "Computer Science",
            "Question1" :{
                "QuestionType": "multiple_choice",
                "Question": "Which of the following are database software?",
                "Answers" : ["HTML","Java","C++","MySQL"],
                "Correct_Answer": "MySQL",
                "Explanation": "The other options are programming languages, not databases."
            },
            "Question2" :{
                "QuestionType": "multiple_choice",
                "Question": "What is the time complexity of the Merge Sort algorithm?",
                "Answers" : ["O(n)", "O(logn)", "O(1)", "O(nlogn)"],
                "Correct_Answer": "O(nlogn)",
                "Explanation": "Merge sort is an algorithm that divides the array into halves recursively until each sub-array created only has one element. Then, the algorithm proceeds to merge the sub-arrays back together."
            },
            "Question3" :{
                "QuestionType": "multiple_choice",
                "Question": "Which of the following is the correct way to write a comment in Python?",
                "Answers" : ["// This is a comment.", "# This is a comment.", "/* This is a comment. */", "This is a comment."],
                "Correct_Answer": "# This is a comment.",
                "Explanation": "In Python, you write comments using '#'"

            },
            "Question4" :{
                "QuestionType": "narrative",
                "Question": "In OOP, which keyword is used to represent that a method or variable belongs to a class rather than an instance of the class?",
                "Answers" : ["static", "final"],
                "Correct_Answer": "static",
                "Explanation": "'static' is the keyword used to declare class-level methods and variables. They can be accessed directly without creating a new instance of the class.",
            },
            "Question5" :{
                "QuestionType" : "picture",
                "Question": "Which picture represents the alpha-beta pruning algorithm?",
                "Answers" : ["algo_correct.jpg", "algo_wrong.jpg"],
                "Correct_Answer": "algo_correct.jpg",
                "Explanation" : "The other algorithm shown is of the Depth-first Search algorithm."
            }
       }, 
        "QUIZ2" :{
            "QuizName" : "Web Development",
            "Question1" :{
                "QuestionType" : "multiple_choice",
                "Question": "Which of the following languages are used to style a web page?",
                "Answers" : ["HTML", "JavaScript", "JSwing", "CSS"],
                "Correct_Answer": "CSS",
                "Explanation": "CSS (Cascading Style Sheets) is used for styling web pages. It controls what and how media is displayed."
            },
            "Question2" :{
                "QuestionType" : "multiple_choice",
                "Question": "What do the following selectors mean in CSS? '.' , '#' , 'p'",
                "Answers" : ["class, id, element","period, hashtag, paragraph","dot, pound key, letter p","html, java, python"],
                "Correct_Answer": "class, id, element",
                "Explanation": "Selectors are used to declare specific areas that need to be modified.",
            },
            "Question3" :{
                "QuestionType": "multiple_choice",
                "Question": "How do you declare a variable in JavaScript?",
                "Answers" : ["int num = 1","var num = 2", "num = 3", "None of the above"],
                "Correct_Answer": "var num = 2",
                "Explanation": "Var and let are used to declare variables in Javascript."
            },
            "Question4" :{
                "QuestionType" : "multiple_choice",
                "Question": "What does HTML stand for?",
                "Answers" : ["Hyper Turbulent Machine Language","Happy Tales Musical Lyrics","","Hypertext Markup Language", "Web Development"],
                "Correct_Answer": "Hypertext Markup Language",
                "Explanation": "Hypertext Markup Language (HTML) is the language used to create the structure of a web page."
            },
            "Question5" :{
                "QuestionType" : "picture",
                "Question": "Which of the following is the correct way to create an array in JavaScript?",
                "Answers" : ["web_correct.png", "web_incorrect.png"],
                "Correct_Answer": "web_correct.png",
                "Explanation" : "The other image is how you would declare an array in Java, not JavaScript."
            }
       }  
    }
  }

const appState = {
    Fname: "",
    currentQuiz: "",
    currentQuestionIndex: 0,
    questions_correct : 0,
    questions_wrong : 0,
    totalQuestions: 0,
    userAnswer: "",
    currentQuestion: "",
    question_type: "",
    good_feedback: "Great job!",
};

document.addEventListener('DOMContentLoaded',function(){
        render_view(model, "#initial");
        document.querySelector('#form').onsubmit=function(){

            appState.currentQuestionIndex =1;
            appState.Fname = document.querySelector('#Fname').value;
            document.querySelector('#label').innerHTML= `Welcome, ${Fname}! Good luck!`
            document.querySelector('#Fname').value='';

            if(document.querySelector('#quiz_select').value === 'Quiz1'){
                appState.currentQuiz = "QUIZ1";
                appState.totalQuestions = Object.keys(model.results.QUIZ1).filter(key => key.startsWith('Question')).length;
                create_question(appState.currentQuestionIndex);
            }else if(document.querySelector('#quiz_select').value === 'Quiz2'){
                appState.currentQuiz = "QUIZ2";
                appState.totalQuestions = Object.keys(model.results.QUIZ2).filter(key => key.startsWith('Question')).length;
                create_question(appState.currentQuestionIndex);
            }

            document.querySelector('#quiz_widget').onclick = (event) => {
                handle_answer(event);
            };
            
            return false;
        };  
    }
);

function displayElapsedTime() {
    const elapsedTime = new Date() - startTime;
    const seconds = Math.floor(elapsedTime / 1000);
    document.querySelector('#timer').innerHTML = `Elapsed Time: ${seconds} seconds`;
}

function render_end() {
    render_view(model, "#final_results");
    clearInterval(interval);
    displayElapsedTime()

    const final_score = (appState.questions_correct * 20);
    if (final_score < 80){
        document.querySelector('#end_message').innerHTML = `Sorry ${appState.Fname}, you fail the quiz. Your score is: ${final_score}%`
    } else {
        document.querySelector('#end_message').innerHTML = `Congratulations ${appState.Fname}! You passed the quiz. Your score is: ${final_score}%`
    }

    document.querySelector('#Back').onclick =(event) =>{
        render_view(model, "#initial");
        startTime = new Date();
        clearInterval(interval);
    }
    document.querySelector('#Retry').onclick = (event)=>{
        console.log("loading retry");
        appState.currentQuestionIndex = 1;
        appState.questions_correct = 0;
        appState.questions_wrong = 0;
        startTime = new Date();
        clearInterval(interval);
        create_question(appState.currentQuestionIndex)
    }
}

function check_correct(correctAnswer) {
    if(appState.userAnswer === correctAnswer){
        appState.questions_correct +=1;
        displayGoodMessage();

        setTimeout(()=> {
            if(appState.currentQuestionIndex < appState.totalQuestions) {
            appState.currentQuestionIndex +=1;
            create_question(appState.currentQuestionIndex);
            }else if(appState.currentQuestionIndex === appState.totalQuestions){
                render_end();
            }
        }, 1000);
                
    }else if(appState.userAnswer != correctAnswer){
        appState.questions_wrong +=1;
        displayBadMessage();

        document.querySelector('#continue').onclick = () =>{
            if(appState.currentQuestionIndex < appState.totalQuestions) {
                appState.currentQuestionIndex +=1;
                create_question(appState.currentQuestionIndex); 
            } else {
                render_end();
            }
        }
    }
}

const render_view =(model,view)=>{
    template_source = document.querySelector(view).innerHTML;
    var template = Handlebars.compile(template_source);
    var html_widget_element = template({...model, ...appState});

    document.querySelector("#quiz_widget").innerHTML = html_widget_element;
}

const handle_answer = (event) =>{
    const radioButtons = document.querySelectorAll('input[name = "q2"]');
        radioButtons.forEach((radioButton) =>{
            radioButton.addEventListener('change', (event) => {
                appState.userAnswer = event.target.value;
            });
        });

        const buttons = document.querySelectorAll('button[name = "button"]');
        buttons.forEach((buttons) =>{
            buttons.addEventListener('click', (event) => {
                appState.userAnswer = event.target.value;
            });
        });

    if(event.target.dataset.answer == "submit" ||event.target.dataset.but==="1" || event.target.dataset.but==='2'){
        appState.currentQuestion = model.results[appState.currentQuiz][`Question${appState.currentQuestionIndex}`];     
        const correctAnswer = appState.currentQuestion [`Correct_Answer`];
        console.log(appState.userAnswer);
        console.log(correctAnswer);
        check_correct(correctAnswer);
    }
}

const create_question = (index) => {
    appState.currentQuestion = model.results[appState.currentQuiz][`Question${index}`];
    appState.question_type = model.results[appState.currentQuiz][`Question${appState.currentQuestionIndex}`].QuestionType;
    if(appState.question_type === 'multiple_choice'){
        render_view(model, "#multiple_choice")
    }
    else if(appState.question_type === 'picture'){
        render_view(model, "#picture")
    }
    else if(appState.question_type === 'narrative'){
        render_view(model, "#narrative")
    }
    displayElapsedTime();
    interval = setInterval(displayElapsedTime, 1000);
    return appState.currentQuestion; 
}

const displayGoodMessage = () => {
    clearInterval(interval);
    render_view(model, '#good_feedback');
    setTimeout (() =>{
       
    }, 1000)
} 

const displayBadMessage = () =>{
    clearInterval(interval);
    render_view(model, '#bad_feedback');
}