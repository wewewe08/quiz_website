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
                "Question": "How do you declare a variable in JavaScript?",
                "Answers" : ["int num = 1","var num = 2", "num = 3", "None of the above"],
                "Correct_Answer": "var num = 2",
                "Explanation": "Var and let are used to declare variables in Javascript."

            },
            "Question4" :{
                "QuestionType": "multiple_choice",
                "Question": "In OOP, which keyword is used to represent that a method or variable belongs to a class rather than an instance of the class?",
                "Answers" : ["this", "static", "final", "abstract"],
                "Correct_Answer": "static",
                "Explanation": "'static' is the keyword used to declare class-level methods and variables. They can be accessed directly without creating a new instance of the class.",
            },
            "Question5" :{
                "QuestionType" : "multiple_choice",
                "Question": "What do the following selectors mean in CSS? '.' , '#' , 'h1'",
                "Answers" : ["class, ID, element", "paragraph, class, header", "period, hashtag, header1","return, tag, id"],
                "Correct_Answer": "class, ID, element",
                "Explanation" : "The selectors in CSS are used to select specific elements that you want to style on a web page."
            }
       }, 
        "QUIZ2" :{
            "QuizName" : "Math",
            "Question1" :{
                "QuestionType" : "multiple_choice",
                "Question": "Who wrote the novel 'To Kill a Mockingbird'?",
                "Answers" : ["Harper Lee", "Ernest Hemingway", "F. Scott Fitzgerald", "Mark Twain"],
                "Correct_Answer": "Harper Lee",
                "Explanation": "'To Kill a Mockingbird' was written by Harper Lee and published in 1960. It won the Pulitzer Prize for Fiction in 1961."
            },
            "Question2" :{
                "QuestionType" : "multiple_choice",
                "Question": "Who painted the Mona Lisa?",
                "Answers" : ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
                "Correct_Answer": "Leonardo da Vinci",
                "Explanation": "The Mona Lisa is one of the most famous paintings in the world. It was painted by the Italian artist Leonardo da Vinci.",
            },
            "Question3" :{
                "QuestionType" : "multiple_choice",
                "Question": "Who is the CEO of Tesla and SpaceX?",
                "Answers" : ["Jeff Bezos", "Bill Gates", "Elon Musk", "Mark Zuckerberg"],
                "Correct_Answer": "Elon Musk",
                "Explanation": "Elon Musk is the CEO of both Tesla, Inc., a company known for electric vehicles and renewable energy solutions, and SpaceX, a company focused on space exploration and transportation.",
            },
            "Question4" :{
                "QuestionType" : "multiple_choice",
                "Question": "Which country is both a continent and an island?",
                "Answers" : ["Australia", "Japan", "Greenland", "Madagascar"],
                "Correct_Answer": "Australia",
                "Explanation": "Australia is the world's smallest continent and the largest island, located entirely in the southern hemisphere.",
            },
            "Question5" :{
                "QuestionType" : "multiple_choice",
                "Question": "Who was the first president of the United States?",
                "Answers" : ["Thomas Jefferson", "George Washington", "Abraham Lincoln", "John Adams"],
                "Correct_Answer": "George Washington",
                "Explanation" : "George Washington served as the first President of the United States from 1789 to 1797."
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
                appState.question_type = model.results[appState.currentQuiz][`Question${appState.currentQuestionIndex}`].QuestionType;
                create_question(appState.currentQuestionIndex);

                render_view(model, "#multiple_choice")

            }else if(document.querySelector('#quiz_select').value === 'Quiz2'){
                appState.currentQuiz = "QUIZ2";
                appState.totalQuestions = Object.keys(model.results.QUIZ1).filter(key => key.startsWith('Question')).length;
                appState.question_type = model.results[appState.currentQuiz][`Question${appState.currentQuestionIndex}`].QuestionType;
                create_question(appState.currentQuestionIndex);

                render_view(model, "#multiple_choice")

            }
            
            document.querySelector('#quiz_widget').onclick = (event) => {
                handle_answer(event);
            }
            
            return false;
        };  
    }
);

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

        if(appState.userAnswer === correctAnswer){
            appState.questions_correct +=1;
            displayGoodMessage();

            setTimeout(()=> {
                if(appState.currentQuestionIndex < appState.totalQuestions) {
                appState.currentQuestionIndex +=1;
                create_question(appState.currentQuestionIndex); 
                }else if(appState.currentQuestionIndex === appState.totalQuestions){
                    render_view(model, "#final_results");
                    document.querySelector('#Back').onclick =(event) =>{
                        render_view(model, "#initial");
                    }
                    document.querySelector('#Retry').onclick = (event)=>{
                        console.log("loading retry");
                        appState.currentQuestionIndex = 1;
                        appState.questions_correct = 0;
                        appState.questions_wrong = 0;
                        create_question(appState.currentQuestionIndex)
                    }
                }
            }, 1000);
                    
        }else if(appState.userAnswer != correctAnswer){
            appState.questions_wrong +=1;
            displayBadMessage();

            document.querySelector('#continue').onclick = () =>{
                if(appState.currentQuestionIndex < appState.totalQuestions) {
                    appState.currentQuestionIndex +=1;
                    create_question(appState.currentQuestionIndex); 
                }
            }
        }
    }
}

const create_question = (index) => {
    appState.currentQuestion = model.results[appState.currentQuiz][`Question${index}`];
    render_view(model, "#multiple_choice")
    return appState.currentQuestion; 
}

const displayGoodMessage = () => {
    render_view(model, '#good_feedback');
    setTimeout (() =>{
       
    }, 1000)
} 

const displayBadMessage = () =>{
    render_view(model, '#bad_feedback');
}