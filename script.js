const people = [
    { id: "a6632875-dcb6-4f47-a55c-8a3109068484", name: "Brogan Horn",       street: "9439 Newcastle Street San Diego",    state: "California",         country: "United States",  telephone: "619-555-0107",   birthday: "24/06/1981" },
    { id: "a3c255cd-aa99-45bf-a1e4-1be565015fec", name: "Alexandre Raymond", street: "887 Bay St. Port Hope",              state: "Ontario",            country: "Canada",         telephone: "905-555-0149",   birthday: "17/09/1983" },
    { id: "8920634b-136c-4f66-b4e5-ceced267db0a", name: "Della Ball",        street: "73 N. Marshall Court Miami",         state: "Florida",            country: "United States",  telephone: "305-555-0170",   birthday: "17/03/1980" },
    { id: "36bdfcf7-17f3-42bc-855f-0dbbc3c02e4c", name: "Devante Clarke",    street: "28 Queen Street London",             state: "London",             country: "United Kingdom", telephone: "020 7946 0089",  birthday: "14/05/1987" },
    { id: "f2454b79-f18c-420c-9937-e8904e7c6612", name: "Rosalie Holden",    street: "894 Marshall Ave. Brooklyn",         state: "New York",           country: "United States",  telephone: "617-555-0154",   birthday: "04/06/1988" },
    { id: "9a270c2d-acd2-4120-b4aa-164c9676afc6", name: "Amaya Buxton",      street: "9796 Shub Farm Drive Oklahoma City", state: "Oklahoma",           country: "United States",  telephone: "405-555-0159",   birthday: "21/10/1975" },
    { id: "9e953824-02e7-4c2a-874f-5586c099fecc", name: "Phebe Atkins",      street: "310 N. Cardinal St. Dallas",         state: "Dallas",             country: "United States",  telephone: "214-555-0123",   birthday: "26/03/1982" },
    { id: "30fa6092-5d0d-4bf8-a943-c77b709b3dca", name: "Clarence Tapia",    street: "21 Church Road Liverpool",           state: "North West England", country: "United Kingdom", telephone: "0151 9496 0949", birthday: "13/12/1994" },
    { id: "394d6182-7e91-45e9-848e-e4eba2255834", name: "Holli Cabrera",     street: "689 Wellington Ave. Lanaudière-Sud", state: "Quebec",             country: "Canada",         telephone: "438-555-0122",   birthday: "23/01/1997" },
    { id: "b8bf9fb3-8dea-4b40-b252-299f59a23423", name: "Ariadne Sanders",   street: "8271 Taylor Street Duncan",          state: "British Columbia",   country: "Canada",         telephone: "604-555-0186",   birthday: "31/05/1994" },
]

function loadSummary() {
    const summary = document.getElementsByClassName("summary")[0];
    people.forEach(function(person, index) {
        const liNode = document.createElement("li");
        liNode.setAttribute("data-index", index);

        const textNode = document.createTextNode(person.name);
        liNode.appendChild(textNode);
        summary.appendChild(liNode);
    });
}
loadSummary();


const elements = document.getElementsByTagName("li");
[...elements].forEach(function(element) {
    element.addEventListener("click", function(e) {
        const index = e.target.getAttribute("data-index");
        const person = people[index];
        const nameField = document.getElementsByClassName("name")[0];
        const streetField = document.getElementsByClassName("street")[0];
        const telephoneField = document.getElementsByClassName("telephone")[0];
        const birthdayField = document.getElementsByClassName("birthday")[0];

        nameField.innerHTML = addStrongTag("Name: ") + person.name;
        streetField.innerHTML = addStrongTag("Address: ") + person.street + ", " + person.state + ", " + person.country;
        telephoneField.innerHTML = addStrongTag("Telephone: ") + person.telephone;
        birthdayField.innerHTML = addStrongTag("Birthday: ") + person.birthday;
    })
})

function addStrongTag(text) {
    return "<strong>" + text + "</strong>"
}