const cities = ["Pau", "Toulouse", "Anglet", "Nancy", "Paris", "Pamplemousse"]

for (let i=0; i < cities.length; i++){
    console.log(`city[${i}]:`, cities[i])
}
console.log()

// for .. of: parcours de valeur pour un objet iterable : Array, string, Map, Set (méthode [Symbol.iterator]())
for (let city of cities){
    console.log(city)
}
console.log()

// for .. in: parcours des clés pour tout objet
for (let index in cities){
    console.log(index)
}
console.log()

const it = cities[Symbol.iterator]()
console.log(it.next()) // { value: 'Pau', done: false } => {value: undefined, done: true}
console.log()

const city = {
    name: "Toulouse",
    zipcode: "31000",
    population: 500_000
}

for (let info in city){
    console.log(`${info}: ${city[info]}`)
}
console.log()

// NB: city is not iterable => pas de for ... of  MAIS Object.entries
Object.entries(city)
    .forEach(([info, value]) => console.log(info, value))
console.log()

cities.forEach(city => console.log(city))
console.log()

cities.forEach(function (city) {console.log(city)})
console.log()

cities.map(city => city.toUpperCase())
    .forEach(console.log)
console.log()

const city_u_num_list = cities
    .map(city => city.toUpperCase())
    .filter(city => city.startsWith('P'))
    .map((city, i) => ({ name: city, num: i + 1}))
    // .forEach(console.log)
console.log(city_u_num_list)


const cities2 = [... cities] // copy Array
const letters = [... cities[0], '#', ...cities[1]] // spread string (idem sur Map, Set, ...)

console.log(cities2)
console.log(letters)

const [first, ...others] = cities
console.log('first:', first)
console.log('others:', others)

const triplet = ['Toulouse', '31000', 500_000]
const [cityName, , cityPopulation] = triplet
console.log(`${cityName}, ${cityPopulation}`)

city_u_num_list.forEach(({name, num}) => console.log(`#${num} - ${name}`))
city_u_num_list.forEach(({name: city, num: numero}) => console.log(`#${numero} - ${city}`))

const {name, zipcode, population} = city
const {name: cityName2, zipcode: cityZipcode2, population: cityPopulation2} = city
console.log()

const city_data = [
    {
        name: "Toulouse",
        zipcode: "31000",
        population: 500_000
    },
    {
        name: "Pau",
        zipcode: "64000",
    },
    {
        name: "Anglet",
        population: 20_000
    },
]

city_data.forEach(city => console.log(
    city.name, 
    city.zipcode?.slice(0,2), 
    city.zipcode?.slice(0,2)??"XX")
)
console.log()

city_data.forEach(({name, zipcode: zipcode2 = "00000", population = -1}) => console.log(`${name} (${zipcode2}, ${population})`))


// copie d'un objet avec changement d'1 clé
const city3 = {
    ...city,
    population: city.population + 100
}
console.log(city)
console.log(city3)

// TODO: try Object.groupBy, Object.fromEntries

// reductions
const numbers = [12, 23, 45]
const total = numbers.reduce((accu, n) => accu + n, 0)
console.log(total)
// const totalObject = numbers.reduce((n, accu) => {total: accu.total + n}, {total : 0})
// console.log(totalObject)