document.addEventListener("DOMContentLoaded", () => {
    const textarea = document.querySelector("textarea");
    const charCount = document.querySelector("#charCount");

    charCount.textContent = `${textarea.value.length} characters`

    textarea.oninput = () => {
        charCount.textContent = `${textarea.value.length} characters`
   }

   document.querySelector("form").onsubmit = event => {
        event.preventDefault();
        const result = document.createElement("div");
        result.role = "alert";
        const btn = "<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>";

        if (textarea.value.length > 0) {
            const aj = new XMLHttpRequest;

            aj.onreadystatechange = () => {
                if (aj.readyState === 4 && aj.status === 200) {
                    result.classList = "alert alert-success alert-dismissible fade show";
                    result.innerHTML = `<strong>Posted successfully!</strong>${btn}`;
                    textarea.value = "";
                    charCount.textContent = "0 characters"
                }
                else if (aj.readyState === 4 && aj.status !== 200) {
                    result.classList = "alert alert-danger alert-dismissible fade show";
                    result.innerHTML = `<strong>Something went wrong!</strong>${btn}`;
                }
            }

            const data = JSON.stringify({
                "post": document.querySelector("textarea").value 
            });

            if (textarea.id === "edit") {
                aj.open("POST", `/post/edit/${textarea.dataset.id}`, true);
                textarea.id = "";
            }
            else {
                aj.open("POST", "/post/new", true);
            }
            aj.setRequestHeader("Data-type", "json");
            aj.setRequestHeader("Content-type", "application/json");
            aj.send(data);
        }
        else {
            result.classList = "alert alert-danger alert-dismissible fade show";
            result.innerHTML = `<strong>Something went wrong!</strong>${btn}`;
            textarea.placeholder = "What's on your mind? (Message must have more than 0 characters)";
        }
        document.querySelector(".container").append(result);
   }
})