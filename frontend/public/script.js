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

const loadEvent = async () => {

    const result = await parseJSON("/api/v1/users")
    const rootElement = document.getElementById("root")

    rootElement.insertAdjacentHTML(
        "beforeend", 
        result.map(user => userComponent(user)).join("")
    );

}

window.addEventListener("load", loadEvent)