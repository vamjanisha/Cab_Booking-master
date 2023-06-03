import {ACCEPT_REQUEST, DRIVER_LOCATION} from './constants';

const initialstate = {
  endLatitude: '',
  endLongitude: '',
  startLatitude: '',
  startLongitude: '',
  // driverLocation:'',
};

const initialstateDrive = {
  coords: '',
};

export const reducer = (state = initialstate, action) => {
  switch (action.type) {
    case ACCEPT_REQUEST:
      return {
        ...state,
        endLatitude: action.data.endLatitude,
        endLongitude: action.data.endLongitude,
        startLatitude: action.data.startLatitude,
        startLongitude: action.data.startLongitude,
        // driverLocation: action.data.driverLocation,
      };
    default:
      return state;
  }
};

export const reducerDrive = (state = initialstateDrive, action) => {

  console.log('====================================');
  console.log(initialstateDrive);
  console.log('====================================');
  switch (action.type) {
    case DRIVER_LOCATION:
      return {
        coords: action.data.coords,
      };
    default:
      return state;
  }
};
