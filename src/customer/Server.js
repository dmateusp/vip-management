let customers = [
    {name: "Daniel Mateus Pires"},
    {name: "Rafael Dias"},
    {name: "Nathalia Pinto"},
    {name: "Damien Peter"},
    {name: "Dario Gonzales"}
]

const Server = {
    insertCustomer : (customer) => {customers.push(customer); return customers},
    getCustomers: () => customers,
    filterCustomers : (criteria) =>
        customers.filter(
                (customer) => {
                    let toShow = false
                    for(let property in customer){
                        toShow = toShow || customer[property].toString().toLowerCase().includes(criteria.toLowerCase())
                    }
                    return toShow
                }
            )
}



export default Server;