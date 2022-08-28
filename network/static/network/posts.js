document.onclick = event => {
    const target = event.target;
    if (target.id === "follow") {
        follows("follow");
    }
    else if (target.id === "unfollow") {
        follows("unfollow");
    }
    else if (target.classList[1] === "bi-heart") {
        postLikes(target, "upvote", target.dataset.post_id);
    }
    else if (target.classList[1] === "bi-heart-fill") {
        postLikes(target, "downvote", target.dataset.post_id);
    }
}

function postLikes(target, action, post_id) {
    const aj = new XMLHttpRequest;

    aj.onreadystatechange = () => {
        if (aj.readyState === 4 && aj.status === 200) {
            if (action === "upvote") {
                target.id = "liked";
                target.classList = "bi bi-heart-fill";
                target.nextElementSibling.innerText++;
            }
            else {
                target.id = "not-liked";
                target.classList = "bi bi-heart";
                target.nextElementSibling.innerText--;
            }
        }
        else if (aj.readyState === 4 && aj.status !== 200) {
            alert("Server couldn't process your request. Please try again later.");
        }
    }

    data = JSON.stringify({
        "action": action
    })

    aj.open("POST", `/post/like/${post_id}`, true);
    aj.setRequestHeader("Data-type", "json");
    aj.setRequestHeader("Content-type", "application/json");
    aj.send(data);
}

function follows(method) {
    const aj = new XMLHttpRequest;
    const btn = document.querySelector(`#${method}`);

    aj.onreadystatechange = () => {
        if (aj.readyState === 4 && aj.status === 200) {
            btn.innerText = method === "follow" ? "Following" : "Follow";
            btn.classList = method === "follow" ? "btn btn-secondary" : "btn btn-primary";
            btn.id = method === "follow" ? "unfollow" : "follow";

            const followersCount = document.querySelector("#followers-count");
            const wording = document.querySelector("#wording");
            if (method === "follow") {
                followersCount.innerText++;
                if (followersCount.innerText == 1) {
                    wording.innerText = " Follower";
                }
                else {
                    wording.innerText = " Followers";
                }
            }
            else {
                followersCount.innerText--;
                if (followersCount.innerText == 1) {
                    wording.innerText = " Follower";
                }
                else {
                    wording.innerText = " Followers";
                }
            }
        }
        else if (aj.readyState === 4 && aj.status !== 200) {
            const error = document.createElement("div");
            error.classList = "alert alert-danger alert-dismissible fade show";
            error.role = "alert";
            const btn = "<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>";
            error.innerHTML = `<strong>Server couldn't process your request. Please try again later!</strong>${btn}`;
            document.querySelector(".row").append(error);
        }
    }

    data = JSON.stringify({
        "data": method === "follow" ? "follow" : "unfollow"
    });

    aj.open("PUT", `/${document.querySelector("#username").innerText}`, true);
    aj.setRequestHeader("Data-type", "json");
    aj.setRequestHeader("Content-type", "application/json");
    aj.send(data);
}