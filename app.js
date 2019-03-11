const tbl = document.getElementById('tbl');
const gender = document.getElementById('gender');
const region = document.getElementById('region');
const amount = document.getElementById('amount');
const btnsend = document.getElementById('btnsend');
const btnsql = document.getElementById('btnsql');
const sqlOutput = document.getElementById('sql');
var personMap = [];

btnsend.addEventListener('click', fetchFromUrl);
btnsql.addEventListener('click', buildSql);

function getGender() {
    return gender.value;
}

function getRegion() {
    return region.value;
}

function getAmount() {
    return amount.value;
}

function buildUrl() {
    var gender = getGender();
    var region = getRegion();
    var amount = getAmount();

    var url = "http://uinames.com/api/?amount=" + amount + "&region=" + region + "&gender=" + gender;
    console.log(url);
    return url;
}

function fetchFromUrl(url) {

    var url = buildUrl();

    fetch(url)

        .then(res => res.json())
        .catch(error => console.error('Error: ', error))
        .then(data => {

            var persons = "";
            var errorMessage = "";

            if (data.error) {
                errorMessage = "You can maximum request 500 persons."
                tblbody.innerHTML = errorMessage;
            } else {
                for (let person of data) {
                    var name = person.name;
                    var surname = person.surname;
                    var gender = person.gender;

                    //Use {} in a push to save as an object!
                    personMap.push({name, surname, gender});

                    persons += "<tr>"
                        + "<td>" + name + "</td>"
                        + "<td>" + surname + "</td>"
                        + "<td>" + gender + "</td>"
                        + "</tr>";
                }
                clearSQL();
                tbl.innerHTML = persons;
                console.log(persons);
                console.log(personMap);
            }
        });

};

function buildSql() {
    var sqlMap = personMap.map(person =>
        `INSERT INTO person (name, surname, gender) VALUES  ('${person.name}', '${person.surname}', '${person.gender});`
    );
    
    insertSQLs = sqlMap.join('\n');

    clearSQL();

    sqlOutput.value = insertSQLs;

    console.log(sqlMap);
}

function clearSQL() {
    sqlOutput.value = "";
}