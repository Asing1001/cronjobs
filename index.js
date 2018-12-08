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

ids.forEach(id => {
    fetch(`https://secure.j-bus.co.jp/hon/BusService/GetBusDivisionFare?GroupCode=190004&RouteCode=0002&WayFlag=%E7%89%87%E9%81%93&MoveCode%5B0%5D=${id}&BusCode%5B0%5D=01&Departure%5B0%5D=2018%2F12%2F30&PlanCode%5B0%5D=00&GetOnBusStopCode%5B0%5D=11&GetOffBusStopCode%5B0%5D=15`)
        .then(res => {
            console.log(res.status)
            if (res.status === 503) {
                return "503 maintenance"
            } else {
                return res.json()
            }
        })
        .then(json => {
            const remainTicket = json[0].remain
            if (remainTicket > 0) {
                console.log('there are tickets', remainTicket)
            } else {
                console.log('remainTicket', remainTicket)
            }
        })
})

