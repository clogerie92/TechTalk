const leaveAComment = async (event) => {
    event.preventDefault();

    const blogId = document.querySelector(".new-comments").dataset.blogid;
    const commentBody = document.querySelector("#blog-comments").value.trim();

    if (commentBody) {
        const data = {
            blogId, 
            comments: commentBody
        }
        console.log(data);
        await fetch ("/api/comments", {
            method: "POST",
            body: JSON.stringify({
                blogId, 
                comments: commentBody,
            }),
            headers: {
                "content-type": "application/json"
            }
        });
        document.location.reload();
    }
};

document.getElementById("submitBtn").addEventListener("click", leaveAComment);