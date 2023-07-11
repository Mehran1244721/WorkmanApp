import { createContext, useState } from "react";

export const AuthContext = createContext({
   token: '',
   userId: '',
   skill: '',
   userName: '',
   workerName: '',
   userDetails: null,
   isAuthenticated: false,
   deviceToken: '',
   authenticate: (token) => { },
   setUserIdftn: (userId) => { },
   setSkillHandler: (skill) => { },
   setUserNameFunc: (username) => { },
   setWorkerNameFunc: (name) => { },
   saveUserDetails: (details) => { },
   setDeviceToken: (token) => { },
   logout: () => { },

});


function AuthContextProvider({ children }) {

   const [authToken, setAuthToken] = useState();
   const [userId1, setUserId] = useState();
   const [skill, setSkill] = useState('');
   const [username, setUserName] = useState('');
   const [workername, setWorkerName] = useState('');
   const [userDetails, setUserDetails] = useState(null);
   const [devicetoken, setdevicetoken] = useState('');


   const saveUserDetails = (details) => {
      setUserDetails(details);
   };


   console.log(username);
   console.log('Device Token :  ', devicetoken);


   function authenticate(token) {
      setAuthToken(token);
   }

   function setSkillHandler(skill) {
      setSkill(skill);
   }

   function setUserIdftn(userId) {
      setUserId(userId);
   }

   function logout() {
      setAuthToken(null);
   }

   function setUserNameFunc(username) {
      setUserName(username);
   }

   function setWorkerNameFunc(name) {
      setWorkerName(name);
   }

   // console.log(workername);

   function setDeviceToken(token1) {
      console.log("auth ",token1)
      setdevicetoken(p => token1);
   }
   //console.log(userDetails.name);
   // console.log(deviceToken);
   //  console.log('The Device Token is  : ', devicetoken);
   //  console.log(setDeviceToken);

   const values = {
      token: authToken,
      userId: userId1,
      isAuthenticated: !!authToken,
      userName: username,
      workerName: workername,
      skill: skill,
      userDetails: userDetails,
      deviceToken: devicetoken,
      setDeviceToken: setDeviceToken,
      authenticate: authenticate,
      setUserIdftn: setUserIdftn,
      setSkillHandler: setSkillHandler,
      logout: logout,
      setUserNameFunc: setUserNameFunc,
      setWorkerNameFunc: setWorkerNameFunc,
      saveUserDetails: saveUserDetails,

   }

   return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export default AuthContextProvider;