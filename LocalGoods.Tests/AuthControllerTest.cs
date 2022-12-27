using LocalGoods.Main.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Moq;
using LocalGoods.Main.DAL.UnitOfWork;
using LocalGoods.Main.DAL.Repository;
using LocalGoods.Main.DAL.Models;
using Microsoft.Extensions.Configuration;
using LocalGoods.Main.Infrastructure.LocalGoods.Main.Infrastructure;
using LocalGoods.Main.Services;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using LocalGoods.Main.DAL.Helpers.Constants;
using LocalGoods.Main.Model.BussinessModels;
using Microsoft.AspNetCore.Mvc;
using LocalGoods.Main.Infrastructure;

namespace LocalGoods.Tests
{
    [TestClass]
    public class AuthControllerTest
    {
        private Mock<IUnitOfWork> unitOfWorkMock;
        private Mock<IRepository<User>> userRepositoryMock;

        public AuthControllerTest()
        {
            unitOfWorkMock = new Mock<IUnitOfWork>();
            userRepositoryMock = new Mock<IRepository<User>>();
        }
        [TestMethod]
        public void Test_Login()
        { 
            var user = new User()
            {

                Email = "test@test.com",
                Password = "test12345",
                Role = Main.DAL.Helpers.Constants.Role.Seller,
                Id = 1,
                Name = "test"

            };
            //hash user password
            user.Password = EncryptPassword.CalculateSHA256(user.Password);

            unitOfWorkMock.Setup(x => x.UserRepository).Returns(userRepositoryMock.Object);
            userRepositoryMock.Setup(x => x.GetAll()  ).Returns( new List<User>() { user}  );
             
            //mock Jwt
            var jwtMock = new Mock<IJwtAuthManager>();
            var JwtResult = new JwtAuthResult
            {
                AccessToken = "Fake-Access-Token",
                RefreshToken =  new RefreshToken
                {
                    TokenString=It.IsAny<string>(),
                    UserEmail=user.Email
                }

            };

            jwtMock.Setup(x => x.GenerateTokens(It.IsAny<string>(), It.IsAny<Claim[]>(), It.IsAny<DateTime>())).Returns(JwtResult);

            var controller = new AuthController(jwtMock.Object, unitOfWorkMock.Object);
            var LoginRequest = new LoginModel
            {
                Email = "test@test.com",
                Password = "test12345"
            };
            var result=  controller.Login(LoginRequest);
            Assert.IsInstanceOfType(result.Result , typeof(OkObjectResult));
          
            var okresult = (OkObjectResult)result.Result;

            Assert.IsTrue((bool)okresult.Value.GetType().GetProperty("Status").GetValue(okresult.Value, null));
            Assert.IsNotNull(okresult.Value.GetType().GetProperty("Data").GetValue(okresult.Value, null));

        }
        [TestMethod]

        public void Test_Registration()
        {
            var user = new User { Email = "test@test.com", Password = "test12345", Role = Main.DAL.Helpers.Constants.Role.Seller, Id = 1, Name = "test" };
            userRepositoryMock.Setup(x => x.GetAll()).Returns(new List<User> { user });
            userRepositoryMock.Setup(x => x.AddAsync(It.IsAny<User>())).ReturnsAsync(user);
            unitOfWorkMock.Setup(x => x.UserRepository).Returns(userRepositoryMock.Object);
            var controller = new AuthController(null,  unitOfWorkMock.Object);
            var registerRequest = new RegistrationModel
            {
                Email = "test2@test.com",
                Name = "test",
                Password = "test12345",
                RePassword = "test12345",
                Role = Main.DAL.Helpers.Constants.Role.Seller
            };
            var result = controller.Register(registerRequest);

            // Assert
            Assert.IsInstanceOfType(result.Result, typeof(OkObjectResult));
            var okResult = (OkObjectResult)result.Result;
            Assert.IsTrue((bool)okResult.Value.GetType().GetProperty("Status").GetValue(okResult.Value, null));

            Assert.IsTrue((bool)okResult.Value.GetType().GetProperty("Status").GetValue(okResult.Value, null));
            Assert.IsNotNull(okResult.Value.GetType().GetProperty("Data").GetValue(okResult.Value, null));

            var data = okResult.Value.GetType().GetProperty("Data").GetValue(okResult.Value, null);
            Assert.AreEqual(registerRequest.Name.ToUpper(), data.GetType().GetProperty("Name").GetValue(data, null));
            Assert.AreEqual("test2@test.com", data.GetType().GetProperty("Email").GetValue(data, null));
            Assert.AreEqual("seller", data.GetType().GetProperty("Role").GetValue(data, null));

        }

    }
}
