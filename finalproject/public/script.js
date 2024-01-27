// https://platform.openai.com/docs/api-reference/
// https://cookbook.openai.com/examples/how_to_build_an_agent_with_the_node_sdk
// https://github.com/openai/openai-node/discussions/217


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
        appendMessage("bot", "GPT-4: " + response + "\n");  


        // Clear the input field
        userQueryInput.value = "";

        // Scroll to the bottom of the chat box
        chatBox.scrollTop = chatBox.scrollHeight;
    });

    // use appendMessage function to append the message to the chat box so it tracks chat history
    // instead of just overwriting the previous message

    function appendMessage(role, message) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add(role);
        messageDiv.innerHTML = message; // Use innerHTML instead of textContent so it can keep the original formatting
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
        //console.log("RESPONSE: " + response)

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const text = await response.text(); // Get the response text
        if (!text) {
            throw new Error("No JSON response returned from server");
        }

        let data;
        try {
            //console.log("TEXT: " + text)  
            data = JSON.parse(text); // Safely parse the JSON
            console.log("DATA: " + data)
        } catch (e) {
            throw new Error("Failed to parse JSON response");
        }

        if (data && data.response) {
            // Replace newlines with <br> for HTML display
            const formattedResponse = data.response.replace(/\n/g, "<br>");
            return formattedResponse;
        } else {
            throw new Error("No valid response in the data");
        }
    }

});




