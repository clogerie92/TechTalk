const signinFormHandler = async (event) => {
    event.preventDefault();
    const username = document.querySelector("#username-singin").value.trim();
    const password = document.querySelector("#password-singin").value.trim();

    if(username && password) {
        const response = await fetch("/api/users/signin", {
            method: "POST",
            body: JSON.stringify({username, password}),
            headers: {"Content-Type": "application/json"}
        });

        if(response.ok) {
            document.location.replace("/dashboard");
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector("#submitBtn").addEventListener("click", signinFormHandler);