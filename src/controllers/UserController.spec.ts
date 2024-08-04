
import { makeMockResponse } from "../__mocks__/mockResponse.mock";
import { UserService } from "../services/UserService";
import { UserController } from "./UserController";
import { Request } from "express";

describe("UserController", () => {
    const mockUserService : Partial<UserService> = {
        createUser: jest.fn(),
        getAllUsers: jest.fn(),
        deleteUser: jest.fn()
    
    }
    const userController = new UserController(mockUserService as UserService);

    it('Should add a new user' , ()=>{
        const mockRequest = {
            body:{
                name: 'Pedro',
                email:'pedro@test.com',
                password: '1234'
            }
        }as Request
        const mockResponse = makeMockResponse();
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({message:'User created'})

    })

    it('Should show an error message when the name is not provided', () =>{
        const mockRequest = {
            body:{
                name: '',
                email:'pedro@test.com',
                password:'1234'
            }
        }as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({message: 'Bad request! Email and Name are required'})
    })


    it('Should show an error message when the email is not provided', () =>{
        const mockRequest = {
            body:{
                name: 'Peter',
                email:'',
                password:'1234'
            }
        }as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({message: 'Bad request! Email and Name are required'})
    })

    it('Should check if the getAllUsers function is being called', () =>{
        const spyGetAllUsers = jest.spyOn(userController, 'getAllUsers')
        const mockRequest = {} as Request
        const mockResponse = makeMockResponse()

        const users = userController.getAllUsers(mockRequest, mockResponse)
    
        expect(spyGetAllUsers).toHaveBeenCalled()
        expect(users).toMatchObject({})

    } )

    it('Should delete an user', () =>{
        const mockRequest = {
            body:{
                name: 'Peter',
                email:'peter@test.com',
                password:'1234'
            }
        }as Request
        const mockResponse = makeMockResponse()
        userController.deleteUser(mockRequest,mockResponse)
        expect(mockResponse.state.status).toBe(200)
        expect(mockResponse.state.json).toMatchObject({message: 'User deleted'})

    } )

    it('Should show an error message when the email is not provided', () =>{
        const mockRequest = {
            body:{
                name: 'Peter',
                email:'',
                password:'1234'
            }
        }as Request
        const mockResponse = makeMockResponse()
        userController.deleteUser(mockRequest,mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({message: 'Bad request! Email is required'})

    } )
})

