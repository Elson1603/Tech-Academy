
// ============= Classes & Objects =============
class TaskManager {
    constructor() {
        this.tasks = [];
        this.loadTasks();
    }
    
    addTask(text) {
        if (!text.trim()) return false;
        
        const newTask = {
            id: Date.now(),
            text: text,
            completed: false,
            createdAt: new Date()
        };
        
        this.tasks.push(newTask);
        this.saveTasks();
        return true;
    }
    
    toggleTask(id) {
        this.tasks = this.tasks.map(task => {
            if (task.id === id) {
                return {...task, completed: !task.completed};
            }
            return task;
        });
        this.saveTasks();
    }
    
    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
    }
    
    saveTasks() {
        try {
            localStorage.setItem('studyTasks', JSON.stringify(this.tasks));
        } catch (error) {
            console.error('Error saving tasks:', error);
        }
    }
    
    loadTasks() {
        try {
            const savedTasks = localStorage.getItem('studyTasks');
            if (savedTasks) {
                this.tasks = JSON.parse(savedTasks);
            }
        } catch (error) {
            console.error('Error loading tasks:', error);
        }
    }
}

// Workshop class
class Workshop {
    constructor(title, date, instructor, spots) {
        this.title = title;
        this.date = new Date(date);
        this.instructor = instructor;
        this.spotsAvailable = spots;
    }
    
    formatDate() {
        const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
        return this.date.toLocaleDateString('en-US', options);
    }
    
    getDaysUntil() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const timeDiff = this.date.getTime() - today.getTime();
        return Math.ceil(timeDiff / (1000 * 3600 * 24));
    }
}

// ============= Date & Time Functions =============
const updateCurrentTime = () => {
    try {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        document.getElementById('currentTime').textContent = now.toLocaleString('en-US', options);
    } catch (error) {
        console.error('Error updating time:', error);
    }
};

// Update countdown timer
const updateCountdown = () => {
    try {
        // Next workshop time (example: tomorrow at 2PM)
        const now = new Date();
        const nextWorkshop = new Date();
        nextWorkshop.setDate(now.getDate() + 1);
        nextWorkshop.setHours(14, 0, 0, 0);
        
        const timeLeft = nextWorkshop - now;
        
        if (timeLeft < 0) {
            document.getElementById('countdown').textContent = "Workshop has started!";
            return;
        }
        
        // Calculate time components
        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        // Format with leading zeros
        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');
        
        document.getElementById('countdown').textContent = 
            `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    } catch (error) {
        console.error('Error updating countdown:', error);
    }
};

// ============= Form Validation =============
const enrollmentForm = document.getElementById('enrollmentForm');

enrollmentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;
    
    // Name validation
    const fullName = document.getElementById('fullName').value;
    if (!fullName.trim() || fullName.trim().length < 3) {
        document.getElementById('nameError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('nameError').style.display = 'none';
    }
    
    // Email validation
    const email = document.getElementById('email').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('emailError').style.display = 'none';
    }
    
    // Phone validation
    const phone = document.getElementById('phone').value;
    const phoneRegex = /^[\d\s\-\(\)]{10,15}$/;
    if (!phoneRegex.test(phone)) {
        document.getElementById('phoneError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('phoneError').style.display = 'none';
    }
    
    // Course selection validation
    const courseSelect = document.getElementById('courseSelect').value;
    if (!courseSelect) {
        document.getElementById('courseError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('courseError').style.display = 'none';
    }

    // Start date validation
    const startDate = document.getElementById('startDate').value;
    if (!startDate) {
        document.getElementById('dateError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('dateError').style.display = 'none';
    }

    if (isValid) {
        alert('Form submitted successfully!');
        enrollmentForm.reset();
    }
});

// ============= Workshop Data =============
const workshops = [
    new Workshop('React Workshop', '2025-09-15T14:00:00', 'John Doe', 50),
    new Workshop('Node.js Basics', '2025-09-20T10:00:00', 'Jane Smith', 30),
    new Workshop('Python for Beginners', '2025-09-25T15:00:00', 'Alice Johnson', 40)
];

// Display workshop items
const workshopList = document.getElementById('workshopList');
workshops.forEach(workshop => {
    const item = document.createElement('div');
    item.className = 'workshop-item';
    item.innerHTML = `
        <div>
            <h4 class="workshop-title">${workshop.title}</h4>
            <p class="workshop-date">${workshop.formatDate()}</p>
        </div>
        <div>
            <p>Hosted by ${workshop.instructor}</p>
            <p>Spots available: ${workshop.spotsAvailable}</p>
            <p>${workshop.getDaysUntil()} days left</p>
        </div>
    `;
    workshopList.appendChild(item);
});

// ============= Interactive Demo =============
const colorBox = document.getElementById('colorBox');
colorBox.addEventListener('click', function() {
    colorBox.style.backgroundColor = 'var(--secondary)';
});

colorBox.addEventListener('mouseover', function() {
    colorBox.style.transform = 'scale(1.1)';
});

colorBox.addEventListener('mouseout', function() {
    colorBox.style.transform = 'scale(1)';
});

const textInput = document.getElementById('textInput');
const transformResults = document.getElementById('transformResults');
const transformBtn = document.getElementById('transformBtn');

transformBtn.addEventListener('click', function() {
    const text = textInput.value;
    const transformedText = text.toUpperCase();
    transformResults.innerHTML = `<p>${transformedText}</p>`;
});

// ============= Study Plan Manager =============
const taskManager = new TaskManager();
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const todoList = document.getElementById('todoList');

const renderTasks = () => {
    todoList.innerHTML = '';
    taskManager.tasks.forEach(task => {
        const item = document.createElement('li');
        item.className = 'todo-item';
        item.innerHTML = `
            <span class="todo-text ${task.completed ? 'completed' : ''}">${task.text}</span>
            <div class="todo-actions">
                <button class="complete-btn">${task.completed ? 'Undo' : 'Complete'}</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;
        item.querySelector('.complete-btn').addEventListener('click', () => {
            taskManager.toggleTask(task.id);
            renderTasks();
        });
        item.querySelector('.delete-btn').addEventListener('click', () => {
            taskManager.deleteTask(task.id);
            renderTasks();
        });
        todoList.appendChild(item);
    });
};

addTaskBtn.addEventListener('click', () => {
    const text = taskInput.value;
    if (taskManager.addTask(text)) {
        renderTasks();
        taskInput.value = '';
    } else {
        alert('Please enter a valid task description');
    }
});

renderTasks();

// ============= Event Listeners =============
document.getElementById('loginBtn').addEventListener('click', () => {
    alert('Login feature coming soon!');
});

// ============= Initializations =============
updateCurrentTime();
updateCountdown();
setInterval(updateCurrentTime, 1000);
setInterval(updateCountdown, 1000);