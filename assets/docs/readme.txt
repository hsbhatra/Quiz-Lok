startGame() 
    ↓
getNewQuestion()
    ↓
Display Question and Choices
    ↓
User Selects Choice
    ↓
Check Answer
    ↓
Apply Class (correct/incorrect)
    ↓
getNewQuestion() or End Quiz



Flow of Data (Flowchart Explained!):- 

1. startGame Function:
    Initialize counters and variables.
    Load the first question with getNewQuestion.

2. getNewQuestion Function:
    Check if the quiz should end (no more questions or max questions reached).
    Increment question counter.
    Select a random question and display it.
    Remove the selected question from availableQuestions.
    Set acceptingAnswers to true.

3. Answer Selection:
    User clicks on a choice.
    Check if answers are being accepted.
    Set acceptingAnswers to false.
    Get selected choice and compare with the correct answer.
    Apply the appropriate class to the selected choice.
    Load the next question with getNewQuestion.