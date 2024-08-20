const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

app.use(express.static('public'));

// Function to complete the task with the specific response text
const completeTaskWithText = async (taskId, text) => {
    const payload = {
        variables: {
            decision: {
                value: text,
                type: "String"
            }
        }
    };

    try {
        // Complete the task by sending a POST request to Camunda
        await axios.post(`http://localhost:8080/engine-rest/task/${taskId}/complete`, payload);
    } catch (error) {
        throw new Error('Error completando la tarea: ' + error.message);
    }
};

// Route for accepting the insurance
app.get('/complete-task/accept/:taskId', async (req, res) => {
    const taskId = req.params.taskId;

    try {
        // Complete the task with "aceptar"
        await completeTaskWithText(taskId, "Si");

        // Serve the HTML file for accepting the insurance
        res.sendFile(path.join(__dirname, '/public/accept.html'));
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Route for rejecting the insurance
app.get('/complete-task/reject/:taskId', async (req, res) => {
    const taskId = req.params.taskId;

    try {
        // Complete the task with "rechazar"
        await completeTaskWithText(taskId, "No");

        // Serve the HTML file for rejecting the insurance
        res.sendFile(path.join(__dirname, '/public/reject.html'));
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Route for requesting changes
app.get('/complete-task/request-changes/:taskId', async (req, res) => {
    const taskId = req.params.taskId;

    try {
        // Complete the task with "quiero cambios"
        await completeTaskWithText(taskId, "Cambio");

        // Serve the HTML file for requesting changes
        res.sendFile(path.join(__dirname, '/public/request-changes.html'));
    } catch (error) {
        res.status(500).send(error.message);
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
