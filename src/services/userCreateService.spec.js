const UserCreateService = require('./UserCreateService')
const UserRepositoryInMemory = require('../repositories/UserRepositoryInMemory');
const AppError = require('../utils/AppError');



describe("UserCreateService", () => {
     let userRepositoryInMemory = null; // coloca a variavel aki para poder usar em todos os it
     let userCreateService = null; //tem que botar como let pois vai mudar o valor

     beforeEach(() => { //executa antes de cada
          userRepositoryInMemory = new UserRepositoryInMemory()
          userCreateService = new UserCreateService(userRepositoryInMemory)
      } )

   it("user should be create", async () => {
     const user = {
        name: "user test",
        email: "user3@test.com",
        password: "123"
     };
    
    //   const userRepositoryInMemory = new UserRepositoryInMemory() //aki se não estivesse o beforeEach
    //   const userCreateService = new UserCreateService(userRepositoryInMemory)
    
    
     const userCreated = await userCreateService.execute(user);
     expect(userCreated).toHaveProperty("id");
    
    
    }); 

    it("user not should be create with exists email", async () => {
        const user1 = {
            name: "User Test 1",
            email: "user@test.com",
            password: "123"
        }

        const user2 = {
            name: "User Test 2",
            email: "user@test.com",
            password: "456"
        }

        // const userRepository= new UserRepositoryInMemory()
        // const userCreateService = new UserCreateService(userRepository)
     
        await userCreateService.execute(user1);
        await expect(userCreateService.execute(user2)).rejects.toEqual(new AppError("este e-mail está em uso."));//e joga o erro aki

    })

})




/* example
it("result of them sum of 2 + 2 must be 4 ", () => { //colocar descrição bem detalhada
    const a = 2;
    const b = 2;

    const result = a + b;

    expect(result).toEqual(4); //aki pega o resultado e compara com o esperado
});

*/