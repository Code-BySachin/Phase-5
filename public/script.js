const form = document.getElementById('questionForm');
const questionInput = document.getElementById('questionInput');
const conversation = document.getElementById('conversation');
const submitBtn = document.getElementById('submitBtn');
const btnText = document.getElementById('btnText');
const loader = document.getElementById('loader');

// Handle form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const question = questionInput.value.trim();
    
    if (!question) {
        return;
    }

    // Display user's question
    addMessage(question, 'user');
    
    // Clear input and disable form
    questionInput.value = '';
    setLoading(true);

    try {
        // Send request to backend
        const response = await fetch('/api/ask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ question })
        });

        const data = await response.json();

        if (response.ok) {
            // Display AI's answer
            addMessage(data.answer, 'ai');
        } else {
            // Display error message
            addMessage(data.error || 'Something went wrong. Please try again.', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        addMessage('Failed to connect to the server. Please check if the server is running.', 'error');
    } finally {
        setLoading(false);
        questionInput.focus();
    }
});

// Add message to conversation
function addMessage(text, type) {
    // Remove welcome message on first interaction
    const welcomeMessage = conversation.querySelector('.welcome-message');
    if (welcomeMessage) {
        welcomeMessage.remove();
    }

    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', `${type}-message`);
    
    const icon = document.createElement('div');
    icon.classList.add('message-icon');
    icon.textContent = type === 'user' ? '👤' : type === 'error' ? '⚠️' : '🤖';
    
    const content = document.createElement('div');
    content.classList.add('message-content');
    
    // Format the text (preserve line breaks)
    const formattedText = text.replace(/\n/g, '<br>');
    content.innerHTML = formattedText;
    
    messageDiv.appendChild(icon);
    messageDiv.appendChild(content);
    conversation.appendChild(messageDiv);
    
    // Scroll to bottom
    messageDiv.scrollIntoView({ behavior: 'smooth', block: 'end' });
}

// Set loading state
function setLoading(isLoading) {
    if (isLoading) {
        submitBtn.disabled = true;
        questionInput.disabled = true;
        btnText.classList.add('hidden');
        loader.classList.remove('hidden');
    } else {
        submitBtn.disabled = false;
        questionInput.disabled = false;
        btnText.classList.remove('hidden');
        loader.classList.add('hidden');
    }
}

// Auto-resize textarea
questionInput.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 150) + 'px';
});

// Allow Enter to submit (Shift+Enter for new line)
questionInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        form.dispatchEvent(new Event('submit'));
    }
});
