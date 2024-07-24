// This will be used to display the current question.
const question = document.getElementById("question");

// This will be used to display the choices for each question.
// It collects all elements with the class name choice-text into an array.
const choices = Array.from(document.getElementsByClassName("choice-text"));

//
const currentQuestionCounterText = document.getElementById("question-counter");

//
const currentScore = document.getElementById("score");

//
const progressBarText = document.getElementById("progress-text");

//
const progressBarFull = document.getElementById("progress-bar-full");

// Initializes an empty object to store the current question.
let currentQuestion = {};
// A boolean to track whether the quiz is ready to accept answers.
let acceptingAnswers = false;
// Initializes the score to 0
let score = 0;
// Initializes the question counter to 0.
let questionCounter = 0;
// Initializes an empty array to store the questions that haven't been asked yet.
let availableQuestions = [];

// Creat an array of question objects. Each object contains:
// question: The question text.
// choice1 to choice4: The choices for the question.
// answer: The correct choice number.
let questions = [
  {
    question:
      "What is the correct way to create a virtual environment in Python?",
    choice1: "python venv myenv",
    choice2: "python3 -m venv myenv",
    choice3: "python -m venv myenv",
    choice4: "python create venv myenv",
    answer: 3,
  },
  {
    question: "Which of the following is used to open a file in Python?",
    choice1: "file.open('file.txt', 'r')",
    choice2: "open('file.txt')",
    choice3: "open('file.txt', 'r')",
    choice4: "file.open('file.txt')",
    answer: 3,
  },
  {
    question: "How do you declare a variable in Python?",
    choice1: "x = 10",
    choice2: "var x = 10",
    choice3: "int x = 10",
    choice4: "let x = 10",
    answer: 1,
  },
  {
    question: "What is the output of print(2**3)?",
    choice1: "9",
    choice2: "6",
    choice3: "8",
    choice4: "10",
    answer: 3,
  },
  {
    question:
      "Which method is used to remove whitespace from the beginning and end of a string?",
    choice1: "trim()",
    choice2: "strip()",
    choice3: "clean()",
    choice4: "remove()",
    answer: 2,
  },
  {
    question: "How do you create a Django project?",
    choice1: "django startproject myproject",
    choice2: "django-admin startproject myproject",
    choice3: "django-admin createproject myproject",
    choice4: "django createproject myproject",
    answer: 2,
  },
  {
    question: "What does 'self' represent in a class method in Python?",
    choice1: "The parent class",
    choice2: "A global variable",
    choice3: "The instance of the class",
    choice4: "The class itself",
    answer: 3,
  },
  {
    question: "How can you define a function in Python?",
    choice1: "def function_name():",
    choice2: "function function_name():",
    choice3: "func function_name():",
    choice4: "define function_name():",
    answer: 1,
  },
  {
    question: "Which keyword is used to handle exceptions in Python?",
    choice1: "finally",
    choice2: "catch",
    choice3: "try",
    choice4: "except",
    answer: 4,
  },
  {
    question: "In Django, which file contains the URL patterns?",
    choice1: "models.py",
    choice2: "views.py",
    choice3: "admin.py",
    choice4: "urls.py",
    answer: 4,
  },
  {
    question: "How do you create a migration in Django?",
    choice1: "python manage.py create_migration",
    choice2: "python manage.py migrate",
    choice3: "python manage.py makemigrations",
    choice4: "django-admin migrate",
    answer: 3,
  },
  {
    question: "Which method is used to add an item to a list in Python?",
    choice1: "add()",
    choice2: "append()",
    choice3: "insert()",
    choice4: "extend()",
    answer: 2,
  },
  {
    question: "How do you access a dictionary value by key?",
    choice1: "dict.get(key)",
    choice2: "dict[key]",
    choice3: "dict[key]",
    choice4: "dict.value(key)",
    answer: 2,
  },
  {
    question: "Which operator is used for floor division in Python?",
    choice1: "//",
    choice2: "/",
    choice3: "%",
    choice4: "**",
    answer: 1,
  },
  {
    question: "How do you define a class in Python?",
    choice1: "class MyClass()",
    choice2: "class MyClass:",
    choice3: "define MyClass:",
    choice4: "class MyClass{}",
    answer: 2,
  },
  {
    question: "What is the default port for the Django development server?",
    choice1: "8080",
    choice2: "3000",
    choice3: "5000",
    choice4: "8000",
    answer: 4,
  },
  {
    question: "How do you install a package using pip?",
    choice1: "pip install package_name",
    choice2: "pip fetch package_name",
    choice3: "pip add package_name",
    choice4: "pip get package_name",
    answer: 1,
  },
  {
    question: "Which method is used to get the length of a list in Python?",
    choice1: "size()",
    choice2: "count()",
    choice3: "len()",
    choice4: "length()",
    answer: 3,
  },
  {
    question: "How do you start a new Django app within a project?",
    choice1: "python manage.py createapp app_name",
    choice2: "python manage.py startapp app_name",
    choice3: "django-admin startapp app_name",
    choice4: "django startapp app_name",
    answer: 2,
  },
  {
    question: "What does the 'return' statement do in a function?",
    choice1: "Exits the function",
    choice2: "Calls the function again",
    choice3: "Loops through the function",
    choice4: "Returns a value from the function",
    answer: 4,
  },
  {
    question: "Which data type is immutable in Python?",
    choice1: "List",
    choice2: "Set",
    choice3: "Tuple",
    choice4: "Dictionary",
    answer: 3,
  },
  {
    question:
      "In Django, which file is used to configure the settings for the application?",
    choice1: "config.py",
    choice2: "settings.py",
    choice3: "init.py",
    choice4: "app.py",
    answer: 2,
  },
  {
    question:
      "What is the purpose of the '__init__.py' file in a Python package?",
    choice1: "To initialize the package",
    choice2: "To configure settings",
    choice3: "To declare the version",
    choice4: "To define the main function",
    answer: 1,
  },
  {
    question: "Which of the following is not a valid Python keyword?",
    choice1: "continue",
    choice2: "pass",
    choice3: "return",
    choice4: "default",
    answer: 4,
  },
  {
    question: "How do you update an existing record in Django?",
    choice1: "By using save() method",
    choice2: "By using update() method",
    choice3: "By using modify() method",
    choice4: "By using change() method",
    answer: 1,
  },
  {
    question: "Which method is used to find a substring in a string?",
    choice1: "search()",
    choice2: "find()",
    choice3: "locate()",
    choice4: "index()",
    answer: 2,
  },
  {
    question: "How do you handle database migrations in Django?",
    choice1: "Using update command",
    choice2: "Using syncdb command",
    choice3: "Using makemigrations and migrate commands",
    choice4: "Using setup command",
    answer: 3,
  },
  {
    question: "Which method is used to remove an item from a set in Python?",
    choice1: "discard()",
    choice2: "delete()",
    choice3: "pop()",
    choice4: "remove()",
    answer: 4,
  },
  {
    question: "How do you check if a value exists in a list in Python?",
    choice1: "list.check(value)",
    choice2: "value.exists(list)",
    choice3: "list.contains(value)",
    choice4: "value in list",
    answer: 4,
  },
  {
    question: "Which of the following is a mutable data type in Python?",
    choice1: "Tuple",
    choice2: "String",
    choice3: "Integer",
    choice4: "List",
    answer: 4,
  },
  {
    question: "What is the purpose of the 'with' statement in Python?",
    choice1: "To handle exceptions",
    choice2: "To create a loop",
    choice3: "To define a context manager",
    choice4: "To open a file",
    answer: 3,
  },
  {
    question: "In Django, where do you define URL patterns for an app?",
    choice1: "models.py",
    choice2: "admin.py",
    choice3: "urls.py",
    choice4: "views.py",
    answer: 3,
  },
  {
    question: "What does 'PEP 8' refer to in Python?",
    choice1: "Python Executable Program",
    choice2: "Python Exception Policy",
    choice3: "Python Enhancement Proposal",
    choice4: "Python Extended Protocol",
    answer: 3,
  },
  {
    question: "Which method is used to remove all items from a list in Python?",
    choice1: "clear()",
    choice2: "empty()",
    choice3: "delete()",
    choice4: "remove()",
    answer: 1,
  },
  {
    question: "What is the purpose of the 'super()' function in Python?",
    choice1: "To call methods from a parent class",
    choice2: "To create an instance of a class",
    choice3: "To initialize a class",
    choice4: "To access a class variable",
    answer: 1,
  },
  {
    question: "How do you install Django?",
    choice1: "pip install django",
    choice2: "pip fetch django",
    choice3: "pip get django",
    choice4: "pip add django",
    answer: 1,
  },
  {
    question:
      "Which function is used to get the data type of an object in Python?",
    choice1: "type()",
    choice2: "kind()",
    choice3: "class()",
    choice4: "datatype()",
    answer: 1,
  },
  {
    question: "What is the default database used in Django?",
    choice1: "SQLite",
    choice2: "PostgreSQL",
    choice3: "MySQL",
    choice4: "Oracle",
    answer: 1,
  },
  {
    question: "How do you concatenate two strings in Python?",
    choice1: "string1 + string2",
    choice2: "string1.concat(string2)",
    choice3: "string1.append(string2)",
    choice4: "string1.merge(string2)",
    answer: 1,
  },
  {
    question: "How do you create a list of numbers from 0 to 9 in Python?",
    choice1: "list(range(10))",
    choice2: "list(0, 10)",
    choice3: "range(0, 10).list()",
    choice4: "list(0, 9)",
    answer: 1,
  },
  {
    question: "Which method is used to sort a list in Python?",
    choice1: "sort()",
    choice2: "arrange()",
    choice3: "order()",
    choice4: "sort_list()",
    answer: 1,
  },
  {
    question: "How do you create a model in Django?",
    choice1: "By defining a class that inherits from models.Model",
    choice2: "By using the create_model() method",
    choice3: "By defining a function in models.py",
    choice4: "By using the define_model() method",
    answer: 1,
  },
  {
    question: "Which method is used to open a file for reading in Python?",
    choice1: "open('file.txt', 'r')",
    choice2: "open('file.txt', 'a')",
    choice3: "open('file.txt', 'w')",
    choice4: "open('file.txt', 'x')",
    answer: 1,
  },
  {
    question: "How do you remove duplicates from a list in Python?",
    choice1: "set(list)",
    choice2: "list.remove_duplicates()",
    choice3: "list.deduplicate()",
    choice4: "list.unique()",
    answer: 1,
  },
  {
    question: "What is the correct way to comment a block of code in Python?",
    choice1: "''' block of code '''",
    choice2: "/* block of code */",
    choice3: "// block of code",
    choice4: "<!-- block of code -->",
    answer: 1,
  },
  {
    question: "What is the purpose of Django's ORM?",
    choice1: "To interact with the database using Python objects",
    choice2: "To define static files",
    choice3: "To handle URL routing",
    choice4: "To manage Django's settings",
    answer: 1,
  },
  {
    question: "How do you declare a global variable in Python?",
    choice1: "global variable_name",
    choice2: "declare variable_name",
    choice3: "var variable_name",
    choice4: "global_var variable_name",
    answer: 1,
  },
  {
    question: "Which operator is used to check equality in Python?",
    choice1: "==",
    choice2: "===",
    choice3: "=",
    choice4: "!=",
    answer: 1,
  },
  {
    question: "How do you create a tuple in Python?",
    choice1: "tuple = (1, 2, 3)",
    choice2: "tuple = [1, 2, 3]",
    choice3: "tuple = 1, 2, 3",
    choice4: "tuple = {1, 2, 3}",
    answer: 1,
  },
  {
    question:
      "Which method is used to add an item to the end of a list in Python?",
    choice1: "append()",
    choice2: "insert()",
    choice3: "add()",
    choice4: "extend()",
    answer: 1,
  },
  {
    question: "What does the 'pass' statement do in Python?",
    choice1: "It is a placeholder that does nothing",
    choice2: "It exits the current loop",
    choice3: "It terminates the program",
    choice4: "It skips the next iteration",
    answer: 1,
  },
  {
    question: "How do you define a decorator in Python?",
    choice1: "@decorator_name",
    choice2: "apply decorator_name",
    choice3: "def decorator_name()",
    choice4: "decorator_name()",
    answer: 1,
  },
  {
    question: "What is the purpose of Django's admin site?",
    choice1: "To manage the application data",
    choice2: "To define the application structure",
    choice3: "To handle URL routing",
    choice4: "To serve static files",
    answer: 1,
  },
  {
    question: "Which of the following is not a Python data type?",
    choice1: "Character",
    choice2: "String",
    choice3: "List",
    choice4: "Dictionary",
    answer: 1,
  },
  {
    question: "How do you create a new model in Django?",
    choice1: "By defining a class in models.py",
    choice2: "By defining a model in views.py",
    choice3: "By using the create_model() function",
    choice4: "By using the model_create() function",
    answer: 1,
  },
  {
    question:
      "Which function is used to check if a key exists in a dictionary?",
    choice1: "has_key()",
    choice2: "contains()",
    choice3: "exists()",
    choice4: "in",
    answer: 4,
  },
  {
    question: "How do you handle form data in Django?",
    choice1: "By using Django forms",
    choice2: "By using raw HTML forms",
    choice3: "By using JavaScript",
    choice4: "By using AJAX",
    answer: 1,
  },
  {
    question: "How do you check if a number is even in Python?",
    choice1: "num % 2 == 0",
    choice2: "num / 2 == 1",
    choice3: "num % 2 == 1",
    choice4: "num / 2 == 0",
    answer: 1,
  },
  {
    question: "What is the output of '3 * 'Python''?",
    choice1: "'PythonPythonPython'",
    choice2: "'Python3'",
    choice3: "'3Python'",
    choice4: "'Python 3'",
    answer: 1,
  },
  {
    question: "How do you define a class method in Django?",
    choice1: "@classmethod decorator",
    choice2: "@staticmethod decorator",
    choice3: "@class_method decorator",
    choice4: "@method decorator",
    answer: 1,
  },
  {
    question: "How do you update a record in a Django model?",
    choice1: "By using the save() method",
    choice2: "By using the change() method",
    choice3: "By using the modify() method",
    choice4: "By using the update() method",
    answer: 1,
  },
  {
    question: "How do you access an element in a list?",
    choice1: "list[index]",
    choice2: "list[index] = value",
    choice3: "list.get(index)",
    choice4: "list.fetch(index)",
    answer: 1,
  },
  {
    question: "Which statement is true about Python dictionaries?",
    choice1: "Dictionaries are unordered collections of key-value pairs",
    choice2: "Dictionaries use indexing to access values",
    choice3: "Dictionaries can have duplicate keys",
    choice4: "Dictionaries are ordered collections of key-value pairs",
    answer: 1,
  },
];

// DEFINE CONSTANTS - Requiered for the game.

// The score awarded for a correct answer.
const CORRECT_BONUS = 10;

// The maximum number of questions in the quiz
const MAX_QUESTIONS = 10;

// STARTING THE GAME

// "startGame" resets the game by initializing 'questionCounter', 'score', and 'availableQuestions'. Then, it calls "getNewQuestion" to load the first question.
startGame = () => {
  // Resetting questionCounter, and score of the user.
  questionCounter = 0;
  score = 0;

  // It creates a copy of the questions array and assigns it to availableQuestions variable.
  availableQuestions = [...questions];

  // "getNewQuestion" is called to display the first or next question.
  getNewQuestion();
};

// GETTIGN A NEW QUESTION

// "getNewQuestion" checks if there are no more questions or if the maximum number of questions has been reached.
// If so, it redirects to the end page.
getNewQuestion = () => {
  if (availableQuestions.length == 0 || questionCounter == MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    // go to the 'gameover' page.
    return window.location.assign("../html/gameover.html");
  }

  // Increment the "questionCounter" variable by 1.
  questionCounter++;

  // Dynamically updating the Question Number on the web page (Current question/Max number of questions available).
  currentQuestionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;

  // Selects a random question from "availableQuestions" and assigns it to "currentQuestion".
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];

  // Updates the question element's text with the current question.
  question.innerText = currentQuestion.question;

  // Updates each choice element's text with the corresponding choice.
  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  // Remove the current question from availableQuestions.
  availableQuestions.splice(questionIndex, 1);

  // Set the "acceptingAnswers" to true, allowing the user to select an answer.
  acceptingAnswers = true;
};

// HANDLING ANSWER SELECTION
choices.forEach((choice) => {
  // Add an event listener to each choice element.
  choice.addEventListener("click", (e) => {
    // When a choice is clicked, it checks if answers are being accepted or not.
    if (!acceptingAnswers) return;

    // It sets "acceptingAnswers" to false to prevent multiple answers.
    acceptingAnswers = false;

    // Get the selected choice and its corresponding answer number (1,2,3, or 4).
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    // It determines if the selected answer is correct or incorrect.
    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    //
    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
      updateProgressBar();
    } else {
      negativeMarking();
      updateProgressBar();
    }

    // Adds the appropriate class ('correct', 'incorrect') to the choice element's parent ('choice-container').
    selectedChoice.parentElement.classList.add(classToApply);
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);

      // Call "getNewQuestion" to load the next question.
      getNewQuestion();
    }, 1000);
  });
});

//
incrementScore = (num) => {
  score += num;
  currentScore.innerText = score;
};

negativeMarking = () => {
  score -= score >= 5 ? 5 : 0;
  currentScore.innerText = score;
};

// Update the progress bar
updateProgressBar = () => {
  const percentage = (score * 100) / (MAX_QUESTIONS * CORRECT_BONUS);

  // Dynamically displays the score percentage.
  progressBarText.innerText = `${Math.floor(percentage)}%`;

  // Give width dynamically to the progress-bar-full.
  progressBarFull.style.width = `${Math.floor(percentage)}%`;
};

// Call "startGame" to initialize and start the quiz.
startGame();
