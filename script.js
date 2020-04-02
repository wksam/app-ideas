const people = [
    { name: "Brogan Horn",       street: "9439 Newcastle Street San Diego",    state: "California",         country: "United States",  telephone: "619-555-0107",   birthday: "24/06/1981" },
    { name: "Alexandre Raymond", street: "887 Bay St. Port Hope",              state: "Ontario",            country: "Canada",         telephone: "905-555-0149",   birthday: "17/09/1983" },
    { name: "Della Ball",        street: "73 N. Marshall Court Miami",         state: "Florida",            country: "United States",  telephone: "305-555-0170",   birthday: "17/03/1980" },
    { name: "Devante Clarke",    street: "28 Queen Street London",             state: "London",             country: "United Kingdom", telephone: "020 7946 0089",  birthday: "14/05/1987" },
    { name: "Rosalie Holden",    street: "894 Marshall Ave. Brooklyn",         state: "New York",           country: "United States",  telephone: "617-555-0154",   birthday: "04/06/1988" },
    { name: "Amaya Buxton",      street: "9796 Shub Farm Drive Oklahoma City", state: "Oklahoma",           country: "United States",  telephone: "405-555-0159",   birthday: "21/10/1975" },
    { name: "Phebe Atkins",      street: "310 N. Cardinal St. Dallas",         state: "Dallas",             country: "United States",  telephone: "214-555-0123",   birthday: "26/03/1982" },
    { name: "Clarence Tapia",    street: "21 Church Road Liverpool",           state: "North West England", country: "United Kingdom", telephone: "0151 9496 0949", birthday: "13/12/1994" },
    { name: "Holli Cabrera",     street: "689 Wellington Ave. Lanaudière-Sud", state: "Quebec",             country: "Canada",         telephone: "438-555-0122",   birthday: "23/01/1997" },
    { name: "Ariadne Sanders",   street: "8271 Taylor Street Duncan",          state: "British Columbia",   country: "Canada",         telephone: "604-555-0186",   birthday: "31/05/1994" },
]

function loadSummary() {
    const summary = document.getElementsByClassName("summary")[0];
    people.forEach(function(person) {
        const node = document.createElement("li");
        const personNameNode = document.createTextNode(person.name);
        node.appendChild(personNameNode);
        summary.appendChild(node);
    });
}

loadSummary();