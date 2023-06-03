import { ACCEPT_REQUEST , DRIVER_LOCATION } from "./constants";


export function accept_request(item) {
    
// console.log("reducer",marge);
    return { 
        type:ACCEPT_REQUEST,
        data:item 
    }
}

export function drive_location(driverLocation) {
console.log("driverLocationddsdd",driverLocation);
    
    return { 
        type :DRIVER_LOCATION,
        data:driverLocation
    }

}