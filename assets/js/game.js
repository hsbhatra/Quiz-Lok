// import quizQuestions from questions

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
  {
    question: "What is the primary purpose of an operating system?",
    choice1: "To compile programs",
    choice2: "To manage hardware and software resources",
    choice3: "To edit documents",
    choice4: "To browse the internet",
    answer: 2,
    description: "An operating system manages the computer's hardware and software resources and provides services for computer programs."
  },
  {
    question: "Which of the following is a NoSQL database?",
    choice1: "MySQL",
    choice2: "Oracle",
    choice3: "MongoDB",
    choice4: "PostgreSQL",
    answer: 3,
    description: "MongoDB is a NoSQL database known for its flexibility and scalability."
  },
  {
    question: "What does SDLC stand for?",
    choice1: "Software Design Life Cycle",
    choice2: "System Development Life Cycle",
    choice3: "Software Development Life Cycle",
    choice4: "System Design Life Cycle",
    answer: 3,
    description: "SDLC stands for Software Development Life Cycle, a process used by the software industry to design, develop, and test high-quality software."
  },
  {
    question: "In Agile methodology, what is a 'sprint'?",
    choice1: "A phase in waterfall model",
    choice2: "A cycle of development activities",
    choice3: "A document for project requirements",
    choice4: "A type of software testing",
    answer: 2,
    description: "A 'sprint' in Agile methodology is a set period during which specific work has to be completed and made ready for review."
  },
  {
    question: "What is the time complexity of binary search?",
    choice1: "O(n)",
    choice2: "O(log n)",
    choice3: "O(n log n)",
    choice4: "O(1)",
    answer: 2,
    description: "The time complexity of binary search is O(log n), making it efficient for searching in sorted arrays."
  },
  {
    question: "How do you create a new instance of a class in Python?",
    choice1: "instance = class()",
    choice2: "instance = new class()",
    choice3: "instance = create class()",
    choice4: "instance = class.create()",
    answer: 1,
    description: "In Python, a new instance of a class is created by calling the class using parentheses, e.g., instance = MyClass()."
  },
  {
    question: "What is the output of print('Hello World'[1:5]) in Python?",
    choice1: "'Hello'",
    choice2: "'ello'",
    choice3: "'ell'",
    choice4: "'ello '",
    answer: 2,
    description: "The slice operation 'Hello World'[1:5] returns the substring 'ello'."
  },
  {
    question: "What does the 'map' function do in Python?",
    choice1: "It filters elements in a list",
    choice2: "It applies a function to all items in an input list",
    choice3: "It sorts elements in a list",
    choice4: "It combines two lists",
    answer: 2,
    description: "The 'map' function in Python applies a given function to all items in an input list."
  },
  {
    question: "In Java, which keyword is used to inherit a class?",
    choice1: "implement",
    choice2: "extends",
    choice3: "inherits",
    choice4: "interface",
    answer: 2,
    description: "In Java, the 'extends' keyword is used to inherit a class."
  },
  {
    question: "What is polymorphism in OOP?",
    choice1: "The ability to take multiple forms",
    choice2: "The ability to define multiple classes",
    choice3: "The ability to have multiple constructors",
    choice4: "The ability to encapsulate data",
    answer: 1,
    description: "Polymorphism is a concept in OOP that allows objects to be treated as instances of their parent class, enabling the same interface to be used for different underlying forms."
  },
  {
    question: "What is an IP address?",
    choice1: "A unique identifier for a computer on a network",
    choice2: "A type of network protocol",
    choice3: "A method of encrypting data",
    choice4: "A physical address of a computer",
    answer: 1,
    description: "An IP address is a unique identifier assigned to a device connected to a network, enabling communication with other devices."
  },
  {
    question: "What is normalization in databases?",
    choice1: "Organizing data to reduce redundancy",
    choice2: "Creating multiple copies of data",
    choice3: "Encrypting data for security",
    choice4: "Increasing the speed of database queries",
    answer: 1,
    description: "Normalization is a process in database design that organizes data to reduce redundancy and improve data integrity."
  },
  {
    question: "Which layer of the OSI model is responsible for data encryption?",
    choice1: "Physical layer",
    choice2: "Data link layer",
    choice3: "Network layer",
    choice4: "Presentation layer",
    answer: 4,
    description: "The presentation layer of the OSI model is responsible for data encryption and decryption."
  },
  {
    question: "What is the Agile Manifesto?",
    choice1: "A document that defines the stages of software development",
    choice2: "A guide for project management tools",
    choice3: "A declaration of the values and principles of Agile software development",
    choice4: "A technical specification for software design",
    answer: 3,
    description: "The Agile Manifesto outlines the values and principles that guide Agile software development practices."
  },
  {
    question: "What is a primary key in a database?",
    choice1: "A key that uniquely identifies a record in a table",
    choice2: "A key that is used for indexing",
    choice3: "A key that links two tables together",
    choice4: "A key that can have duplicate values",
    answer: 1,
    description: "A primary key is a field in a table that uniquely identifies each row or record in that table."
  },
  {
    question: "Which Python library is commonly used for data analysis?",
    choice1: "NumPy",
    choice2: "Pandas",
    choice3: "Matplotlib",
    choice4: "SciPy",
    answer: 2,
    description: "Pandas is a Python library that provides data structures and data analysis tools."
  },
  {
    question: "In Java, what is the purpose of the 'final' keyword?",
    choice1: "To declare a constant",
    choice2: "To define an abstract method",
    choice3: "To override a method",
    choice4: "To inherit a class",
    answer: 1,
    description: "The 'final' keyword in Java is used to declare constants, preventing the reassignment of variables or inheritance of classes."
  },
  {
    question: "What is a RESTful API?",
    choice1: "A type of database",
    choice2: "A method of file storage",
    choice3: "An API that uses HTTP requests for communication",
    choice4: "A software development methodology",
    answer: 3,
    description: "A RESTful API is an API that adheres to the constraints of REST architecture, using HTTP requests to perform CRUD operations."
  },
  {
    question: "What is the primary purpose of an operating system?",
    choice1: "To compile programs",
    choice2: "To manage hardware and software resources",
    choice3: "To edit documents",
    choice4: "To browse the internet",
    answer: 2,
    description: "An operating system manages the computer's hardware and software resources and provides services for computer programs."
  },
  {
    question: "Which of the following is a NoSQL database?",
    choice1: "MySQL",
    choice2: "Oracle",
    choice3: "MongoDB",
    choice4: "PostgreSQL",
    answer: 3,
    description: "MongoDB is a NoSQL database known for its flexibility and scalability."
  },
  {
    question: "What does SDLC stand for?",
    choice1: "Software Design Life Cycle",
    choice2: "System Development Life Cycle",
    choice3: "Software Development Life Cycle",
    choice4: "System Design Life Cycle",
    answer: 3,
    description: "SDLC stands for Software Development Life Cycle, a process used by the software industry to design, develop, and test high-quality software."
  },
  {
    question: "In Agile methodology, what is a 'sprint'?",
    choice1: "A phase in waterfall model",
    choice2: "A cycle of development activities",
    choice3: "A document for project requirements",
    choice4: "A type of software testing",
    answer: 2,
    description: "A 'sprint' in Agile methodology is a set period during which specific work has to be completed and made ready for review."
  },
  {
    question: "What is the time complexity of binary search?",
    choice1: "O(n)",
    choice2: "O(log n)",
    choice3: "O(n log n)",
    choice4: "O(1)",
    answer: 2,
    description: "The time complexity of binary search is O(log n), making it efficient for searching in sorted arrays."
  },
  {
    question: "How do you create a new instance of a class in Python?",
    choice1: "instance = class()",
    choice2: "instance = new class()",
    choice3: "instance = create class()",
    choice4: "instance = class. Create()",
    answer: 1,
    description: "In Python, a new instance of a class is created by calling the class using parentheses, e.g., instance = MyClass()."
  },
  {
    question: "What is the output of print('Hello World'[1:5]) in Python?",
    choice1: "'Hello'",
    choice2: "'ello'",
    choice3: "'ell'",
    choice4: "'ello '",
    answer: 2,
    description: "The slice operation 'Hello World'[1:5] returns the substring 'ello'."
  },
  {
    question: "What does the 'map' function do in Python?",
    choice1: "It filters elements in a list",
    choice2: "It applies a function to all items in an input list",
    choice3: "It sorts elements in a list",
    choice4: "It combines two lists",
    answer: 2,
    description: "The 'map' function in Python applies a given function to all items in an input list."
  },
  {
    question: "In Java, which keyword is used to inherit a class?",
    choice1: "implement",
    choice2: "extends",
    choice3: "inherits",
    choice4: "interface",
    answer: 2,
    description: "In Java, the 'extends' keyword is used to inherit a class."
  },
  {
    question: "What is polymorphism in OOP?",
    choice1: "The ability to take multiple forms",
    choice2: "The ability to define multiple classes",
    choice3: "The ability to have multiple constructors",
    choice4: "The ability to encapsulate data",
    answer: 1,
    description: "Polymorphism is a concept in OOP that allows objects to be treated as instances of their parent class, enabling the same interface to be used for different underlying forms."
  },
  {
    question: "What is an IP address?",
    choice1: "A unique identifier for a computer on a network",
    choice2: "A type of network protocol",
    choice3: "A method of encrypting data",
    choice4: "A physical address of a computer",
    answer: 1,
    description: "An IP address is a unique identifier assigned to a device connected to a network, enabling communication with other devices."
  },
  {
    question: "What is normalization in databases?",
    choice1: "Organizing data to reduce redundancy",
    choice2: "Creating multiple copies of data",
    choice3: "Encrypting data for security",
    choice4: "Increasing the speed of database queries",
    answer: 1,
    description: "Normalization is a process in database design that organizes data to reduce redundancy and improve data integrity."
  },
  {
    question: "Which layer of the OSI model is responsible for data encryption?",
    choice1: "Physical layer",
    choice2: "Data link layer",
    choice3: "Network layer",
    choice4: "Presentation layer",
    answer: 4,
    description: "The presentation layer of the OSI model is responsible for data encryption and decryption."
  },
  {
    question: "What is the Agile Manifesto?",
    choice1: "A document that defines the stages of software development",
    choice2: "A guide for project management tools",
    choice3: "A declaration of the values and principles of Agile software development",
    choice4: "A technical specification for software design",
    answer: 3,
    description: "The Agile Manifesto outlines the values and principles that guide Agile software development practices."
  },
  {
    question: "What is a primary key in a database?",
    choice1: "A key that uniquely identifies a record in a table",
    choice2: "A key that is used for indexing",
    choice3: "A key that links two tables together",
    choice4: "A key that can have duplicate values",
    answer: 1,
    description: "A primary key is a field in a table that uniquely identifies each row or record in that table."
  },
  {
    question: "Which Python library is commonly used for data analysis?",
    choice1: "NumPy",
    choice2: "Pandas",
    choice3: "Matplotlib",
    choice4: "SciPy",
    answer: 2,
    description: "Pandas is a Python library that provides data structures and data analysis tools."
  },
  {
    question: "In Java, what is the purpose of the 'final' keyword?",
    choice1: "To declare a constant",
    choice2: "To define an abstract method",
    choice3: "To override a method",
    choice4: "To inherit a class",
    answer: 1,
    description: "The 'final' keyword in Java is used to declare constants, preventing the reassignment of variables or inheritance of classes."
  },
  {
    question: "What is a RESTful API?",
    choice1: "A type of database",
    choice2: "A method of file storage",
    choice3: "An API that uses HTTP requests for communication",
    choice4: "A software development methodology",
    answer: 3,
    description: "A RESTful API is an API that adheres to the constraints of REST architecture, using HTTP requests to perform CRUD operations."
  },
  {
    question: "What is the correct way to create a virtual environment in Python?",
    choice1: "python venv myenv",
    choice2: "python3 -m venv myenv",
    choice3: "python -m venv myenv",
    choice4: "python create venv myenv",
    answer: 3,
    description: "The correct way to create a virtual environment in Python is by using 'python -m venv myenv', which creates an isolated environment for your Python project."
  },
  {
    question: "Which of the following is used to open a file in Python?",
    choice1: "file.open('file.txt', 'r')",
    choice2: "open('file.txt')",
    choice3: "open('file.txt', 'r')",
    choice4: "file.open('file.txt')",
    answer: 3,
    description: "The 'open' function is used to open a file in Python. 'open('file.txt', 'r')' opens the file in read mode."
  },
  {
    question: "How do you declare a variable in Python?",
    choice1: "x = 10",
    choice2: "var x = 10",
    choice3: "int x = 10",
    choice4: "let x = 10",
    answer: 1,
    description: "In Python, you declare a variable by simply assigning a value to it, e.g., 'x = 10'."
  },
  {
    question: "What is the output of print(2**3)?",
    choice1: "9",
    choice2: "6",
    choice3: "8",
    choice4: "10",
    answer: 3,
    description: "The expression '2**3' calculates 2 raised to the power of 3, which equals 8."
  },
  {
    question: "In HTML, what does the <a> tag define?",
    choice1: "An anchor link",
    choice2: "A block of text",
    choice3: "An image",
    choice4: "A form",
    answer: 1,
    description: "The <a> tag in HTML is used to define a hyperlink, allowing users to click and navigate to another page or resource."
  },
  {
    question: "Which of the following is not a valid CSS selector?",
    choice1: ".class",
    choice2: "#id",
    choice3: "element",
    choice4: "element.class.id",
    answer: 4,
    description: "The 'element.class.id' selector is not valid in CSS. CSS selectors are typically combinations of element names, classes, and IDs."
  },
  {
    question: "What does 'JSON' stand for?",
    choice1: "JavaScript Object Notation",
    choice2: "JavaScript Object Name",
    choice3: "JavaScript Online Notation",
    choice4: "JavaScript Original Notation",
    answer: 1,
    description: "JSON stands for JavaScript Object Notation, a lightweight format used for data interchange between systems."
  },
  {
    question: "What is the purpose of the 'git clone' command?",
    choice1: "To create a new repository",
    choice2: "To download a repository from GitHub",
    choice3: "To commit changes to a repository",
    choice4: "To merge branches",
    answer: 2,
    description: "'git clone' is used to create a local copy of a remote repository from GitHub or another Git server."
  },
  {
    question: "What is the purpose of the 'npm' command in Node.js?",
    choice1: "To manage dependencies",
    choice2: "To compile code",
    choice3: "To create a project",
    choice4: "To run a server",
    answer: 1,
    description: "'npm' (Node Package Manager) is used to manage dependencies and packages in a Node.js project."
  },
  {
    question: "Which of the following is an example of a dynamic programming language?",
    choice1: "C",
    choice2: "Java",
    choice3: "Python",
    choice4: "C++",
    answer: 3,
    description: "Python is a dynamic programming language known for its flexibility and ease of use."
  },
  {
    question: "What is the primary function of a router in a network?",
    choice1: "To route data between devices on a network",
    choice2: "To store data",
    choice3: "To encrypt data",
    choice4: "To execute programs",
    answer: 1,
    description: "A router's primary function is to route data packets between devices on a network and manage traffic."
  },
  {
    question: "What does HTML stand for?",
    choice1: "Hypertext Markup Language",
    choice2: "Hyperlink and Text Markup Language",
    choice3: "High-Level Text Markup Language",
    choice4: "Hypertext Multi-language",
    answer: 1
  },
  {
    question: "What is the purpose of CSS?",
    choice1: "To create interactive web pages",
    choice2: "To style and layout web pages",
    choice3: "To manage web page content",
    choice4: "To perform server-side operations",
    answer: 2
  },
  {
    question: "What is the default display value of a <div> element?",
    choice1: "inline",
    choice2: "block",
    choice3: "inline-block",
    choice4: "none",
    answer: 2
  },
  {
    question: "In JavaScript, what is the 'this' keyword?",
    choice1: "A reference to the current object",
    choice2: "A reference to the previous object",
    choice3: "A reference to the global object",
    choice4: "A reference to a function",
    answer: 1
  },
  {
    question: "What is the purpose of a 'while' loop?",
    choice1: "To execute code once",
    choice2: "To execute code a fixed number of times",
    choice3: "To execute code as long as a condition is true",
    choice4: "To execute code in a specific order",
    answer: 3
  },
  {
    question: "What is an SQL JOIN operation used for?",
    choice1: "To combine data from multiple tables",
    choice2: "To sort data within a table",
    choice3: "To delete data from a table",
    choice4: "To update data in a table",
    answer: 1
  },
  {
    question: "What is the purpose of the 'try...catch' statement in JavaScript?",
    choice1: "To execute code in a loop",
    choice2: "To handle errors and exceptions",
    choice3: "To declare variables",
    choice4: "To create functions",
    answer: 2
  },
  {
    question: "Which HTTP method is used to submit data to a server?",
    choice1: "GET",
    choice2: "POST",
    choice3: "PUT",
    choice4: "DELETE",
    answer: 2
  },
  {
    question: "What is the primary use of the 'fetch' API in JavaScript?",
    choice1: "To create a new HTML element",
    choice2: "To perform asynchronous HTTP requests",
    choice3: "To manipulate the DOM",
    choice4: "To handle form submissions",
    answer: 2
  },
  {
    question: "What does 'JSON' stand for?",
    choice1: "JavaScript Object Notation",
    choice2: "JavaScript Online Notation",
    choice3: "JavaScript Origin Notation",
    choice4: "JavaScript Ordered Notation",
    answer: 1
  },
  {
    question: "Which method is used to add an item to the end of an array in JavaScript?",
    choice1: "push()",
    choice2: "pop()",
    choice3: "shift()",
    choice4: "unshift()",
    answer: 1
  },
  {
    question: "What is the purpose of the 'return' statement in a function?",
    choice1: "To end the function execution",
    choice2: "To define the function parameters",
    choice3: "To pass data back from the function",
    choice4: "To declare a new variable",
    answer: 3
  },
  {
    question: "What does the 'static' keyword indicate in Java?",
    choice1: "A method that cannot be overridden",
    choice2: "A variable that is shared among all instances",
    choice3: "A class that cannot be instantiated",
    choice4: "A method that cannot be accessed outside the class",
    answer: 2
  },
  {
    question: "In CSS, what is the use of the 'z-index' property?",
    choice1: "To control the font size",
    choice2: "To manage element positioning in the stacking order",
    choice3: "To adjust element opacity",
    choice4: "To define element width",
    answer: 2
  },
  {
    question: "Which method is used to select elements by class name in JavaScript?",
    choice1: "getElementById()",
    choice2: "querySelector()",
    choice3: "getElementsByClassName()",
    choice4: "querySelectorAll()",
    answer: 3
  },
  {
    question: "What is the purpose of the 'class' keyword in JavaScript ES6?",
    choice1: "To create a new function",
    choice2: "To define a new object",
    choice3: "To create a new class for objects",
    choice4: "To declare a variable",
    answer: 3
  },
  {
    question: "What is the purpose of a 'function' in JavaScript?",
    choice1: "To store data",
    choice2: "To define reusable blocks of code",
    choice3: "To style HTML elements",
    choice4: "To create HTML elements",
    answer: 2
  },
  {
    question: "Which CSS property is used to change the font size?",
    choice1: "font-style",
    choice2: "font-weight",
    choice3: "font-size",
    choice4: "text-align",
    answer: 3
  },
  {
    question: "What is the default value of the 'position' property in CSS?",
    choice1: "relative",
    choice2: "absolute",
    choice3: "fixed",
    choice4: "static",
    answer: 4
  },
  {
    question: "What is the output of 'console.log(typeof [])' in JavaScript?",
    choice1: "object",
    choice2: "array",
    choice3: "list",
    choice4: "undefined",
    answer: 1
  },
  {
    question: "What is the purpose of the 'break' statement in a loop?",
    choice1: "To skip the current iteration",
    choice2: "To exit the loop completely",
    choice3: "To continue to the next iteration",
    choice4: "To define a loop",
    answer: 2
  },
  {
    question: "In SQL, what is the purpose of the 'GROUP BY' clause?",
    choice1: "To filter records",
    choice2: "To group records based on a specified column",
    choice3: "To sort records",
    choice4: "To update records",
    answer: 2
  },
  {
    question: "What is a 'constructor' in object-oriented programming?",
    choice1: "A method that initializes a new object",
    choice2: "A function that modifies an object",
    choice3: "A variable that stores object data",
    choice4: "A property of an object",
    answer: 1
  },
  {
    question: "What is the purpose of the 'map()' method in JavaScript arrays?",
    choice1: "To filter elements",
    choice2: "To sort elements",
    choice3: "To apply a function to each element",
    choice4: "To find an element",
    answer: 3
  },
  {
    question: "What is 'git' used for?",
    choice1: "To track changes in source code",
    choice2: "To compile code",
    choice3: "To manage project requirements",
    choice4: "To design user interfaces",
    answer: 1
  },
  {
    question: "What does 'API' stand for?",
    choice1: "Application Programming Interface",
    choice2: "Application Program Interface",
    choice3: "Application Protocol Interface",
    choice4: "Application Programming Integration",
    answer: 1
  },
  {
    question: "What is the purpose of the 'filter()' method in JavaScript arrays?",
    choice1: "To apply a function to each element",
    choice2: "To find an element",
    choice3: "To remove elements based on a condition",
    choice4: "To sort elements",
    answer: 3
  },
  {
    question: "What is the 'let' keyword used for in JavaScript?",
    choice1: "To declare a variable with block scope",
    choice2: "To declare a constant variable",
    choice3: "To create a new object",
    choice4: "To define a function",
    answer: 1
  },
  {
    question: "What is a 'promise' in JavaScript?",
    choice1: "A value that is not yet available but will be in the future",
    choice2: "A function that executes code immediately",
    choice3: "A method that loops through elements",
    choice4: "A way to handle errors synchronously",
    answer: 1
  },
  {
    question: "Which HTML attribute is used to specify an image's alternative text?",
    choice1: "src",
    choice2: "alt",
    choice3: "title",
    choice4: "href",
    answer: 2
  },
  {
    question: "What is 'npm' used for?",
    choice1: "To manage Node.js packages",
    choice2: "To compile JavaScript code",
    choice3: "To create web pages",
    choice4: "To handle HTTP requests",
    answer: 1
  },
  {
    question: "What is the output of 'console.log(1 + '1')' in JavaScript?",
    choice1: "2",
    choice2: "11",
    choice3: "NaN",
    choice4: "undefined",
    answer: 2
  },
  {
    question: "What does 'async' denote in JavaScript?",
    choice1: "A function that executes asynchronously",
    choice2: "A variable that holds a promise",
    choice3: "A method that synchronizes data",
    choice4: "A class for asynchronous operations",
    answer: 1
  },
  {
    question: "What is the purpose of the 'console.log()' function in JavaScript?",
    choice1: "To output data to the console",
    choice2: "To create a new console window",
    choice3: "To log data to a file",
    choice4: "To debug code",
    answer: 1
  },
  {
    question: "What does the 'src' attribute specify in an <img> tag?",
    choice1: "The image's source URL",
    choice2: "The image's alternative text",
    choice3: "The image's title",
    choice4: "The image's width",
    answer: 1
  },
  {
    question: "Which method is used to convert a JavaScript object to a JSON string?",
    choice1: "JSON.parse()",
    choice2: "JSON.stringify()",
    choice3: "JSON.toString()",
    choice4: "JSON.convert()",
    answer: 2
  },
  {
    question: "In CSS, what does the 'float' property do?",
    choice1: "To set an element's visibility",
    choice2: "To position an element to the left or right",
    choice3: "To change the element's color",
    choice4: "To adjust the element's font size",
    answer: 2
  },
  {
    question: "What is the primary function of the 'querySelector()' method in JavaScript?",
    choice1: "To select the first matching element",
    choice2: "To select all matching elements",
    choice3: "To create a new element",
    choice4: "To remove an element",
    answer: 1
  },
  {
    question: "Which of the following is a JavaScript data type?",
    choice1: "number",
    choice2: "integer",
    choice3: "float",
    choice4: "char",
    answer: 1
  },
  {
    question: "What is the purpose of the 'getElementById()' method?",
    choice1: "To select an element by its ID",
    choice2: "To select an element by its class name",
    choice3: "To select an element by its tag name",
    choice4: "To create a new element",
    answer: 1
  },
  {
    question: "In SQL, what does the 'SELECT' statement do?",
    choice1: "To retrieve data from a database",
    choice2: "To insert data into a database",
    choice3: "To update data in a database",
    choice4: "To delete data from a database",
    answer: 1
  },
  {
    question: "What is the purpose of the 'DOMContentLoaded' event?",
    choice1: "To trigger when the document is fully loaded and parsed",
    choice2: "To trigger when the page is completely loaded including images",
    choice3: "To trigger when a form is submitted",
    choice4: "To trigger when a button is clicked",
    answer: 1
  },
  {
    question: "What is the difference between 'let' and 'const' in JavaScript?",
    choice1: "Both are used to declare variables, but 'const' creates a constant",
    choice2: "Both are used to declare variables, but 'let' is block-scoped",
    choice3: "'let' is for global variables, 'const' is for local variables",
    choice4: "'const' can be re-assigned, 'let' cannot",
    answer: 1
  },
  {
    question: "What is the purpose of the 'class' attribute in HTML?",
    choice1: "To define CSS styles for an element",
    choice2: "To create a new HTML element",
    choice3: "To specify the element's ID",
    choice4: "To add a hyperlink to an element",
    answer: 1
  },
  {
    question: "Which operator is used for strict equality comparison in JavaScript?",
    choice1: "==",
    choice2: "===",
    choice3: "!=",
    choice4: "!==",
    answer: 2
  },
  {
    question: "What is the primary use of the 'Promise.all()' method?",
    choice1: "To execute multiple promises in parallel",
    choice2: "To execute promises sequentially",
    choice3: "To handle errors in promises",
    choice4: "To cancel promises",
    answer: 1
  },
  {
    question: "What does the 'event.preventDefault()' method do?",
    choice1: "Prevents the default action of an event",
    choice2: "Triggers the default action of an event",
    choice3: "Stops event propagation",
    choice4: "Bubbles up the event",
    answer: 1
  },
  {
    question: "What is the purpose of the 'padding' property in CSS?",
    choice1: "To create space outside the element's border",
    choice2: "To create space inside the element's border",
    choice3: "To adjust the element's border width",
    choice4: "To change the element's background color",
    answer: 2
  },
  {
    question: "What is the function of the 'filter' method in JavaScript arrays?",
    choice1: "To apply a function to each element",
    choice2: "To create a new array with elements that pass a test",
    choice3: "To sort elements in the array",
    choice4: "To remove an element from the array",
    answer: 2
  },
  {
    question: "Which of the following is a correct way to create a JavaScript object?",
    choice1: "let obj = {}",
    choice2: "let obj = []",
    choice3: "let obj = ''",
    choice4: "let obj = ()",
    answer: 1
  },
  {
    question: "What does the 'fetch()' method return?",
    choice1: "A Promise",
    choice2: "An Array",
    choice3: "An Object",
    choice4: "A String",
    answer: 1
  },
  {
    question: "Which HTML element defines the structure of a webpage?",
    choice1: "<head>",
    choice2: "<body>",
    choice3: "<html>",
    choice4: "<div>",
    answer: 3
  },
  {
    question: "What is the output of 'Math.floor(4.7)' in JavaScript?",
    choice1: "4",
    choice2: "5",
    choice3: "4.7",
    choice4: "undefined",
    answer: 1
  },
  {
    question: "What does the 'reduce()' method do in JavaScript?",
    choice1: "Reduces the size of an array",
    choice2: "Reduces the number of elements in an array to a single value",
    choice3: "Removes elements from an array",
    choice4: "Adds elements to an array",
    answer: 2
  },
  {
    question: "What is the primary function of a 'getter' method in a class?",
    choice1: "To retrieve the value of a property",
    choice2: "To set the value of a property",
    choice3: "To delete a property",
    choice4: "To perform an action",
    answer: 1
  },
  {
    question: "Which CSS property is used to set the background color of an element?",
    choice1: "color",
    choice2: "background-color",
    choice3: "border-color",
    choice4: "text-color",
    answer: 2
  },
  {
    question: "What does the 'length' property return for an array in JavaScript?",
    choice1: "The number of elements in the array",
    choice2: "The total size of the array",
    choice3: "The type of the array",
    choice4: "The first element of the array",
    answer: 1
  },
  {
    question: "What is the purpose of the 'key' attribute in React components?",
    choice1: "To uniquely identify elements in a list",
    choice2: "To specify CSS styles",
    choice3: "To manage component state",
    choice4: "To handle events",
    answer: 1
  },
  {
    question: "What is the use of the 'setTimeout()' function in JavaScript?",
    choice1: "To execute code after a specified delay",
    choice2: "To repeatedly execute code at intervals",
    choice3: "To stop code execution",
    choice4: "To immediately execute code",
    answer: 1
  },
  {
    question: "Which method is used to remove the last element from an array in JavaScript?",
    choice1: "pop()",
    choice2: "push()",
    choice3: "shift()",
    choice4: "unshift()",
    answer: 1
  },
  {
    question: "What is the purpose of the 'return' keyword in a JavaScript function?",
    choice1: "To terminate the function and optionally return a value",
    choice2: "To create a new function",
    choice3: "To define the function's parameters",
    choice4: "To handle errors",
    answer: 1
  },
  {
    question: "What is the output of 'Boolean(0)' in JavaScript?",
    choice1: "true",
    choice2: "false",
    choice3: "undefined",
    choice4: "NaN",
    answer: 2
  },
  {
    question: "Which CSS property is used to control the visibility of an element?",
    choice1: "display",
    choice2: "visibility",
    choice3: "opacity",
    choice4: "overflow",
    answer: 2
  },
  {
    question: "What is the purpose of the 'prototype' property in JavaScript?",
    choice1: "To define methods and properties that are available to all instances of a constructor function",
    choice2: "To create a new instance of a function",
    choice3: "To access private variables",
    choice4: "To handle asynchronous operations",
    answer: 1
  },
  {
    question: "What is the 'this' keyword in JavaScript?",
    choice1: "A reference to the current object",
    choice2: "A reference to the parent object",
    choice3: "A reference to the global object",
    choice4: "A reference to the previous object",
    answer: 1
  },
  {
    question: "Which HTML tag is used to create a hyperlink?",
    choice1: "<a>",
    choice2: "<link>",
    choice3: "<url>",
    choice4: "<href>",
    answer: 1
  },
  {
    question: "What is the purpose of the 'setInterval()' function in JavaScript?",
    choice1: "To execute code at regular intervals",
    choice2: "To execute code after a specified delay",
    choice3: "To stop code execution",
    choice4: "To immediately execute code",
    answer: 1
  },
  {
    question: "What is the 'window' object in JavaScript?",
    choice1: "The global object representing the browser window",
    choice2: "An object representing the current HTML document",
    choice3: "A method to create new HTML elements",
    choice4: "An object to handle HTTP requests",
    answer: 1
  },
  {
    question: "What does the 'debugger' statement do in JavaScript?",
    choice1: "Pauses the execution of code and allows for debugging",
    choice2: "Immediately executes code",
    choice3: "Deletes code",
    choice4: "Logs messages to the console",
    answer: 1
  },
  {
    question: "Which CSS property is used to set the border of an element?",
    choice1: "border-width",
    choice2: "border-color",
    choice3: "border-style",
    choice4: "border",
    answer: 4
  },
  {
    question: "What is the primary use of the 'encodeURIComponent()' function in JavaScript?",
    choice1: "To encode a URI component for safe transmission",
    choice2: "To decode a URI component",
    choice3: "To create a new URI",
    choice4: "To manage URI parameters",
    answer: 1
  },
  {
    question: "What is the purpose of the 'localStorage' object in JavaScript?",
    choice1: "To store data locally within the browser with no expiration",
    choice2: "To store data temporarily during a page session",
    choice3: "To handle cookies",
    choice4: "To manage server-side data",
    answer: 1
  },
  {
    question: "What is the 'typeof' operator used for in JavaScript?",
    choice1: "To determine the data type of a variable",
    choice2: "To convert a variable to a different type",
    choice3: "To compare two values",
    choice4: "To create a new object",
    answer: 1
  },
  {
    question: "Which method is used to replace a substring in a string in JavaScript?",
    choice1: "replace()",
    choice2: "substring()",
    choice3: "slice()",
    choice4: "concat()",
    answer: 1
  },
  {
    question: "What is the purpose of the 'split()' method in JavaScript strings?",
    choice1: "To split a string into an array of substrings",
    choice2: "To join an array into a string",
    choice3: "To find a substring in a string",
    choice4: "To remove whitespace from a string",
    answer: 1
  },
  {
    question: "What does the 'valueOf()' method do in JavaScript?",
    choice1: "Returns the primitive value of an object",
    choice2: "Converts an object to a string",
    choice3: "Creates a new object",
    choice4: "Deletes an object",
    answer: 1
  },
  {
    question: "What is the purpose of the 'event.target' property in JavaScript?",
    choice1: "To reference the element that triggered the event",
    choice2: "To reference the element's parent",
    choice3: "To reference the event type",
    choice4: "To reference the event handler",
    answer: 1
  },
  {
    question: "What is the default value of the 'overflow' property in CSS?",
    choice1: "visible",
    choice2: "hidden",
    choice3: "scroll",
    choice4: "auto",
    answer: 1
  },
  {
    question: "What does the 'Math.random()' function return in JavaScript?",
    choice1: "A random number between 0 and 1",
    choice2: "A random integer between 0 and 100",
    choice3: "A random string",
    choice4: "A random boolean value",
    answer: 1
  },
  {
    question: "What is the purpose of the 'history' object in JavaScript?",
    choice1: "To manipulate the browser's session history",
    choice2: "To handle server-side data",
    choice3: "To create new browser windows",
    choice4: "To manage form data",
    answer: 1
  },
  {
    question: "What is the primary function of the 'reduce()' method in JavaScript?",
    choice1: "To apply a function to accumulate a single result from an array",
    choice2: "To remove duplicate elements from an array",
    choice3: "To sort an array",
    choice4: "To filter elements in an array",
    answer: 1
  },
  {
    question: "What is the purpose of the 'async' keyword in JavaScript?",
    choice1: "To define a function that returns a promise",
    choice2: "To declare a variable as asynchronous",
    choice3: "To convert a function to a generator",
    choice4: "To synchronize code execution",
    answer: 1
  },
  {
    question: "Which HTML element is used to define the structure of a table?",
    choice1: "<table>",
    choice2: "<tr>",
    choice3: "<td>",
    choice4: "<thead>",
    answer: 1
  },
  {
    question: "What does the 'this' keyword refer to in a JavaScript class method?",
    choice1: "The instance of the class",
    choice2: "The class itself",
    choice3: "The global object",
    choice4: "The parent class",
    answer: 1
  },
  {
    question: "What is the purpose of the 'await' keyword in JavaScript?",
    choice1: "To pause the execution of an async function until a promise resolves",
    choice2: "To define a synchronous function",
    choice3: "To handle errors in asynchronous code",
    choice4: "To create a new promise",
    answer: 1
  },
  {
    question: "Which CSS property is used to control the font size of an element?",
    choice1: "font-size",
    choice2: "font-family",
    choice3: "font-weight",
    choice4: "text-align",
    answer: 1
  },
  {
    question: "What does the 'textContent' property do in JavaScript?",
    choice1: "Gets or sets the text content of an element",
    choice2: "Changes the background color of an element",
    choice3: "Sets the HTML content of an element",
    choice4: "Gets or sets the element's attributes",
    answer: 1
  },
  {
    question: "What is the purpose of the 'use strict' directive in JavaScript?",
    choice1: "To enforce stricter parsing and error handling in JavaScript code",
    choice2: "To enable the use of new language features",
    choice3: "To optimize code for performance",
    choice4: "To disable debugging features",
    answer: 1
  },
  {
    question: "Which HTML attribute specifies an alternate text for an image?",
    choice1: "alt",
    choice2: "title",
    choice3: "src",
    choice4: "width",
    answer: 1
  },
  {
    question: "What is the primary function of the 'setAttribute()' method in JavaScript?",
    choice1: "To set the value of an attribute on an element",
    choice2: "To remove an attribute from an element",
    choice3: "To retrieve the value of an attribute from an element",
    choice4: "To create a new attribute on an element",
    answer: 1
  },
  {
    question: "Which operator is used to check if two values are not equal in JavaScript?",
    choice1: "!==",
    choice2: "!=",
    choice3: "==",
    choice4: "===",
    answer: 1
  },
  {
    question: "What does the 'Object.keys()' method do in JavaScript?",
    choice1: "Returns an array of a given object's own enumerable property names",
    choice2: "Returns an array of all object methods",
    choice3: "Creates a new object from an existing one",
    choice4: "Merges multiple objects into one",
    answer: 1
  },
  {
    question: "Which CSS property controls the spacing between lines of text?",
    choice1: "line-height",
    choice2: "letter-spacing",
    choice3: "text-indent",
    choice4: "word-spacing",
    answer: 1
  },
  {
    question: "What does the 'concat()' method do in JavaScript strings?",
    choice1: "Combines two or more strings into a single string",
    choice2: "Splits a string into an array of substrings",
    choice3: "Replaces a substring in a string",
    choice4: "Trims whitespace from the beginning and end of a string",
    answer: 1
  },
  {
    question: "What is the purpose of the 'Math.max()' function in JavaScript?",
    choice1: "Returns the largest of zero or more numbers",
    choice2: "Returns the smallest of zero or more numbers",
    choice3: "Generates a random number",
    choice4: "Rounds a number to the nearest integer",
    answer: 1
  },
  {
    question: "Which method is used to add one or more classes to an element in JavaScript?",
    choice1: "classList.add()",
    choice2: "classList.remove()",
    choice3: "classList.toggle()",
    choice4: "classList.contains()",
    answer: 1
  },
  {
    question: "What is the purpose of the 'encodeURI()' function in JavaScript?",
    choice1: "To encode a URI by escaping certain characters",
    choice2: "To decode a URI",
    choice3: "To create a new URI",
    choice4: "To handle URI parameters",
    answer: 1
  },
  {
    question: "What is the output of '2 ** 3' in JavaScript?",
    choice1: "8",
    choice2: "6",
    choice3: "9",
    choice4: "5",
    answer: 1
  },
  {
    question: "What is the primary function of the 'getElementsByClassName()' method?",
    choice1: "To get all elements with a specified class name",
    choice2: "To get the first element with a specified class name",
    choice3: "To create a new class",
    choice4: "To remove a class from an element",
    answer: 1
  },
  {
    question: "Which method is used to convert a JSON string into a JavaScript object?",
    choice1: "JSON.parse()",
    choice2: "JSON.stringify()",
    choice3: "JSON.toObject()",
    choice4: "JSON.convert()",
    answer: 1
  },
  {
    question: "What does the 'classList.toggle()' method do?",
    choice1: "Adds or removes a class from an element based on its current state",
    choice2: "Removes a class from an element",
    choice3: "Adds a class to an element",
    choice4: "Checks if an element has a specific class",
    answer: 1
  },
  {
    question: "What is the purpose of the 'window.localStorage' object?",
    choice1: "To store data with no expiration date in the browser",
    choice2: "To store data that expires when the session ends",
    choice3: "To manage cookies",
    choice4: "To handle server-side storage",
    answer: 1
  },
  {
    question: "Which method is used to iterate over the elements of an array in JavaScript?",
    choice1: "forEach()",
    choice2: "map()",
    choice3: "filter()",
    choice4: "reduce()",
    answer: 1
  },
  {
    question: "What is the purpose of the 'toFixed()' method in JavaScript?",
    choice1: "To format a number to a specified number of decimal places",
    choice2: "To convert a number to a string",
    choice3: "To round a number to the nearest integer",
    choice4: "To perform a mathematical calculation",
    answer: 1
  },
  {
    question: "Which CSS property is used to set the margin of an element?",
    choice1: "margin",
    choice2: "padding",
    choice3: "border",
    choice4: "spacing",
    answer: 1
  },
  {
    question: "What is the output of 'typeof NaN' in JavaScript?",
    choice1: "number",
    choice2: "undefined",
    choice3: "object",
    choice4: "string",
    answer: 1
  },
  {
    question: "What is the purpose of the 'Object.assign()' method in JavaScript?",
    choice1: "To copy the values of all properties from one or more source objects to a target object",
    choice2: "To merge two objects into one",
    choice3: "To create a new object with specific properties",
    choice4: "To delete properties from an object",
    answer: 1
  },
  {
    question: "Which method is used to check if a string includes a substring in JavaScript?",
    choice1: "includes()",
    choice2: "contains()",
    choice3: "has()",
    choice4: "find()",
    answer: 1
  },
  {
    question: "What is the purpose of the 'Object.create()' method in JavaScript?",
    choice1: "To create a new object with the specified prototype object and properties",
    choice2: "To create a new instance of a constructor function",
    choice3: "To merge objects",
    choice4: "To clone an object",
    answer: 1
  },
  {
    question: "Which CSS property is used to control the background color of an element?",
    choice1: "background-color",
    choice2: "color",
    choice3: "border-color",
    choice4: "text-color",
    answer: 1
  },
  {
    question: "What does the 'parseInt()' function do in JavaScript?",
    choice1: "Parses a string argument and returns an integer",
    choice2: "Converts an integer to a string",
    choice3: "Formats a number to a specified number of decimal places",
    choice4: "Rounds a number to the nearest integer",
    answer: 1
  },
  {
    question: "What is the purpose of the 'Array.isArray()' method in JavaScript?",
    choice1: "To determine whether the provided value is an array",
    choice2: "To create a new array",
    choice3: "To convert a value to an array",
    choice4: "To remove an element from an array",
    answer: 1
  },
  {
    question: "Which method is used to remove whitespace from both ends of a string in JavaScript?",
    choice1: "trim()",
    choice2: "slice()",
    choice3: "substring()",
    choice4: "replace()",
    answer: 1
  },
  {
    question: "What does the 'Object.keys()' method return in JavaScript?",
    choice1: "An array of the object's own enumerable property names",
    choice2: "An array of all property values",
    choice3: "An array of all property names and values",
    choice4: "An array of the object's prototype chain",
    answer: 1
  },
  {
    question: "Which method is used to execute a function for each element in an array?",
    choice1: "forEach()",
    choice2: "map()",
    choice3: "filter()",
    choice4: "reduce()",
    answer: 1
  },
  {
    question: "What is the purpose of the 'addEventListener()' method in JavaScript?",
    choice1: "To attach an event handler to an element",
    choice2: "To remove an event handler from an element",
    choice3: "To trigger an event on an element",
    choice4: "To create a new event type",
    answer: 1
  },
  {
    question: "Which property is used to change the font weight of an element in CSS?",
    choice1: "font-weight",
    choice2: "font-size",
    choice3: "font-family",
    choice4: "font-style",
    answer: 1
  },
  {
    question: "What does the 'Math.floor()' function do in JavaScript?",
    choice1: "Rounds a number down to the nearest integer",
    choice2: "Rounds a number up to the nearest integer",
    choice3: "Rounds a number to the nearest integer",
    choice4: "Generates a random number",
    answer: 1
  },
  {
    question: "Which HTML tag is used to define a form for user input?",
    choice1: "<form>",
    choice2: "<input>",
    choice3: "<textarea>",
    choice4: "<button>",
    answer: 1
  },
  {
    question: "What is the purpose of the 'JSON.stringify()' method in JavaScript?",
    choice1: "To convert a JavaScript object to a JSON string",
    choice2: "To parse a JSON string into a JavaScript object",
    choice3: "To create a new JSON object",
    choice4: "To validate a JSON string",
    answer: 1
  },
  {
    question: "Which method is used to remove the first element from an array in JavaScript?",
    choice1: "shift()",
    choice2: "pop()",
    choice3: "unshift()",
    choice4: "splice()",
    answer: 1
  },
  {
    question: "What does the 'toLowerCase()' method do in JavaScript?",
    choice1: "Converts a string to lowercase",
    choice2: "Converts a string to uppercase",
    choice3: "Trims whitespace from a string",
    choice4: "Finds the length of a string",
    answer: 1
  },
  {
    question: "What is the primary function of the 'filter()' method in JavaScript?",
    choice1: "To create a new array with elements that pass a test",
    choice2: "To sort the elements of an array",
    choice3: "To merge two arrays",
    choice4: "To iterate over the elements of an array",
    answer: 1
  },
  {
    question: "Which CSS property is used to set the width of an element?",
    choice1: "width",
    choice2: "height",
    choice3: "margin",
    choice4: "padding",
    answer: 1
  },
  {
    question: "What does the 'isNaN()' function do in JavaScript?",
    choice1: "Determines if a value is NaN (Not-a-Number)",
    choice2: "Checks if a value is an integer",
    choice3: "Converts a value to a number",
    choice4: "Generates a random number",
    answer: 1
  },
  {
    question: "What is the purpose of the 'String.prototype.slice()' method?",
    choice1: "To extract a portion of a string and return it as a new string",
    choice2: "To replace a portion of a string with a new value",
    choice3: "To split a string into an array of substrings",
    choice4: "To join an array of strings into a single string",
    answer: 1
  },
  {
    question: "Which method is used to add an element to the end of an array in JavaScript?",
    choice1: "push()",
    choice2: "pop()",
    choice3: "shift()",
    choice4: "unshift()",
    answer: 1
  },
  {
    question: "What is the default value of the 'display' property in CSS?",
    choice1: "block",
    choice2: "inline",
    choice3: "none",
    choice4: "flex",
    answer: 1
  },
  {
    question: "What does the 'Object.values()' method return in JavaScript?",
    choice1: "An array of a given object's own enumerable property values",
    choice2: "An array of a given object's own enumerable property names",
    choice3: "A new object with only enumerable properties",
    choice4: "An array of all object methods",
    answer: 1
  },
  {
    question: "Which HTML attribute is used to specify the URL of an external script file?",
    choice1: "src",
    choice2: "href",
    choice3: "type",
    choice4: "rel",
    answer: 1
  },
  {
    question: "What is the purpose of the 'addEventListener()' method in JavaScript?",
    choice1: "To attach an event handler to an element",
    choice2: "To remove an event handler from an element",
    choice3: "To trigger an event on an element",
    choice4: "To create a new event type",
    answer: 1
  },
  {
    question: "Which CSS property is used to control the text color of an element?",
    choice1: "color",
    choice2: "background-color",
    choice3: "border-color",
    choice4: "text-align",
    answer: 1
  },
  {
    question: "What does the 'document.querySelector()' method do?",
    choice1: "Selects the first element that matches a specified CSS selector",
    choice2: "Selects all elements that match a specified CSS selector",
    choice3: "Creates a new element",
    choice4: "Removes an element from the document",
    answer: 1
  },
  {
    question: "What is the purpose of the 'Array.prototype.map()' method?",
    choice1: "To create a new array with the results of calling a provided function on every element",
    choice2: "To remove elements from an array",
    choice3: "To sort the elements of an array",
    choice4: "To combine two arrays",
    answer: 1
  },
  {
    question: "Which method is used to create a new array with all elements that pass a test in JavaScript?",
    choice1: "filter()",
    choice2: "map()",
    choice3: "reduce()",
    choice4: "forEach()",
    answer: 1
  },
  {
    question: "What is the output of 'Boolean(null)' in JavaScript?",
    choice1: "false",
    choice2: "true",
    choice3: "undefined",
    choice4: "0",
    answer: 1
  },
  {
    question: "What does the 'toString()' method do in JavaScript?",
    choice1: "Returns a string representing the specified object",
    choice2: "Converts a string to a number",
    choice3: "Trims whitespace from a string",
    choice4: "Replaces a substring in a string",
    answer: 1
  },
  {
    question: "Which method is used to convert a number to a string in JavaScript?",
    choice1: "toString()",
    choice2: "parseInt()",
    choice3: "parseFloat()",
    choice4: "Number()",
    answer: 1
  },
  {
    question: "What is the purpose of the 'console.log()' method in JavaScript?",
    choice1: "To output messages to the web console",
    choice2: "To create a new console window",
    choice3: "To debug JavaScript code",
    choice4: "To print messages to the document",
    answer: 1
  },
  {
    question: "Which CSS property is used to set the border style of an element?",
    choice1: "border-style",
    choice2: "border-width",
    choice3: "border-color",
    choice4: "border-radius",
    answer: 1
  },
  {
    question: "What does the 'typeof' operator do in JavaScript?",
    choice1: "Returns a string indicating the type of a variable",
    choice2: "Checks if a variable is undefined",
    choice3: "Converts a value to a specific type",
    choice4: "Creates a new type",
    answer: 1
  },
  {
    question: "What is the output of 'false + 1' in JavaScript?",
    choice1: "1",
    choice2: "0",
    choice3: "false",
    choice4: "NaN",
    answer: 1
  },
  {
    question: "Which HTML element is used to create a hyperlink?",
    choice1: "<a>",
    choice2: "<link>",
    choice3: "<button>",
    choice4: "<nav>",
    answer: 1
  },
  {
    question: "What is the purpose of the 'document.createElement()' method?",
    choice1: "To create a new HTML element",
    choice2: "To remove an existing HTML element",
    choice3: "To modify an existing HTML element",
    choice4: "To get an existing HTML element",
    answer: 1
  },
  {
    question: "Which method is used to add a new element at the end of a list in JavaScript?",
    choice1: "appendChild()",
    choice2: "insertBefore()",
    choice3: "removeChild()",
    choice4: "replaceChild()",
    answer: 1
  },
  {
    question: "What is the purpose of the 'Array.prototype.reduce()' method?",
    choice1: "To reduce an array to a single value by applying a function to each element",
    choice2: "To filter elements based on a condition",
    choice3: "To map each element to a new value",
    choice4: "To find the maximum value in an array",
    answer: 1
  },
  {
    question: "Which CSS property controls the visibility of an element?",
    choice1: "visibility",
    choice2: "display",
    choice3: "opacity",
    choice4: "position",
    answer: 1
  },
  {
    question: "What does the 'Object.assign()' method do in JavaScript?",
    choice1: "Copies the values of all properties from one or more source objects to a target object",
    choice2: "Merges two objects into one",
    choice3: "Creates a new object with specified properties",
    choice4: "Deletes properties from an object",
    answer: 1
  },
  {
    question: "What is the purpose of the 'classList.remove()' method in JavaScript?",
    choice1: "To remove one or more classes from an element",
    choice2: "To add one or more classes to an element",
    choice3: "To toggle classes on an element",
    choice4: "To replace a class on an element",
    answer: 1
  },
  {
    question: "Which method is used to set the value of a form element in JavaScript?",
    choice1: "value",
    choice2: "innerHTML",
    choice3: "textContent",
    choice4: "setAttribute()",
    answer: 1
  },
  {
    question: "What does the 'parseFloat()' function do in JavaScript?",
    choice1: "Parses a string argument and returns a floating point number",
    choice2: "Converts a number to a string",
    choice3: "Rounds a number to the nearest integer",
    choice4: "Formats a number to a specified number of decimal places",
    answer: 1
  },
  {
    question: "Which CSS property is used to control the horizontal alignment of text?",
    choice1: "text-align",
    choice2: "text-indent",
    choice3: "text-transform",
    choice4: "line-height",
    answer: 1
  },
  {
    question: "What does the 'String.prototype.replace()' method do?",
    choice1: "Replaces a specified value with another value in a string",
    choice2: "Converts a string to uppercase",
    choice3: "Splits a string into an array of substrings",
    choice4: "Trims whitespace from a string",
    answer: 1
  },
  {
    question: "Which method is used to create a new HTML element and add it to the DOM?",
    choice1: "createElement()",
    choice2: "appendChild()",
    choice3: "insertBefore()",
    choice4: "removeChild()",
    answer: 1
  },
  {
    question: "What does the 'document.querySelectorAll()' method return?",
    choice1: "A NodeList of all elements that match a specified CSS selector",
    choice2: "A single element that matches a specified CSS selector",
    choice3: "An array of all elements in the document",
    choice4: "A collection of elements with a specified class name",
    answer: 1
  },
  {
    question: "What is the purpose of the 'Array.prototype.find()' method?",
    choice1: "To find the first element in an array that satisfies a provided testing function",
    choice2: "To remove elements from an array",
    choice3: "To filter elements based on a condition",
    choice4: "To create a new array with the results of a function",
    answer: 1
  },
  {
    question: "Which HTML tag is used to define a list item?",
    choice1: "<li>",
    choice2: "<ul>",
    choice3: "<ol>",
    choice4: "<list>",
    answer: 1
  },
  {
    question: "What does the 'isFinite()' function do in JavaScript?",
    choice1: "Determines if a value is a finite number",
    choice2: "Checks if a value is NaN",
    choice3: "Converts a value to a number",
    choice4: "Rounds a number to the nearest integer",
    answer: 1
  },
  {
    question: "Which CSS property is used to control the display of an element?",
    choice1: "display",
    choice2: "visibility",
    choice3: "opacity",
    choice4: "position",
    answer: 1
  },
  {
    question: "What is the purpose of the 'Element.classList' property in JavaScript?",
    choice1: "To access and manipulate the list of classes on an element",
    choice2: "To get the element's ID",
    choice3: "To set or retrieve the element's attributes",
    choice4: "To handle element events",
    answer: 1
  },
  {
    question: "What does the 'Array.prototype.some()' method do in JavaScript?",
    choice1: "Tests whether at least one element in the array passes a provided test",
    choice2: "Creates a new array with the results of calling a function on every element",
    choice3: "Finds the first element in an array that satisfies a test",
    choice4: "Reduces the array to a single value",
    answer: 1
  },
  {
    question: "Which CSS property is used to set the border radius of an element?",
    choice1: "border-radius",
    choice2: "border-style",
    choice3: "border-width",
    choice4: "border-color",
    answer: 1
  },
  {
    question: "What is the purpose of the 'Array.prototype.slice()' method?",
    choice1: "To return a shallow copy of a portion of an array into a new array",
    choice2: "To add elements to an array",
    choice3: "To remove elements from an array",
    choice4: "To sort the elements of an array",
    answer: 1
  },
  {
    question: "Which method is used to execute a function once for each element in an array in JavaScript?",
    choice1: "forEach()",
    choice2: "map()",
    choice3: "filter()",
    choice4: "reduce()",
    answer: 1
  },
  {
    question: "What does the 'String.prototype.charAt()' method do?",
    choice1: "Returns the character at a specified index in a string",
    choice2: "Returns the index of a specified character in a string",
    choice3: "Converts a string to uppercase",
    choice4: "Trims whitespace from a string",
    answer: 1
  },
  {
    question: "Which method is used to convert a JSON string to a JavaScript object?",
    choice1: "JSON.parse()",
    choice2: "JSON.stringify()",
    choice3: "Object.assign()",
    choice4: "Object.create()",
    answer: 1
  },
  {
    question: "What is the purpose of the 'Array.prototype.sort()' method?",
    choice1: "To sort the elements of an array",
    choice2: "To filter elements based on a condition",
    choice3: "To map each element to a new value",
    choice4: "To reduce the array to a single value",
    answer: 1
  },
  {
    question: "Which CSS property is used to set the font style of an element?",
    choice1: "font-style",
    choice2: "font-size",
    choice3: "font-family",
    choice4: "font-weight",
    answer: 1
  },
  {
    question: "What is the purpose of the 'Math.random()' function in JavaScript?",
    choice1: "To generate a random number between 0 (inclusive) and 1 (exclusive)",
    choice2: "To generate a random integer within a specified range",
    choice3: "To round a number to the nearest integer",
    choice4: "To generate a random integer between 1 and 100",
    answer: 1
  },
  {
    question: "Which HTML tag is used to define a table?",
    choice1: "<table>",
    choice2: "<tr>",
    choice3: "<td>",
    choice4: "<thead>",
    answer: 1
  },
  {
    question: "What is the purpose of the 'Object.keys()' method in JavaScript?",
    choice1: "To return an array of a given object's own enumerable property names",
    choice2: "To return an array of a given object's own enumerable property values",
    choice3: "To create a new object with specified properties",
    choice4: "To delete properties from an object",
    answer: 1
  },
  {
    question: "Which CSS property is used to set the height of an element?",
    choice1: "height",
    choice2: "width",
    choice3: "margin",
    choice4: "padding",
    answer: 1
  },
  {
    question: "What does the 'Array.prototype.reduce()' method do in JavaScript?",
    choice1: "Reduces the array to a single value by applying a function to each element",
    choice2: "Creates a new array with the results of calling a function on every element",
    choice3: "Finds the maximum value in an array",
    choice4: "Filters elements based on a condition",
    answer: 1
  },
  {
    question: "What is the purpose of the 'document.createElement()' method?",
    choice1: "To create a new HTML element",
    choice2: "To remove an existing HTML element",
    choice3: "To modify an existing HTML element",
    choice4: "To get an existing HTML element",
    answer: 1
  },
  {
    question: "Which method is used to add a new element at the beginning of an array in JavaScript?",
    choice1: "unshift()",
    choice2: "push()",
    choice3: "shift()",
    choice4: "pop()",
    answer: 1
  },
];

// DEFINE CONSTANTS - Requiered for the game.

// The score awarded for a correct answer.
const CORRECT_BONUS = 10;

// The maximum number of questions in the quiz
const MAX_QUESTIONS = 5;

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
    // const correctAnswer = currentQuestion.answer;

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
