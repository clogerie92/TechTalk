const newBlogHandler = async (event) => {
    event.preventDefault();
    const blogTitle = document.querySelector("#blog-title").value.trim();
    const blogBody = document.querySelector("#blog-body").value.trim();

    if(blogTitle && blogBody) {
        const response = await fetch("/api/blogs", {
            method: "POST",
            body: JSON.stringify({blogTitle, blogBody}),
            headers: {"Content-Type": "application/json"}
        });

        if(response.ok) {
            document.location.replace("/dashboard");
        } else {
            alert("Failed to post blog!");
        }
    }
};

const deleteBlog = async (event) => {
    if(event.target.hasAttribute("data-id")) {
        const id = event.target.getAttribute("data-id");
        const response = await fetch(`/api/blogs/${id}`, {
            method: "DELETE"
        });
        if(response.ok) {
            document.location.replace("/dashboard");
        } else {
            alert("Failed to delete blog!");
        }
    }
};

document.querySelector("#submitBtn").addEventListener("click", newBlogHandler);
document.querySelector("#deleteBtn").addEventListener("click", deleteBlog);