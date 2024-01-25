// https://platform.openai.com/docs/api-reference/

document.addEventListener("DOMContentLoaded", function () {
    const chatForm = document.getElementById("queryForm");
    const userQueryInput = document.getElementById("userQuery");
    const chatBox = document.getElementById("response");

    chatForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        const userQuery = userQueryInput.value;

        // Append user's message to the chat box
        appendMessage("user","User: " + userQuery + "\n");

        // Send the user's query to GPT-4 and get the response
        const response = await getGPT4Response(userQuery);

        // Append GPT-4's response to the chat box and keep the original formatting
        appendMessage("bot", "GPT-4: " + parseGptResponse(response));  


        // Clear the input field
        userQueryInput.value = "";

        // Scroll to the bottom of the chat box
        chatBox.scrollTop = chatBox.scrollHeight;
    });

    function appendMessage(role, message) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add(role);
        messageDiv.textContent = message;
        chatBox.appendChild(messageDiv);
    }

    async function getGPT4Response(query) {
        // ** make sure the format of the query is correct and is original
        const response = await fetch("http://localhost:3000/api/openai", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: query }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const text = await response.text(); // Get the response text
        if (!text) {
            throw new Error("No JSON response returned from server");
        }

        let data;
        try {
            data = JSON.parse(text); // Safely parse the JSON
        } catch (e) {
            throw new Error("Failed to parse JSON response");
        }

        return data.response;
    }

    // Function to parse and preserve formatting in the GPT-4 response
    function parseGptResponse(response) {
        return response;
    }

});




