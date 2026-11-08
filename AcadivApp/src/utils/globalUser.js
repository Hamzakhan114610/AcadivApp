let storedUser = null;
let storedUserId = null;

export const setLoggedInUser = (responseObj) => {
  // Backend response chahe direct user ho, ya result.user ho, ya result.data ho - sab handle karega
  const user = responseObj?.user || responseObj?.data || responseObj;
  
  storedUser = user;
  storedUserId = user?._id || user?.id || user?.userId || responseObj?._id || responseObj?.id || null;
  
  console.log("Global User Saved Successfully ID:", storedUserId);
};

export const getLoggedInUser = () => storedUser;

export const getUserId = () => {
  return storedUserId;
};