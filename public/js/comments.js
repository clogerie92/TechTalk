const leaveAComment = async (event) => {
    event.preventDefault();

    const blogId = document.querySelector(".new-comments").dataset.blogid;
    const commentBody = document.querySelector("#blog-comments").value.trim();

    if (commentBody) {
        // const data = {
        //     blogId, 
        //     comment: commentBody
        // }
        // console.log(data);
        await fetch ("/api/comments", {
            method: "POST",
            body: JSON.stringify({
                blog_id: blogId, 
                comment: commentBody,
            }),
            headers: {
                "content-type": "application/json"
            }
        });
        document.location.reload();
    }
};

document.getElementById("submitBtn").addEventListener("click", leaveAComment);