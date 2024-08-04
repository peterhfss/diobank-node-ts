export interface User {
  name: string;
  email: string;
  password: string;
}

const db:User[] = []

export class UserService {

  createUser = (name: string, email: string, password: string) => {
    const user = {
      name,
      email,
      password
    }
    db.push(user);
    console.log(db);
  }

  getAllUsers = () =>{
    return db;
  }

  deleteUser = (email:string) =>{
   const userIndex = db.findIndex(user => user.email == email)
    if(userIndex > -1){
      db.splice(userIndex, 1)
    }
   }
    
  
}