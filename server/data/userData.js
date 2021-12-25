const userList = [
    {
        id: 1,
        name: "John",
        username: "john",
        age: 20,
        nationality: "CANADA",
        friends: [
            {
                id: 3,
                name: "Julia",
                username: "julia",
                age: 40,
                nationality: "GERMANY"
            },
            {
                id: 4,
                name: "Mary",
                username: "mary",
                age: 50,
                nationality: "RUSSIA"
            }
        ],
        doneFlights: [1, 2, 3],
    },
    {
        id: 2,
        name: "Mike",
        username: "mike",
        age: 30,
        nationality: "NETHERLANDS"
    },
    {
        id: 3,
        name: "Julia",
        username: "julia",
        age: 40,
        nationality: "GERMANY",
        friends: [
            {
                id: 2,
                name: "Mike",
                username: "mike",
                age: 30,
                nationality: "NETHERLANDS"
            }
        ],
        doneFlights: [1, 4, 5, 6, 8],
    },
    {
        id: 4,
        name: "Mary",
        username: "mary",
        age: 50,
        nationality: "RUSSIA"
    }
]

module.exports = userList;
