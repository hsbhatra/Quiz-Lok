// This file contains the logic for the quiz game.
// It handles the game flow, including displaying questions, accepting answers, and updating the score and progress bar.

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
      "question": "In Java, what is the time complexity of accessing an element by index in an ArrayList?",
      "choice1": "O(1)",
      "choice2": "O(n)",
      "choice3": "O(log n)",
      "choice4": "O(n log n)",
      "answer": 1
    },
    {
      "question": "Which of these operations is not supported by Java’s String class?",
      "choice1": "replace()",
      "choice2": "append()",
      "choice3": "substring()",
      "choice4": "toUpperCase()",
      "answer": 2
    },
    {
      "question": "What does the `putIfAbsent(key, value)` method of ConcurrentHashMap do?",
      "choice1": "Replaces the value if key is present",
      "choice2": "Inserts the key-value only if key is not already mapped",
      "choice3": "Removes the key if it exists",
      "choice4": "Throws an exception if key exists",
      "answer": 2
    },
    {
      "question": "In a singly linked list, which operation is O(n)?",
      "choice1": "Insertion at head",
      "choice2": "Deletion at head",
      "choice3": "Search for a given value",
      "choice4": "Reversal of first two nodes",
      "answer": 3
    },
    {
      "question": "Which data structure uses LIFO order?",
      "choice1": "Queue",
      "choice2": "Stack",
      "choice3": "LinkedList",
      "choice4": "PriorityQueue",
      "answer": 2
    },
    {
      "question": "What is the best-case time complexity of enqueue and dequeue in a circular queue implemented with an array?",
      "choice1": "O(n)",
      "choice2": "O(log n)",
      "choice3": "O(1)",
      "choice4": "O(n²)",
      "answer": 3
    },
    {
      "question": "In a binary search tree, which traversal gives nodes in non-decreasing order?",
      "choice1": "Pre-order",
      "choice2": "Post-order",
      "choice3": "In-order",
      "choice4": "Level-order",
      "answer": 3
    },
    {
      "question": "Which graph representation is most space-efficient for a sparse graph?",
      "choice1": "Adjacency matrix",
      "choice2": "Adjacency list",
      "choice3": "Incidence matrix",
      "choice4": "Edge list with duplicate edges",
      "answer": 2
    },
    {
      "question": "What’s the time complexity of checking connectivity with DFS on a graph with V vertices and E edges?",
      "choice1": "O(V + E)",
      "choice2": "O(V²)",
      "choice3": "O(E²)",
      "choice4": "O(log V + E)",
      "answer": 1
    },
    {
      "question": "Dynamic programming solves problems by using which technique?",
      "choice1": "Divide and conquer",
      "choice2": "Greedy choice",
      "choice3": "Memoization or tabulation",
      "choice4": "Brute force",
      "answer": 3
    },
    {
      "question": "Which of these is not a characteristic of a dynamic array?",
      "choice1": "Automatic resizing",
      "choice2": "Constant amortized append",
      "choice3": "Fixed capacity",
      "choice4": "Random access",
      "answer": 3
    },
    {
      "question": "In Java, which interface does LinkedList implement to allow insertion at both ends?",
      "choice1": "List",
      "choice2": "Deque",
      "choice3": "Queue",
      "choice4": "Set",
      "answer": 2
    },
    {
      "question": "What’s the worst-case time complexity to search an element in an unsorted array?",
      "choice1": "O(1)",
      "choice2": "O(log n)",
      "choice3": "O(n)",
      "choice4": "O(n log n)",
      "answer": 3
    },
    {
      "question": "Which operation on a binary heap takes O(log n) time?",
      "choice1": "Find-min (for min-heap)",
      "choice2": "Insert",
      "choice3": "Peek-max (for max-heap)",
      "choice4": "Initialize empty heap",
      "answer": 2
    },
    {
      "question": "Which structure allows both FIFO and LIFO behavior?",
      "choice1": "PriorityQueue",
      "choice2": "Deque",
      "choice3": "Stack",
      "choice4": "HashSet",
      "answer": 2
    },
    {
      "question": "Which of these is a self-balancing binary search tree?",
      "choice1": "Binary Heap",
      "choice2": "AVL Tree",
      "choice3": "Red-Black Graph",
      "choice4": "Trie",
      "answer": 2
    },
    {
      "question": "What’s the space complexity of storing an adjacency matrix for a graph with V vertices?",
      "choice1": "O(V + E)",
      "choice2": "O(V²)",
      "choice3": "O(E²)",
      "choice4": "O(log V)",
      "answer": 2
    },
    {
      "question": "Which DS is best for implementing an LRU cache?",
      "choice1": "ArrayList",
      "choice2": "LinkedList",
      "choice3": "HashMap + Doubly LinkedList",
      "choice4": "Stack",
      "answer": 3
    },
    {
      "question": "What is tail recursion in dynamic programming context?",
      "choice1": "Recursion with no return value",
      "choice2": "Recursion where last call is the return",
      "choice3": "Recursion that never ends",
      "choice4": "Recursion with multiple calls",
      "answer": 2
    },
    {
      "question": "Which of these best describes a Trie?",
      "choice1": "Tree of linked lists",
      "choice2": "Prefix tree",
      "choice3": "Heap-ordered tree",
      "choice4": "Binary search tree with pointers",
      "answer": 2
    },
    {
      "question": "What’s the amortized time complexity of push() on a stack implemented with an array doubling strategy?",
      "choice1": "O(1)",
      "choice2": "O(log n)",
      "choice3": "O(n)",
      "choice4": "O(n log n)",
      "answer": 1
    },
    {
      "question": "Which DS is best for BFS on a graph?",
      "choice1": "Stack",
      "choice2": "Queue",
      "choice3": "PriorityQueue",
      "choice4": "HashSet",
      "answer": 2
    },
    {
      "question": "Which DS is ideal for undo-redo functionality?",
      "choice1": "Queue",
      "choice2": "Stack",
      "choice3": "HashMap",
      "choice4": "Tree",
      "answer": 2
    },
    {
      "question": "Which of these dynamic programming problems uses a 2D table?",
      "choice1": "Fibonacci with memo",
      "choice2": "Longest Common Subsequence",
      "choice3": "Single-source shortest path",
      "choice4": "Binary search",
      "answer": 2
    },
    {
      "question": "What is the height of a perfectly balanced binary tree with N nodes?",
      "choice1": "O(N)",
      "choice2": "O(log N)",
      "choice3": "O(N log N)",
      "choice4": "O(√N)",
      "answer": 2
    },
    {
      "question": "What is the worst-case time complexity of binary search on a sorted array of size N?",
      "choice1": "O(1)",
      "choice2": "O(log N)",
      "choice3": "O(N)",
      "choice4": "O(N log N)",
      "answer": 2
    },
    {
      "question": "Which sorting algorithm is stable and has O(N²) worst-case time?",
      "choice1": "Quick Sort",
      "choice2": "Heap Sort",
      "choice3": "Merge Sort",
      "choice4": "Insertion Sort",
      "answer": 4
    },
    {
      "question": "What is the average-case time complexity of Quick Sort?",
      "choice1": "O(N)",
      "choice2": "O(N log N)",
      "choice3": "O(N²)",
      "choice4": "O(log N)",
      "answer": 2
    },
    {
      "question": "Which algorithm uses divide and conquer strategy?",
      "choice1": "Bubble Sort",
      "choice2": "Selection Sort",
      "choice3": "Merge Sort",
      "choice4": "Insertion Sort",
      "answer": 3
    },
    {
      "question": "What’s the space complexity of Merge Sort (top-down)?",
      "choice1": "O(1)",
      "choice2": "O(log N)",
      "choice3": "O(N)",
      "choice4": "O(N log N)",
      "answer": 3
    },
    {
      "question": "Which searching algorithm is optimal for unweighted graphs?",
      "choice1": "Depth-First Search",
      "choice2": "Breadth-First Search",
      "choice3": "Binary Search",
      "choice4": "Linear Search",
      "answer": 2
    },
    {
      "question": "What’s the worst-case time complexity of Quick Sort when pivot is always min or max?",
      "choice1": "O(N)",
      "choice2": "O(N log N)",
      "choice3": "O(N²)",
      "choice4": "O(log N)",
      "answer": 3
    },
    {
      "question": "Which sort is in-place and not stable?",
      "choice1": "Heap Sort",
      "choice2": "Merge Sort",
      "choice3": "Bubble Sort",
      "choice4": "Insertion Sort",
      "answer": 1
    },
    {
      "question": "Binary search requires the array to be:",
      "choice1": "Unsorted",
      "choice2": "Sorted",
      "choice3": "Circularly linked",
      "choice4": "Stored in a tree",
      "answer": 2
    },
    {
      "question": "Which sort repeatedly swaps adjacent elements if they’re in the wrong order?",
      "choice1": "Quick Sort",
      "choice2": "Shell Sort",
      "choice3": "Bubble Sort",
      "choice4": "Radix Sort",
      "answer": 3
    },
    {
      "question": "What is the best-case time complexity of Bubble Sort (when already sorted)?",
      "choice1": "O(N)",
      "choice2": "O(N log N)",
      "choice3": "O(N²)",
      "choice4": "O(log N)",
      "answer": 1
    },
    {
      "question": "Which sort uses a gap sequence to compare elements?",
      "choice1": "Insertion Sort",
      "choice2": "Shell Sort",
      "choice3": "Selection Sort",
      "choice4": "Heap Sort",
      "answer": 2
    },
    {
      "question": "Which algorithm finds the k-th smallest element in average O(N) time?",
      "choice1": "Counting Sort",
      "choice2": "Quickselect",
      "choice3": "Merge Sort",
      "choice4": "Bubble Sort",
      "answer": 2
    },
    {
      "question": "What is the time complexity of searching an unsorted array linearly?",
      "choice1": "O(1)",
      "choice2": "O(log N)",
      "choice3": "O(N)",
      "choice4": "O(N log N)",
      "answer": 3
    },
    {
      "question": "Which sort is non-comparison-based and works in O(N + k) time?",
      "choice1": "Merge Sort",
      "choice2": "Heap Sort",
      "choice3": "Counting Sort",
      "choice4": "Quick Sort",
      "answer": 3
    },
    {
      "question": "Which algorithm would you use for nearly sorted data?",
      "choice1": "Merge Sort",
      "choice2": "Insertion Sort",
      "choice3": "Heap Sort",
      "choice4": "Radix Sort",
      "answer": 2
    },
    {
      "question": "What’s the worst-case time of Selection Sort?",
      "choice1": "O(N)",
      "choice2": "O(N log N)",
      "choice3": "O(N²)",
      "choice4": "O(log N)",
      "answer": 3
    },
    {
      "question": "Which sort is stable and out-of-place?",
      "choice1": "Merge Sort",
      "choice2": "Quick Sort",
      "choice3": "Heap Sort",
      "choice4": "Bubble Sort",
      "answer": 1
    },
    {
      "question": "Which search algorithm on a BST takes O(h) where h is tree height?",
      "choice1": "DFS",
      "choice2": "BFS",
      "choice3": "BST search",
      "choice4": "Linear Search",
      "answer": 3
    },
    {
      "question": "Which sort is best for large integers when range is limited?",
      "choice1": "Heap Sort",
      "choice2": "Radix Sort",
      "choice3": "Merge Sort",
      "choice4": "Quick Sort",
      "answer": 2
    },
    {
      "question": "Which algorithm is used to find shortest path in unweighted graph?",
      "choice1": "DFS",
      "choice2": "Dijkstra",
      "choice3": "BFS",
      "choice4": "Bellman-Ford",
      "answer": 3
    },
    {
      "question": "What’s the average-case time complexity of Bubble Sort?",
      "choice1": "O(N)",
      "choice2": "O(N log N)",
      "choice3": "O(N²)",
      "choice4": "O(log N)",
      "answer": 3
    },
    {
      "question": "Which sort can be implemented recursively or iteratively via partitioning?",
      "choice1": "Insertion Sort",
      "choice2": "Quick Sort",
      "choice3": "Shell Sort",
      "choice4": "Bubble Sort",
      "answer": 2
    },
    {
      "question": "What does ACID stand for in transaction management?",
      "choice1": "Atomicity, Consistency, Isolation, Durability",
      "choice2": "Availability, Consistency, Isolation, Durability",
      "choice3": "Atomicity, Concurrency, Isolation, Durability",
      "choice4": "Availability, Concurrency, Integrity, Durability",
      "answer": 1
    },
    {
      "question": "Which normal form eliminates transitive dependencies?",
      "choice1": "1NF",
      "choice2": "2NF",
      "choice3": "3NF",
      "choice4": "BCNF",
      "answer": 3
    },
    {
      "question": "What is a clustered index?",
      "choice1": "Index stored separately from data",
      "choice2": "Index that defines physical order of data",
      "choice3": "Hash-based index",
      "choice4": "Non-unique index",
      "answer": 2
    },
    {
      "question": "In an ER diagram, what does a diamond represent?",
      "choice1": "Entity",
      "choice2": "Attribute",
      "choice3": "Relationship",
      "choice4": "Primary key",
      "answer": 3
    },
    {
      "question": "Which SQL isolation level prevents dirty reads only?",
      "choice1": "Read Uncommitted",
      "choice2": "Read Committed",
      "choice3": "Repeatable Read",
      "choice4": "Serializable",
      "answer": 2
    },
    {
      "question": "What’s the result of a foreign key constraint violation?",
      "choice1": "Data is silently ignored",
      "choice2": "Insert/update is rejected",
      "choice3": "Referential row is auto-created",
      "choice4": "Constraint is downgraded",
      "answer": 2
    },
    {
      "question": "Which join returns rows matching both tables?",
      "choice1": "LEFT JOIN",
      "choice2": "RIGHT JOIN",
      "choice3": "INNER JOIN",
      "choice4": "FULL OUTER JOIN",
      "answer": 3
    },
    {
      "question": "What’s the purpose of an execution plan?",
      "choice1": "Compile SQL",
      "choice2": "Optimize query execution",
      "choice3": "Backup data",
      "choice4": "Grant permissions",
      "answer": 2
    },
    {
      "question": "Which technique speeds up SELECTs at the cost of slower INSERTs/UPDATEs?",
      "choice1": "Normalization",
      "choice2": "Indexing",
      "choice3": "Sharding",
      "choice4": "Partitioning",
      "answer": 2
    },
    {
      "question": "What does denormalization involve?",
      "choice1": "Breaking tables apart",
      "choice2": "Adding redundant data",
      "choice3": "Removing indexes",
      "choice4": "Increasing normalization level",
      "answer": 2
    },
    {
      "question": "Which of these is a NoSQL database?",
      "choice1": "MySQL",
      "choice2": "PostgreSQL",
      "choice3": "MongoDB",
      "choice4": "Oracle",
      "answer": 3
    },
    {
      "question": "What’s the main purpose of sharding?",
      "choice1": "Vertical scaling",
      "choice2": "Horizontal scaling",
      "choice3": "Backup",
      "choice4": "Indexing",
      "answer": 2
    },
    {
      "question": "Which SQL clause groups rows sharing a property?",
      "choice1": "WHERE",
      "choice2": "GROUP BY",
      "choice3": "HAVING",
      "choice4": "ORDER BY",
      "answer": 2
    },
    {
      "question": "What does MVCC stand for?",
      "choice1": "Multi-Version Concurrency Control",
      "choice2": "Multi-Value Column Constraint",
      "choice3": "Most-Valued Clustered Control",
      "choice4": "Multi-Variable Concurrency Check",
      "answer": 1
    },
    {
      "question": "Which lock type allows concurrent reads but blocks writes?",
      "choice1": "Exclusive lock",
      "choice2": "Shared lock",
      "choice3": "Update lock",
      "choice4": "Intent lock",
      "answer": 2
    },
    {
      "question": "What is a B-Tree commonly used for in DBMS?",
      "choice1": "Hashing data",
      "choice2": "Index implementation",
      "choice3": "Storing blobs",
      "choice4": "Transaction logs",
      "answer": 2
    },
    {
      "question": "Which SQL keyword removes duplicate rows from result?",
      "choice1": "DISTINCT",
      "choice2": "UNIQUE",
      "choice3": "NO DUPLICATES",
      "choice4": "FILTER",
      "answer": 1
    },
    {
      "question": "What’s the effect of `ON DELETE CASCADE`?",
      "choice1": "Deletes referencing rows automatically",
      "choice2": "Prevents deletion of referenced row",
      "choice3": "Sets referencing foreign key to NULL",
      "choice4": "Ignores delete command",
      "answer": 1
    },
    {
      "question": "Which approach replicates data synchronously across nodes?",
      "choice1": "Master-slave replication",
      "choice2": "Peer-to-peer replication",
      "choice3": "Asynchronous replication",
      "choice4": "Synchronous replication",
      "answer": 4
    },
    {
      "question": "In a star schema, what’s the central table called?",
      "choice1": "Dimension table",
      "choice2": "Fact table",
      "choice3": "Lookup table",
      "choice4": "Bridge table",
      "answer": 2
    },
    {
      "question": "Which SQL feature prevents phantom reads?",
      "choice1": "Read Uncommitted isolation",
      "choice2": "Serializable isolation",
      "choice3": "Read Committed isolation",
      "choice4": "Snapshot isolation",
      "answer": 2
    },
    {
      "question": "What’s the default isolation level in most databases?",
      "choice1": "Read Uncommitted",
      "choice2": "Read Committed",
      "choice3": "Repeatable Read",
      "choice4": "Serializable",
      "answer": 2
    },
    {
      "question": "Which DBMS component parses and optimizes queries?",
      "choice1": "Storage manager",
      "choice2": "Query processor",
      "choice3": "Transaction manager",
      "choice4": "Buffer manager",
      "answer": 2
    },
    {
      "question": "Which keyword is used to remove duplicate rows from the result set?",
      "choice1": "UNIQUE",
      "choice2": "DISTINCT",
      "choice3": "UNION",
      "choice4": "GROUP BY",
      "answer": 2
    },
    {
      "question": "What’s the difference between WHERE and HAVING clauses?",
      "choice1": "WHERE filters groups, HAVING filters rows",
      "choice2": "WHERE filters rows, HAVING filters groups",
      "choice3": "WHERE can use aggregates, HAVING cannot",
      "choice4": "No difference",
      "answer": 2
    },
    {
      "question": "Which join returns all rows from the left table and matched rows from the right?",
      "choice1": "INNER JOIN",
      "choice2": "RIGHT JOIN",
      "choice3": "LEFT JOIN",
      "choice4": "FULL OUTER JOIN",
      "answer": 3
    },
    {
      "question": "What does the WITH clause create?",
      "choice1": "Temporary table",
      "choice2": "Common Table Expression",
      "choice3": "Materialized view",
      "choice4": "Index",
      "answer": 2
    },
    {
      "question": "Which function assigns a unique sequential integer to rows within a partition?",
      "choice1": "RANK()",
      "choice2": "ROW_NUMBER()",
      "choice3": "DENSE_RANK()",
      "choice4": "NTILE()",
      "answer": 2
    },
    {
      "question": "Which statement changes data in a table?",
      "choice1": "ALTER",
      "choice2": "UPDATE",
      "choice3": "SELECT",
      "choice4": "DROP",
      "answer": 2
    },
    {
      "question": "Which clause is mandatory in an UPDATE statement?",
      "choice1": "FROM",
      "choice2": "WHERE",
      "choice3": "SET",
      "choice4": "ORDER BY",
      "answer": 3
    },
    {
      "question": "What’s the purpose of an index?",
      "choice1": "Enforce referential integrity",
      "choice2": "Speed up data retrieval",
      "choice3": "Store large binary objects",
      "choice4": "Encrypt data at rest",
      "answer": 2
    },
    {
      "question": "How do you combine the results of two queries including duplicates?",
      "choice1": "UNION",
      "choice2": "UNION ALL",
      "choice3": "INTERSECT",
      "choice4": "EXCEPT",
      "answer": 2
    },
    {
      "question": "Which constraint ensures a column cannot have NULL values?",
      "choice1": "PRIMARY KEY",
      "choice2": "FOREIGN KEY",
      "choice3": "NOT NULL",
      "choice4": "UNIQUE",
      "answer": 3
    },
    {
      "question": "What does the MERGE statement do?",
      "choice1": "Delete duplicate rows",
      "choice2": "Synchronize two tables (insert/update/delete)",
      "choice3": "Create a new table",
      "choice4": "Split tables",
      "answer": 2
    },
    {
      "question": "Which SQL keyword allows conditional logic in SELECT?",
      "choice1": "CASE",
      "choice2": "IF",
      "choice3": "SWITCH",
      "choice4": "DECODE",
      "answer": 1
    },
    {
      "question": "What’s the result of a correlated subquery?",
      "choice1": "Single value",
      "choice2": "Depends on outer query row",
      "choice3": "Always returns multiple rows",
      "choice4": "Syntax error",
      "answer": 2
    },
    {
      "question": "Which command gives a user permission to SELECT?",
      "choice1": "GRANT SELECT",
      "choice2": "ALLOW SELECT",
      "choice3": "PERMIT SELECT",
      "choice4": "AUTHORIZE SELECT",
      "answer": 1
    },
    {
      "question": "Which clause limits the number of rows returned?",
      "choice1": "LIMIT",
      "choice2": "OFFSET",
      "choice3": "FETCH",
      "choice4": "TOP",
      "answer": 1
    },
    {
      "question": "How do you rename a column in a SELECT output?",
      "choice1": "AS",
      "choice2": "ALIAS",
      "choice3": "RENAME",
      "choice4": "LABEL",
      "answer": 1
    },
    {
      "question": "Which is true about views?",
      "choice1": "They store data physically",
      "choice2": "They can simplify complex queries",
      "choice3": "They cannot be indexed",
      "choice4": "They always improve performance",
      "answer": 2
    },
    {
      "question": "Which function returns the current date and time?",
      "choice1": "NOW()",
      "choice2": "CURRENT_DATE()",
      "choice3": "GETDATE()",
      "choice4": "SYSDATE()",
      "answer": 1
    },
    {
      "question": "What’s a cursor used for?",
      "choice1": "Execute batch inserts",
      "choice2": "Process query results row by row",
      "choice3": "Manage transactions",
      "choice4": "Define views",
      "answer": 2
    },
    {
      "question": "Which keyword prevents SQL injection by using placeholders?",
      "choice1": "PARAMETERIZE",
      "choice2": "PREPARE",
      "choice3": "BIND",
      "choice4": "PARAM",
      "answer": 2
    },
    {
      "question": "Which function aggregates values over a window without grouping rows?",
      "choice1": "GROUP_CONCAT()",
      "choice2": "SUM()",
      "choice3": "OVER()",
      "choice4": "PARTITION BY",
      "answer": 3
    },
    {
      "question": "Which command drops a table and its data permanently?",
      "choice1": "DELETE",
      "choice2": "TRUNCATE",
      "choice3": "DROP",
      "choice4": "REMOVE",
      "answer": 3
    },
    {
      "question": "What does EXPLAIN do?",
      "choice1": "Runs the query",
      "choice2": "Shows query execution plan",
      "choice3": "Creates an index",
      "choice4": "Validates syntax",
      "answer": 2
    },
    {
      "question": "Which JSON function checks if a key exists in a JSON column?",
      "choice1": "JSON_EXTRACT()",
      "choice2": "JSON_CONTAINS_PATH()",
      "choice3": "JSON_KEYS()",
      "choice4": "JSON_QUERY()",
      "answer": 2
    },
    {
      "question": "What is a context switch?",
      "choice1": "Switching between user and kernel modes",
      "choice2": "Saving and loading CPU register state between processes",
      "choice3": "Switching threads in same process",
      "choice4": "Switching disks for I/O",
      "answer": 2
    },
    {
      "question": "Which scheduling is preemptive?",
      "choice1": "First-Come-First-Serve",
      "choice2": "Shortest Job First",
      "choice3": "Round Robin",
      "choice4": "FCFS with priority",
      "answer": 3
    },
    {
      "question": "What’s the effect of too small a time quantum in Round Robin?",
      "choice1": "Higher throughput",
      "choice2": "Lower turnaround time",
      "choice3": "More context switches",
      "choice4": "Starvation",
      "answer": 3
    },
    {
      "question": "Which is not a necessary condition for deadlock?",
      "choice1": "Mutual exclusion",
      "choice2": "Hold and wait",
      "choice3": "Preemption",
      "choice4": "Circular wait",
      "answer": 3
    },
    {
      "question": "What does the Banker’s algorithm do?",
      "choice1": "Allocates CPU fairly",
      "choice2": "Prevents deadlock by resource allocation check",
      "choice3": "Optimizes disk I/O",
      "choice4": "Schedules threads",
      "answer": 2
    },
    {
      "question": "Paging eliminates which problem?",
      "choice1": "Fragmentation",
      "choice2": "External fragmentation",
      "choice3": "Internal fragmentation",
      "choice4": "Thrashing",
      "answer": 2
    },
    {
      "question": "What is thrashing?",
      "choice1": "Excessive CPU usage",
      "choice2": "Excessive paging leading to low CPU utilization",
      "choice3": "Disk I/O contention",
      "choice4": "Memory leak",
      "answer": 2
    },
    {
      "question": "Which page replacement algorithm may suffer Belady’s anomaly?",
      "choice1": "LRU",
      "choice2": "FIFO",
      "choice3": "Optimal",
      "choice4": "Clock",
      "answer": 2
    },
    {
      "question": "What does a semaphore do?",
      "choice1": "Limits memory usage",
      "choice2": "Controls access to critical section",
      "choice3": "Schedules disk I/O",
      "choice4": "Encrypts data",
      "answer": 2
    },
    {
      "question": "Which problem demonstrates synchronization issues?",
      "choice1": "Dining Philosophers",
      "choice2": "Producer-Consumer",
      "choice3": "Readers-Writers",
      "choice4": "All of the above",
      "answer": 4
    },
    {
      "question": "What’s the difference between a process and a thread?",
      "choice1": "Threads have separate address spaces",
      "choice2": "Processes share memory",
      "choice3": "Threads are lighter, share address space",
      "choice4": "No difference",
      "answer": 3
    },
    {
      "question": "Which mode has full hardware access?",
      "choice1": "User mode",
      "choice2": "Kernel mode",
      "choice3": "Supervisor mode",
      "choice4": "Virtual mode",
      "answer": 2
    },
    {
      "question": "What does a system call do?",
      "choice1": "Switch context",
      "choice2": "Invoke kernel service",
      "choice3": "Allocate memory",
      "choice4": "Terminate process",
      "answer": 2
    },
    {
      "question": "Which memory allocation uses contiguous blocks?",
      "choice1": "Paging",
      "choice2": "Segmentation",
      "choice3": "Slab allocator",
      "choice4": "Buddy system",
      "answer": 2
    },
    {
      "question": "What is a page table?",
      "choice1": "Maps virtual to physical addresses",
      "choice2": "Allocates disk blocks",
      "choice3": "Manages file metadata",
      "choice4": "Schedules CPU",
      "answer": 1
    },
    {
      "question": "Which file system structure tracks inodes?",
      "choice1": "FAT",
      "choice2": "NTFS",
      "choice3": "Ext",
      "choice4": "HFS+",
      "answer": 3
    },
    {
      "question": "What’s the role of a device driver?",
      "choice1": "Manage user accounts",
      "choice2": "Interface OS with hardware",
      "choice3": "Encrypt I/O",
      "choice4": "Backup files",
      "answer": 2
    },
    {
      "question": "Which algorithm detects deadlock by resource-allocation graph?",
      "choice1": "Banker’s algorithm",
      "choice2": "Wait-for graph detection",
      "choice3": "Dekker’s algorithm",
      "choice4": "Peterson’s algorithm",
      "answer": 2
    },
    {
      "question": "What is virtual memory?",
      "choice1": "Memory on disk",
      "choice2": "Extension of RAM via disk",
      "choice3": "Cache memory",
      "choice4": "Shared memory",
      "answer": 2
    },
    {
      "question": "Which structure holds kernel code before execution?",
      "choice1": "Stack",
      "choice2": "Process control block",
      "choice3": "Program counter",
      "choice4": "Executable file",
      "answer": 4
    },
    {
      "question": "What does swapping do?",
      "choice1": "Copy pages to disk",
      "choice2": "Move entire process between memory and disk",
      "choice3": "Allocate more RAM",
      "choice4": "Manage cache",
      "answer": 2
    },
    {
      "question": "Which scheduling metric measures completed jobs per unit time?",
      "choice1": "Turnaround time",
      "choice2": "Throughput",
      "choice3": "Response time",
      "choice4": "Waiting time",
      "answer": 2
    },
    {
      "question": "What’s demand paging?",
      "choice1": "Load all pages at process start",
      "choice2": "Load pages only when referenced",
      "choice3": "Unload unused pages at once",
      "choice4": "Swap entire process",
      "answer": 2
    },
    {
      "question": "Which structure stores process state?",
      "choice1": "Page table",
      "choice2": "PCB (Process Control Block)",
      "choice3": "User stack",
      "choice4": "Heap",
      "answer": 2
    },
    {
      "question": "Which document outlines the product vision and requirements?",
      "choice1": "Sprint Backlog",
      "choice2": "Product Backlog",
      "choice3": "Definition of Done",
      "choice4": "Burndown Chart",
      "answer": 2
    },
    {
      "question": "Who is responsible for maximizing product value?",
      "choice1": "Scrum Master",
      "choice2": "Product Owner",
      "choice3": "Development Team",
      "choice4": "Stakeholders",
      "answer": 2
    },
    {
      "question": "What is a ‘Sprint’?",
      "choice1": "Continuous development phase",
      "choice2": "Fixed-length iteration",
      "choice3": "Release planning meeting",
      "choice4": "Retrospective session",
      "answer": 2
    },
    {
      "question": "Which ceremony happens every day at same time?",
      "choice1": "Sprint Planning",
      "choice2": "Daily Standup",
      "choice3": "Sprint Review",
      "choice4": "Sprint Retrospective",
      "answer": 2
    },
    {
      "question": "What is the purpose of a Sprint Retrospective?",
      "choice1": "Demonstrate features",
      "choice2": "Plan next sprint",
      "choice3": "Reflect on process improvements",
      "choice4": "Create user stories",
      "answer": 3
    },
    {
      "question": "Which chart shows work remaining over time?",
      "choice1": "Burnup Chart",
      "choice2": "Burndown Chart",
      "choice3": "Gantt Chart",
      "choice4": "PERT Chart",
      "answer": 2
    },
    {
      "question": "INVEST in user stories stands for Independent, Negotiable, Valuable, Estimable, Small, and what?",
      "choice1": "Testable",
      "choice2": "Transparent",
      "choice3": "Tracked",
      "choice4": "Tangible",
      "answer": 1
    },
    {
      "question": "What is a Minimum Viable Product (MVP)?",
      "choice1": "Fully featured product",
      "choice2": "Product with just enough features to gather feedback",
      "choice3": "Prototype",
      "choice4": "Release candidate",
      "answer": 2
    },
    {
      "question": "Which role facilitates Scrum events and removes impediments?",
      "choice1": "Product Owner",
      "choice2": "Scrum Master",
      "choice3": "Team Lead",
      "choice4": "Project Manager",
      "answer": 2
    },
    {
      "question": "What is a spike?",
      "choice1": "User story estimation technique",
      "choice2": "Timeboxed research or exploration task",
      "choice3": "Burndown anomaly",
      "choice4": "Type of defect",
      "answer": 2
    },
    {
      "question": "Which tool is commonly used for issue tracking in Agile?",
      "choice1": "Eclipse",
      "choice2": "JIRA",
      "choice3": "GitHub Pages",
      "choice4": "Docker",
      "answer": 2
    },
    {
      "question": "What does WIP stand for in Kanban?",
      "choice1": "Work in Progress",
      "choice2": "Workflow in Planning",
      "choice3": "Work Item Priority",
      "choice4": "Wide Implementation Plan",
      "answer": 1
    },
    {
      "question": "Which metric measures story points completed per sprint?",
      "choice1": "Velocity",
      "choice2": "Throughput",
      "choice3": "Cycle Time",
      "choice4": "Lead Time",
      "answer": 1
    },
    {
      "question": "What’s the Definition of Done?",
      "choice1": "Criteria for accepting a user story as complete",
      "choice2": "Release checklist",
      "choice3": "Sprint goal",
      "choice4": "Project charter",
      "answer": 1
    },
    {
      "question": "Which is not a Scrum artifact?",
      "choice1": "Product Backlog",
      "choice2": "Sprint Backlog",
      "choice3": "Increment",
      "choice4": "Gantt Chart",
      "answer": 4
    },
    {
      "question": "What is Backlog Grooming (Refinement)?",
      "choice1": "Detailing and estimating backlog items",
      "choice2": "Sprint planning session",
      "choice3": "Retrospective activity",
      "choice4": "Release planning",
      "answer": 1
    },
    {
      "question": "Which practice pairs two developers at one workstation?",
      "choice1": "Test-Driven Development",
      "choice2": "Pair Programming",
      "choice3": "Code Review",
      "choice4": "Mob Programming",
      "answer": 2
    },
    {
      "question": "What is test-driven development (TDD)?",
      "choice1": "Writing code before tests",
      "choice2": "Writing tests after code",
      "choice3": "Writing tests before code",
      "choice4": "Automating deployment tests",
      "answer": 3
    },
    {
      "question": "Which diagram shows workflow states and transitions in Kanban?",
      "choice1": "State Machine Diagram",
      "choice2": "Kanban Board",
      "choice3": "Activity Diagram",
      "choice4": "Sequence Diagram",
      "answer": 2
    },
    {
      "question": "What is Continuous Integration?",
      "choice1": "Merging code changes frequently and running automated builds/tests",
      "choice2": "Continuous deployment to production",
      "choice3": "Manual code reviews",
      "choice4": "Writing integration tests only",
      "answer": 1
    },
    {
      "question": "What is a release burndown?",
      "choice1": "Tracks scope completed against time for a release",
      "choice2": "Sprint task board",
      "choice3": "Deployment pipeline",
      "choice4": "Defect tracker",
      "answer": 1
    },
    {
      "question": "Which scaling framework uses Agile Release Trains?",
      "choice1": "LeSS",
      "choice2": "SAFe",
      "choice3": "Scrum@Scale",
      "choice4": "Disciplined Agile",
      "answer": 2
    },
    {
      "question": "What is technical debt?",
      "choice1": "Budget reserved for tech upgrades",
      "choice2": "Accumulated poor design or coding choices needing refactoring",
      "choice3": "Debt from licensing fees",
      "choice4": "Cost of infrastructure",
      "answer": 2
    },
    {
      "question": "Which artifact shows completed features by release?",
      "choice1": "Burnup Chart",
      "choice2": "Burndown Chart",
      "choice3": "Kanban Board",
      "choice4": "Gantt Chart",
      "answer": 1
    },
    {
      "question": "Which HTML tag is used to define an internal CSS style sheet?",
      "choice1": "<css>",
      "choice2": "<script>",
      "choice3": "<style>",
      "choice4": "<link>",
      "answer": 3
    },
    {
      "question": "What does the CSS property `box-sizing: border-box;` do?",
      "choice1": "Includes padding and border in the element's total width and height",
      "choice2": "Sets the box shadow",
      "choice3": "Removes margin collapse",
      "choice4": "Makes the element display as block",
      "answer": 1
    },
    {
      "question": "Which HTML attribute specifies an alternate text for an image?",
      "choice1": "alt",
      "choice2": "title",
      "choice3": "src",
      "choice4": "caption",
      "answer": 1
    },
    {
      "question": "In CSS, which selector matches an element with id “header”?",
      "choice1": ".header",
      "choice2": "#header",
      "choice3": "header",
      "choice4": "*header",
      "answer": 2
    },
    {
      "question": "What is the default display value of a `<span>` element?",
      "choice1": "block",
      "choice2": "inline",
      "choice3": "inline-block",
      "choice4": "none",
      "answer": 2
    },
    {
      "question": "Which HTML5 element is used for navigation links?",
      "choice1": "<nav>",
      "choice2": "<navigation>",
      "choice3": "<menu>",
      "choice4": "<links>",
      "answer": 1
    },
    {
      "question": "Which CSS property controls the text size?",
      "choice1": "font-style",
      "choice2": "text-size",
      "choice3": "font-size",
      "choice4": "text-style",
      "answer": 3
    },
    {
      "question": "How do you make a list that displays its items with bullets?",
      "choice1": "<ol>",
      "choice2": "<ul>",
      "choice3": "<dl>",
      "choice4": "<list>",
      "answer": 2
    },
    {
      "question": "Which CSS property would you use to change the spacing between letters?",
      "choice1": "letter-indent",
      "choice2": "text-indent",
      "choice3": "letter-spacing",
      "choice4": "word-spacing",
      "answer": 3
    },
    {
      "question": "What is the purpose of the `<meta charset=\"UTF-8\">` tag?",
      "choice1": "Define viewport settings",
      "choice2": "Link external stylesheet",
      "choice3": "Specify character encoding",
      "choice4": "Declare document title",
      "answer": 3
    },
    {
      "question": "Which CSS property sets the distance between the content and the border of an element?",
      "choice1": "margin",
      "choice2": "padding",
      "choice3": "border-spacing",
      "choice4": "gap",
      "answer": 2
    },
    {
      "question": "Which HTML element is used to display a scalar measurement within a known range?",
      "choice1": "<meter>",
      "choice2": "<progress>",
      "choice3": "<range>",
      "choice4": "<scale>",
      "answer": 1
    },
    {
      "question": "How do you apply a CSS rule to multiple selectors?",
      "choice1": "Separate with commas",
      "choice2": "Separate with spaces",
      "choice3": "Use semicolons",
      "choice4": "List in brackets",
      "answer": 1
    },
    {
      "question": "Which attribute is required for `<form>` to send data via HTTP POST?",
      "choice1": "action",
      "choice2": "method",
      "choice3": "enctype",
      "choice4": "name",
      "answer": 2
    },
    {
      "question": "What does CSS’s `flex-wrap: wrap;` do?",
      "choice1": "Prevents wrapping of flex items",
      "choice2": "Allows flex items to wrap onto multiple lines",
      "choice3": "Adds margin between flex items",
      "choice4": "Aligns items vertically",
      "answer": 2
    },
    {
      "question": "Which tag defines a self-contained piece of content in HTML5?",
      "choice1": "<article>",
      "choice2": "<section>",
      "choice3": "<aside>",
      "choice4": "<div>",
      "answer": 1
    },
    {
      "question": "Which CSS property controls the stacking order of positioned elements?",
      "choice1": "order",
      "choice2": "z-index",
      "choice3": "stack-index",
      "choice4": "layer",
      "answer": 2
    },
    {
      "question": "Which unit is relative to the font-size of the root element?",
      "choice1": "em",
      "choice2": "rem",
      "choice3": "px",
      "choice4": "%", 
      "answer": 2
    },
    {
      "question": "What does the HTML5 `<canvas>` element allow you to do?",
      "choice1": "Link external resources",
      "choice2": "Draw graphics with JavaScript",
      "choice3": "Embed videos",
      "choice4": "Validate forms",
      "answer": 2
    },
    {
      "question": "In CSS Grid, which property defines the number of columns?",
      "choice1": "grid-rows",
      "choice2": "grid-template-columns",
      "choice3": "grid-gap",
      "choice4": "grid-area",
      "answer": 2
    },
    {
      "question": "What’s the difference between `visibility: hidden;` and `display: none;`?",
      "choice1": "Hidden removes element from flow, none hides but reserves space",
      "choice2": "Hidden hides but reserves space, none removes from layout",
      "choice3": "Both behave the same",
      "choice4": "None of the above",
      "answer": 2
    },
    {
      "question": "Which HTML tag is used to embed audio content?",
      "choice1": "<sound>",
      "choice2": "<audio>",
      "choice3": "<media>",
      "choice4": "<music>",
      "answer": 2
    },
    {
      "question": "Which CSS function allows you to select the nth child of its parent?",
      "choice1": ":nth-of-type()",
      "choice2": ":nth-child()",
      "choice3": ":first-child()",
      "choice4": ":last-child()",
      "answer": 2
    },
    {
      "question": "How do you include an external CSS file in HTML?",
      "choice1": "<link rel=\"stylesheet\" href=\"style.css\">",
      "choice2": "<stylesheet src=\"style.css\">",
      "choice3": "<css src=\"style.css\">",
      "choice4": "<style src=\"style.css\">",
      "answer": 1
    },
    {
      "question": "Which command initializes a new Git repository?",
      "choice1": "git start",
      "choice2": "git init",
      "choice3": "git new",
      "choice4": "git clone",
      "answer": 2
    },
    {
      "question": "What does `git clone <repo-url>` do?",
      "choice1": "Creates a new empty repo",
      "choice2": "Downloads a copy of a remote repository",
      "choice3": "Deletes local repository",
      "choice4": "Pushes changes to remote",
      "answer": 2
    },
    {
      "question": "Which file tells Git which files/folders to ignore?",
      "choice1": ".gitkeep",
      "choice2": ".gitignore",
      "choice3": ".ignore",
      "choice4": ".gitexclude",
      "answer": 2
    },
    {
      "question": "What command stages changes for the next commit?",
      "choice1": "git commit",
      "choice2": "git add",
      "choice3": "git stage",
      "choice4": "git push",
      "answer": 2
    },
    {
      "question": "Which command shows the commit history?",
      "choice1": "git status",
      "choice2": "git log",
      "choice3": "git history",
      "choice4": "git show",
      "answer": 2
    },
    {
      "question": "How do you create a new branch in Git?",
      "choice1": "git branch <name>",
      "choice2": "git checkout <name>",
      "choice3": "git new-branch <name>",
      "choice4": "git switch -c <name>",
      "answer": 1
    },
    {
      "question": "Which command merges another branch into the current one?",
      "choice1": "git merge <branch>",
      "choice2": "git rebase <branch>",
      "choice3": "git pull <branch>",
      "choice4": "git join <branch>",
      "answer": 1
    },
    {
      "question": "What does `git pull` do?",
      "choice1": "Fetches and merges changes from remote",
      "choice2": "Pushes local commits",
      "choice3": "Fetches only",
      "choice4": "Clones remote repo",
      "answer": 1
    },
    {
      "question": "Which command uploads local commits to remote?",
      "choice1": "git send",
      "choice2": "git push",
      "choice3": "git publish",
      "choice4": "git deploy",
      "answer": 2
    },
    {
      "question": "What is a Pull Request on GitHub?",
      "choice1": "Fetching changes",
      "choice2": "Request to merge code into another branch",
      "choice3": "Deleting a branch",
      "choice4": "Creating a repository",
      "answer": 2
    },
    {
      "question": "Which Postman feature allows you to store environment-specific variables?",
      "choice1": "Collections",
      "choice2": "Environments",
      "choice3": "Workspaces",
      "choice4": "Monitors",
      "answer": 2
    },
    {
      "question": "How do you send a GET request in Postman?",
      "choice1": "Select POST method",
      "choice2": "Enter URL and click Send with GET selected",
      "choice3": "Use Fetch button",
      "choice4": "Write cURL script",
      "answer": 2
    },
    {
      "question": "What does `git status` show?",
      "choice1": "Remote branches",
      "choice2": "Current working tree status",
      "choice3": "Commit history",
      "choice4": "Stashed changes",
      "answer": 2
    },
    {
      "question": "Which command discards unstaged changes in working directory?",
      "choice1": "git reset --hard",
      "choice2": "git clean -f",
      "choice3": "git revert",
      "choice4": "git stash",
      "answer": 1
    },
    {
      "question": "How do you run a collection automatically in Postman?",
      "choice1": "Use Runner",
      "choice2": "Click Save",
      "choice3": "Use Postman Console",
      "choice4": "Use Env Editor",
      "answer": 1
    },
    {
      "question": "What’s the purpose of `git stash`?",
      "choice1": "Save uncommitted changes temporarily",
      "choice2": "Push to remote",
      "choice3": "Create a patch file",
      "choice4": "Rebase commits",
      "answer": 1
    },
    {
      "question": "Which command shows changes between commits or working tree?",
      "choice1": "git diff",
      "choice2": "git log",
      "choice3": "git show",
      "choice4": "git compare",
      "answer": 1
    },
    {
      "question": "How do you delete a branch locally?",
      "choice1": "git branch -d <name>",
      "choice2": "git rm <name>",
      "choice3": "git delete <name>",
      "choice4": "git remove <name>",
      "answer": 1
    },
    {
      "question": "Which Postman feature lets you write JavaScript tests for responses?",
      "choice1": "Pre-request Scripts",
      "choice2": "Tests tab",
      "choice3": "Monitor tab",
      "choice4": "Console",
      "answer": 2
    },
    {
      "question": "What does `git rebase` do?",
      "choice1": "Combine commits on top of another base",
      "choice2": "Create a new branch",
      "choice3": "Discard commits",
      "choice4": "Merge two branches",
      "answer": 1
    },
    {
      "question": "How do you share a collection in Postman?",
      "choice1": "Export to file and send",
      "choice2": "Use Share button",
      "choice3": "Use Environments",
      "choice4": "Use Runner",
      "answer": 2
    },
    {
      "question": "Which command retrieves a specific commit as a new branch?",
      "choice1": "git checkout -b <branch> <commit>",
      "choice2": "git branch <branch> <commit>",
      "choice3": "git reset --hard <commit>",
      "choice4": "git clone <commit>",
      "answer": 2
    },
    {
      "question": "What’s the default branch name when you initialize a repo in newer Git versions?",
      "choice1": "master",
      "choice2": "main",
      "choice3": "develop",
      "choice4": "trunk",
      "answer": 2
    },
    {
      "question": "Which command lists files in a directory?",
      "choice1": "ls",
      "choice2": "dir",
      "choice3": "list",
      "choice4": "show",
      "answer": 1
    },
    {
      "question": "How do you change file permissions to read/write/execute for owner only?",
      "choice1": "chmod 777 file",
      "choice2": "chmod 700 file",
      "choice3": "chmod 755 file",
      "choice4": "chmod 600 file",
      "answer": 2
    },
    {
      "question": "Which file contains user account information?",
      "choice1": "/etc/shadow",
      "choice2": "/etc/passwd",
      "choice3": "/etc/group",
      "choice4": "/etc/users",
      "answer": 2
    },
    {
      "question": "Which command shows current working directory?",
      "choice1": "pwd",
      "choice2": "cwd",
      "choice3": "whereami",
      "choice4": "loc",
      "answer": 1
    },
    {
      "question": "How do you view the beginning of a file?",
      "choice1": "head file",
      "choice2": "tail file",
      "choice3": "less file",
      "choice4": "grep file",
      "answer": 1
    },
    {
      "question": "Which command searches for patterns in files?",
      "choice1": "find",
      "choice2": "grep",
      "choice3": "search",
      "choice4": "locate",
      "answer": 2
    },
    {
      "question": "How do you change ownership of a file?",
      "choice1": "chown user:group file",
      "choice2": "chmod user:group file",
      "choice3": "owner file user",
      "choice4": "change owner file",
      "answer": 1
    },
    {
      "question": "Which command shows disk usage by directory?",
      "choice1": "df",
      "choice2": "du",
      "choice3": "ls -l",
      "choice4": "fdisk",
      "answer": 2
    },
    {
      "question": "What does `ps aux` display?",
      "choice1": "Disk partitions",
      "choice2": "CPU usage",
      "choice3": "All running processes",
      "choice4": "Network connections",
      "answer": 3
    },
    {
      "question": "Which command displays live process activity?",
      "choice1": "ps",
      "choice2": "top",
      "choice3": "jobs",
      "choice4": "pstree",
      "answer": 2
    },
    {
      "question": "How do you archive and compress directory `dir` into `dir.tar.gz`?",
      "choice1": "tar -cvf dir.tar.gz dir",
      "choice2": "tar -czvf dir.tar.gz dir",
      "choice3": "zip dir.tar.gz dir",
      "choice4": "gzip dir",
      "answer": 2
    },
    {
      "question": "Which file shows system boot messages?",
      "choice1": "/var/log/syslog",
      "choice2": "/var/log/messages",
      "choice3": "/var/log/boot.log",
      "choice4": "/var/log/dmesg",
      "answer": 4
    },
    {
      "question": "What does `chmod +x file` do?",
      "choice1": "Makes file readable",
      "choice2": "Adds execute permission",
      "choice3": "Removes write permission",
      "choice4": "Makes file hidden",
      "answer": 2
    },
    {
      "question": "Which command displays network interface information?",
      "choice1": "ifconfig",
      "choice2": "netstat",
      "choice3": "ip addr",
      "choice4": "route",
      "answer": 3
    },
    {
      "question": "How do you find files by name?",
      "choice1": "grep -r",
      "choice2": "find / -name \"filename\"",
      "choice3": "locate filename",
      "choice4": "search filename",
      "answer": 2
    },
    {
      "question": "Which daemon handles DNS resolution on many Linux systems?",
      "choice1": "systemd-resolved",
      "choice2": "named",
      "choice3": "dnsd",
      "choice4": "resolv",
      "answer": 1
    },
    {
      "question": "What does `ulimit` control?",
      "choice1": "User limits on resources",
      "choice2": "File permissions",
      "choice3": "CPU scheduling",
      "choice4": "Network bandwidth",
      "answer": 1
    },
    {
      "question": "Which file lists filesystem mount points?",
      "choice1": "/etc/mtab",
      "choice2": "/etc/fstab",
      "choice3": "/etc/mounts",
      "choice4": "/etc/auto.master",
      "answer": 2
    },
    {
      "question": "How do you display the last 10 lines of a file?",
      "choice1": "head -n 10 file",
      "choice2": "tail -n 10 file",
      "choice3": "less file",
      "choice4": "more file",
      "answer": 2
    },
    {
      "question": "Which command shows environment variables?",
      "choice1": "env",
      "choice2": "vars",
      "choice3": "setenv",
      "choice4": "getenv",
      "answer": 1
    },
    {
      "question": "What does `nohup` do?",
      "choice1": "Runs a command as root",
      "choice2": "Ignores hangup signals",
      "choice3": "Schedules job for later",
      "choice4": "Runs in background only",
      "answer": 2
    },
    {
      "question": "Which signal number corresponds to SIGKILL?",
      "choice1": "9",
      "choice2": "15",
      "choice3": "1",
      "choice4": "2",
      "answer": 1
    },
    {
      "question": "How do you remount a filesystem as read-only?",
      "choice1": "mount -o ro,remount /",
      "choice2": "mount -o remount,ro /",
      "choice3": "mount -o ro /",
      "choice4": "mount -o remount /",
      "answer": 2
    },
    {
      "question": "Which file configures network interfaces on Debian/Ubuntu?",
      "choice1": "/etc/network/interfaces",
      "choice2": "/etc/sysconfig/network-scripts/",
      "choice3": "/etc/netplan/*.yaml",
      "choice4": "/etc/hosts",
      "answer": 1
    },
    {
      "question": "What does the `chmod 644 file` command set?",
      "choice1": "rw-r--r--",
      "choice2": "rwxr-xr-x",
      "choice3": "rw-------",
      "choice4": "r--r--r--",
      "answer": 1
    },
    {
      "question": "Which HTTP method is idempotent and used to update a resource?",
      "choice1": "POST",
      "choice2": "PUT",
      "choice3": "PATCH",
      "choice4": "DELETE",
      "answer": 2
    },
    {
      "question": "Which status code indicates that a resource was not found?",
      "choice1": "200",
      "choice2": "301",
      "choice3": "404",
      "choice4": "500",
      "answer": 3
    },
    {
      "question": "What does CRUD stand for?",
      "choice1": "Create, Read, Update, Delete",
      "choice2": "Connect, Receive, Upload, Download",
      "choice3": "Cache, Route, Use, Drop",
      "choice4": "Compute, Respond, Utilize, Destroy",
      "answer": 1
    },
    {
      "question": "Which header is used to specify the media type of the request body?",
      "choice1": "Accept",
      "choice2": "Content-Type",
      "choice3": "Authorization",
      "choice4": "User-Agent",
      "answer": 2
    },
    {
      "question": "Which status code indicates successful creation of a resource?",
      "choice1": "200 OK",
      "choice2": "201 Created",
      "choice3": "202 Accepted",
      "choice4": "204 No Content",
      "answer": 2
    },
    {
      "question": "What does HATEOAS stand for in REST?",
      "choice1": "Hypermedia As The Engine Of Application State",
      "choice2": "High Availability Through External Owned APIs",
      "choice3": "Hyperlink And The Embedded Objectized API Service",
      "choice4": "Host And Transport Enabled Oriented Application Service",
      "answer": 1
    },
    {
      "question": "Which HTTP method should not include a body in the request?",
      "choice1": "GET",
      "choice2": "POST",
      "choice3": "PUT",
      "choice4": "PATCH",
      "answer": 1
    },
    {
      "question": "Which status code means the request was well-formed but can't be processed?",
      "choice1": "400 Bad Request",
      "choice2": "401 Unauthorized",
      "choice3": "403 Forbidden",
      "choice4": "422 Unprocessable Entity",
      "answer": 4
    },
    {
      "question": "What is the purpose of the OPTIONS HTTP method?",
      "choice1": "Fetch resource",
      "choice2": "Describe communication options",
      "choice3": "Delete resource",
      "choice4": "Update resource",
      "answer": 2
    },
    {
      "question": "Which URI design principle avoids verbs in endpoints?",
      "choice1": "Use nouns for resources",
      "choice2": "Use verbs for resources",
      "choice3": "Use adjectives for resources",
      "choice4": "Use adverbs for resources",
      "answer": 1
    },
    {
      "question": "Which status code indicates too many requests?",
      "choice1": "429 Too Many Requests",
      "choice2": "503 Service Unavailable",
      "choice3": "500 Internal Server Error",
      "choice4": "408 Request Timeout",
      "answer": 1
    },
    {
      "question": "What does REST stand for?",
      "choice1": "Representational State Transfer",
      "choice2": "Remote Execution Service Technology",
      "choice3": "Reliable Secure Transfer",
      "choice4": "Resource State Execution Technique",
      "answer": 1
    },
    {
      "question": "Which header is used for client authentication in REST?",
      "choice1": "Accept",
      "choice2": "Content-Type",
      "choice3": "Authorization",
      "choice4": "Host",
      "answer": 3
    },
    {
      "question": "Which status code indicates a permanent redirect?",
      "choice1": "301 Moved Permanently",
      "choice2": "302 Found",
      "choice3": "307 Temporary Redirect",
      "choice4": "308 Permanent Redirect",
      "answer": 1
    },
    {
      "question": "Which response format is most common for REST APIs?",
      "choice1": "XML",
      "choice2": "CSV",
      "choice3": "JSON",
      "choice4": "YAML",
      "answer": 3
    },
    {
      "question": "What is idempotence in REST?",
      "choice1": "Method always creates a new resource",
      "choice2": "Method has no side effects no matter how many times it's called",
      "choice3": "Method always deletes resource",
      "choice4": "Method always updates fully",
      "answer": 2
    },
    {
      "question": "Which status code means unauthorized access?",
      "choice1": "400 Bad Request",
      "choice2": "401 Unauthorized",
      "choice3": "403 Forbidden",
      "choice4": "404 Not Found",
      "answer": 2
    },
    {
      "question": "Which HTTP method is used to partially update a resource?",
      "choice1": "PUT",
      "choice2": "PATCH",
      "choice3": "POST",
      "choice4": "GET",
      "answer": 2
    },
    {
      "question": "Which status code indicates that the server understood the request but refuses to authorize it?",
      "choice1": "401 Unauthorized",
      "choice2": "402 Payment Required",
      "choice3": "403 Forbidden",
      "choice4": "405 Method Not Allowed",
      "answer": 3
    },
    {
      "question": "Which HTTP method is safe and should have no side effects?",
      "choice1": "GET",
      "choice2": "POST",
      "choice3": "PUT",
      "choice4": "DELETE",
      "answer": 1
    },
    {
      "question": "What does an HTTP 500 status code represent?",
      "choice1": "Client error",
      "choice2": "Server error",
      "choice3": "Redirection",
      "choice4": "Success",
      "answer": 2
    },
    {
      "question": "Which approach uses API versioning in the URI?",
      "choice1": "/v1/resource",
      "choice2": "/resource?version=1",
      "choice3": "Custom header",
      "choice4": "No versioning",
      "answer": 1
    },
    {
      "question": "Which caching header tells clients how long to cache a response?",
      "choice1": "Cache-Control",
      "choice2": "Accept",
      "choice3": "Authorization",
      "choice4": "ETag",
      "answer": 1
    },
    {
      "question": "What does HTTP status 204 mean?",
      "choice1": "No Content",
      "choice2": "Created",
      "choice3": "Reset Content",
      "choice4": "Accepted",
      "answer": 1
    },
    {
      "question": "Which keyword is used to define a function in Python?",
      "choice1": "func",
      "choice2": "def",
      "choice3": "function",
      "choice4": "lambda",
      "answer": 2
    },
    {
      "question": "What is the output of `len([1, 2, 3])`?",
      "choice1": "2",
      "choice2": "3",
      "choice3": "Error",
      "choice4": "0",
      "answer": 2
    },
    {
      "question": "Which data type is immutable in Python?",
      "choice1": "list",
      "choice2": "dict",
      "choice3": "tuple",
      "choice4": "set",
      "answer": 3
    },
    {
      "question": "How do you create a dictionary with keys 'a' and 'b' mapping to 1 and 2?",
      "choice1": "{'a':1, 'b':2}",
      "choice2": "dict('a'=1, 'b'=2)",
      "choice3": "['a':1, 'b':2]",
      "choice4": "('a':1, 'b':2)",
      "answer": 1
    },
    {
      "question": "Which keyword is used for exception handling?",
      "choice1": "try",
      "choice2": "catch",
      "choice3": "except",
      "choice4": "finally",
      "answer": 3
    },
    {
      "question": "What is a list comprehension syntax for squares of 0–4?",
      "choice1": "[x^2 for x in range(5)]",
      "choice2": "[x**2 for x in range(5)]",
      "choice3": "list(x**2 for x in range(5))",
      "choice4": "(x**2 for x in range(5))",
      "answer": 2
    },
    {
      "question": "What does `__init__` define in a class?",
      "choice1": "Destructor",
      "choice2": "Constructor",
      "choice3": "Static method",
      "choice4": "Class variable",
      "answer": 2
    },
    {
      "question": "Which module is used for JSON serialization?",
      "choice1": "json",
      "choice2": "pickle",
      "choice3": "csv",
      "choice4": "xml",
      "answer": 1
    },
    {
      "question": "What is the result of `'a' + 'b'`?",
      "choice1": "Error",
      "choice2": "'ab'",
      "choice3": "['a','b']",
      "choice4": "('a','b')",
      "answer": 2
    },
    {
      "question": "Which built-in function returns an iterator of tuples for enumeration?",
      "choice1": "enumerate()",
      "choice2": "zip()",
      "choice3": "map()",
      "choice4": "filter()",
      "answer": 1
    },
    {
      "question": "How do you open a file for writing?",
      "choice1": "open('file', 'r')",
      "choice2": "open('file', 'w')",
      "choice3": "open('file', 'rw')",
      "choice4": "open('file', 'a')",
      "answer": 2
    },
    {
      "question": "What does `*args` allow in a function definition?",
      "choice1": "Arbitrary keyword args",
      "choice2": "Arbitrary positional args",
      "choice3": "Default args",
      "choice4": "Named args",
      "answer": 2
    },
    {
      "question": "Which comprehension creates a generator instead of a list?",
      "choice1": "[x for x in iterable]",
      "choice2": "(x for x in iterable)",
      "choice3": "{x for x in iterable}",
      "choice4": "{k:v for k,v in iterable}",
      "answer": 2
    },
    {
      "question": "Which statement terminates a loop prematurely?",
      "choice1": "continue",
      "choice2": "break",
      "choice3": "pass",
      "choice4": "return",
      "answer": 2
    },
    {
      "question": "What is the output of `bool('')`?",
      "choice1": "True",
      "choice2": "False",
      "choice3": "Error",
      "choice4": "None",
      "answer": 2
    },
    {
      "question": "Which keyword creates an anonymous function?",
      "choice1": "anon",
      "choice2": "func",
      "choice3": "lambda",
      "choice4": "def",
      "answer": 3
    },
    {
      "question": "Which built-in catches all exceptions?",
      "choice1": "except Exception",
      "choice2": "except BaseException",
      "choice3": "except All",
      "choice4": "except",
      "answer": 2
    },
    {
      "question": "How do you install packages in Python?",
      "choice1": "pip install package",
      "choice2": "python package install",
      "choice3": "install package",
      "choice4": "pip add package",
      "answer": 1
    },
    {
      "question": "What does `__name__ == '__main__'` check?",
      "choice1": "If module is imported",
      "choice2": "If script is run directly",
      "choice3": "If function exists",
      "choice4": "If variable is defined",
      "answer": 2
    },
    {
      "question": "Which data structure from collections is a dict subclass with default values?",
      "choice1": "Counter",
      "choice2": "OrderedDict",
      "choice3": "defaultdict",
      "choice4": "deque",
      "answer": 3
    },
    {
      "question": "Which function applies a function to all items of an iterable?",
      "choice1": "map()",
      "choice2": "filter()",
      "choice3": "reduce()",
      "choice4": "apply()",
      "answer": 1
    },
    {
      "question": "What is the file extension for Python modules?",
      "choice1": ".py",
      "choice2": ".pym",
      "choice3": ".pyc",
      "choice4": ".pyo",
      "answer": 1
    },
    {
      "question": "Which built-in sorts a list in place?",
      "choice1": "sorted()",
      "choice2": ".sort()",
      "choice3": "order()",
      "choice4": "arrange()",
      "answer": 2
    },
    {
      "question": "Which keyword is used to inherit a class in Java?",
      "choice1": "implements",
      "choice2": "extends",
      "choice3": "inherits",
      "choice4": "derives",
      "answer": 2
    },
    {
      "question": "What is the size of an `int` in Java?",
      "choice1": "16 bits",
      "choice2": "32 bits",
      "choice3": "64 bits",
      "choice4": "Depends on JVM",
      "answer": 2
    },
    {
      "question": "Which method is entry point of a Java application?",
      "choice1": "start()",
      "choice2": "main()",
      "choice3": "init()",
      "choice4": "run()",
      "answer": 2
    },
    {
      "question": "Which keyword prevents a method from being overridden?",
      "choice1": "static",
      "choice2": "final",
      "choice3": "private",
      "choice4": "sealed",
      "answer": 2
    },
    {
      "question": "Which exception is checked at compile time?",
      "choice1": "RuntimeException",
      "choice2": "IOException",
      "choice3": "Error",
      "choice4": "NullPointerException",
      "answer": 2
    },
    {
      "question": "What does JVM stand for?",
      "choice1": "Java Variable Machine",
      "choice2": "Java Virtual Machine",
      "choice3": "Java Verified Module",
      "choice4": "Java Volatile Memory",
      "answer": 2
    },
    {
      "question": "Which collection is synchronized?",
      "choice1": "ArrayList",
      "choice2": "Vector",
      "choice3": "HashMap",
      "choice4": "LinkedList",
      "answer": 2
    },
    {
      "question": "Which package contains the List interface?",
      "choice1": "java.io",
      "choice2": "java.util",
      "choice3": "java.lang",
      "choice4": "java.collections",
      "answer": 2
    },
    {
      "question": "Which access modifier makes a member accessible only within its own class?",
      "choice1": "public",
      "choice2": "private",
      "choice3": "protected",
      "choice4": "default",
      "answer": 2
    },
    {
      "question": "What is method overloading?",
      "choice1": "Same name, same parameters",
      "choice2": "Same name, different parameters",
      "choice3": "Different name, same parameters",
      "choice4": "Different name, different parameters",
      "answer": 2
    },
    {
      "question": "Which keyword creates a new thread when used with Runnable?",
      "choice1": "Thread",
      "choice2": "new",
      "choice3": "start",
      "choice4": "run",
      "answer": 2
    },
    {
      "question": "Which of these is not a primitive type?",
      "choice1": "int",
      "choice2": "String",
      "choice3": "boolean",
      "choice4": "double",
      "answer": 2
    },
    {
      "question": "What is the default value of a boolean instance variable?",
      "choice1": "true",
      "choice2": "false",
      "choice3": "null",
      "choice4": "0",
      "answer": 2
    },
    {
      "question": "Which loop guarantees execution at least once?",
      "choice1": "for",
      "choice2": "while",
      "choice3": "do-while",
      "choice4": "foreach",
      "answer": 3
    },
    {
      "question": "Which interface defines the `compareTo` method?",
      "choice1": "Comparator",
      "choice2": "Comparable",
      "choice3": "ComparatorChain",
      "choice4": "Orderable",
      "answer": 2
    },
    {
      "question": "Which keyword is used for automatic resource management?",
      "choice1": "try-with-resources",
      "choice2": "finally",
      "choice3": "closeable",
      "choice4": "auto",
      "answer": 1
    },
    {
      "question": "What does `static` keyword indicate?",
      "choice1": "Instance-level member",
      "choice2": "Class-level member",
      "choice3": "Method parameter",
      "choice4": "Local variable",
      "answer": 2
    },
    {
      "question": "Which collection allows duplicate keys?",
      "choice1": "HashMap",
      "choice2": "TreeMap",
      "choice3": "Hashtable",
      "choice4": "LinkedHashMap",
      "answer": 1
    },
    {
      "question": "Which error indicates no class definition found at runtime?",
      "choice1": "ClassCastException",
      "choice2": "NoClassDefFoundError",
      "choice3": "ClassNotFoundException",
      "choice4": "LinkageError",
      "answer": 2
    },
    {
      "question": "Which keyword indicates that a method can be executed by multiple threads concurrently?",
      "choice1": "synchronized",
      "choice2": "volatile",
      "choice3": "transient",
      "choice4": "static",
      "answer": 1
    },
    {
      "question": "Which class is the superclass of all exceptions that are not checked?",
      "choice1": "Throwable",
      "choice2": "Error",
      "choice3": "RuntimeException",
      "choice4": "Exception",
      "answer": 3
    },
    {
      "question": "Which method converts a string to an integer?",
      "choice1": "Integer.valueOf()",
      "choice2": "Integer.parseInt()",
      "choice3": "String.toInt()",
      "choice4": "Integer.getInt()",
      "answer": 2
    },
    {
      "question": "What is the size of a `long` in Java?",
      "choice1": "32 bits",
      "choice2": "64 bits",
      "choice3": "16 bits",
      "choice4": "Depends on platform",
      "answer": 2
    },
    {
      "question": "Which keyword ensures a variable’s changes are visible to all threads immediately?",
      "choice1": "synchronized",
      "choice2": "volatile",
      "choice3": "transient",
      "choice4": "final",
      "answer": 2
    },
    {
      "question": "Which OOP principle restricts access to implementation details?",
      "choice1": "Inheritance",
      "choice2": "Encapsulation",
      "choice3": "Polymorphism",
      "choice4": "Abstraction",
      "answer": 2
    },
    {
      "question": "Which keyword in Java allows a subclass to call its superclass’s constructor?",
      "choice1": "super",
      "choice2": "this",
      "choice3": "base",
      "choice4": "parent",
      "answer": 1
    },
    {
      "question": "Which feature lets an object take many forms in OOP?",
      "choice1": "Abstraction",
      "choice2": "Inheritance",
      "choice3": "Polymorphism",
      "choice4": "Encapsulation",
      "answer": 3
    },
    {
      "question": "An interface in Java can have which of the following members (Java 8+)?",
      "choice1": "Only abstract methods",
      "choice2": "Default and static methods",
      "choice3": "Instance variables",
      "choice4": "Constructors",
      "answer": 2
    },
    {
      "question": "What’s the main difference between an abstract class and an interface?",
      "choice1": "Abstract class can have state, interface cannot",
      "choice2": "Interface can have constructors, abstract cannot",
      "choice3": "Abstract class methods must be final",
      "choice4": "Interface methods are private by default",
      "answer": 1
    },
    {
      "question": "Which relationship is represented by the “has-a” term?",
      "choice1": "Inheritance",
      "choice2": "Aggregation/Composition",
      "choice3": "Polymorphism",
      "choice4": "Abstraction",
      "answer": 2
    },
    {
      "question": "Which principle allows replacing a subclass object wherever a superclass object is expected?",
      "choice1": "Interface Segregation",
      "choice2": "Dependency Inversion",
      "choice3": "Liskov Substitution Principle",
      "choice4": "Open/Closed Principle",
      "answer": 3
    },
    {
      "question": "Which design pattern ensures a class has only one instance?",
      "choice1": "Factory",
      "choice2": "Singleton",
      "choice3": "Observer",
      "choice4": "Decorator",
      "answer": 2
    },
    {
      "question": "What’s method overloading?",
      "choice1": "Same name, same signature",
      "choice2": "Same name, different parameters",
      "choice3": "Different name, same signature",
      "choice4": "Different name, different signature",
      "answer": 2
    },
    {
      "question": "What’s method overriding?",
      "choice1": "Same name, same signature in subclass",
      "choice2": "Same name, different signature",
      "choice3": "Different name, same signature",
      "choice4": "Different name, different signature",
      "answer": 1
    },
    {
      "question": "Which access modifier allows visibility within the same package only?",
      "choice1": "public",
      "choice2": "protected",
      "choice3": "default (no modifier)",
      "choice4": "private",
      "answer": 3
    },
    {
      "question": "Which keyword prevents a class from being subclassed?",
      "choice1": "sealed",
      "choice2": "static",
      "choice3": "final",
      "choice4": "immutable",
      "answer": 3
    },
    {
      "question": "What kind of variable is shared among all instances of a class?",
      "choice1": "Instance variable",
      "choice2": "Local variable",
      "choice3": "Static variable",
      "choice4": "Transient variable",
      "answer": 3
    },
    {
      "question": "Which OOP principle is applied by hiding complex logic behind a simple interface?",
      "choice1": "Abstraction",
      "choice2": "Encapsulation",
      "choice3": "Inheritance",
      "choice4": "Polymorphism",
      "answer": 1
    },
    {
      "question": "Which pattern decouples objects so that they can notify observers automatically?",
      "choice1": "Strategy",
      "choice2": "Observer",
      "choice3": "Decorator",
      "choice4": "Adapter",
      "answer": 2
    },
    {
      "question": "Which principle states that classes should have only one reason to change?",
      "choice1": "Single Responsibility Principle",
      "choice2": "Open/Closed Principle",
      "choice3": "Interface Segregation Principle",
      "choice4": "Dependency Inversion Principle",
      "answer": 1
    },
    {
      "question": "Which pattern allows selecting an algorithm’s behavior at runtime?",
      "choice1": "Factory",
      "choice2": "Strategy",
      "choice3": "Singleton",
      "choice4": "Bridge",
      "answer": 2
    },
    {
      "question": "What’s the default superclass of every Java class?",
      "choice1": "java.lang.Object",
      "choice2": "java.lang.Class",
      "choice3": "java.lang.Super",
      "choice4": "java.lang.Base",
      "answer": 1
    },
    {
      "question": "Which feature lets a class defer instantiation logic to subclasses?",
      "choice1": "Factory Method pattern",
      "choice2": "Singleton pattern",
      "choice3": "Observer pattern",
      "choice4": "Adapter pattern",
      "answer": 1
    },
    {
      "question": "What’s duck typing an example of in OOP?",
      "choice1": "Static typing",
      "choice2": "Dynamic polymorphism",
      "choice3": "Encapsulation",
      "choice4": "Compile-time binding",
      "answer": 2
    },
    {
      "question": "Which UML diagram shows class relationships?",
      "choice1": "Sequence diagram",
      "choice2": "Class diagram",
      "choice3": "Activity diagram",
      "choice4": "Use-case diagram",
      "answer": 2
    },
    {
      "question": "Which access level makes members visible to subclasses only?",
      "choice1": "private",
      "choice2": "default",
      "choice3": "protected",
      "choice4": "public",
      "answer": 3
    },
    {
      "question": "Which concept allows interfaces to be extended for new behavior?",
      "choice1": "Interface Inheritance",
      "choice2": "Implementation Inheritance",
      "choice3": "Multiple Inheritance",
      "choice4": "Single Inheritance",
      "answer": 1
    },
    {
      "question": "Which pattern separates object construction from representation?",
      "choice1": "Builder",
      "choice2": "Prototype",
      "choice3": "Flyweight",
      "choice4": "Observer",
      "answer": 1
    },
    {
      "question": "Which SOLID principle suggests classes be open for extension but closed for modification?",
      "choice1": "Open/Closed Principle",
      "choice2": "Liskov Substitution Principle",
      "choice3": "Single Responsibility Principle",
      "choice4": "Interface Segregation Principle",
      "answer": 1
    },
    {
      "question": "Which algorithm finds the shortest path in an unweighted graph?",
      "choice1": "DFS",
      "choice2": "BFS",
      "choice3": "Dijkstra",
      "choice4": "Bellman-Ford",
      "answer": 2
    },
    {
      "question": "What technique uses memoization to avoid redundant recursion?",
      "choice1": "Divide and Conquer",
      "choice2": "Greedy",
      "choice3": "Dynamic Programming",
      "choice4": "Brute Force",
      "answer": 3
    },
    {
      "question": "Which data structure gives O(1) amortized insert and O(log n) worst-case remove-min?",
      "choice1": "Queue",
      "choice2": "Stack",
      "choice3": "HashMap",
      "choice4": "Binary Heap",
      "answer": 4
    },
    {
      "question": "What’s the two-pointer technique often used for?",
      "choice1": "Sorting arrays",
      "choice2": "Detecting cycles in lists",
      "choice3": "Binary searching",
      "choice4": "Hashing keys",
      "answer": 2
    },
    {
      "question": "Which sorting is best for nearly sorted data?",
      "choice1": "Merge Sort",
      "choice2": "Insertion Sort",
      "choice3": "Heap Sort",
      "choice4": "Quick Sort",
      "answer": 2
    },
    {
      "question": "Which dynamic programming problem uses a 2D table for LCS?",
      "choice1": "Knapsack",
      "choice2": "Longest Common Subsequence",
      "choice3": "Fibonacci",
      "choice4": "Matrix Chain Multiplication",
      "answer": 2
    },
    {
      "question": "What is backtracking?",
      "choice1": "Greedy choice at each step",
      "choice2": "Exploring all possibilities with undo",
      "choice3": "Divide and conquer",
      "choice4": "Memoized recursion",
      "answer": 2
    },
    {
      "question": "Which algorithm finds strongly connected components?",
      "choice1": "Kosaraju’s",
      "choice2": "Prim’s",
      "choice3": "Kahn’s",
      "choice4": "Dijkstra’s",
      "answer": 1
    },
    {
      "question": "Which technique uses a sliding window over an array?",
      "choice1": "Two-pointer",
      "choice2": "Sliding Window",
      "choice3": "Stack-based",
      "choice4": "Recursion",
      "answer": 2
    },
    {
      "question": "Which approach tries all subsets of a set?",
      "choice1": "Greedy",
      "choice2": "Brute Force",
      "choice3": "Dynamic Programming",
      "choice4": "Backtracking",
      "answer": 2
    },
    {
      "question": "What is the average-case time of Quick Select?",
      "choice1": "O(n)",
      "choice2": "O(n log n)",
      "choice3": "O(n²)",
      "choice4": "O(log n)",
      "answer": 1
    },
    {
      "question": "Which structure helps implement an LRU cache?",
      "choice1": "Stack",
      "choice2": "Queue",
      "choice3": "HashMap + Doubly LinkedList",
      "choice4": "Binary Tree",
      "answer": 3
    },
    {
      "question": "Which search technique is optimal for unweighted trees?",
      "choice1": "DFS",
      "choice2": "BFS",
      "choice3": "Binary Search",
      "choice4": "Linear Search",
      "answer": 2
    },
    {
      "question": "What’s greedy choice property?",
      "choice1": "Local optimal leads to global optimal",
      "choice2": "Always backtracks",
      "choice3": "Uses memoization",
      "choice4": "Divides problem",
      "answer": 1
    },
    {
      "question": "Which problem is solved by KMP algorithm?",
      "choice1": "String permutation",
      "choice2": "Substring search",
      "choice3": "Regex matching",
      "choice4": "Palindrome check",
      "answer": 2
    },
    {
      "question": "Which structure lets you process in BFS order?",
      "choice1": "Stack",
      "choice2": "Queue",
      "choice3": "PriorityQueue",
      "choice4": "Deque",
      "answer": 2
    },
    {
      "question": "What’s the worst-case of Dijkstra’s with binary heap?",
      "choice1": "O(V²)",
      "choice2": "O(V + E log V)",
      "choice3": "O(E)",
      "choice4": "O(V log V)",
      "answer": 2
    },
    {
      "question": "Which DP problem uses subset-sum concept?",
      "choice1": "Rod Cutting",
      "choice2": "Knapsack",
      "choice3": "Fibonacci",
      "choice4": "Matrix Chain",
      "answer": 2
    },
    {
      "question": "What technique avoids recursion by using an explicit stack?",
      "choice1": "Memoization",
      "choice2": "Iteration",
      "choice3": "DFS with stack",
      "choice4": "Backtracking",
      "answer": 3
    },
    {
      "question": "Which algorithm partitions around a pivot?",
      "choice1": "Merge Sort",
      "choice2": "Quick Sort",
      "choice3": "Heap Sort",
      "choice4": "Counting Sort",
      "answer": 2
    },
    {
      "question": "Which structure is best for priority scheduling?",
      "choice1": "Queue",
      "choice2": "Stack",
      "choice3": "PriorityQueue",
      "choice4": "HashMap",
      "answer": 3
    },
    {
      "question": "What’s the main idea of divide and conquer?",
      "choice1": "Greedy choice",
      "choice2": "Divide into subproblems and merge",
      "choice3": "Backtrack solutions",
      "choice4": "Use hashing",
      "answer": 2
    },
    {
      "question": "Which graph traversal is recursive by nature?",
      "choice1": "BFS",
      "choice2": "DFS",
      "choice3": "Dijkstra’s",
      "choice4": "Prim’s",
      "answer": 2
    },
    {
      "question": "Which problem requires checking matrix path existence?",
      "choice1": "Word Search",
      "choice2": "Two Sum",
      "choice3": "Merge Intervals",
      "choice4": "Binary Search",
      "answer": 1
    },
    {
      "question": "Which technique uses bitmasking for subsets?",
      "choice1": "DP",
      "choice2": "Bitmask DP",
      "choice3": "Greedy",
      "choice4": "Backtracking",
      "answer": 2
    },
    {
      "question": "Which structure helps constant-time lookup of seen elements?",
      "choice1": "List",
      "choice2": "HashSet",
      "choice3": "Queue",
      "choice4": "TreeSet",
      "answer": 2
    },
    {
      "question": "Which method starts a Java thread?",
      "choice1": "run()",
      "choice2": "start()",
      "choice3": "init()",
      "choice4": "execute()",
      "answer": 2
    },
    {
      "question": "Which interface does a class implement to run code in a thread?",
      "choice1": "Runnable",
      "choice2": "Callable",
      "choice3": "Threadable",
      "choice4": "Executable",
      "answer": 1
    },
    {
      "question": "Which keyword enforces exclusive access to a block?",
      "choice1": "volatile",
      "choice2": "synchronized",
      "choice3": "transient",
      "choice4": "static",
      "answer": 2
    },
    {
      "question": "What’s a daemon thread?",
      "choice1": "Thread that prevents JVM exit",
      "choice2": "Low-priority user thread",
      "choice3": "Background thread that doesn’t block JVM exit",
      "choice4": "Thread with no run() method",
      "answer": 3
    },
    {
      "question": "Which method waits for another thread to finish?",
      "choice1": "join()",
      "choice2": "wait()",
      "choice3": "sleep()",
      "choice4": "notify()",
      "answer": 1
    },
    {
      "question": "Which class from java.util.concurrent runs tasks periodically?",
      "choice1": "ExecutorService",
      "choice2": "ScheduledExecutorService",
      "choice3": "ThreadPoolExecutor",
      "choice4": "ForkJoinPool",
      "answer": 2
    },
    {
      "question": "Which collection is thread-safe without external synchronization?",
      "choice1": "ArrayList",
      "choice2": "Vector",
      "choice3": "LinkedList",
      "choice4": "HashMap",
      "answer": 2
    },
    {
      "question": "What does volatile guarantee?",
      "choice1": "Atomicity",
      "choice2": "Visibility of changes across threads",
      "choice3": "Mutual exclusion",
      "choice4": "Thread scheduling order",
      "answer": 2
    },
    {
      "question": "Which construct is used for reentrant mutual exclusion?",
      "choice1": "Semaphore",
      "choice2": "ReentrantLock",
      "choice3": "CountDownLatch",
      "choice4": "CyclicBarrier",
      "answer": 2
    },
    {
      "question": "Which method causes current thread to sleep?",
      "choice1": "yield()",
      "choice2": "wait()",
      "choice3": "sleep()",
      "choice4": "pause()",
      "answer": 3
    },
    {
      "question": "Which utility waits until a set of threads complete?",
      "choice1": "Semaphore",
      "choice2": "CountDownLatch",
      "choice3": "CyclicBarrier",
      "choice4": "Phaser",
      "answer": 2
    },
    {
      "question": "Which class helps parallelize divide-and-conquer tasks?",
      "choice1": "ThreadPoolExecutor",
      "choice2": "ForkJoinPool",
      "choice3": "ExecutorService",
      "choice4": "ScheduledExecutorService",
      "answer": 2
    },
    {
      "question": "Which method wakes a single waiting thread on an object?",
      "choice1": "notifyAll()",
      "choice2": "notify()",
      "choice3": "signal()",
      "choice4": "resume()",
      "answer": 2
    },
    {
      "question": "Which state is a thread in before start() is called?",
      "choice1": "NEW",
      "choice2": "RUNNABLE",
      "choice3": "BLOCKED",
      "choice4": "TERMINATED",
      "answer": 1
    },
    {
      "question": "Which method releases the lock and suspends the thread?",
      "choice1": "sleep()",
      "choice2": "yield()",
      "choice3": "wait()",
      "choice4": "join()",
      "answer": 3
    },
    {
      "question": "Which barrier resets after releasing threads?",
      "choice1": "CountDownLatch",
      "choice2": "CyclicBarrier",
      "choice3": "Semaphore",
      "choice4": "Exchanger",
      "answer": 2
    },
    {
      "question": "What’s the default number of threads in ForkJoinPool.commonPool()?",
      "choice1": "1",
      "choice2": "Runtime.availableProcessors() – 1",
      "choice3": "2",
      "choice4": "Number of cores",
      "answer": 2
    },
    {
      "question": "Which method sets a thread as daemon?",
      "choice1": "setBackground(true)",
      "choice2": "setDaemon(true)",
      "choice3": "makeDaemon()",
      "choice4": "setPriority(0)",
      "answer": 2
    },
    {
      "question": "Which queue blocks producers when full and consumers when empty?",
      "choice1": "ConcurrentLinkedQueue",
      "choice2": "LinkedBlockingQueue",
      "choice3": "ArrayDeque",
      "choice4": "PriorityQueue",
      "answer": 2
    },
    {
      "question": "Which tool profiles thread states in JVM?",
      "choice1": "jstack",
      "choice2": "jmap",
      "choice3": "jconsole",
      "choice4": "jinfo",
      "answer": 1
    },
    {
      "question": "Which atomic class supports lock-free thread-safe counters?",
      "choice1": "AtomicInteger",
      "choice2": "LongAdder",
      "choice3": "AtomicBoolean",
      "choice4": "AtomicReference",
      "answer": 1
    },
    {
      "question": "Which method yields the processor to another thread of same priority?",
      "choice1": "pause()",
      "choice2": "yield()",
      "choice3": "sleep()",
      "choice4": "wait()",
      "answer": 2
    },
    {
      "question": "Which lock supports fairness policy?",
      "choice1": "ReentrantLock",
      "choice2": "Semaphore",
      "choice3": "StampedLock",
      "choice4": "ReadWriteLock",
      "answer": 1
    },
    {
      "question": "Which class implements a read–write lock?",
      "choice1": "ReentrantLock",
      "choice2": "ReadWriteLock",
      "choice3": "StampedLock",
      "choice4": "Semaphore",
      "answer": 2
    },
    {
      "question": "Which keyword is used to manually throw an exception in Java?",
      "choice1": "throw",
      "choice2": "throws",
      "choice3": "catch",
      "choice4": "finally",
      "answer": 1
    },
    {
      "question": "Which block executes regardless of whether an exception is thrown?",
      "choice1": "try",
      "choice2": "catch",
      "choice3": "finally",
      "choice4": "throw",
      "answer": 3
    },
    {
      "question": "Which keyword is used in a method signature to declare that it may pass an exception to the caller?",
      "choice1": "throw",
      "choice2": "throws",
      "choice3": "catch",
      "choice4": "finally",
      "answer": 2
    },
    {
      "question": "Which exception is thrown when you divide by zero on integer types?",
      "choice1": "ArithmeticException",
      "choice2": "NullPointerException",
      "choice3": "NumberFormatException",
      "choice4": "IllegalArgumentException",
      "answer": 1
    },
    {
      "question": "Which is a checked exception?",
      "choice1": "NullPointerException",
      "choice2": "ArrayIndexOutOfBoundsException",
      "choice3": "IOException",
      "choice4": "ArithmeticException",
      "answer": 3
    },
    {
      "question": "Which method retrieves the detail message of an exception?",
      "choice1": "getMessage()",
      "choice2": "getCause()",
      "choice3": "printStackTrace()",
      "choice4": "toString()",
      "answer": 1
    },
    {
      "question": "What happens if an exception is not caught?",
      "choice1": "Program continues normally",
      "choice2": "Exception propagates to the JVM and may terminate the program",
      "choice3": "Exception is ignored",
      "choice4": "Finally block never executes",
      "answer": 2
    },
    {
      "question": "Which of these is the root class for all exceptions?",
      "choice1": "Exception",
      "choice2": "RuntimeException",
      "choice3": "Throwable",
      "choice4": "Error",
      "answer": 3
    },
    {
      "question": "Which keyword creates a custom exception class?",
      "choice1": "extends Exception",
      "choice2": "implements Exception",
      "choice3": "throws Exception",
      "choice4": "throws Throwable",
      "answer": 1
    },
    {
      "question": "Which statement about `finally` is true?",
      "choice1": "It executes only if no exception is thrown",
      "choice2": "It executes only if an exception is thrown",
      "choice3": "It always executes unless JVM crashes or System.exit() is called",
      "choice4": "It is optional and never recommended",
      "answer": 3
    },
    {
      "question": "Which interface must an exception class implement to be a valid exception?",
      "choice1": "Serializable",
      "choice2": "Closeable",
      "choice3": "Iterable",
      "choice4": "AutoCloseable",
      "answer": 1
    },
    {
      "question": "Which exception type cannot be caught by a `catch (Exception e)` block?",
      "choice1": "IOException",
      "choice2": "RuntimeException",
      "choice3": "Error",
      "choice4": "ClassNotFoundException",
      "answer": 3
    },
    {
      "question": "What does `printStackTrace()` do?",
      "choice1": "Prints exception message only",
      "choice2": "Prints method call trace leading to exception",
      "choice3": "Logs the exception",
      "choice4": "Wraps exception in another",
      "answer": 2
    },
    {
      "question": "Which of these is a runtime exception?",
      "choice1": "SQLException",
      "choice2": "FileNotFoundException",
      "choice3": "IllegalArgumentException",
      "choice4": "InterruptedException",
      "answer": 3
    },
    {
      "question": "Which block can catch multiple exception types in Java 7+?",
      "choice1": "catch (IOException & SQLException e)",
      "choice2": "catch (IOException | SQLException e)",
      "choice3": "catch (IOException, SQLException e)",
      "choice4": "catch (IOException; SQLException e)",
      "answer": 2
    },
    {
      "question": "Which exception is thrown by `Integer.parseInt(\"abc\")`?",
      "choice1": "NumberFormatException",
      "choice2": "IllegalStateException",
      "choice3": "ClassCastException",
      "choice4": "ParseException",
      "answer": 1
    },
    {
      "question": "Which construct ensures resources are closed automatically?",
      "choice1": "try-with-resources",
      "choice2": "try-finally",
      "choice3": "try-catch",
      "choice4": "try-catch-finally",
      "answer": 1
    },
    {
      "question": "What is the purpose of the `getCause()` method?",
      "choice1": "Returns the exception message",
      "choice2": "Returns the underlying cause of this exception",
      "choice3": "Prints stack trace",
      "choice4": "Logs the exception",
      "answer": 2
    },
    {
      "question": "Which exception is thrown when a thread is interrupted?",
      "choice1": "InterruptedException",
      "choice2": "ThreadDeath",
      "choice3": "IllegalThreadStateException",
      "choice4": "ExecutionException",
      "answer": 1
    },
    {
      "question": "Which feature distinguishes checked from unchecked exceptions?",
      "choice1": "Checked are subclasses of Error",
      "choice2": "Unchecked must be declared",
      "choice3": "Checked must be declared or caught",
      "choice4": "Unchecked must be logged",
      "answer": 3
    },
    {
      "question": "Which exception class is used for JVM-level errors?",
      "choice1": "RuntimeException",
      "choice2": "Exception",
      "choice3": "Error",
      "choice4": "Throwable",
      "answer": 3
    },
    {
      "question": "What does `throws` in a method signature indicate?",
      "choice1": "Method will handle all exceptions internally",
      "choice2": "Method may pass specified exceptions to its caller",
      "choice3": "Method suppresses exceptions",
      "choice4": "Method rethrows caught exceptions",
      "answer": 2
    },
    {
      "question": "Which of these is not a valid exception keyword?",
      "choice1": "try",
      "choice2": "catch",
      "choice3": "throw",
      "choice4": "trap",
      "answer": 4
    },
    {
      "question": "What is the base case in recursion?",
      "choice1": "The condition to stop recursion",
      "choice2": "The first recursive call",
      "choice3": "The loop inside recursion",
      "choice4": "The last recursive call",
      "answer": 1
    },
    {
      "question": "Which of these problems cannot be solved without a base case?",
      "choice1": "Factorial",
      "choice2": "Fibonacci",
      "choice3": "Infinite recursion",
      "choice4": "Binary search",
      "answer": 3
    },
    {
      "question": "Which data structure underlies recursion calls?",
      "choice1": "Queue",
      "choice2": "Stack",
      "choice3": "Tree",
      "choice4": "Heap",
      "answer": 2
    },
    {
      "question": "What is tail recursion?",
      "choice1": "Recursive call is the first statement",
      "choice2": "Recursive call is the last statement",
      "choice3": "More than one recursive call",
      "choice4": "No base case",
      "answer": 2
    },
    {
      "question": "Which traversal uses recursion?",
      "choice1": "Level-order",
      "choice2": "Breadth-first",
      "choice3": "In-order",
      "choice4": "Iterative search",
      "answer": 3
    },
    {
      "question": "What technique avoids recursion using an explicit stack?",
      "choice1": "Memoization",
      "choice2": "Iteration",
      "choice3": "Divide and conquer",
      "choice4": "Greedy",
      "answer": 2
    },
    {
      "question": "Which problem is classic for teaching recursion?",
      "choice1": "Two-sum",
      "choice2": "Tower of Hanoi",
      "choice3": "Merge sort",
      "choice4": "Quick sort",
      "answer": 2
    },
    {
      "question": "Which recursion type calls itself more than once?",
      "choice1": "Direct recursion",
      "choice2": "Indirect recursion",
      "choice3": "Linear recursion",
      "choice4": "Tree recursion",
      "answer": 4
    },
    {
      "question": "Which condition leads to infinite recursion?",
      "choice1": "Wrong base case",
      "choice2": "Missing return",
      "choice3": "Multiple calls",
      "choice4": "Correct decrement",
      "answer": 1
    },
    {
      "question": "In the function `fun(n) { if (n==0) return; fun(n-1); }`, how many calls for `fun(3)`?",
      "choice1": "1",
      "choice2": "2",
      "choice3": "3",
      "choice4": "4",
      "answer": 4
    },
    {
      "question": "Which algorithm uses recursion for sorting?",
      "choice1": "Bubble sort",
      "choice2": "Insertion sort",
      "choice3": "Merge sort",
      "choice4": "Selection sort",
      "answer": 3
    },
    {
      "question": "What’s the output of `fun(2)` where `fun` doubles the call until n==4?",
      "choice1": "4",
      "choice2": "8",
      "choice3": "16",
      "choice4": "Runtime Error",
      "answer": 3
    },
    {
      "question": "Which DP concept builds on recursion?",
      "choice1": "Greedy",
      "choice2": "Divide and conquer",
      "choice3": "Memoization",
      "choice4": "Branch and bound",
      "answer": 3
    },
    {
      "question": "How many recursive calls in `fib(n)` where `n>1`?",
      "choice1": "1",
      "choice2": "n",
      "choice3": "2",
      "choice4": "2 calls at each level",
      "answer": 4
    },
    {
      "question": "Which problem prints binary of a number via recursion?",
      "choice1": "Tower of Hanoi",
      "choice2": "Binary representation",
      "choice3": "Permutation generation",
      "choice4": "Subset sum",
      "answer": 2
    },
    {
      "question": "Which Sanfoundry MCQ source covers recursion basics?",
      "choice1": "sanfoundry.com – recursion",
      "choice2": "javainuse.com – recursion",
      "choice3": "gfg.com – recursion",
      "choice4": "leetcode.com – recursion",
      "answer": 1
    },
    {
      "question": "Which call sequence stops recursion?",
      "choice1": "Correct base case returns",
      "choice2": "Multiple recursive calls",
      "choice3": "Missing return keyword",
      "choice4": "Infinite loop",
      "answer": 1
    },
    {
      "question": "Which recursion type swaps parameters each call?",
      "choice1": "Indirect recursion",
      "choice2": "Direct recursion",
      "choice3": "Mutual recursion",
      "choice4": "Tree recursion",
      "answer": 3
    },
    {
      "question": "Which traversal best illustrates recursion on trees?",
      "choice1": "DFS In-order",
      "choice2": "BFS Level-order",
      "choice3": "Iterative stack",
      "choice4": "Priority traversal",
      "answer": 1
    },
    {
      "question": "What is the recursion depth for `fun(n/2)` on input 16?",
      "choice1": "2",
      "choice2": "3",
      "choice3": "4",
      "choice4": "5",
      "answer": 3
    },
    {
      "question": "Which structure is used for backtracking recursion?",
      "choice1": "Stack",
      "choice2": "Queue",
      "choice3": "Heap",
      "choice4": "Graph",
      "answer": 1
    },
    {
      "question": "Which error occurs on too deep recursion?",
      "choice1": "StackOverflowError",
      "choice2": "OutOfMemoryError",
      "choice3": "RuntimeException",
      "choice4": "IllegalStateException",
      "answer": 1
    },
    {
      "question": "What technique transforms recursion into loops?",
      "choice1": "Memoization",
      "choice2": "Iteration",
      "choice3": "Stack simulation",
      "choice4": "Greedy",
      "answer": 3
    },
    {
      "question": "Which site offers top 50 recursion problems?",
      "choice1": "gfg.com – Top 50 Recursion",
      "choice2": "sanfoundry.com",
      "choice3": "javatechonline.com",
      "choice4": "leetcode.com",
      "answer": 1
    },
    {
      "question": "Which annotation marks the main entry point of a Spring Boot application?",
      "choice1": "@SpringBootConfiguration",
      "choice2": "@EnableAutoConfiguration",
      "choice3": "@SpringBootApplication",
      "choice4": "@Configuration",
      "answer": 3
    },
    {
      "question": "What is Spring Initializr used for?",
      "choice1": "Generating CRUD code",
      "choice2": "Creating project skeleton with dependencies",
      "choice3": "Monitoring applications",
      "choice4": "Writing REST controllers",
      "answer": 2
    },
    {
      "question": "Which starter dependency is used for RESTful web services?",
      "choice1": "spring-boot-starter-data-jpa",
      "choice2": "spring-boot-starter-web",
      "choice3": "spring-boot-starter-security",
      "choice4": "spring-boot-starter-actuator",
      "answer": 2
    },
    {
      "question": "Which property file sets the server port?",
      "choice1": "application.env",
      "choice2": "application.properties",
      "choice3": "boot.properties",
      "choice4": "server.properties",
      "answer": 2
    },
    {
      "question": "Which annotation creates REST controllers?",
      "choice1": "@Controller",
      "choice2": "@RestController",
      "choice3": "@Service",
      "choice4": "@Component",
      "answer": 2
    },
    {
      "question": "Which HTTP mapping annotation handles POST requests?",
      "choice1": "@GetMapping",
      "choice2": "@PostMapping",
      "choice3": "@RequestMapping(method = RequestMethod.PUT)",
      "choice4": "@PatchMapping",
      "answer": 2
    },
    {
      "question": "What does Spring Boot Actuator provide?",
      "choice1": "Dependency injection",
      "choice2": "Production-ready monitoring endpoints",
      "choice3": "Database migrations",
      "choice4": "View templates",
      "answer": 2
    },
    {
      "question": "Which file format is also supported for configuration?",
      "choice1": "XML",
      "choice2": "YAML",
      "choice3": "JSON",
      "choice4": "CSV",
      "answer": 2
    },
    {
      "question": "What is the default embedded server in Spring Boot?",
      "choice1": "Jetty",
      "choice2": "Undertow",
      "choice3": "Tomcat",
      "choice4": "Netty",
      "answer": 3
    },
    {
      "question": "Which annotation enables hot-reload in development?",
      "choice1": "@DevTools",
      "choice2": "@SpringDev",
      "choice3": "Include spring-boot-devtools",
      "choice4": "@EnableDevTools",
      "answer": 3
    },
    {
      "question": "Which annotation is used for integration testing?",
      "choice1": "@SpringBootTest",
      "choice2": "@WebMvcTest",
      "choice3": "@DataJpaTest",
      "choice4": "@RestClientTest",
      "answer": 1
    },
    {
      "question": "Which profile property file activates production settings?",
      "choice1": "application-prod.properties",
      "choice2": "application-props.properties",
      "choice3": "application-production.properties",
      "choice4": "application.yml",
      "answer": 1
    },
    {
      "question": "What is the default logging framework?",
      "choice1": "Log4j",
      "choice2": "Logback",
      "choice3": "SLF4J",
      "choice4": "Java Util Logging",
      "answer": 2
    },
    {
      "question": "Which annotation binds external config to a POJO?",
      "choice1": "@Value",
      "choice2": "@ConfigurationProperties",
      "choice3": "@Component",
      "choice4": "@Bean",
      "answer": 2
    },
    {
      "question": "Which annotation exposes metric endpoints?",
      "choice1": "@EnableMetrics",
      "choice2": "@EnableActuator",
      "choice3": "@Endpoint",
      "choice4": "@HealthIndicator",
      "answer": 3
    },
    {
      "question": "Which starter adds Spring Security support?",
      "choice1": "spring-boot-starter-web",
      "choice2": "spring-boot-starter-data-jpa",
      "choice3": "spring-boot-starter-security",
      "choice4": "spring-boot-starter-actuator",
      "answer": 3
    },
    {
      "question": "Which annotation is used for exception handling in controllers?",
      "choice1": "@ControllerAdvice",
      "choice2": "@RestControllerAdvice",
      "choice3": "@ExceptionHandler",
      "choice4": "All of the above",
      "answer": 4
    },
    {
      "question": "How do you disable a specific auto-configuration?",
      "choice1": "@EnableAutoConfiguration(exclude=…)",
      "choice2": "@DisableAutoConfiguration",
      "choice3": "@AutoConfigureExclude",
      "choice4": "application.properties setting",
      "answer": 1
    },
    {
      "question": "Which tool generates dependency diagrams?",
      "choice1": "Spring Initializr",
      "choice2": "Spring Actuator",
      "choice3": "Spring CLI",
      "choice4": "spring-boot-maven-plugin",
      "answer": 4
    },
    {
      "question": "Which bean scope creates one instance per HTTP request?",
      "choice1": "singleton",
      "choice2": "prototype",
      "choice3": "request",
      "choice4": "session",
      "answer": 3
    },
    {
      "question": "Which property sets the context path?",
      "choice1": "server.servlet.context-path",
      "choice2": "application.context",
      "choice3": "spring.context",
      "choice4": "boot.context.path",
      "answer": 1
    },
    {
      "question": "Which starter adds JPA and Hibernate support?",
      "choice1": "spring-boot-starter-jdbc",
      "choice2": "spring-boot-starter-data-jpa",
      "choice3": "spring-boot-starter-orm",
      "choice4": "spring-boot-starter-mongo",
      "answer": 2
    },
    {
      "question": "What does `@EnableScheduling` do?",
      "choice1": "Enables async tasks",
      "choice2": "Enables scheduled tasks",
      "choice3": "Enables batch jobs",
      "choice4": "Configures Quartz",
      "answer": 2
    },
    {
      "question": "Which actuator endpoint shows health status?",
      "choice1": "/actuator/health",
      "choice2": "/actuator/info",
      "choice3": "/actuator/metrics",
      "choice4": "/actuator/env",
      "answer": 1
    },
    {
      "question": "Which service model provides hardware and software tools over the internet?",
      "choice1": "IaaS",
      "choice2": "PaaS",
      "choice3": "SaaS",
      "choice4": "DaaS",
      "answer": 2
    },
    {
      "question": "Which cloud deployment model is exclusively used by a single organization?",
      "choice1": "Public cloud",
      "choice2": "Private cloud",
      "choice3": "Hybrid cloud",
      "choice4": "Community cloud",
      "answer": 2
    },
    {
      "question": "What does elasticity in cloud computing refer to?",
      "choice1": "Ability to scale resources up or down automatically",
      "choice2": "Data encryption at rest",
      "choice3": "Multi-region deployment",
      "choice4": "High availability",
      "answer": 1
    },
    {
      "question": "Which provider offers EC2 and S3 services?",
      "choice1": "Microsoft Azure",
      "choice2": "Google Cloud",
      "choice3": "Amazon Web Services",
      "choice4": "IBM Cloud",
      "answer": 3
    },
    {
      "question": "Which SLA metric indicates the percentage of time a service is up?",
      "choice1": "Throughput",
      "choice2": "Latency",
      "choice3": "Availability",
      "choice4": "Scalability",
      "answer": 3
    },
    {
      "question": "Which cloud model shares resources among multiple tenants?",
      "choice1": "Single-tenant",
      "choice2": "Multi-tenant",
      "choice3": "Dedicated-host",
      "choice4": "Edge-hosted",
      "answer": 2
    },
    {
      "question": "What is the primary benefit of serverless computing?",
      "choice1": "Customers manage OS patches",
      "choice2": "Automatic scaling without server management",
      "choice3": "Fixed monthly cost",
      "choice4": "No vendor lock-in",
      "answer": 2
    },
    {
      "question": "Which component abstracts physical hardware from the operating system?",
      "choice1": "Hypervisor",
      "choice2": "Load balancer",
      "choice3": "DNS",
      "choice4": "Firewall",
      "answer": 1
    },
    {
      "question": "Which availability zone concept ensures fault isolation?",
      "choice1": "Regions",
      "choice2": "Zones",
      "choice3": "Clusters",
      "choice4": "Pods",
      "answer": 2
    },
    {
      "question": "Which database type is offered as DBaaS for JSON documents?",
      "choice1": "SQL database",
      "choice2": "NoSQL database",
      "choice3": "Graph database",
      "choice4": "Time-series database",
      "answer": 2
    },
    {
      "question": "What is autoscaling?",
      "choice1": "Manual resource provisioning",
      "choice2": "Dynamic adjustment of resources based on load",
      "choice3": "Backup scheduling",
      "choice4": "Logging and monitoring",
      "answer": 2
    },
    {
      "question": "Which security model isolates tenants in a cloud?",
      "choice1": "VPN",
      "choice2": "Microsegmentation",
      "choice3": "Network ACLs",
      "choice4": "Tenant isolation",
      "answer": 4
    },
    {
      "question": "Which compliance standard applies to cloud data privacy in healthcare?",
      "choice1": "PCI DSS",
      "choice2": "GDPR",
      "choice3": "HIPAA",
      "choice4": "SOX",
      "answer": 3
    },
    {
      "question": "Which service provides DNS in the cloud?",
      "choice1": "Route 53",
      "choice2": "CloudFront",
      "choice3": "Cloud Watch",
      "choice4": "CloudTrail",
      "answer": 1
    },
    {
      "question": "Which concept refers to distributing resources closer to end-users?",
      "choice1": "Edge computing",
      "choice2": "Fog computing",
      "choice3": "Cluster computing",
      "choice4": "Grid computing",
      "answer": 1
    },
    {
      "question": "Which cloud pattern helps in disaster recovery by duplicating data in another region?",
      "choice1": "Active–active",
      "choice2": "Active–passive",
      "choice3": "Blue–green",
      "choice4": "Canary",
      "answer": 2
    },
    {
      "question": "What is the shared responsibility model?",
      "choice1": "Customer handles all security",
      "choice2": "Provider handles all security",
      "choice3": "Security duties split between provider and customer",
      "choice4": "No security responsibilities",
      "answer": 3
    },
    {
      "question": "Which identity service supports single sign-on (SSO) in AWS?",
      "choice1": "Cognito",
      "choice2": "IAM",
      "choice3": "Directory Service",
      "choice4": "GuardDuty",
      "answer": 1
    },
    {
      "question": "Which monitoring service provides real-time metrics in Azure?",
      "choice1": "Azure Monitor",
      "choice2": "CloudWatch",
      "choice3": "Stackdriver",
      "choice4": "Operations Manager",
      "answer": 1
    },
    {
      "question": "Which container orchestration service is managed by AWS?",
      "choice1": "Azure Kubernetes Service",
      "choice2": "Google Kubernetes Engine",
      "choice3": "Elastic Kubernetes Service",
      "choice4": "Cloud Run",
      "answer": 3
    },
    {
      "question": "Which storage class is best for infrequently accessed data?",
      "choice1": "Standard",
      "choice2": "Infrequent Access",
      "choice3": "Glacier",
      "choice4": "Intelligent-Tiering",
      "answer": 2
    },
    {
      "question": "Which encryption protects data in transit?",
      "choice1": "Server-side encryption",
      "choice2": "Client-side encryption",
      "choice3": "TLS/SSL",
      "choice4": "Disk encryption",
      "answer": 3
    },
    {
      "question": "Which API gateway feature helps throttle requests?",
      "choice1": "Caching",
      "choice2": "Rate limiting",
      "choice3": "Logging",
      "choice4": "Routing",
      "answer": 2
    },
    {
      "question": "Which cloud-native design principle promotes small, focused services?",
      "choice1": "Monolith",
      "choice2": "Microservices",
      "choice3": "Service Bus",
      "choice4": "ESB",
      "answer": 2
    },
    {
      "question": "Which language is used for building data models in Power BI?",
      "choice1": "DAX",
      "choice2": "M",
      "choice3": "SQL",
      "choice4": "Python",
      "answer": 1
    },
    {
      "question": "What does Power Query use to transform data?",
      "choice1": "DAX",
      "choice2": "M",
      "choice3": "R",
      "choice4": "VBA",
      "answer": 2
    },
    {
      "question": "Which visual shows data trends over time?",
      "choice1": "Pie chart",
      "choice2": "Line chart",
      "choice3": "Bar chart",
      "choice4": "Matrix",
      "answer": 2
    },
    {
      "question": "What is the default file extension for Power BI Desktop files?",
      "choice1": ".xlsx",
      "choice2": ".pbix",
      "choice3": ".pbit",
      "choice4": ".pbip",
      "answer": 2
    },
    {
      "question": "Which feature allows combining multiple data sources?",
      "choice1": "Power Pivot",
      "choice2": "Power Query",
      "choice3": "Power View",
      "choice4": "Power Map",
      "answer": 2
    },
    {
      "question": "Which DAX function returns the sum of a column?",
      "choice1": "SUMX",
      "choice2": "SUM",
      "choice3": "TOTALY",
      "choice4": "ADDUP",
      "answer": 2
    },
    {
      "question": "Which feature enables incremental data refresh?",
      "choice1": "Scheduled refresh",
      "choice2": "DirectQuery",
      "choice3": "Incremental refresh",
      "choice4": "Live connection",
      "answer": 3
    },
    {
      "question": "What is DirectQuery?",
      "choice1": "Import data into model",
      "choice2": "Query data at runtime from source",
      "choice3": "Push data via API",
      "choice4": "Pre-aggregate data",
      "answer": 2
    },
    {
      "question": "Which visual is best for hierarchical data?",
      "choice1": "Tree map",
      "choice2": "Scatter chart",
      "choice3": "Gauge",
      "choice4": "Waterfall",
      "answer": 1
    },
    {
      "question": "Which pane shows applied steps in Power Query?",
      "choice1": "Fields pane",
      "choice2": "Visualizations pane",
      "choice3": "Query Settings pane",
      "choice4": "Data view",
      "answer": 3
    },
    {
      "question": "Which DAX function filters a table expression?",
      "choice1": "CALCULATE",
      "choice2": "FILTER",
      "choice3": "ALL",
      "choice4": "REMOVEFILTERS",
      "answer": 2
    },
    {
      "question": "What does Power BI Service provide?",
      "choice1": "Desktop authoring",
      "choice2": "Cloud-based sharing and collaboration",
      "choice3": "Data modeling",
      "choice4": "DAX editing",
      "answer": 2
    },
    {
      "question": "Which refresh mode keeps data in sync with Azure Analysis Services?",
      "choice1": "Live connection",
      "choice2": "Import",
      "choice3": "DirectQuery",
      "choice4": "Push",
      "answer": 1
    },
    {
      "question": "Which feature secures row-level data access?",
      "choice1": "Workspaces",
      "choice2": "Row-level security",
      "choice3": "Dataflows",
      "choice4": "Dashboards",
      "answer": 2
    },
    {
      "question": "Which custom visual shows geographic data on maps?",
      "choice1": "Filled Map",
      "choice2": "Line Chart",
      "choice3": "Matrix",
      "choice4": "Card",
      "answer": 1
    },
    {
      "question": "Which Power BI view lets you define relationships?",
      "choice1": "Report view",
      "choice2": "Data view",
      "choice3": "Model view",
      "choice4": "Transform view",
      "answer": 3
    },
    {
      "question": "Which DAX function calculates running total?",
      "choice1": "TOTALYTD",
      "choice2": "RUNNINGTOTAL",
      "choice3": "CUMULATE",
      "choice4": "SUM",
      "answer": 1
    },
    {
      "question": "Which connectivity mode pushes data into Power BI service in real-time?",
      "choice1": "DirectQuery",
      "choice2": "Push dataset",
      "choice3": "Live connection",
      "choice4": "Import",
      "answer": 2
    },
    {
      "question": "Which is the advanced analytics visual in Power BI?",
      "choice1": "Key Influencers",
      "choice2": "Line chart",
      "choice3": "Matrix",
      "choice4": "Card",
      "answer": 1
    },
    {
      "question": "What does “Get Data” allow in Power BI Desktop?",
      "choice1": "Create measures",
      "choice2": "Import and connect to data sources",
      "choice3": "Define visuals",
      "choice4": "Publish reports",
      "answer": 2
    },
    {
      "question": "Which feature schedules automatic report delivery via email?",
      "choice1": "Alerts",
      "choice2": "Subscriptions",
      "choice3": "Bookmarks",
      "choice4": "Comments",
      "answer": 2
    },
    {
      "question": "Which DAX function returns distinct values from a column?",
      "choice1": "VALUES",
      "choice2": "DISTINCT",
      "choice3": "UNIQUE",
      "choice4": "ALL",
      "answer": 1
    },
    {
      "question": "Which visualization shows contribution to total over categories?",
      "choice1": "Pie chart",
      "choice2": "Line chart",
      "choice3": "Map",
      "choice4": "Column chart",
      "answer": 1
    },
    {
      "question": "Which pane shows available fields and tables?",
      "choice1": "Visualizations pane",
      "choice2": "Fields pane",
      "choice3": "View pane",
      "choice4": "Transform pane",
      "answer": 2
    },
    {
      "question": "Which process involves cleaning and transforming raw data?",
      "choice1": "Data ingestion",
      "choice2": "Data wrangling",
      "choice3": "Data visualization",
      "choice4": "Data modeling",
      "answer": 2
    },
    {
      "question": "Which chart is best for showing distribution of a single variable?",
      "choice1": "Scatter plot",
      "choice2": "Histogram",
      "choice3": "Pie chart",
      "choice4": "Line chart",
      "answer": 2
    },
    {
      "question": "What does ETL stand for?",
      "choice1": "Extract, Transform, Load",
      "choice2": "Evaluate, Test, Learn",
      "choice3": "Extract, Transfer, Link",
      "choice4": "Evaluate, Transform, Load",
      "answer": 1
    },
    {
      "question": "Which metric measures central tendency?",
      "choice1": "Variance",
      "choice2": "Standard deviation",
      "choice3": "Mean",
      "choice4": "Range",
      "answer": 3
    },
    {
      "question": "Which method reduces dimensionality while preserving variance?",
      "choice1": "Linear regression",
      "choice2": "K-means clustering",
      "choice3": "PCA",
      "choice4": "Decision trees",
      "answer": 3
    },
    {
      "question": "Which technique groups similar data points together?",
      "choice1": "Classification",
      "choice2": "Regression",
      "choice3": "Clustering",
      "choice4": "Association",
      "answer": 3
    },
    {
      "question": "Which visualization shows relationship between two numeric variables?",
      "choice1": "Heatmap",
      "choice2": "Scatter plot",
      "choice3": "Bar chart",
      "choice4": "Pie chart",
      "answer": 2
    },
    {
      "question": "Which test checks if two categorical variables are independent?",
      "choice1": "t-test",
      "choice2": "Chi-square test",
      "choice3": "ANOVA",
      "choice4": "Regression",
      "answer": 2
    },
    {
      "question": "Which metric measures model’s error in regression?",
      "choice1": "Accuracy",
      "choice2": "RMSE",
      "choice3": "ROC AUC",
      "choice4": "F1 Score",
      "answer": 2
    },
    {
      "question": "Which process selects a subset of relevant features?",
      "choice1": "Feature extraction",
      "choice2": "Feature selection",
      "choice3": "Feature scaling",
      "choice4": "Feature encoding",
      "answer": 2
    },
    {
      "question": "What does correlation measure?",
      "choice1": "Causation",
      "choice2": "Association between variables",
      "choice3": "Variance",
      "choice4": "Mean difference",
      "answer": 2
    },
    {
      "question": "Which scaling method transforms data to zero mean and unit variance?",
      "choice1": "Min-max scaling",
      "choice2": "Standardization",
      "choice3": "Log transformation",
      "choice4": "Binning",
      "answer": 2
    },
    {
      "question": "Which technique identifies outliers using interquartile range?",
      "choice1": "Z-score",
      "choice2": "IQR method",
      "choice3": "PCA",
      "choice4": "Clustering",
      "answer": 2
    },
    {
      "question": "Which visualization is best for time-series data?",
      "choice1": "Bar chart",
      "choice2": "Line chart",
      "choice3": "Histogram",
      "choice4": "Box plot",
      "answer": 2
    },
    {
      "question": "Which metric evaluates classification threshold-independent performance?",
      "choice1": "Precision",
      "choice2": "Recall",
      "choice3": "ROC AUC",
      "choice4": "F1 Score",
      "answer": 3
    },
    {
      "question": "What is overfitting?",
      "choice1": "Model performs similarly on train and test",
      "choice2": "Model performs well on train but poorly on test",
      "choice3": "Model underestimates error",
      "choice4": "Model with too few features",
      "answer": 2
    },
    {
      "question": "Which cross-validation method splits data into k subsets?",
      "choice1": "Hold-out",
      "choice2": "K-fold",
      "choice3": "LOOCV",
      "choice4": "Stratified sampling",
      "answer": 2
    },
    {
      "question": "Which analysis identifies cause-and-effect relationships?",
      "choice1": "Predictive analytics",
      "choice2": "Prescriptive analytics",
      "choice3": "Diagnostic analytics",
      "choice4": "Descriptive analytics",
      "answer": 3
    },
    {
      "question": "Which tool is commonly used for data visualization in Python?",
      "choice1": "Matplotlib",
      "choice2": "Scikit-learn",
      "choice3": "Pandas",
      "choice4": "NumPy",
      "answer": 1
    },
    {
      "question": "Which SQL clause is used for data aggregation?",
      "choice1": "WHERE",
      "choice2": "HAVING",
      "choice3": "GROUP BY",
      "choice4": "ORDER BY",
      "answer": 3
    },
    {
      "question": "Which display shows distribution via quartiles?",
      "choice1": "Bar chart",
      "choice2": "Box plot",
      "choice3": "Histogram",
      "choice4": "Scatter plot",
      "answer": 2
    },
    {
      "question": "Which process converts categorical variables into numeric?",
      "choice1": "Normalization",
      "choice2": "Encoding",
      "choice3": "Scaling",
      "choice4": "Binning",
      "answer": 2
    },
    {
      "question": "Which metric measures how well clusters are separated?",
      "choice1": "Silhouette score",
      "choice2": "RMSE",
      "choice3": "Precision",
      "choice4": "Recall",
      "answer": 1
    },
    {
      "question": "Which analytics type predicts future trends?",
      "choice1": "Descriptive",
      "choice2": "Diagnostic",
      "choice3": "Predictive",
      "choice4": "Prescriptive",
      "answer": 3
    },
    {
      "question": "Which algorithm is supervised and used for classification and regression?",
      "choice1": "K-Means",
      "choice2": "Linear Regression",
      "choice3": "Apriori",
      "choice4": "DBSCAN",
      "answer": 2
    },
    {
      "question": "What does PCA stand for and what is it used for?",
      "choice1": "Principal Component Analysis—dimensionality reduction",
      "choice2": "Partial Component Analysis—feature selection",
      "choice3": "Principal Covariance Alignment—data normalization",
      "choice4": "Predictive Component Analysis—time series forecasting",
      "answer": 1
    },
    {
      "question": "Which evaluation metric is most appropriate for imbalanced classification?",
      "choice1": "Accuracy",
      "choice2": "Precision-Recall AUC",
      "choice3": "Mean Squared Error",
      "choice4": "R² Score",
      "answer": 2
    },
    {
      "question": "Which technique reduces overfitting by combining multiple models?",
      "choice1": "Bagging",
      "choice2": "Dropout",
      "choice3": "L1 Regularization",
      "choice4": "Data Augmentation",
      "answer": 1
    },
    {
      "question": "What is the output of a clustering algorithm?",
      "choice1": "Probability scores",
      "choice2": "Membership of clusters",
      "choice3": "Decision boundaries",
      "choice4": "Regression coefficients",
      "answer": 2
    },
    {
      "question": "Which model is a simple neural network with no hidden layers?",
      "choice1": "Perceptron",
      "choice2": "Multilayer Perceptron",
      "choice3": "Autoencoder",
      "choice4": "CNN",
      "answer": 1
    },
    {
      "question": "Which loss function is used for binary classification?",
      "choice1": "Mean Squared Error",
      "choice2": "Cross-Entropy Loss",
      "choice3": "Hinge Loss",
      "choice4": "KL Divergence",
      "answer": 2
    },
    {
      "question": "What does ‘feature engineering’ involve?",
      "choice1": "Building models",
      "choice2": "Creating and selecting input variables",
      "choice3": "Validating outputs",
      "choice4": "Tuning hyperparameters",
      "answer": 2
    },
    {
      "question": "Which library is commonly used for data manipulation in Python?",
      "choice1": "NumPy",
      "choice2": "Pandas",
      "choice3": "Matplotlib",
      "choice4": "Seaborn",
      "answer": 2
    },
    {
      "question": "Which technique deals with missing values by inferring them from other observations?",
      "choice1": "Deletion",
      "choice2": "Mean imputation",
      "choice3": "K-Nearest Neighbors imputation",
      "choice4": "Encoding",
      "answer": 3
    },
    {
      "question": "Which plot helps assess normality of a distribution?",
      "choice1": "Box plot",
      "choice2": "Histogram",
      "choice3": "Q–Q plot",
      "choice4": "Scatter plot",
      "answer": 3
    },
    {
      "question": "What is the main purpose of cross-validation?",
      "choice1": "Reduce dataset size",
      "choice2": "Estimate model’s generalization error",
      "choice3": "Optimize data cleaning",
      "choice4": "Generate synthetic data",
      "answer": 2
    },
    {
      "question": "Which measure quantifies linear relationship between two variables?",
      "choice1": "Covariance",
      "choice2": "Pearson correlation coefficient",
      "choice3": "Euclidean distance",
      "choice4": "KL divergence",
      "answer": 2
    },
    {
      "question": "Which unsupervised technique is used for dimensionality reduction?",
      "choice1": "Random Forest",
      "choice2": "PCA",
      "choice3": "Logistic Regression",
      "choice4": "SVM",
      "answer": 2
    },
    {
      "question": "Which library provides tools for machine learning in Python?",
      "choice1": "scikit-learn",
      "choice2": "requests",
      "choice3": "Flask",
      "choice4": "Django",
      "answer": 1
    },
    {
      "question": "What is a confusion matrix used for?",
      "choice1": "Visualizing feature correlations",
      "choice2": "Summarizing classification results",
      "choice3": "Plotting training loss",
      "choice4": "Reducing dimensionality",
      "answer": 2
    },
    {
      "question": "Which sampling technique ensures each subset is represented proportionally?",
      "choice1": "Random sampling",
      "choice2": "Stratified sampling",
      "choice3": "Cluster sampling",
      "choice4": "Systematic sampling",
      "answer": 2
    },
    {
      "question": "What’s the goal of supervised learning?",
      "choice1": "Group similar examples",
      "choice2": "Learn mapping from inputs to known outputs",
      "choice3": "Generate new data",
      "choice4": "Detect anomalies",
      "answer": 2
    },
    {
      "question": "Which metric is used for regression performance?",
      "choice1": "Accuracy",
      "choice2": "F1 Score",
      "choice3": "Mean Absolute Error",
      "choice4": "ROC AUC",
      "answer": 3
    },
    {
      "question": "Which optimization algorithm updates weights based on moving average of gradients?",
      "choice1": "SGD",
      "choice2": "Momentum",
      "choice3": "Adam",
      "choice4": "RMSprop",
      "answer": 3
    },
    {
      "question": "Which method detects outliers by distance from cluster centroids?",
      "choice1": "DBSCAN",
      "choice2": "Isolation Forest",
      "choice3": "KMeans",
      "choice4": "LOF (Local Outlier Factor)",
      "answer": 4
    },
    {
      "question": "Which activation function is commonly used in hidden layers?",
      "choice1": "Sigmoid",
      "choice2": "ReLU",
      "choice3": "Softmax",
      "choice4": "Linear",
      "answer": 2
    },
    {
      "question": "Which technique helps with class imbalance by resampling?",
      "choice1": "SMOTE",
      "choice2": "PCA",
      "choice3": "Grid Search",
      "choice4": "Cross-Validation",
      "answer": 1
    },
    {
      "question": "What is overfitting in machine learning?",
      "choice1": "Model too simple",
      "choice2": "Model performs poorly on training data",
      "choice3": "Model captures noise and fails to generalize",
      "choice4": "Model underestimates performance",
      "answer": 3
    },
    {
      "question": "What is 15% of 200?",
      "choice1": "25",
      "choice2": "30",
      "choice3": "35",
      "choice4": "40",
      "answer": 2
    },
    {
      "question": "If a train travels 60 km in 1.5 hours, what is its average speed?",
      "choice1": "30 km/h",
      "choice2": "40 km/h",
      "choice3": "50 km/h",
      "choice4": "60 km/h",
      "answer": 2
    },
    {
      "question": "What is the next number in the series 2, 4, 6, 8, __?",
      "choice1": "9",
      "choice2": "10",
      "choice3": "11",
      "choice4": "12",
      "answer": 2
    },
    {
      "question": "What is the LCM of 4 and 6?",
      "choice1": "12",
      "choice2": "18",
      "choice3": "24",
      "choice4": "6",
      "answer": 1
    },
    {
      "question": "If x + 5 = 12, what is x?",
      "choice1": "5",
      "choice2": "6",
      "choice3": "7",
      "choice4": "8",
      "answer": 3
    },
    {
      "question": "What is 9 × 9?",
      "choice1": "72",
      "choice2": "81",
      "choice3": "90",
      "choice4": "99",
      "answer": 2
    },
    {
      "question": "If a rectangle has length 8 and width 5, what is its area?",
      "choice1": "40",
      "choice2": "35",
      "choice3": "30",
      "choice4": "45",
      "answer": 1
    },
    {
      "question": "What is 25 as a fraction of 100?",
      "choice1": "1/2",
      "choice2": "1/4",
      "choice3": "1/3",
      "choice4": "1/5",
      "answer": 2
    },
    {
      "question": "What is the square root of 144?",
      "choice1": "10",
      "choice2": "11",
      "choice3": "12",
      "choice4": "13",
      "answer": 3
    },
    {
      "question": "What is 7²?",
      "choice1": "42",
      "choice2": "49",
      "choice3": "56",
      "choice4": "63",
      "answer": 2
    },
    {
      "question": "If the ratio is 3:4 and total is 28, what is the larger part?",
      "choice1": "12",
      "choice2": "16",
      "choice3": "18",
      "choice4": "20",
      "answer": 2
    },
    {
      "question": "What is 100 – 45?",
      "choice1": "45",
      "choice2": "55",
      "choice3": "65",
      "choice4": "75",
      "answer": 2
    },
    {
      "question": "What is the perimeter of a square with side 6?",
      "choice1": "24",
      "choice2": "30",
      "choice3": "36",
      "choice4": "42",
      "answer": 1
    },
    {
      "question": "If y/4 = 3, what is y?",
      "choice1": "7",
      "choice2": "8",
      "choice3": "9",
      "choice4": "10",
      "answer": 2
    },
    {
      "question": "What is 5³?",
      "choice1": "25",
      "choice2": "75",
      "choice3": "125",
      "choice4": "625",
      "answer": 3
    },
    {
      "question": "What is 20% of 150?",
      "choice1": "25",
      "choice2": "30",
      "choice3": "35",
      "choice4": "40",
      "answer": 2
    },
    {
      "question": "What comes next in sequence 5, 10, 15, __?",
      "choice1": "18",
      "choice2": "20",
      "choice3": "22",
      "choice4": "25",
      "answer": 2
    },
    {
      "question": "If a cup costs ₹20, how many cups can you buy with ₹200?",
      "choice1": "8",
      "choice2": "9",
      "choice3": "10",
      "choice4": "11",
      "answer": 3
    },
    {
      "question": "What is 30 ÷ 5?",
      "choice1": "5",
      "choice2": "6",
      "choice3": "7",
      "choice4": "8",
      "answer": 2
    },
    {
      "question": "What is the area of a circle with radius 7 (use π≈22/7)?",
      "choice1": "154",
      "choice2": "144",
      "choice3": "134",
      "choice4": "124",
      "answer": 1
    },
    {
      "question": "What is 2³ + 3³?",
      "choice1": "17",
      "choice2": "35",
      "choice3": "32",
      "choice4": "36",
      "answer": 1
    },
    {
      "question": "If 5x = 45, x = ?",
      "choice1": "8",
      "choice2": "9",
      "choice3": "10",
      "choice4": "11",
      "answer": 2
    },
    {
      "question": "Which number is prime?",
      "choice1": "21",
      "choice2": "22",
      "choice3": "23",
      "choice4": "24",
      "answer": 3
    },
    {
      "question": "What is 9² – 9?",
      "choice1": "72",
      "choice2": "81",
      "choice3": "72",
      "choice4": "90",
      "answer": 1
    },
    {
      "question": "A train covers a distance of 150 km in 2 hours and 30 minutes. What is its average speed?",
      "choice1": "50 km/h",
      "choice2": "55 km/h",
      "choice3": "60 km/h",
      "choice4": "65 km/h",
      "answer": 1
    },
    {
      "question": "If the sum of three consecutive integers is 75, what is the middle integer?",
      "choice1": "24",
      "choice2": "25",
      "choice3": "26",
      "choice4": "27",
      "answer": 2
    },
    {
      "question": "A boat moves downstream at 18 km/h and upstream at 12 km/h. What is the speed of the boat in still water?",
      "choice1": "15 km/h",
      "choice2": "20 km/h",
      "choice3": "25 km/h",
      "choice4": "30 km/h",
      "answer": 1
    },
    {
      "question": "If 5 men can build a wall in 12 days, how many days for 8 men?",
      "choice1": "6 days",
      "choice2": "7.5 days",
      "choice3": "8 days",
      "choice4": "9 days",
      "answer": 2
    },
    {
      "question": "The ratio of ages of A and B is 3:4. After 6 years, the ratio is 2:3. Find A’s current age.",
      "choice1": "18",
      "choice2": "21",
      "choice3": "24",
      "choice4": "27",
      "answer": 3
    },
    {
      "question": "If the compound interest on ₹10,000 at 10% per annum for 2 years is ₹2,100, what is the simple interest?",
      "choice1": "₹2,000",
      "choice2": "₹2,100",
      "choice3": "₹2,200",
      "choice4": "₹2,300",
      "answer": 1
    },
    {
      "question": "In how many ways can 5 books be arranged on a shelf?",
      "choice1": "60",
      "choice2": "120",
      "choice3": "24",
      "choice4": "720",
      "answer": 2
    },
    {
      "question": "Find the value of x if x² – 5x + 6 = 0.",
      "choice1": "2 or 3",
      "choice2": "–2 or –3",
      "choice3": "1 or 6",
      "choice4": "2 or –3",
      "answer": 1
    },
    {
      "question": "What is the probability of drawing an ace from a standard 52-card deck?",
      "choice1": "1/13",
      "choice2": "1/52",
      "choice3": "1/4",
      "choice4": "4/52",
      "answer": 1
    },
    {
      "question": "If the angles of a triangle are in ratio 2:3:4, what is the largest angle?",
      "choice1": "72°",
      "choice2": "80°",
      "choice3": "90°",
      "choice4": "100°",
      "answer": 4
    },
    {
      "question": "A and B together can do a job in 10 days. B alone in 15 days. How long for A alone?",
      "choice1": "25 days",
      "choice2": "30 days",
      "choice3": "35 days",
      "choice4": "40 days",
      "answer": 2
    },
    {
      "question": "What is the sum of the interior angles of a hexagon?",
      "choice1": "360°",
      "choice2": "540°",
      "choice3": "720°",
      "choice4": "900°",
      "answer": 3
    },
    {
      "question": "If a sequence is defined by aₙ = 2aₙ₋₁ + 3 and a₁ = 1, what is a₂?",
      "choice1": "5",
      "choice2": "7",
      "choice3": "9",
      "choice4": "11",
      "answer": 1
    },
    {
      "question": "Solve for x: log₂ x = 5.",
      "choice1": "16",
      "choice2": "32",
      "choice3": "64",
      "choice4": "128",
      "answer": 2
    },
    {
      "question": "A box contains red, blue, and green balls in ratio 2:3:5. If total 100 balls, how many are green?",
      "choice1": "20",
      "choice2": "30",
      "choice3": "40",
      "choice4": "50",
      "answer": 3
    },
    {
      "question": "Which function is the inverse of f(x)=eˣ?",
      "choice1": "ln(x)",
      "choice2": "log₁₀(x)",
      "choice3": "eˣ",
      "choice4": "x²",
      "answer": 1
    },
    {
      "question": "Find determinant of matrix [[1,2],[3,4]].",
      "choice1": "-2",
      "choice2": "2",
      "choice3": "-1",
      "choice4": "1",
      "answer": 1
    },
    {
      "question": "If circumference is 44 and π=22/7, what is the radius?",
      "choice1": "7",
      "choice2": "14",
      "choice3": "21",
      "choice4": "28",
      "answer": 1
    },
    {
      "question": "A die is rolled twice. What is probability both show even?",
      "choice1": "1/2",
      "choice2": "1/4",
      "choice3": "1/3",
      "choice4": "1/6",
      "answer": 2
    },
    {
      "question": "Which series converges to e?",
      "choice1": "∑1/n!",
      "choice2": "∑1/n²",
      "choice3": "∑1/2ⁿ",
      "choice4": "∑1/3ⁿ",
      "answer": 1
    },
    {
      "question": "How many diagonals does an octagon have?",
      "choice1": "20",
      "choice2": "36",
      "choice3": "28",
      "choice4": "8",
      "answer": 1
    },
    {
      "question": "If sin θ = 3/5 and θ in QI, cos θ = ?",
      "choice1": "4/5",
      "choice2": "–4/5",
      "choice3": "5/3",
      "choice4": "–3/5",
      "answer": 1
    },
    {
      "question": "Solve x in equation x + 1/x = 5.",
      "choice1": "2±√3",
      "choice2": "3±√2",
      "choice3": "5±√4",
      "choice4": "1±√5",
      "answer": 1
    },
    {
      "question": "What’s the main goal of horizontal scaling?",
      "choice1": "Add more CPU/RAM to a single machine",
      "choice2": "Add more machines to distribute load",
      "choice3": "Optimize database queries",
      "choice4": "Reduce network latency",
      "answer": 2
    },
    {
      "question": "Which cache eviction policy removes the least recently used items first?",
      "choice1": "LFU",
      "choice2": "FIFO",
      "choice3": "LRU",
      "choice4": "Random",
      "answer": 3
    },
    {
      "question": "What does CDN stand for and what’s its purpose?",
      "choice1": "Content Delivery Network—for distributing static assets closer to users",
      "choice2": "Central Data Node—for centralizing logs",
      "choice3": "Computational Data Network—for distributed computing",
      "choice4": "Cache Distribution Network—for database caching",
      "answer": 1
    },
    {
      "question": "Which database type is best for highly relational data with complex joins?",
      "choice1": "NoSQL key-value store",
      "choice2": "Document database",
      "choice3": "Relational (SQL) database",
      "choice4": "Time-series database",
      "answer": 3
    },
    {
      "question": "What’s the CAP theorem trade-off?",
      "choice1": "Consistency vs Availability vs Partition tolerance—you can only pick two",
      "choice2": "Caching vs Analytics vs Partitioning",
      "choice3": "Concurrency vs Availability vs Performance",
      "choice4": "Cost vs Availability vs Performance",
      "answer": 1
    },
    {
      "question": "Which component routes requests to different service instances?",
      "choice1": "Load balancer",
      "choice2": "Message queue",
      "choice3": "CDN",
      "choice4": "Database proxy",
      "answer": 1
    },
    {
      "question": "For write-heavy workloads, which database pattern helps scale writes?",
      "choice1": "Master-slave replication",
      "choice2": "Sharding",
      "choice3": "Caching",
      "choice4": "Read replicas",
      "answer": 2
    },
    {
      "question": "What’s the purpose of a message queue in microservices?",
      "choice1": "Store static content",
      "choice2": "Enable asynchronous communication between services",
      "choice3": "Balance HTTP traffic",
      "choice4": "Encrypt data at rest",
      "answer": 2
    },
    {
      "question": "Which storage is most suitable for large binary objects (images, videos)?",
      "choice1": "In-memory cache",
      "choice2": "File/object storage",
      "choice3": "Relational database",
      "choice4": "Key-value store",
      "answer": 2
    },
    {
      "question": "What is replication latency?",
      "choice1": "Time to replicate data between replicas",
      "choice2": "Time to write to cache",
      "choice3": "Network latency for clients",
      "choice4": "Database query execution time",
      "answer": 1
    },
    {
      "question": "Which design helps maintain user session state across multiple servers?",
      "choice1": "Server sticky sessions",
      "choice2": "Client-side cookies only",
      "choice3": "Database sharding",
      "choice4": "Use of ephemeral storage",
      "answer": 1
    },
    {
      "question": "What’s a bloom filter used for?",
      "choice1": "Exact set membership checks",
      "choice2": "Probabilistic set membership with low memory",
      "choice3": "Counting occurrences",
      "choice4": "Sorting data",
      "answer": 2
    },
    {
      "question": "Which consistency model allows reads of stale data?",
      "choice1": "Strong consistency",
      "choice2": "Eventual consistency",
      "choice3": "Linearizability",
      "choice4": "Sequential consistency",
      "answer": 2
    },
    {
      "question": "What’s the function of a reverse proxy?",
      "choice1": "Serve static assets directly",
      "choice2": "Route client requests to backend servers",
      "choice3": "Encrypt data at rest",
      "choice4": "Balance database queries",
      "answer": 2
    },
    {
      "question": "Which metric measures how many requests a system can handle per second?",
      "choice1": "Latency",
      "choice2": "Throughput",
      "choice3": "Bandwidth",
      "choice4": "Consistency",
      "answer": 2
    },
    {
      "question": "What is circuit breaker pattern used for?",
      "choice1": "Encrypt service-to-service calls",
      "choice2": "Automatically restart failed services",
      "choice3": "Prevent cascading failures by stopping calls to failing services",
      "choice4": "Balance load evenly",
      "answer": 3
    },
    {
      "question": "In a distributed system, what is the primary cause of split-brain?",
      "choice1": "Network partition between nodes",
      "choice2": "CPU overload",
      "choice3": "Disk failure",
      "choice4": "High memory usage",
      "answer": 1
    },
    {
      "question": "Which storage offers sub-millisecond read/write latency?",
      "choice1": "SSD-backed storage",
      "choice2": "HDD-backed storage",
      "choice3": "Tape backup",
      "choice4": "In-memory cache",
      "answer": 4
    },
    {
      "question": "What’s eventual consistency good for?",
      "choice1": "Systems needing strict transactional guarantees",
      "choice2": "High-availability systems tolerating stale reads",
      "choice3": "Low-latency local caches",
      "choice4": "Real-time analytics",
      "answer": 2
    },
    {
      "question": "Which design uses fixed-size partitions of data by key?",
      "choice1": "Master-slave replication",
      "choice2": "Sharding",
      "choice3": "Replication",
      "choice4": "Partitioning",
      "answer": 2
    },
    {
      "question": "What’s the purpose of a distributed lock service?",
      "choice1": "Coordinate access to shared resources",
      "choice2": "Encrypt data",
      "choice3": "Serve static content",
      "choice4": "Load balance traffic",
      "answer": 1
    },
    {
      "question": "Which component centralizes logs for analysis?",
      "choice1": "Log aggregator",
      "choice2": "Cache",
      "choice3": "Database proxy",
      "choice4": "API gateway",
      "answer": 1
    },
    {
      "question": "What’s backpressure in streaming systems?",
      "choice1": "Forceful shutdown of streams",
      "choice2": "Signal from consumer to slow down producer",
      "choice3": "High network bandwidth",
      "choice4": "Batch processing delay",
      "answer": 2
    },
    {
      "question": "Which pattern decouples producers and consumers with guaranteed delivery?",
      "choice1": "Direct HTTP calls",
      "choice2": "Message queue",
      "choice3": "Cache-aside",
      "choice4": "Circuit breaker",
      "answer": 2
    },
    {
      "question": "What function returns the sum of a range of cells?",
      "choice1": "COUNT()",
      "choice2": "SUM()",
      "choice3": "AVERAGE()",
      "choice4": "TOTAL()",
      "answer": 2
    },
    {
      "question": "Which function returns the number of non-empty cells in a range?",
      "choice1": "COUNT()",
      "choice2": "COUNTA()",
      "choice3": "COUNTBLANK()",
      "choice4": "COUNTIF()",
      "answer": 2
    },
    {
      "question": "How do you make a cell reference absolute?",
      "choice1": "Enclose in {}",
      "choice2": "Prepend $ to row and column",
      "choice3": "Use @ symbol",
      "choice4": "Wrap in ABS()",
      "answer": 2
    },
    {
      "question": "Which function looks up a value in the first column and returns a value in the same row?",
      "choice1": "INDEX()",
      "choice2": "MATCH()",
      "choice3": "VLOOKUP()",
      "choice4": "HLOOKUP()",
      "answer": 3
    },
    {
      "question": "What’s the shortcut to insert the current date?",
      "choice1": "Ctrl + ;",
      "choice2": "Ctrl + Shift + D",
      "choice3": "Alt + D",
      "choice4": "Ctrl + Shift + ;",
      "answer": 1
    },
    {
      "question": "Which chart shows proportions of a whole?",
      "choice1": "Line chart",
      "choice2": "Pie chart",
      "choice3": "Scatter plot",
      "choice4": "Histogram",
      "answer": 2
    },
    {
      "question": "Which feature prevents unwanted edits to a sheet?",
      "choice1": "Data validation",
      "choice2": "Protect sheet",
      "choice3": "Conditional formatting",
      "choice4": "Pivot table",
      "answer": 2
    },
    {
      "question": "What does the CONCATENATE function do?",
      "choice1": "Split text",
      "choice2": "Combine text strings",
      "choice3": "Change case",
      "choice4": "Remove spaces",
      "answer": 2
    },
    {
      "question": "Which function returns the relative position of a value in a range?",
      "choice1": "INDEX()",
      "choice2": "MATCH()",
      "choice3": "LOOKUP()",
      "choice4": "FIND()",
      "answer": 2
    },
    {
      "question": "What’s the use of the IF function?",
      "choice1": "Perform arithmetic",
      "choice2": "Return one value if condition is true, another if false",
      "choice3": "Count cells",
      "choice4": "Lookup values",
      "answer": 2
    },
    {
      "question": "Which feature summarizes large datasets dynamically?",
      "choice1": "Filter",
      "choice2": "Sort",
      "choice3": "Pivot table",
      "choice4": "Chart",
      "answer": 3
    },
    {
      "question": "Which function returns the smallest value in a range?",
      "choice1": "MIN()",
      "choice2": "SMALL()",
      "choice3": "LEAST()",
      "choice4": "LOWEST()",
      "answer": 1
    },
    {
      "question": "Which feature highlights cells based on rules?",
      "choice1": "Data validation",
      "choice2": "Conditional formatting",
      "choice3": "Formatting painter",
      "choice4": "Styles",
      "answer": 2
    },
    {
      "question": "How do you freeze the top row?",
      "choice1": "View → Freeze Panes → Freeze Top Row",
      "choice2": "Home → Freeze Top Row",
      "choice3": "Insert → Freeze Top Row",
      "choice4": "Data → Freeze Top Row",
      "answer": 1
    },
    {
      "question": "Which function rounds a number to the nearest integer?",
      "choice1": "ROUND()",
      "choice2": "INT()",
      "choice3": "CEILING()",
      "choice4": "FLOOR()",
      "answer": 1
    },
    {
      "question": "What does the TRIM function remove?",
      "choice1": "All spaces",
      "choice2": "Leading and trailing spaces",
      "choice3": "Line breaks",
      "choice4": "Non-printable characters",
      "answer": 2
    },
    {
      "question": "Which function calculates the average of a range?",
      "choice1": "MEAN()",
      "choice2": "AVG()",
      "choice3": "AVERAGE()",
      "choice4": "MID()",
      "answer": 3
    },
    {
      "question": "Which tool shows trends with sparklines?",
      "choice1": "Chart",
      "choice2": "Sparkline",
      "choice3": "Data bar",
      "choice4": "Icon set",
      "answer": 2
    },
    {
      "question": "Which function returns the current workbook’s file path?",
      "choice1": "CELL(\"filename\")",
      "choice2": "INFO(\"filepath\")",
      "choice3": "GETPATH()",
      "choice4": "THISFILE()",
      "answer": 1
    },
    {
      "question": "Which function converts text to uppercase?",
      "choice1": "UPPER()",
      "choice2": "UPPERCASE()",
      "choice3": "CAPS()",
      "choice4": "PROPER()",
      "answer": 1
    },
    {
      "question": "Which function returns the row number of a reference?",
      "choice1": "ROWNUM()",
      "choice2": "ROW()",
      "choice3": "COLUMN()",
      "choice4": "ROWS()",
      "answer": 2
    },
    {
      "question": "How do you remove duplicate rows?",
      "choice1": "Data → Remove Duplicates",
      "choice2": "Home → Remove Duplicates",
      "choice3": "Insert → Remove Duplicates",
      "choice4": "Review → Remove Duplicates",
      "answer": 1
    },
    {
      "question": "Which function returns the number of rows in a reference?",
      "choice1": "COUNTROWS()",
      "choice2": "ROWS()",
      "choice3": "COUNTA()",
      "choice4": "COUNT()",
      "answer": 2
    },
    {
      "question": "What’s the purpose of Data Validation?",
      "choice1": "Highlight cells",
      "choice2": "Restrict permitted input values",
      "choice3": "Filter data",
      "choice4": "Sort data",
      "answer": 2
    },
    {
      "question": "What is a Minimum Viable Product (MVP)?",
      "choice1": "Fully featured product",
      "choice2": "Product with just enough features to gather feedback",
      "choice3": "Prototype",
      "choice4": "Release candidate",
      "answer": 2
    },
    {
      "question": "Which framework helps prioritize features by effort vs impact?",
      "choice1": "MOSCOW",
      "choice2": "RICE",
      "choice3": "KANO",
      "choice4": "Eisenhower Matrix",
      "answer": 2
    },
    {
      "question": "What’s the main purpose of a product roadmap?",
      "choice1": "Detail technical specs",
      "choice2": "Outline product vision and planned features over time",
      "choice3": "Track bugs",
      "choice4": "Manage daily tasks",
      "answer": 2
    },
    {
      "question": "Which metric measures user retention over a period?",
      "choice1": "Churn rate",
      "choice2": "Conversion rate",
      "choice3": "Activation rate",
      "choice4": "Net Promoter Score",
      "answer": 1
    },
    {
      "question": "What does OKR stand for?",
      "choice1": "Objectives and Key Results",
      "choice2": "Options and Key Risks",
      "choice3": "Observations and KPIs",
      "choice4": "Objectives and KPIs",
      "answer": 1
    },
    {
      "question": "Which document captures user stories and acceptance criteria?",
      "choice1": "Product spec",
      "choice2": "PRD (Product Requirements Document)",
      "choice3": "Design doc",
      "choice4": "Sprint backlog",
      "answer": 2
    },
    {
      "question": "What’s the primary role of a Product Manager?",
      "choice1": "Write code",
      "choice2": "Define product vision and prioritize features",
      "choice3": "Manage marketing campaigns",
      "choice4": "Handle customer support",
      "answer": 2
    },
    {
      "question": "Which analysis pits your product against competitors?",
      "choice1": "SWOT analysis",
      "choice2": "PESTLE analysis",
      "choice3": "Porter’s Five Forces",
      "choice4": "BCG matrix",
      "answer": 1
    },
    {
      "question": "What does ‘pivot’ mean in a product context?",
      "choice1": "Change the core strategy or feature set",
      "choice2": "Launch marketing campaign",
      "choice3": "Hire new team members",
      "choice4": "Scale infrastructure",
      "answer": 1
    },
    {
      "question": "Which approach validates ideas with small experiments?",
      "choice1": "Waterfall",
      "choice2": "A/B testing",
      "choice3": "Full launch",
      "choice4": "DevOps",
      "answer": 2
    },
    {
      "question": "What’s a user persona?",
      "choice1": "Actual user",
      "choice2": "Fictitious archetype representing target users",
      "choice3": "Beta tester group",
      "choice4": "Development team profile",
      "answer": 2
    },
    {
      "question": "Which metric measures average revenue per user?",
      "choice1": "ARPU",
      "choice2": "LTV",
      "choice3": "CAC",
      "choice4": "NPS",
      "answer": 1
    },
    {
      "question": "What’s the goal of a discovery phase?",
      "choice1": "Write code",
      "choice2": "Understand user needs and validate concepts",
      "choice3": "Launch product",
      "choice4": "Scale operations",
      "answer": 2
    },
    {
      "question": "Which artifact tracks feature progress in Agile?",
      "choice1": "Gantt chart",
      "choice2": "Burndown chart",
      "choice3": "Product roadmap",
      "choice4": "Risk register",
      "answer": 2
    },
    {
      "question": "What is customer segmentation?",
      "choice1": "Grouping users by random criteria",
      "choice2": "Dividing users into meaningful cohorts based on behavior or demographics",
      "choice3": "Combining all users",
      "choice4": "Excluding inactive users",
      "answer": 2
    },
    {
      "question": "Which KPI reflects user satisfaction?",
      "choice1": "Churn rate",
      "choice2": "NPS (Net Promoter Score)",
      "choice3": "DAU",
      "choice4": "MRR",
      "answer": 2
    },
    {
      "question": "What’s the purpose of a PRD?",
      "choice1": "Technical design details",
      "choice2": "Business and user requirements for a product feature",
      "choice3": "Project timeline",
      "choice4": "QA test plan",
      "answer": 2
    },
    {
      "question": "Which framework prioritizes tasks by Must, Should, Could, Won’t?",
      "choice1": "RICE",
      "choice2": "MOSCOW",
      "choice3": "KANO",
      "choice4": "Eisenhower Matrix",
      "answer": 2
    },
    {
      "question": "What does ‘time to market’ measure?",
      "choice1": "Time to code a feature",
      "choice2": "Time from concept to launch",
      "choice3": "Time to scale infrastructure",
      "choice4": "Time to onboard users",
      "answer": 2
    },
    {
      "question": "Which tool is used for roadmapping and feature tracking?",
      "choice1": "JIRA",
      "choice2": "Confluence",
      "choice3": "Aha!",
      "choice4": "GitHub",
      "answer": 3
    },
    {
      "question": "What is a feature flag?",
      "choice1": "Toggle to enable or disable features in production",
      "choice2": "Bug tracker entry",
      "choice3": "Database column",
      "choice4": "Release version",
      "answer": 1
    },
    {
      "question": "Which document outlines the user journey?",
      "choice1": "User story map",
      "choice2": "Feature spec",
      "choice3": "Test plan",
      "choice4": "Risk register",
      "answer": 1
    },
    {
      "question": "What’s ‘product-market fit’?",
      "choice1": "When the product meets investor goals",
      "choice2": "When the product satisfies strong market demand",
      "choice3": "When the product is technically flawless",
      "choice4": "When the product is fully documented",
      "answer": 2
    },
    {
      "question": "Which metric tracks how many users perform a desired action?",
      "choice1": "Retention rate",
      "choice2": "Conversion rate",
      "choice3": "Churn rate",
      "choice4": "ARPU",
      "answer": 2
    },
    {
      "question": "Choose the correct form: “She ___ to the gym every morning.”",
      "choice1": "go",
      "choice2": "goes",
      "choice3": "gone",
      "choice4": "going",
      "answer": 2
    },
    {
      "question": "Fill in the blank: “If I ___ you, I would apologize.”",
      "choice1": "am",
      "choice2": "were",
      "choice3": "was",
      "choice4": "be",
      "answer": 2
    },
    {
      "question": "Select the correct sentence order:\n1. and then he left.\n2. He finished his work,\n3. arrived early\n4. cleaned his desk,",
      "choice1": "3, 2, 4, 1",
      "choice2": "2, 3, 4, 1",
      "choice3": "3, 4, 2, 1",
      "choice4": "2, 4, 3, 1",
      "answer": 1
    },
    {
      "question": "Choose the correct preposition: “He is keen ___ learning French.”",
      "choice1": "in",
      "choice2": "on",
      "choice3": "to",
      "choice4": "of",
      "answer": 2
    },
    {
      "question": "Fill in the blank: “Neither the teacher nor the students ___ happy.”",
      "choice1": "is",
      "choice2": "are",
      "choice3": "were",
      "choice4": "am",
      "answer": 2
    },
    {
      "question": "Which is correct? “It’s ___ than yesterday.”",
      "choice1": "colder",
      "choice2": "more cold",
      "choice3": "coldest",
      "choice4": "most cold",
      "answer": 1
    },
    {
      "question": "Rearrange into a proper sentence: “a book / reading / She / interesting / found.”",
      "choice1": "She found reading a book interesting.",
      "choice2": "Reading she found a book interesting.",
      "choice3": "She reading a book found interesting.",
      "choice4": "She found a book reading interesting.",
      "answer": 1
    },
    {
      "question": "Choose the correct article: “He adopted ___ dog from the shelter.”",
      "choice1": "a",
      "choice2": "an",
      "choice3": "the",
      "choice4": "no article",
      "answer": 1
    },
    {
      "question": "Fill in the blank: “They will arrive ___ noon.”",
      "choice1": "in",
      "choice2": "at",
      "choice3": "on",
      "choice4": "by",
      "answer": 2
    },
    {
      "question": "Choose correct form: “I wish I ___ taller.”",
      "choice1": "am",
      "choice2": "were",
      "choice3": "was",
      "choice4": "be",
      "answer": 2
    },
    {
      "question": "Reorder: “went / she / the market / to / morning / this / in /.”",
      "choice1": "She went to the market this morning.",
      "choice2": "She this morning went to the market.",
      "choice3": "This morning she went to the market.",
      "choice4": "In the morning she went to the market.",
      "answer": 1
    },
    {
      "question": "Select correct tense: “By tomorrow, I ___ the report.”",
      "choice1": "will finish",
      "choice2": "will have finished",
      "choice3": "finish",
      "choice4": "have finished",
      "answer": 2
    },
    {
      "question": "Fill in: “She is interested ___ painting landscapes.”",
      "choice1": "in",
      "choice2": "on",
      "choice3": "at",
      "choice4": "for",
      "answer": 1
    },
    {
      "question": "Correct sentence: “Hardly ___ he started when it began to rain.”",
      "choice1": "had",
      "choice2": "has",
      "choice3": "did",
      "choice4": "do",
      "answer": 1
    },
    {
      "question": "Reorder: “her keys / lost / she / couldn’t / find / because /.”",
      "choice1": "She couldn’t find her keys because she lost them.",
      "choice2": "Because she lost her keys, she couldn’t find them.",
      "choice3": "She lost her keys because she couldn’t find them.",
      "choice4": "She couldn’t find them because she lost her keys.",
      "answer": 4
    },
    {
      "question": "Article: “___ honesty is the best policy.”",
      "choice1": "A",
      "choice2": "An",
      "choice3": "The",
      "choice4": "No article",
      "answer": 4
    },
    {
      "question": "Fill in: “He complained ___ the noise.”",
      "choice1": "about",
      "choice2": "of",
      "choice3": "to",
      "choice4": "for",
      "answer": 1
    },
    {
      "question": "Choose correct comparative: “This problem is ___ than the last one.”",
      "choice1": "more simple",
      "choice2": "simpler",
      "choice3": "simplest",
      "choice4": "most simple",
      "answer": 2
    },
    {
      "question": "Reorder: “the cake / baked / by / was / my sister /.”",
      "choice1": "The cake was baked by my sister.",
      "choice2": "By my sister was the cake baked.",
      "choice3": "My sister baked the cake.",
      "choice4": "The cake by my sister was baked.",
      "answer": 1
    },
    {
      "question": "Fill in: “He insisted ___ paying for dinner.”",
      "choice1": "on",
      "choice2": "in",
      "choice3": "at",
      "choice4": "for",
      "answer": 1
    },
    {
      "question": "Correct: “She___ already left when I arrived.”",
      "choice1": "has",
      "choice2": "had",
      "choice3": "have",
      "choice4": "was",
      "answer": 2
    },
    {
      "question": "Choose correct idiom: “Cost an arm and ___.”",
      "choice1": "a leg",
      "choice2": "an eye",
      "choice3": "a fortune",
      "choice4": "the world",
      "answer": 1
    },
    {
      "question": "Fill in: “Nothing ___ impossible if you try.”",
      "choice1": "is",
      "choice2": "are",
      "choice3": "was",
      "choice4": "be",
      "answer": 1
    },
    {
      "question": "Reorder: “many books / library / there / are / in the /.”",
      "choice1": "How many books there are in the library!",
      "choice2": "There are many books in the library.",
      "choice3": "In the library there are many books.",
      "choice4": "Many books are there in the library.",
      "answer": 2
    },
    {
      "question": "Find the next number: 2, 6, 12, 20, __",
      "choice1": "30",
      "choice2": "28",
      "choice3": "26",
      "choice4": "24",
      "answer": 2
    },
    {
      "question": "If A is B’s son, B is C’s daughter, how is A related to C?",
      "choice1": "Grandson",
      "choice2": "Granddaughter",
      "choice3": "Nephew",
      "choice4": "Son",
      "answer": 1
    },
    {
      "question": "Age puzzle: Father is twice the age of son. In 10 years, the sum will be 90. Find current ages (Son, Father).",
      "choice1": "(20, 40)",
      "choice2": "(25, 50)",
      "choice3": "(15, 30)",
      "choice4": "(30, 60)",
      "answer": 2
    },
    {
      "question": "Find the odd one out: 2, 3, 5, 7, 11, 14, 17",
      "choice1": "14",
      "choice2": "11",
      "choice3": "7",
      "choice4": "17",
      "answer": 1
    },
    {
      "question": "Series: 5, 9, 17, 33, __",
      "choice1": "65",
      "choice2": "61",
      "choice3": "57",
      "choice4": "49",
      "answer": 1
    },
    {
      "question": "Blood relation: Pointing to a man, she says, “His mother is the sister of my mother.” How is the man related to her?",
      "choice1": "Cousin",
      "choice2": "Brother",
      "choice3": "Uncle",
      "choice4": "Son",
      "answer": 1
    },
    {
      "question": "Seating arrangement: Four people A, B, C, D sit in a row… Who sits in the middle? (omitted for brevity)",
      "choice1": "A",
      "choice2": "B",
      "choice3": "C",
      "choice4": "D",
      "answer": 3
    },
    {
      "question": "Find the next letter series: A, C, F, J, O, __",
      "choice1": "T",
      "choice2": "S",
      "choice3": "R",
      "choice4": "P",
      "answer": 2
    },
    {
      "question": "Direction sense: Walk 5 km East, then 3 km North, then 5 km West. How far from start?",
      "choice1": "3 km",
      "choice2": "5 km",
      "choice3": "2 km",
      "choice4": "4 km",
      "answer": 1
    },
    {
      "question": "Find missing number: 7, 14, 28, __, 112",
      "choice1": "42",
      "choice2": "56",
      "choice3": "64",
      "choice4": "84",
      "answer": 2
    },
    {
      "question": "Family tree: P’s father is Q. Q is the brother of R, whose daughter is S. How is S related to P?",
      "choice1": "Cousin",
      "choice2": "Niece",
      "choice3": "Sister",
      "choice4": "Aunt",
      "answer": 1
    },
    {
      "question": "Alphabet series: D, G, K, P, __",
      "choice1": "U",
      "choice2": "V",
      "choice3": "W",
      "choice4": "T",
      "answer": 4
    },
    {
      "question": "Clock problem: What is the angle between hands at 3:15?",
      "choice1": "7.5°",
      "choice2": "0°",
      "choice3": "15°",
      "choice4": "30°",
      "answer": 1
    },
    {
      "question": "Odd one out: 81, 64, 36, 16, 9",
      "choice1": "36",
      "choice2": "64",
      "choice3": "81",
      "choice4": "9",
      "answer": 1
    },
    {
      "question": "Number series: 1, 4, 9, 16, __",
      "choice1": "25",
      "choice2": "24",
      "choice3": "27",
      "choice4": "20",
      "answer": 1
    },
    {
      "question": "Blood relation: X’s mother’s brother is Y. How is Y related to X?",
      "choice1": "Uncle",
      "choice2": "Brother",
      "choice3": "Cousin",
      "choice4": "Father",
      "answer": 1
    },
    {
      "question": "Find the pattern: 2, 3, 5, 9, 17, __",
      "choice1": "31",
      "choice2": "33",
      "choice3": "35",
      "choice4": "37",
      "answer": 2
    },
    {
      "question": "Statement & conclusion: … (omitted) Conclusion I and II. Which are valid?",
      "choice1": "Only I",
      "choice2": "Only II",
      "choice3": "Both",
      "choice4": "Neither",
      "answer": 3
    },
    {
      "question": "Direction: Facing North, turn right, then left, then right. Facing which direction?",
      "choice1": "East",
      "choice2": "West",
      "choice3": "South",
      "choice4": "North",
      "answer": 1
    },
    {
      "question": "Missing term: 3, 6, 18, 72, __",
      "choice1": "360",
      "choice2": "288",
      "choice3": "432",
      "choice4": "504",
      "answer": 3
    },
    {
      "question": "Arrangement: Five friends in a circle… Who sits opposite A? (omitted)",
      "choice1": "B",
      "choice2": "C",
      "choice3": "D",
      "choice4": "E",
      "answer": 4
    },
    {
      "question": "Find the next in pattern: Z, X, U, Q, __",
      "choice1": "L",
      "choice2": "M",
      "choice3": "N",
      "choice4": "O",
      "answer": 1
    },
    {
      "question": "Age: A is 4 years older than B. In 6 years, A will be twice B. Find their ages now.",
      "choice1": "(10,6)",
      "choice2": "(12,8)",
      "choice3": "(14,10)",
      "choice4": "(16,12)",
      "answer": 2
    },
    {
      "question": "Which completes series? 1, 1, 2, 3, 5, 8, __",
      "choice1": "12",
      "choice2": "13",
      "choice3": "14",
      "choice4": "15",
      "answer": 2
    },
    {
      "question": "Which answer best describes your greatest strength?",
      "choice1": "I work hard",
      "choice2": "I’m a quick learner and team player",
      "choice3": "I need guidance",
      "choice4": "I prefer to work alone",
      "answer": 2
    },
    {
      "question": "How would you handle conflict with a coworker?",
      "choice1": "Ignore them",
      "choice2": "Confront them angrily",
      "choice3": "Discuss privately to find a solution",
      "choice4": "Complain to manager immediately",
      "answer": 3
    },
    {
      "question": "Tell me about a time you showed leadership. (Open-ended)",
      "choice1": "I led a team project to successful completion",
      "choice2": "I told others what to do",
      "choice3": "I avoided responsibility",
      "choice4": "I followed instructions",
      "answer": 1
    },
    {
      "question": "What motivates you most at work?",
      "choice1": "Salary",
      "choice2": "Recognition and growth opportunities",
      "choice3": "Short breaks",
      "choice4": "Office perks",
      "answer": 2
    },
    {
      "question": "Describe a time you failed and how you handled it.",
      "choice1": "I learned from mistakes and improved process",
      "choice2": "I blamed others",
      "choice3": "I ignored the failure",
      "choice4": "I quit",
      "answer": 1
    },
    {
      "question": "How do you prioritize multiple tasks?",
      "choice1": "Do first-come-first-serve",
      "choice2": "Assess urgency and impact, then plan",
      "choice3": "Work on easiest tasks only",
      "choice4": "Let manager decide",
      "answer": 2
    },
    {
      "question": "Where do you see yourself in five years?",
      "choice1": "Still in the same role",
      "choice2": "Advancing into leadership and deeper expertise",
      "choice3": "Undecided",
      "choice4": "Out of this industry",
      "answer": 2
    },
    {
      "question": "Teamwork: Give an example of collaboration.",
      "choice1": "I worked solo",
      "choice2": "I paired with teammates to integrate features",
      "choice3": "I avoided group tasks",
      "choice4": "I let others do the work",
      "answer": 2
    },
    {
      "question": "How do you handle tight deadlines?",
      "choice1": "Panic",
      "choice2": "Break down work, communicate progress, focus on highest priorities",
      "choice3": "Work slower",
      "choice4": "Ask to extend always",
      "answer": 2
    },
    {
      "question": "What’s your management style?",
      "choice1": "Laissez-faire",
      "choice2": "Autocratic",
      "choice3": "Servant leadership",
      "choice4": "Absent",
      "answer": 3
    },
    {
      "question": "Describe how you accept feedback.",
      "choice1": "Defensively",
      "choice2": "Openly, and I act on constructive feedback",
      "choice3": "Ignore it",
      "choice4": "Argue with the giver",
      "answer": 2
    },
    {
      "question": "How do you stay organized?",
      "choice1": "Use to-do lists and calendar reminders",
      "choice2": "Keep everything in my head",
      "choice3": "Write on scraps of paper",
      "choice4": "Don’t plan",
      "answer": 1
    },
    {
      "question": "How do you handle stress?",
      "choice1": "Exercise, prioritize tasks, take short breaks",
      "choice2": "Ignore it",
      "choice3": "Complain",
      "choice4": "Avoid work",
      "answer": 1
    },
    {
      "question": "Why do you want to work here?",
      "choice1": "For the salary only",
      "choice2": "Because of the company’s mission and culture alignment",
      "choice3": "It was the only offer",
      "choice4": "I like the office location",
      "answer": 2
    },
    {
      "question": "Give an example of a difficult decision you made.",
      "choice1": "I assessed options, consulted stakeholders, and chose best outcome",
      "choice2": "I avoided making a decision",
      "choice3": "I flipped a coin",
      "choice4": "I asked someone else to decide",
      "answer": 1
    },
    {
      "question": "What do you do when you disagree with your manager?",
      "choice1": "Ignore direction",
      "choice2": "Discuss respectfully and provide data-backed rationale",
      "choice3": "Resign",
      "choice4": "Complain to colleagues",
      "answer": 2
    },
    {
      "question": "How do you define success in a role?",
      "choice1": "Meeting personal goals only",
      "choice2": "Achieving team objectives and continuous improvement",
      "choice3": "Pleasing everyone",
      "choice4": "Avoiding mistakes",
      "answer": 2
    },
    {
      "question": "Tell me about a time you exceeded expectations.",
      "choice1": "I delivered early with high quality",
      "choice2": "I did the minimum",
      "choice3": "I missed deadlines",
      "choice4": "I delegated responsibility",
      "answer": 1
    },
    {
      "question": "What would you do if you saw a colleague behaving unethically?",
      "choice1": "Ignore it",
      "choice2": "Report to appropriate authority following policy",
      "choice3": "Confront them publicly",
      "choice4": "Join them",
      "answer": 2
    },
    {
      "question": "How do you approach learning new skills?",
      "choice1": "Self-study and hands-on projects",
      "choice2": "Wait for training",
      "choice3": "Avoid new skills",
      "choice4": "Ask others to teach me only",
      "answer": 1
    },
    {
      "question": "What is your greatest weakness?",
      "choice1": "I work too hard and over-commit, but I'm learning to set boundaries",
      "choice2": "I don’t like working",
      "choice3": "I’m bad with deadlines",
      "choice4": "I can’t learn new things",
      "answer": 1
    },
    {
      "question": "How do you ensure inclusivity in a team?",
      "choice1": "Encourage diverse opinions and respectful dialogue",
      "choice2": "Ignore differences",
      "choice3": "Let majority decide",
      "choice4": "Avoid team discussions",
      "answer": 1
    },
    {
      "question": "Which soft skill involves adjusting quickly to new challenges and environments?",
      "choice1": "Resilience",
      "choice2": "Adaptability",
      "choice3": "Assertiveness",
      "choice4": "Ambition",
      "answer": 2
    },
    {
      "question": "What does cognitive ability primarily measure?",
      "choice1": "Technical expertise",
      "choice2": "Emotional awareness",
      "choice3": "Reasoning and problem-solving skills",
      "choice4": "Physical endurance",
      "answer": 3
    },
    {
      "question": "Which behavioral question best assesses teamwork?",
      "choice1": "Describe a time you worked alone successfully.",
      "choice2": "Tell me about a conflict you had with your manager.",
      "choice3": "Give an example of collaborating with teammates to achieve a goal.",
      "choice4": "What is your greatest weakness?",
      "answer": 3
    },
    {
      "question": "Which test format is commonly used to screen cognitive ability?",
      "choice1": "Code review",
      "choice2": "Numerical and verbal reasoning tests",
      "choice3": "Physical agility test",
      "choice4": "Personality quiz",
      "answer": 2
    },
    {
      "question": "What soft skill helps you remain calm under pressure?",
      "choice1": "Stress management",
      "choice2": "Persuasion",
      "choice3": "Networking",
      "choice4": "Delegation",
      "answer": 1
    },
    {
      "question": "Which question evaluates analytical thinking?",
      "choice1": "How do you prioritize tasks?",
      "choice2": "Explain a complex problem you solved step by step.",
      "choice3": "What do you do on weekends?",
      "choice4": "Describe your dream job.",
      "answer": 2
    },
    {
      "question": "Which attribute involves taking responsibility for outcomes?",
      "choice1": "Accountability",
      "choice2": "Adaptability",
      "choice3": "Creativity",
      "choice4": "Sociability",
      "answer": 1
    },
    {
      "question": "A cognitive ability question might ask you to:",
      "choice1": "List your technical skills",
      "choice2": "Identify the next number in a sequence",
      "choice3": "Describe your hobbies",
      "choice4": "Write a cover letter",
      "answer": 2
    },
    {
      "question": "Which soft skill helps resolve conflicts effectively?",
      "choice1": "Negotiation",
      "choice2": "Programming",
      "choice3": "Budgeting",
      "choice4": "Architecting",
      "answer": 1
    },
    {
      "question": "What kind of cognitive ability question tests pattern recognition?",
      "choice1": "Verbal reasoning",
      "choice2": "Logical sequences",
      "choice3": "Emotional scenarios",
      "choice4": "Company trivia",
      "answer": 2
    },
    {
      "question": "Which soft skill is key for leading teams?",
      "choice1": "Leadership",
      "choice2": "Accounting",
      "choice3": "Debugging",
      "choice4": "Micromanagement",
      "answer": 1
    },
    {
      "question": "Which ability helps you learn new tools quickly?",
      "choice1": "Adaptability",
      "choice2": "Stubbornness",
      "choice3": "Passivity",
      "choice4": "Isolation",
      "answer": 1
    },
    {
      "question": "Which question measures cognitive processing speed?",
      "choice1": "Self-introduction speech",
      "choice2": "Timed math problems",
      "choice3": "Teamwork example",
      "choice4": "Long-form essay",
      "answer": 2
    },
    {
      "question": "Which skill is essential for effective change management?",
      "choice1": "Adaptability",
      "choice2": "Rigidity",
      "choice3": "Obedience",
      "choice4": "Memory",
      "answer": 1
    },
    {
      "question": "What does a behavioral question on problem-solving look like?",
      "choice1": "Tell me about a difficult problem you solved and how.",
      "choice2": "What’s your favorite color?",
      "choice3": "Do you like to work remotely?",
      "choice4": "Any questions for us?",
      "answer": 1
    },
    {
      "question": "Which assessment uses puzzles and logic games?",
      "choice1": "Personality test",
      "choice2": "Cognitive ability test",
      "choice3": "Emotional intelligence quiz",
      "choice4": "Technical certification",
      "answer": 2
    },
    {
      "question": "Which soft skill enables effective delegation?",
      "choice1": "Trust and communication",
      "choice2": "Micromanagement",
      "choice3": "Isolation",
      "choice4": "Control",
      "answer": 1
    },
    {
      "question": "Which question evaluates numerical reasoning?",
      "choice1": "Describe a time you improved team morale.",
      "choice2": "Calculate the next number in the series 3, 6, 12, __.",
      "choice3": "What’s your leadership philosophy?",
      "choice4": "How do you resolve conflict?",
      "answer": 2
    },
    {
      "question": "Which quality helps you accept feedback constructively?",
      "choice1": "Openness",
      "choice2": "Defensiveness",
      "choice3": "Complacency",
      "choice4": "Ignorance",
      "answer": 1
    },
    {
      "question": "Which ability underlies learning from mistakes?",
      "choice1": "Reflectiveness",
      "choice2": "Forgetfulness",
      "choice3": "Indifference",
      "choice4": "Obstinacy",
      "answer": 1
    },
    {
      "question": "Which scenario tests situational judgment?",
      "choice1": "Choose the best response to a team conflict scenario.",
      "choice2": "Define a programming concept.",
      "choice3": "Explain your resume gaps.",
      "choice4": "List your certifications.",
      "answer": 1
    },
    {
      "question": "Effective collaboration requires:",
      "choice1": "Active listening",
      "choice2": "Solo work",
      "choice3": "Avoiding feedback",
      "choice4": "Ignoring deadlines",
      "answer": 1
    },
    {
      "question": "Which question measures verbal reasoning?",
      "choice1": "Explain a technical algorithm.",
      "choice2": "Identify the antonym of a given word.",
      "choice3": "Solve a jigsaw puzzle.",
      "choice4": "Estimate next month’s sales.",
      "answer": 2
    },
    {
      "question": "Which soft skill fosters innovation?",
      "choice1": "Creativity",
      "choice2": "Rigidity",
      "choice3": "Conformity",
      "choice4": "Compliance",
      "answer": 1
    },
    {
      "question": "Who was the first Emperor of the Maurya Dynasty?",
      "choice1": "Bindusara",
      "choice2": "Chandragupta Maurya",
      "choice3": "Ashoka",
      "choice4": "Bimbisara",
      "answer": 2
    },
    {
      "question": "In which year did India gain independence from British rule?",
      "choice1": "1945",
      "choice2": "1947",
      "choice3": "1950",
      "choice4": "1952",
      "answer": 2
    },
    {
      "question": "The Battle of Plassey was fought in:",
      "choice1": "1757",
      "choice2": "1764",
      "choice3": "1857",
      "choice4": "1707",
      "answer": 1
    },
    {
      "question": "Who wrote the ancient Indian text Arthashastra?",
      "choice1": "Panini",
      "choice2": "Kautilya (Chanakya)",
      "choice3": "Kalidasa",
      "choice4": "Vatsyayana",
      "answer": 2
    },
    {
      "question": "The French colony of Pondicherry was transferred to India in:",
      "choice1": "1950",
      "choice2": "1954",
      "choice3": "1949",
      "choice4": "1962",
      "answer": 2
    },
    {
      "question": "Which Mughal emperor built the Taj Mahal?",
      "choice1": "Akbar",
      "choice2": "Jahangir",
      "choice3": "Shah Jahan",
      "choice4": "Aurangzeb",
      "answer": 3
    },
    {
      "question": "The French Revolution began in:",
      "choice1": "1789",
      "choice2": "1776",
      "choice3": "1804",
      "choice4": "1799",
      "answer": 1
    },
    {
      "question": "Who was the British Prime Minister at the start of World War II?",
      "choice1": "Neville Chamberlain",
      "choice2": "Winston Churchill",
      "choice3": "Anthony Eden",
      "choice4": "Clement Attlee",
      "answer": 1
    },
    {
      "question": "The United Nations was founded in:",
      "choice1": "1919",
      "choice2": "1945",
      "choice3": "1950",
      "choice4": "1939",
      "answer": 2
    },
    {
      "question": "Who was the first President of the United States?",
      "choice1": "Thomas Jefferson",
      "choice2": "Abraham Lincoln",
      "choice3": "George Washington",
      "choice4": "John Adams",
      "answer": 3
    },
    {
      "question": "The Magna Carta was signed in:",
      "choice1": "1215",
      "choice2": "1066",
      "choice3": "1314",
      "choice4": "1492",
      "answer": 1
    },
    {
      "question": "Who led the Haitian Revolution?",
      "choice1": "Toussaint L’Ouverture",
      "choice2": "Jean-Jacques Dessalines",
      "choice3": "Henri Christophe",
      "choice4": "Bougainville",
      "answer": 1
    },
    {
      "question": "The Russian Revolution of 1917 overthrew which monarchy?",
      "choice1": "Romanov",
      "choice2": "Hohenzollern",
      "choice3": "Bourbon",
      "choice4": "Stuart",
      "answer": 1
    },
    {
      "question": "Which Chinese dynasty built the Great Wall?",
      "choice1": "Han",
      "choice2": "Ming",
      "choice3": "Qin",
      "choice4": "Tang",
      "answer": 3
    },
    {
      "question": "The Berlin Wall fell in:",
      "choice1": "1987",
      "choice2": "1989",
      "choice3": "1991",
      "choice4": "1985",
      "answer": 2
    },
    {
      "question": "Operation Overlord refers to:",
      "choice1": "Japanese attack on Pearl Harbor",
      "choice2": "Allied invasion of Normandy",
      "choice3": "Battle of Britain",
      "choice4": "Soviet winter counter-offensive",
      "answer": 2
    },
    {
      "question": "Who was the first woman to win the Nobel Prize?",
      "choice1": "Marie Curie",
      "choice2": "Bertha von Suttner",
      "choice3": "Dorothy Hodgkin",
      "choice4": "Mother Teresa",
      "answer": 1
    },
    {
      "question": "The Congress of Vienna (1814–15) aimed to:",
      "choice1": "Establish United Nations",
      "choice2": "Reorganize Europe after Napoleon",
      "choice3": "Start World War I",
      "choice4": "End the Franco-Prussian War",
      "answer": 2
    },
    {
      "question": "Who discovered penicillin?",
      "choice1": "Louis Pasteur",
      "choice2": "Alexander Fleming",
      "choice3": "Robert Koch",
      "choice4": "Joseph Lister",
      "answer": 2
    },
    {
      "question": "Which empire was ruled by Suleiman the Magnificent?",
      "choice1": "Mughal Empire",
      "choice2": "Ottoman Empire",
      "choice3": "Holy Roman Empire",
      "choice4": "Persian Empire",
      "answer": 2
    },
    {
      "question": "The Decembrist Revolt occurred in:",
      "choice1": "1825",
      "choice2": "1812",
      "choice3": "1830",
      "choice4": "1848",
      "answer": 1
    },
    {
      "question": "Who was the Viceroy of India during the Jallianwala Bagh massacre?",
      "choice1": "Lord Irwin",
      "choice2": "Lord Chelmsford",
      "choice3": "Lord Curzon",
      "choice4": "Lord Reading",
      "answer": 1
    },
    {
      "question": "Which war ended with the Treaty of Versailles?",
      "choice1": "Crimean War",
      "choice2": "World War I",
      "choice3": "World War II",
      "choice4": "Seven Years' War",
      "answer": 2
    },
    {
      "question": "Who was the first female Prime Minister of the UK?",
      "choice1": "Theresa May",
      "choice2": "Margaret Thatcher",
      "choice3": "Elizabeth II",
      "choice4": "Harriet Harman",
      "answer": 2
    },
    {
      "question": "The Cuban Missile Crisis occurred in:",
      "choice1": "1960",
      "choice2": "1962",
      "choice3": "1965",
      "choice4": "1959",
      "answer": 2
    },
    {
      "question": "Who was the first President of independent India?",
      "choice1": "Jawaharlal Nehru",
      "choice2": "Rajendra Prasad",
      "choice3": "Zakir Husain",
      "choice4": "Abdul Kalam",
      "answer": 2
    },
    {
      "question": "The Sykes–Picot Agreement divided which region?",
      "choice1": "Indian subcontinent",
      "choice2": "Middle East",
      "choice3": "Africa",
      "choice4": "Southeast Asia",
      "answer": 2
    },
    {
      "question": "Who led the Salt March in 1930?",
      "choice1": "Subhas Chandra Bose",
      "choice2": "Mahatma Gandhi",
      "choice3": "Jawaharlal Nehru",
      "choice4": "Vallabhbhai Patel",
      "answer": 2
    },
    {
      "question": "Which dynasty ruled China during Marco Polo’s visit?",
      "choice1": "Ming",
      "choice2": "Yuan",
      "choice3": "Song",
      "choice4": "Tang",
      "answer": 2
    },
    {
      "question": "The Opium Wars were fought between Britain and:",
      "choice1": "Japan",
      "choice2": "China",
      "choice3": "India",
      "choice4": "Korea",
      "answer": 2
    },
    {
      "question": "Who composed the national anthem of India, Jana Gana Mana?",
      "choice1": "Rabindranath Tagore",
      "choice2": "Bankim Chandra Chatterjee",
      "choice3": "Allama Iqbal",
      "choice4": "Sarojini Naidu",
      "answer": 1
    },
    {
      "question": "The Edict of Ashoka dates to approximately:",
      "choice1": "3rd century BCE",
      "choice2": "1st century BCE",
      "choice3": "1st century CE",
      "choice4": "4th century CE",
      "answer": 1
    },
    {
      "question": "Which civilization built Machu Picchu?",
      "choice1": "Aztec",
      "choice2": "Maya",
      "choice3": "Inca",
      "choice4": "Olmec",
      "answer": 3
    },
    {
      "question": "The Berlin Conference (1884–85) regulated European colonization of:",
      "choice1": "Asia",
      "choice2": "Africa",
      "choice3": "South America",
      "choice4": "Oceania",
      "answer": 2
    },
    {
      "question": "Who was the last ruler of the Mughal Empire?",
      "choice1": "Bahadur Shah I",
      "choice2": "Bahadur Shah Zafar",
      "choice3": "Shah Alam II",
      "choice4": "Aurangzeb",
      "answer": 2
    },
    {
      "question": "The Japanese attack on Pearl Harbor occurred in:",
      "choice1": "1941",
      "choice2": "1942",
      "choice3": "1940",
      "choice4": "1943",
      "answer": 1
    },
    {
      "question": "Which is the longest river in the world?",
      "choice1": "Amazon",
      "choice2": "Nile",
      "choice3": "Yangtze",
      "choice4": "Mississippi",
      "answer": 2
    },
    {
      "question": "Mount Kilimanjaro is located in:",
      "choice1": "Kenya",
      "choice2": "Tanzania",
      "choice3": "Uganda",
      "choice4": "Ethiopia",
      "answer": 2
    },
    {
      "question": "The Great Barrier Reef is off the coast of:",
      "choice1": "Australia",
      "choice2": "Indonesia",
      "choice3": "Philippines",
      "choice4": "Malaysia",
      "answer": 1
    },
    {
      "question": "Which desert is the largest hot desert in the world?",
      "choice1": "Gobi",
      "choice2": "Sahara",
      "choice3": "Arabian",
      "choice4": "Kalahari",
      "answer": 2
    },
    {
      "question": "India’s highest peak, Kanchenjunga, lies on the border with:",
      "choice1": "China",
      "choice2": "Nepal",
      "choice3": "Bhutan",
      "choice4": "Pakistan",
      "answer": 2
    },
    {
      "question": "The Ring of Fire is associated with:",
      "choice1": "Volcanic activity",
      "choice2": "Rainforests",
      "choice3": "Tidal waves",
      "choice4": "Glaciers",
      "answer": 1
    },
    {
      "question": "Which country has the most time zones?",
      "choice1": "USA",
      "choice2": "Russia",
      "choice3": "France",
      "choice4": "China",
      "answer": 3
    },
    {
      "question": "Which ocean is the deepest?",
      "choice1": "Atlantic",
      "choice2": "Pacific",
      "choice3": "Indian",
      "choice4": "Arctic",
      "answer": 2
    },
    {
      "question": "The Sundarbans mangrove forest is located in:",
      "choice1": "India and Bangladesh",
      "choice2": "Sri Lanka",
      "choice3": "Myanmar",
      "choice4": "Thailand",
      "answer": 1
    },
    {
      "question": "Which line of latitude circles the globe halfway between the Equator and the North Pole?",
      "choice1": "Tropic of Cancer",
      "choice2": "Arctic Circle",
      "choice3": "60°N",
      "choice4": "45°N",
      "answer": 4
    },
    {
      "question": "The Thar Desert is primarily in which Indian state?",
      "choice1": "Gujarat",
      "choice2": "Rajasthan",
      "choice3": "Punjab",
      "choice4": "Madhya Pradesh",
      "answer": 2
    },
    {
      "question": "Which river forms the Grand Canyon over millions of years?",
      "choice1": "Missouri",
      "choice2": "Colorado",
      "choice3": "Rio Grande",
      "choice4": "Columbia",
      "answer": 2
    },
    {
      "question": "What is the world’s largest island?",
      "choice1": "Greenland",
      "choice2": "New Guinea",
      "choice3": "Borneo",
      "choice4": "Madagascar",
      "answer": 1
    },
    {
      "question": "Which mountain range separates Europe and Asia?",
      "choice1": "Urals",
      "choice2": "Alps",
      "choice3": "Caucasus",
      "choice4": "Himalayas",
      "answer": 1
    },
    {
      "question": "The Dead Sea is located between Jordan and:",
      "choice1": "Israel",
      "choice2": "Saudi Arabia",
      "choice3": "Syria",
      "choice4": "Lebanon",
      "answer": 1
    },
    {
      "question": "Which is the capital city of Australia?",
      "choice1": "Sydney",
      "choice2": "Melbourne",
      "choice3": "Canberra",
      "choice4": "Perth",
      "answer": 3
    },
    {
      "question": "Which state in India has the longest coastline?",
      "choice1": "Gujarat",
      "choice2": "Tamil Nadu",
      "choice3": "Andhra Pradesh",
      "choice4": "Kerala",
      "answer": 1
    },
    {
      "question": "The Strait of Gibraltar separates Europe from:",
      "choice1": "Asia",
      "choice2": "Africa",
      "choice3": "North America",
      "choice4": "South America",
      "answer": 2
    },
    {
      "question": "Which city is known as the ‘City of Canals’?",
      "choice1": "Venice",
      "choice2": "Amsterdam",
      "choice3": "Bangkok",
      "choice4": "Bruges",
      "answer": 1
    },
    {
      "question": "Lake Baikal, the world’s deepest lake, is in:",
      "choice1": "Canada",
      "choice2": "Russia",
      "choice3": "India",
      "choice4": "Australia",
      "answer": 2
    },
    {
      "question": "Which is the coldest continent?",
      "choice1": "Asia",
      "choice2": "Antarctica",
      "choice3": "Europe",
      "choice4": "North America",
      "answer": 2
    },
    {
      "question": "Which river delta is the world’s largest?",
      "choice1": "Ganges–Brahmaputra",
      "choice2": "Nile",
      "choice3": "Mekong",
      "choice4": "Amazon",
      "answer": 1
    },
    {
      "question": "Which biome covers most of Siberia?",
      "choice1": "Tundra",
      "choice2": "Taiga (Boreal forest)",
      "choice3": "Grassland",
      "choice4": "Desert",
      "answer": 2
    },
    {
      "question": "Which sea has no coastline?",
      "choice1": "Baltic Sea",
      "choice2": "Caspian Sea",
      "choice3": "Dead Sea",
      "choice4": "Red Sea",
      "answer": 2
    },
    {
      "question": "Which Indian river is called the ‘Sorrow of Bihar’?",
      "choice1": "Ganges",
      "choice2": "Kosi",
      "choice3": "Brahmaputra",
      "choice4": "Yamuna",
      "answer": 2
    },
    {
      "question": "Which plateau is known as the 'Roof of the World'?",
      "choice1": "Deccan",
      "choice2": "Tibet",
      "choice3": "Malwa",
      "choice4": "Iranian",
      "answer": 2
    },
    {
      "question": "Which gulf lies between Saudi Arabia and Iran?",
      "choice1": "Gulf of Oman",
      "choice2": "Persian Gulf",
      "choice3": "Red Sea",
      "choice4": "Arabian Sea",
      "answer": 2
    },
    {
      "question": "Which mountain is highest when measured from base to peak?",
      "choice1": "Everest",
      "choice2": "K2",
      "choice3": "Mauna Kea",
      "choice4": "Kangchenjunga",
      "answer": 3
    },
    {
      "question": "Which country is entirely within the Alps?",
      "choice1": "Austria",
      "choice2": "Switzerland",
      "choice3": "Liechtenstein",
      "choice4": "Slovenia",
      "answer": 3
    },
    {
      "question": "Which ocean current moderates Western Europe’s climate?",
      "choice1": "Gulf Stream",
      "choice2": "California Current",
      "choice3": "Kuroshio Current",
      "choice4": "Benguela Current",
      "answer": 1
    },
    {
      "question": "Which desert lies in northern China and southern Mongolia?",
      "choice1": "Gobi",
      "choice2": "Taklamakan",
      "choice3": "Karakum",
      "choice4": "Thar",
      "answer": 1
    },
    {
      "question": "Which river is known as the Yellow River?",
      "choice1": "Yangtze",
      "choice2": "Huang He",
      "choice3": "Mekong",
      "choice4": "Salween",
      "answer": 2
    },
    {
      "question": "Which Indian state is completely landlocked (no coastline)?",
      "choice1": "Madhya Pradesh",
      "choice2": "Jharkhand",
      "choice3": "Chhattisgarh",
      "choice4": "All of the above",
      "answer": 4
    },
    {
      "question": "Lake Titicaca is on the border of Peru and:",
      "choice1": "Chile",
      "choice2": "Bolivia",
      "choice3": "Argentina",
      "choice4": "Colombia",
      "answer": 2
    },
    {
      "question": "Which peninsula contains Spain and Portugal?",
      "choice1": "Scandinavian",
      "choice2": "Iberian",
      "choice3": "Balkan",
      "choice4": "Italian",
      "answer": 2
    },
    {
      "question": "Which US state has the most active volcanoes?",
      "choice1": "California",
      "choice2": "Hawaii",
      "choice3": "Alaska",
      "choice4": "Washington",
      "answer": 3
    },
    {
      "question": "Which region is called the Fertile Crescent?",
      "choice1": "Nile Delta",
      "choice2": "Mesopotamia",
      "choice3": "Indus Valley",
      "choice4": "Yellow River Basin",
      "answer": 2
    },
    {
      "question": "Who is known as the 'Father of the Constitution' of India?",
      "choice1": "Jawaharlal Nehru",
      "choice2": "B. R. Ambedkar",
      "choice3": "S. Radhakrishnan",
      "choice4": "Rajendra Prasad",
      "answer": 2
    },
    {
      "question": "When did the Constitution of India come into effect?",
      "choice1": "15 August 1947",
      "choice2": "26 January 1950",
      "choice3": "26 November 1949",
      "choice4": "1 January 1950",
      "answer": 2
    },
    {
      "question": "How many articles are there in the original Constitution of India?",
      "choice1": "395",
      "choice2": "370",
      "choice3": "395 + 8 Schedules",
      "choice4": "395 + 12 Schedules",
      "answer": 1
    },
    {
      "question": "Which part of the Constitution deals with Fundamental Rights?",
      "choice1": "Part III",
      "choice2": "Part IV",
      "choice3": "Part II",
      "choice4": "Part V",
      "answer": 1
    },
    {
      "question": "Which Article abolishes untouchability?",
      "choice1": "Article 15",
      "choice2": "Article 17",
      "choice3": "Article 19",
      "choice4": "Article 16",
      "answer": 2
    },
    {
      "question": "The Directive Principles of State Policy are contained in which Part?",
      "choice1": "Part IV",
      "choice2": "Part III",
      "choice3": "Part V",
      "choice4": "Part VI",
      "answer": 1
    },
    {
      "question": "Who appoints the Chief Election Commissioner of India?",
      "choice1": "President",
      "choice2": "Prime Minister",
      "choice3": "Chief Justice of India",
      "choice4": "Parliament",
      "answer": 1
    },
    {
      "question": "Which Amendment introduced the Goods and Services Tax (GST)?",
      "choice1": "101st Amendment",
      "choice2": "99th Amendment",
      "choice3": "102nd Amendment",
      "choice4": "100th Amendment",
      "answer": 1
    },
    {
      "question": "What is the maximum age of retirement for a Supreme Court judge in India?",
      "choice1": "65 years",
      "choice2": "62 years",
      "choice3": "60 years",
      "choice4": "70 years",
      "answer": 1
    },
    {
      "question": "Which Article grants the Parliament the power to amend the Constitution?",
      "choice1": "Article 368",
      "choice2": "Article 356",
      "choice3": "Article 370",
      "choice4": "Article 31C",
      "answer": 1
    },
    {
      "question": "The concept of 'Basic Structure' of the Constitution was propounded in which case?",
      "choice1": "Kesavananda Bharati",
      "choice2": "Golaknath",
      "choice3": "Minerva Mills",
      "choice4": "Indira Gandhi",
      "answer": 1
    },
    {
      "question": "Which Schedule of the Constitution lists the languages recognized by India?",
      "choice1": "Eighth",
      "choice2": "Sixth",
      "choice3": "Seventh",
      "choice4": "Ninth",
      "answer": 3
    },
    {
      "question": "What does the Preamble to the Constitution declare India to be?",
      "choice1": "Sovereign, Socialist, Secular, Democratic Republic",
      "choice2": "Sovereign, Secular, Socialist, Republic",
      "choice3": "Sovereign, Socialist, Democratic, Republic",
      "choice4": "Sovereign, Secular, Democratic, Republic",
      "answer": 1
    },
    {
      "question": "Who presides over a joint session of the Indian Parliament?",
      "choice1": "President",
      "choice2": "Vice-President",
      "choice3": "Speaker of Lok Sabha",
      "choice4": "Chairman of Rajya Sabha",
      "answer": 3
    },
    {
      "question": "Which Article deals with the citizenship at the commencement of the Constitution?",
      "choice1": "Article 5",
      "choice2": "Article 6",
      "choice3": "Article 7",
      "choice4": "Article 9",
      "answer": 1
    },
    {
      "question": "Which amendment introduced reservation for OBCs in local bodies?",
      "choice1": "73rd Amendment",
      "choice2": "74th Amendment",
      "choice3": "81st Amendment",
      "choice4": "85th Amendment",
      "answer": 1
    },
    {
      "question": "The President of India can promulgate Ordinances under which Article?",
      "choice1": "Article 123",
      "choice2": "Article 213",
      "choice3": "Article 356",
      "choice4": "Article 352",
      "answer": 1
    },
    {
      "question": "Which Article provides for the Emergency provisions?",
      "choice1": "Article 352–360",
      "choice2": "Article 356–360",
      "choice3": "Article 360–366",
      "choice4": "Article 350–355",
      "answer": 1
    },
    {
      "question": "Right to Education is a:",
      "choice1": "Fundamental Right",
      "choice2": "Directive Principle",
      "choice3": "Fundamental Duty",
      "choice4": "Constitutional Right",
      "answer": 1
    },
    {
      "question": "Which amendment removed the Right to Property as a Fundamental Right?",
      "choice1": "44th Amendment",
      "choice2": "42nd Amendment",
      "choice3": "25th Amendment",
      "choice4": "31st Amendment",
      "answer": 1
    },
    {
      "question": "Which body recommends the grant of retirement benefits to judges of the Supreme Court?",
      "choice1": "Supreme Court Collegium",
      "choice2": "President",
      "choice3": "Parliament",
      "choice4": "Law Commission",
      "answer": 1
    },
    {
      "question": "Which Article mandates Uniform Civil Code as a Directive Principle?",
      "choice1": "Article 44",
      "choice2": "Article 45",
      "choice3": "Article 46",
      "choice4": "Article 47",
      "answer": 1
    },
    {
      "question": "Who has the power to dissolve the Lok Sabha?",
      "choice1": "Prime Minister",
      "choice2": "President",
      "choice3": "Speaker",
      "choice4": "Election Commission",
      "answer": 2
    },
    {
      "question": "Which Article safeguards freedom of trade, commerce, and intercourse?",
      "choice1": "Article 301",
      "choice2": "Article 302",
      "choice3": "Article 303",
      "choice4": "Article 304",
      "answer": 1
    },
    {
      "question": "The Panchayati Raj system was constitutionalized by which amendment?",
      "choice1": "73rd Amendment",
      "choice2": "74th Amendment",
      "choice3": "42nd Amendment",
      "choice4": "44th Amendment",
      "answer": 1
    },
    {
      "question": "Which Article provides for the formation of Finance Commission?",
      "choice1": "Article 280",
      "choice2": "Article 275",
      "choice3": "Article 284",
      "choice4": "Article 285",
      "answer": 1
    },
    {
      "question": "The Emergency declared in 1975 was under which Article?",
      "choice1": "Article 352",
      "choice2": "Article 356",
      "choice3": "Article 360",
      "choice4": "Article 370",
      "answer": 1
    },
    {
      "question": "Which is the highest law of the land in India?",
      "choice1": "Parliament Acts",
      "choice2": "Judicial Precedents",
      "choice3": "Constitution of India",
      "choice4": "Statutes",
      "answer": 3
    },
    {
      "question": "Which Article allows the Supreme Court to review its own judgments?",
      "choice1": "Article 137",
      "choice2": "Article 136",
      "choice3": "Article 138",
      "choice4": "Article 142",
      "answer": 1
    },
    {
      "question": "Which amendment made Right to Privacy a Fundamental Right?",
      "choice1": "Supreme Court judgment",
      "choice2": "44th Amendment",
      "choice3": "42nd Amendment",
      "choice4": "68th Amendment",
      "answer": 1
    },
    {
      "question": "Which Article provides for Official Language of the Union?",
      "choice1": "Article 343",
      "choice2": "Article 345",
      "choice3": "Article 352",
      "choice4": "Article 351",
      "answer": 1
    },
    {
      "question": "Which law governs Right to Information in India?",
      "choice1": "RTI Act 2005",
      "choice2": "RTI Act 2002",
      "choice3": "RTI Act 2008",
      "choice4": "RTI Act 2010",
      "answer": 1
    },
    {
      "question": "Which amendment introduced anti-defection provisions?",
      "choice1": "52nd Amendment",
      "choice2": "53rd Amendment",
      "choice3": "54th Amendment",
      "choice4": "55th Amendment",
      "answer": 1
    },
    {
      "question": "Which Article ensures protection of cultural and educational rights?",
      "choice1": "Article 29–30",
      "choice2": "Article 26–28",
      "choice3": "Article 31–32",
      "choice4": "Article 33–34",
      "answer": 1
    },
    {
      "question": "Which body oversees the implementation of Official Language policy?",
      "choice1": "Parliamentary Committee on Official Language",
      "choice2": "Language Commission",
      "choice3": "National Translation Mission",
      "choice4": "Ministry of Home Affairs",
      "answer": 1
    },
    {
      "question": "The criminal procedure in India is governed by:",
      "choice1": "IPC",
      "choice2": "CrPC",
      "choice3": "Evidence Act",
      "choice4": "Contracts Act",
      "answer": 2
    },
    {
      "question": "Which Article allows citing fundamental duties?",
      "choice1": "Article 51A",
      "choice2": "Article 52A",
      "choice3": "Article 53A",
      "choice4": "Article 54A",
      "answer": 1
    },
    {
      "question": "Which amendment extended reservation in Lok Sabha for SC/ST for 10 years?",
      "choice1": "95th Amendment",
      "choice2": "77th Amendment",
      "choice3": "80th Amendment",
      "choice4": "94th Amendment",
      "answer": 1
    },
    {
      "question": "Which dance form originates from Tamil Nadu?",
      "choice1": "Kathak",
      "choice2": "Bharatanatyam",
      "choice3": "Odissi",
      "choice4": "Kathakali",
      "answer": 2
    },
    {
      "question": "Who painted the Mona Lisa?",
      "choice1": "Vincent van Gogh",
      "choice2": "Leonardo da Vinci",
      "choice3": "Pablo Picasso",
      "choice4": "Michelangelo",
      "answer": 2
    },
    {
      "question": "Which language are the ancient Vedas written in?",
      "choice1": "Prakrit",
      "choice2": "Sanskrit",
      "choice3": "Pali",
      "choice4": "Tamil",
      "answer": 2
    },
    {
      "question": "What is the traditional musical instrument of Punjab?",
      "choice1": "Sitar",
      "choice2": "Shehnai",
      "choice3": "Dhol",
      "choice4": "Tabla",
      "answer": 3
    },
    {
      "question": "Who authored 'Ramcharitmanas'?",
      "choice1": "Valmiki",
      "choice2": "Tulsidas",
      "choice3": "Kalidasa",
      "choice4": "Kabir",
      "answer": 2
    },
    {
      "question": "Which festival is known as the 'festival of lights'?",
      "choice1": "Holi",
      "choice2": "Diwali",
      "choice3": "Navratri",
      "choice4": "Dussehra",
      "answer": 2
    },
    {
      "question": "What style of architecture is the Taj Mahal?",
      "choice1": "Dravidian",
      "choice2": "Indo-Islamic Mughal",
      "choice3": "Kalinga",
      "choice4": "Nagara",
      "answer": 2
    },
    {
      "question": "Which classical music gharana is known for the Thumri style?",
      "choice1": "Gwalior",
      "choice2": "Patiala",
      "choice3": "Banaras",
      "choice4": "Agra",
      "answer": 3
    },
    {
      "question": "Who sculpted 'David'?",
      "choice1": "Donatello",
      "choice2": "Michelangelo",
      "choice3": "Bernini",
      "choice4": "Rodin",
      "answer": 2
    },
    {
      "question": "Which folk dance originates in Kerala?",
      "choice1": "Garba",
      "choice2": "Kathakali",
      "choice3": "Bihu",
      "choice4": "Bharatanatyam",
      "answer": 2
    },
    {
      "question": "Which epic is attributed to Vyasa?",
      "choice1": "Ramayana",
      "choice2": "Mahabharata",
      "choice3": "Puranas",
      "choice4": "Upanishads",
      "answer": 2
    },
    {
      "question": "The UNESCO heritage site Hampi is in which state?",
      "choice1": "Tamil Nadu",
      "choice2": "Karnataka",
      "choice3": "Andhra Pradesh",
      "choice4": "Kerala",
      "answer": 2
    },
    {
      "question": "What is the subject of Picasso’s painting 'Guernica'?",
      "choice1": "Spanish Civil War",
      "choice2": "World War I",
      "choice3": "World War II",
      "choice4": "French Revolution",
      "answer": 1
    },
    {
      "question": "Which dance-drama form uses elaborate masks in Kerala?",
      "choice1": "Bharatanatyam",
      "choice2": "Kathakali",
      "choice3": "Mohiniyattam",
      "choice4": "Kuchipudi",
      "answer": 2
    },
    {
      "question": "Who wrote 'Gitanjali'?",
      "choice1": "Rabindranath Tagore",
      "choice2": "Sarojini Naidu",
      "choice3": "Bankim Chandra Chatterjee",
      "choice4": "Munshi Premchand",
      "answer": 1
    },
    {
      "question": "What is the primary instrument in Carnatic music?",
      "choice1": "Veena",
      "choice2": "Santoor",
      "choice3": "Harmonium",
      "choice4": "Flute",
      "answer": 1
    },
    {
      "question": "Which Mughal emperor was a noted patron of the arts?",
      "choice1": "Akbar",
      "choice2": "Aurangzeb",
      "choice3": "Shah Jahan",
      "choice4": "Jahanara",
      "answer": 1
    },
    {
      "question": "Which dance form originates from Odisha?",
      "choice1": "Odissi",
      "choice2": "Kathak",
      "choice2": "Kathak",
      "choice3": "Bhangra",
      "choice4": "Manipuri",
      "answer": 1
    },
    {
      "question": "Who composed the Indian national song 'Vande Mataram'?",
      "choice1": "Rabindranath Tagore",
      "choice2": "Bankim Chandra Chatterjee",
      "choice3": "Allama Iqbal",
      "choice4": "Subramania Bharati",
      "answer": 2
    },
    {
      "question": "Which art form uses shadow puppets in Andhra Pradesh?",
      "choice1": "Tholu Bommalata",
      "choice2": "Kathakali",
      "choice3": "Yakshagana",
      "choice4": "Jatra",
      "answer": 1
    },
    {
      "question": "The frescoes at Ajanta Caves belong to which period?",
      "choice1": "Gupta",
      "choice2": "Chalukya",
      "choice3": "Maurya",
      "choice4": "Pallava",
      "answer": 2
    },
    {
      "question": "Which UNESCO site is famous for rock-cut temples in Karnataka?",
      "choice1": "Ellora",
      "choice2": "Hampi",
      "choice3": "Badami",
      "choice4": "Khajuraho",
      "answer": 3
    },
    {
      "question": "Who wrote the play 'Shakuntala'?",
      "choice1": "Kalidasa",
      "choice2": "Bhasa",
      "choice3": "Vishakhadatta",
      "choice4": "Sudraka",
      "answer": 1
    },
    {
      "question": "Which dance style emphasizes storytelling through hand gestures?",
      "choice1": "Bharatanatyam",
      "choice2": "Kuchipudi",
      "choice3": "Kathak",
      "choice4": "Mohiniyattam",
      "answer": 1
    },
    {
      "question": "The Amarnath Yatra cave shrine is dedicated to which deity?",
      "choice1": "Vishnu",
      "choice2": "Shiva",
      "choice3": "Ganesh",
      "choice4": "Durga",
      "answer": 2
    },
    {
      "question": "Who is considered the pioneer of Indian modern art?",
      "choice1": "Raja Ravi Varma",
      "choice2": "Amrita Sher-Gil",
      "choice3": "Jamini Roy",
      "choice4": "Santiniketan artists",
      "answer": 2
    },
    {
      "question": "Which traditional painting style uses natural pigments on cloth in Gujarat?",
      "choice1": "Madhubani",
      "choice2": "Warli",
      "choice3": "Pichwai",
      "choice4": "Pithora",
      "answer": 3
    },
    {
      "question": "The Konark Sun Temple is located in:",
      "choice1": "Bhubaneswar",
      "choice2": "Konark",
      "choice3": "Puri",
      "choice4": "Cuttack",
      "answer": 2
    },
    {
      "question": "Which of these is a tribal dance of Maharashtra?",
      "choice1": "Lavani",
      "choice2": "Gondhal",
      "choice3": "Powada",
      "choice4": "Tamasha",
      "answer": 2
    },
    {
      "question": "Who wrote the Kannada classic 'Ramachandra Panditha'?",
      "choice1": "Kuvempu",
      "choice2": "Bendre",
      "choice3": "B. M. Srikantaiah",
      "choice4": "Shivaram Karanth",
      "answer": 3
    },
    {
      "question": "Which classical dance form is recognized for its sculptural poses?",
      "choice1": "Kathak",
      "choice2": "Bharatanatyam",
      "choice3": "Odissi",
      "choice4": "Kuchipudi",
      "answer": 3
    },
    {
      "question": "The Bhimbetka rock shelters are famous for:",
      "choice1": "Buddhist stupas",
      "choice2": "Prehistoric cave paintings",
      "choice3": "Rock-cut temples",
      "choice4": "Medieval murals",
      "answer": 2
    },
    {
      "question": "Who created the dance style 'Sattriya'?",
      "choice1": "Jagannath Dev",
      "choice2": "Srimanta Sankardev",
      "choice3": "Mahapurusha Srimanta",
      "choice4": "Bhupen Hazarika",
      "answer": 2
    },
    {
      "question": "Which instrument is commonly used in Punjabi folk music?",
      "choice1": "Tabla",
      "choice2": "Tumbi",
      "choice3": "Santoor",
      "choice4": "Veena",
      "answer": 2
    },
    {
      "question": "Which philosopher is known for utilitarianism?",
      "choice1": "Immanuel Kant",
      "choice2": "John Stuart Mill",
      "choice3": "Aristotle",
      "choice4": "Plato",
      "answer": 2
    },
    {
      "question": "What does ‘deontology’ focus on?",
      "choice1": "Consequences of actions",
      "choice2": "Duties and rules",
      "choice3": "Virtue and character",
      "choice4": "Happiness maximization",
      "answer": 2
    },
    {
      "question": "Which is a core value in professional ethics?",
      "choice1": "Integrity",
      "choice2": "Profit",
      "choice3": "Convenience",
      "choice4": "Popularity",
      "answer": 1
    },
    {
      "question": "‘Prima facie duties’ were introduced by:",
      "choice1": "W.D. Ross",
      "choice2": "John Rawls",
      "choice3": "G.E. Moore",
      "choice4": "H.L.A. Hart",
      "answer": 1
    },
    {
      "question": "Which ethicist wrote 'Nicomachean Ethics'?",
      "choice1": "Aristotle",
      "choice2": "Epicurus",
      "choice3": "Socrates",
      "choice4": "Cicero",
      "answer": 1
    },
    {
      "question": "What is ‘virtue ethics’ centered on?",
      "choice1": "Rules",
      "choice2": "Consequences",
      "choice3": "Character traits",
      "choice4": "Utility",
      "answer": 3
    },
    {
      "question": "Which principle means ‘do no harm’?",
      "choice1": "Autonomy",
      "choice2": "Non-maleficence",
      "choice3": "Beneficence",
      "choice4": "Justice",
      "answer": 2
    },
    {
      "question": "Which code guides the conduct of medical professionals?",
      "choice1": "Hippocratic Oath",
      "choice2": "Magna Carta",
      "choice3": "Geneva Convention",
      "choice4": "Nuremberg Code",
      "answer": 1
    },
    {
      "question": "What does ‘conflict of interest’ refer to?",
      "choice1": "Agreement between parties",
      "choice2": "Personal interests interfering with duty",
      "choice3": "Lack of competition",
      "choice4": "Transparent decision-making",
      "answer": 2
    },
    {
      "question": "Which theory emphasizes fair distribution of resources?",
      "choice1": "Libertarianism",
      "choice2": "Rawlsian justice",
      "choice3": "Egoism",
      "choice4": "Utilitarianism",
      "answer": 2
    },
    {
      "question": "In ethics, ‘autonomy’ means:",
      "choice1": "Doing no harm",
      "choice2": "Respecting individual choice",
      "choice3": "Maximizing happiness",
      "choice4": "Following rules",
      "answer": 2
    },
    {
      "question": "Which ethicist developed the ‘categorical imperative’?",
      "choice1": "John Stuart Mill",
      "choice2": "Immanuel Kant",
      "choice3": "David Hume",
      "choice4": "Jeremy Bentham",
      "answer": 2
    },
    {
      "question": "What is ‘ethical relativism’?",
      "choice1": "One universal moral truth",
      "choice2": "Morals depend on culture/context",
      "choice3": "No ethics exist",
      "choice4": "Ethics based on religion",
      "answer": 2
    },
    {
      "question": "Which principle promotes acts that benefit others?",
      "choice1": "Non-maleficence",
      "choice2": "Beneficence",
      "choice3": "Justice",
      "choice4": "Autonomy",
      "answer": 2
    },
    {
      "question": "‘Moral luck’ refers to:",
      "choice1": "Luck in outcomes affecting moral judgment",
      "choice2": "Random moral behavior",
      "choice3": "Good fortune",
      "choice4": "Ethical relativism",
      "answer": 1
    },
    {
      "question": "Which field studies ethical issues in technology?",
      "choice1": "Bioethics",
      "choice2": "Technoethics",
      "choice3": "Legal ethics",
      "choice4": "Environmental ethics",
      "answer": 2
    },
    {
      "question": "What is ‘informed consent’?",
      "choice1": "Agreement without information",
      "choice2": "Voluntary agreement after understanding",
      "choice3": "Legal contract",
      "choice4": "Implicit permission",
      "answer": 2
    },
    {
      "question": "Which ethicist wrote 'A Theory of Justice'?",
      "choice1": "John Rawls",
      "choice2": "Robert Nozick",
      "choice3": "Michael Sandel",
      "choice4": "Alasdair MacIntyre",
      "answer": 1
    },
    {
      "question": "What does ‘corporate social responsibility’ entail?",
      "choice1": "Profit maximization only",
      "choice2": "Ethical business practices benefiting society",
      "choice3": "Avoiding taxes",
      "choice4": "Market competition",
      "answer": 2
    },
    {
      "question": "Which concept criticizes the location of moral blame based on negligence?",
      "choice1": "Duty of care",
      "choice2": "Negligence per se",
      "choice3": "Strict liability",
      "choice4": "Fault principle",
      "answer": 2
    },
    {
      "question": "‘Ethical egoism’ advocates:",
      "choice1": "Altruism",
      "choice2": "Self-interest as moral guide",
      "choice3": "Utilitarian welfare",
      "choice4": "Deontological duty",
      "answer": 2
    },
    {
      "question": "Which form of justice deals with fair processes?",
      "choice1": "Distributive justice",
      "choice2": "Procedural justice",
      "choice3": "Retributive justice",
      "choice4": "Restorative justice",
      "answer": 2
    },
    {
      "question": "Which is an example of ‘whistleblowing’?",
      "choice1": "Reporting unethical practices externally",
      "choice2": "Covering up misconduct",
      "choice3": "Encouraging nepotism",
      "choice4": "Ignoring violations",
      "answer": 1
    },
    {
      "question": "What does ‘social contract theory’ posit?",
      "choice1": "Individuals consent to form societies",
      "choice2": "Morals are divine commands",
      "choice3": "Ethics are relative",
      "choice4": "Utilitarian outcomes matter",
      "answer": 1
    },
    {
      "question": "Which code governs police conduct in India?",
      "choice1": "Police Act 1861",
      "choice2": "Indian Evidence Act",
      "choice3": "Criminal Procedure Code",
      "choice4": "IPC",
      "answer": 1
    },
    {
      "question": "Which is a principal agent problem issue?",
      "choice1": "Aligned incentives",
      "choice2": "Divergent interests between principal and agent",
      "choice3": "Perfect information symmetry",
      "choice4": "Transparent delegation",
      "answer": 2
    },
    {
      "question": "What is ‘double effect’ in ethics?",
      "choice1": "Unintentional harm permissible if good outweighs bad",
      "choice2": "Intentional harm for good",
      "choice3": "Ignoring side effects",
      "choice4": "Equal weight to all outcomes",
      "answer": 1
    },
    {
      "question": "Which principle ensures fairness in allocating scarce resources?",
      "choice1": "First-come, first-served",
      "choice2": "Lotteries or criteria-based allocation",
      "choice3": "Wealth-based allocation",
      "choice4": "Random exploitation",
      "answer": 2
    },
    {
      "question": "Which ethicist argued for ‘capability approach’?",
      "choice1": "Martha Nussbaum",
      "choice2": "John Rawls",
      "choice3": "Amartya Sen",
      "choice4": "W.D. Ross",
      "answer": 3
    },
    {
      "question": "Which is an example of ‘moral hazard’?",
      "choice1": "Taking more risk when insured",
      "choice2": "Saving for future",
      "choice3": "Acting ethically always",
      "choice4": "Avoiding risk",
      "answer": 1
    },
    {
      "question": "What does ‘transparency’ in ethics promote?",
      "choice1": "Hidden agendas",
      "choice2": "Open disclosure of information",
      "choice3": "Selective reporting",
      "choice4": "Secret decision-making",
      "answer": 2
    },
    {
      "question": "Which ancient text outlines Ayurvedic ethical principles?",
      "choice1": "Charaka Samhita",
      "choice2": "Sushruta Samhita",
      "choice3": "Ashtanga Hridaya",
      "choice4": "Bhagavad Gita",
      "answer": 1
    },
    {
      "question": "Which UN declaration outlines basic human rights?",
      "choice1": "Universal Declaration of Human Rights (1948)",
      "choice2": "Geneva Convention",
      "choice3": "Magna Carta",
      "choice4": "Charter of Rights (1978)",
      "answer": 1
    },
    {
      "question": "Which ethical issue arises in AI decision-making?",
      "choice1": "Data bias",
      "choice2": "Energy efficiency",
      "choice3": "Speed",
      "choice4": "Memory usage",
      "answer": 1
    },
    {
      "question": "What is ‘ethical audit’?",
      "choice1": "Review of financial statements",
      "choice2": "Assessment of an organization’s ethics compliance",
      "choice3": "Environmental impact study",
      "choice4": "Legal audit",
      "answer": 2
    },
    {
      "question": "Which principle refers to fair treatment in workforce?",
      "choice1": "Workplace justice",
      "choice2": "Gender bias",
      "choice3": "Ageism",
      "choice4": "Nepotism",
      "answer": 1
    },
    {
      "question": "What is the chemical symbol for water?",
      "choice1": "WO",
      "choice2": "H2O",
      "choice3": "HO2",
      "choice4": "O2H",
      "answer": 2
    },
    {
      "question": "Which planet is known as the Red Planet?",
      "choice1": "Venus",
      "choice2": "Mars",
      "choice3": "Jupiter",
      "choice4": "Saturn",
      "answer": 2
    },
    {
      "question": "What force keeps us grounded on Earth?",
      "choice1": "Magnetism",
      "choice2": "Gravity",
      "choice3": "Friction",
      "choice4": "Electrostatic",
      "answer": 2
    },
    {
      "question": "Which gas is most abundant in Earth’s atmosphere?",
      "choice1": "Oxygen",
      "choice2": "Nitrogen",
      "choice3": "Carbon dioxide",
      "choice4": "Argon",
      "answer": 2
    },
    {
      "question": "What is the basic unit of life?",
      "choice1": "Molecule",
      "choice2": "Atom",
      "choice3": "Cell",
      "choice4": "Tissue",
      "answer": 3
    },
    {
      "question": "What is the speed of light in vacuum (approx)?",
      "choice1": "3 × 10^6 m/s",
      "choice2": "3 × 10^7 m/s",
      "choice3": "3 × 10^8 m/s",
      "choice4": "3 × 10^9 m/s",
      "answer": 3
    },
    {
      "question": "Which element has atomic number 6?",
      "choice1": "Carbon",
      "choice2": "Nitrogen",
      "choice3": "Oxygen",
      "choice4": "Helium",
      "answer": 1
    },
    {
      "question": "What kind of bond involves sharing of electrons?",
      "choice1": "Ionic bond",
      "choice2": "Covalent bond",
      "choice3": "Hydrogen bond",
      "choice4": "Metallic bond",
      "answer": 2
    },
    {
      "question": "What is the powerhouse of the cell?",
      "choice1": "Nucleus",
      "choice2": "Mitochondria",
      "choice3": "Ribosome",
      "choice4": "Chloroplast",
      "answer": 2
    },
    {
      "question": "Which law states that energy cannot be created or destroyed?",
      "choice1": "First law of thermodynamics",
      "choice2": "Second law of thermodynamics",
      "choice3": "Law of conservation of mass",
      "choice4": "Hooke's law",
      "answer": 1
    },
    {
      "question": "What is the pH of pure water at 25°C?",
      "choice1": "0",
      "choice2": "7",
      "choice3": "14",
      "choice4": "1",
      "answer": 2
    },
    {
      "question": "Which vitamin is synthesized in the skin on exposure to sunlight?",
      "choice1": "Vitamin A",
      "choice2": "Vitamin B12",
      "choice3": "Vitamin C",
      "choice4": "Vitamin D",
      "answer": 4
    },
    {
      "question": "What is the main gas found in the bubbles of carbonated drinks?",
      "choice1": "Oxygen",
      "choice2": "Nitrogen",
      "choice3": "Carbon dioxide",
      "choice4": "Hydrogen",
      "answer": 3
    },
    {
      "question": "Which organelle contains digestive enzymes in animal cells?",
      "choice1": "Lysosome",
      "choice2": "Golgi body",
      "choice3": "Endoplasmic reticulum",
      "choice4": "Centrosome",
      "answer": 1
    },
    {
      "question": "What is a group of atoms bonded together called?",
      "choice1": "Element",
      "choice2": "Compound",
      "choice3": "Molecule",
      "choice4": "Ion",
      "answer": 3
    },
    {
      "question": "Which metal is liquid at room temperature?",
      "choice1": "Mercury",
      "choice2": "Iron",
      "choice3": "Gold",
      "choice4": "Lead",
      "answer": 1
    },
    {
      "question": "What phenomenon causes a prism to split white light into colors?",
      "choice1": "Reflection",
      "choice2": "Refraction",
      "choice3": "Diffraction",
      "choice4": "Dispersion",
      "answer": 4
    },
    {
      "question": "Which blood cells help in clotting?",
      "choice1": "Red blood cells",
      "choice2": "White blood cells",
      "choice3": "Platelets",
      "choice4": "Lymphocytes",
      "answer": 3
    },
    {
      "question": "What is the chemical formula of table salt?",
      "choice1": "NaCl",
      "choice2": "KCl",
      "choice3": "Na2CO3",
      "choice4": "CaCl2",
      "answer": 1
    },
    {
      "question": "Which planet has the most extensive ring system?",
      "choice1": "Jupiter",
      "choice2": "Saturn",
      "choice3": "Uranus",
      "choice4": "Neptune",
      "answer": 2
    },
    {
      "question": "What is the main component of natural gas?",
      "choice1": "Ethane",
      "choice2": "Methane",
      "choice3": "Propane",
      "choice4": "Butane",
      "answer": 2
    },
    {
      "question": "Which process do plants use to convert sunlight into chemical energy?",
      "choice1": "Respiration",
      "choice2": "Photosynthesis",
      "choice3": "Transpiration",
      "choice4": "Fermentation",
      "answer": 2
    },
    {
      "question": "What type of radiation has the shortest wavelength?",
      "choice1": "Radio waves",
      "choice2": "Visible light",
      "choice3": "X-rays",
      "choice4": "Gamma rays",
      "answer": 4
    },
    {
      "question": "Which element is used in nuclear reactors as fuel?",
      "choice1": "Uranium",
      "choice2": "Plutonium",
      "choice3": "Thorium",
      "choice4": "Radium",
      "answer": 1
    },
    {
      "question": "What is the SI unit of force?",
      "choice1": "Joule",
      "choice2": "Newton",
      "choice3": "Pascal",
      "choice4": "Watt",
      "answer": 2
    },
    {
      "question": "Which vitamin is essential for blood clotting?",
      "choice1": "Vitamin A",
      "choice2": "Vitamin D",
      "choice3": "Vitamin K",
      "choice4": "Vitamin B1",
      "answer": 3
    },
    {
      "question": "What is the term for water turning into vapor?",
      "choice1": "Condensation",
      "choice2": "Evaporation",
      "choice3": "Transpiration",
      "choice4": "Precipitation",
      "answer": 2
    },
    {
      "question": "Which gas is released during photosynthesis?",
      "choice1": "Nitrogen",
      "choice2": "Carbon dioxide",
      "choice3": "Oxygen",
      "choice4": "Hydrogen",
      "answer": 3
    },
    {
      "question": "What is the hardest natural substance on Earth?",
      "choice1": "Gold",
      "choice2": "Iron",
      "choice3": "Diamond",
      "choice4": "Quartz",
      "answer": 3
    },
    {
      "question": "Which organ system regulates hormones in the body?",
      "choice1": "Nervous system",
      "choice2": "Endocrine system",
      "choice3": "Circulatory system",
      "choice4": "Lymphatic system",
      "answer": 2
    },
    {
      "question": "What is the process of cell division in somatic cells called?",
      "choice1": "Meiosis",
      "choice2": "Mitosis",
      "choice3": "Binary fission",
      "choice4": "Budding",
      "answer": 2
    },
    {
      "question": "Which element is essential for the formation of hemoglobin?",
      "choice1": "Calcium",
      "choice2": "Iron",
      "choice3": "Magnesium",
      "choice4": "Potassium",
      "answer": 2
    },
    {
      "question": "What is the phenomenon of splitting light by wavelength called?",
      "choice1": "Reflection",
      "choice2": "Dispersion",
      "choice3": "Polarization",
      "choice4": "Diffraction",
      "answer": 2
    },
    {
      "question": "Which organ filters waste from the blood?",
      "choice1": "Liver",
      "choice2": "Kidney",
      "choice3": "Lungs",
      "choice4": "Heart",
      "answer": 2
    },
    {
      "question": "What is the chemical symbol for gold?",
      "choice1": "Au",
      "choice2": "Ag",
      "choice3": "Gd",
      "choice4": "Go",
      "answer": 1
    },
    {
      "question": "Which layer of Earth is liquid?",
      "choice1": "Inner core",
      "choice2": "Outer core",
      "choice3": "Mantle",
      "choice4": "Crust",
      "answer": 2
    },
    {
      "question": "Which type of wave requires a medium to travel?",
      "choice1": "Light wave",
      "choice2": "Radio wave",
      "choice3": "Sound wave",
      "choice4": "X-ray",
      "answer": 3
    },
    {
      "question": "What is the unit of electrical resistance?",
      "choice1": "Volt",
      "choice2": "Ohm",
      "choice3": "Ampere",
      "choice4": "Watt",
      "answer": 2
    },
    {
      "question": "Which vitamin is also called ascorbic acid?",
      "choice1": "Vitamin A",
      "choice2": "Vitamin B12",
      "choice3": "Vitamin C",
      "choice4": "Vitamin D",
      "answer": 3
    },
    {
      "question": "What is the main source of energy for the Sun?",
      "choice1": "Chemical reactions",
      "choice2": "Nuclear fusion",
      "choice3": "Gravitational collapse",
      "choice4": "Nuclear fission",
      "answer": 2
    },
    {
      "question": "Which device measures atmospheric pressure?",
      "choice1": "Thermometer",
      "choice2": "Barometer",
      "choice3": "Hygrometer",
      "choice4": "Anemometer",
      "answer": 2
    },
    {
      "question": "What is the term for animals that eat both plants and meat?",
      "choice1": "Herbivores",
      "choice2": "Carnivores",
      "choice3": "Omnivores",
      "choice4": "Detritivores",
      "answer": 3
    },
    {
      "question": "Which phenomenon causes tides on Earth?",
      "choice1": "Solar radiation",
      "choice2": "Moon’s gravitational pull",
      "choice3": "Earth’s rotation",
      "choice4": "Wind patterns",
      "answer": 2
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
