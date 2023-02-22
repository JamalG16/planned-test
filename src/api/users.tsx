import {User} from "../models/User";

export async function getKids() {
  return mapUserData((await getUsers("kids")).data);
}

export async function getAdults() {
  return mapUserData((await getUsers("adults")).data);
}

export async function getSeniors() {
  const response : [] = await getUsers("seniors");
  return mapUserData(response);
}

function mapUserData(users: any[]) : User[] {
  return users.map(u => new User(u.name.firstName + " " + u.name.lastName, u.age));
}

async function getUsers(userType : string) {
  const options = {
    "method": "GET"
  }
  try{
    const response = await fetch(`http://localhost:8099/users/${userType}`, options);
    return response.json();
  }catch(error) {
    console.log(error);
    throw error;
  }
}
