export interface User {
  email: string;
  password: string;
}

const db:User[] = []

export class UserService {

  createUser = (email: string, password: string) => {
    const user = {
      email,
      password
    }
    db.push(user);
    console.log(db);
  }

  getAllUsers = () =>{
    return db;
  }
}