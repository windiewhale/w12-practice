const parseJSON = async (url) => {
    const response = await fetch(url);
    return response.json()
}

const userComponent = ({name, surname}) => {
    return `
        <div>
            <h1>${name}</h1>
            <h2>${surname}</h2>
        </div>
    `
} 

function addUserComponent() {
    return `
        <div>
            <input type="text name="firstName" class="firstname" placeholder="First Name">
            <input type="text name="surname" class="surname" placeholder="Surname">
            <button id="btn">Send</button>
        </div>
    `
}

const loadEvent = async () => {

    //window.location a web api része. 
    if (window.location.pathname === '/admin/order-view') {
        console.log("you are at the admin site");
    } else {
        console.log("you are at the customer site");
    }

    const result = await parseJSON("/api/v1/users")
    const rootElement = document.getElementById("root")

    rootElement.insertAdjacentHTML(
        "beforeend", 
        result.map(user => userComponent(user)).join("")
    );
    rootElement.insertAdjacentHTML("afterend", addUserComponent())
    
    const button = document.getElementById("btn")
    const firstName = document.querySelector(".firstname")
    const surname = document.querySelector(".surname")
    
    button.addEventListener("click", () => {
        const newUserData = {
            name: firstName.value,
            surname: surname.value,
            status: "active"
        }

        fetch ("/users/new", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUserData)
        })
        .then(async data => {
            const user = await data.json();

            rootElement.insertAdjacentHTML("beforeend", userComponent(user))
        })    
    })
}

window.addEventListener("load", loadEvent)