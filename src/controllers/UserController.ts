import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {

  userService : UserService

  constructor(userService = new UserService()){
    this.userService = userService
  }
  
  createUser = (request: Request, response: Response) =>{
    const user = request.body;
    

    if(!user.email || !user.name){
      return response.status(400).json({ message: 'Bad request! Email and Name are required'})
    }

    this.userService.createUser(user.name, user.email, user.password);
    return response.status(201).json({'message': 'User created'})
  }

  getAllUsers = (request: Request, response: Response) =>{
    const userService = new UserService();

    const users = userService.getAllUsers();

    return response.status(200).json(users)
  }

  deleteUser = (request: Request, response: Response) =>{
    const user = request.body;

    if(!user.email){
      return response.status(400).json({message:  'Bad request! Email is required'})
    }
    this.userService.deleteUser(user.email)
    return response.status(200).json({message: 'User deleted'})
  }

}