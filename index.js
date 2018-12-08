const fetch = require('node-fetch')

// const example = [
//     {
//         priceClass: 0,
//         title: "大人料金",
//         price: 1850,
//         fareGender: "both",
//         remain: 0,
//         planName: "通常運賃"
//     },
//     {
//         priceClass: 1,
//         title: "小人料金",
//         price: 930,
//         fareGender: "both",
//         remain: 0,
//         planName: "通常運賃"
//     }
// ]

const ids = ['0004', '0024', '0025', '0026']
ids.map(id => {
    fetch(`https://secure.j-bus.co.jp/hon/BusService/GetBusDivisionFare?GroupCode=190004&RouteCode=0002&WayFlag=%E7%89%87%E9%81%93&MoveCode%5B0%5D=${id}&BusCode%5B0%5D=01&Departure%5B0%5D=2018%2F12%2F30&PlanCode%5B0%5D=00&GetOnBusStopCode%5B0%5D=11&GetOffBusStopCode%5B0%5D=15`)
        .then(res => {
            console.log('Status:', res.status)
            if (res.status === 503) {
                throw Error("503 maintenance")
            } else {
                return res.json()
            }
        })
        .then(json => {
            console.log(JSON.stringify(json))
            const remainTicket = json[0].remain
            if (remainTicket > 0) {
                const message = `${id} has ${remainTicket} ticket`
                notifyLine(message)
                console.log(message)
            }
        }).catch(err => {
            console.error(err)
        })
})

function notifyLine(message) {
    if (message) {
        fetch('https://maker.ifttt.com/trigger/check_bus_ticket/with/key/lxH04WN5F3umyo-llPSK4mOVrHs-wz6JPIsl8Tm5e8y?value1=' + message)
    }
}

