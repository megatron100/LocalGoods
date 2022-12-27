using LocalGoods.Main.Controllers;
using LocalGoods.Main.DAL.Models;
using LocalGoods.Main.DAL.Repository;
using LocalGoods.Main.DAL.UnitOfWork;
using LocalGoods.Main.Services;
using LocalGoods.Main.Services.IServices;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LocalGoods.Tests
{
    [TestClass]
    public class SellerControllerTest
    {
        private Mock<IUnitOfWork> unitOfWorkMock;
        private Mock<IRepository<User>> userRepositoryMock;
        private Mock<IRepository<Product>> productRepositoryMock;
        private Mock<IRepository<ProductCategory>> productCategoryRepositoryMock;
        private Mock<IRepository<ShoppingCartItem>> shoppingCartItemRepositoryMock;

        private Mock<IRepository<Rating>> ratingRepositoryMock;
        public SellerControllerTest()
        {
            unitOfWorkMock = new Mock<IUnitOfWork>();
            userRepositoryMock = new Mock<IRepository<User>>();
            productRepositoryMock = new Mock<IRepository<Product>>();
            productCategoryRepositoryMock = new Mock<IRepository<ProductCategory>>();
            shoppingCartItemRepositoryMock = new Mock<IRepository<ShoppingCartItem>>();
            ratingRepositoryMock = new Mock<IRepository<Rating>>();

        }
        [TestMethod]
 
        public void Test_GetSellerProducts()
        {
            // Arrange
            
            var user = new User
            {
                Id = 1,
                Role = Main.DAL.Helpers.Constants.Role.Seller
            };
            var products = new List<Product>
    {
        new Product { Id = 1, Seller = user, ProductCategory=It.IsAny<ProductCategory>() },
        new Product { Id = 2, Seller = user,  ProductCategory=It.IsAny<ProductCategory>() },
        new Product { Id = 3, Seller = user,  ProductCategory=It.IsAny<ProductCategory>() }
    };
            productRepositoryMock.Setup(x => x.GetAll()).Returns(products);
            unitOfWorkMock.Setup(x => x.ProductRepository).Returns(productRepositoryMock.Object);

            var userServiceMock = new Mock<IUserService>();
            userServiceMock.Setup(x => x.CurrentUser()).Returns(user);

            var controller = new SellerController(userServiceMock.Object, unitOfWorkMock.Object);

            // Act
            var result = controller.GetSellerProducts();

            // Assert
            Assert.IsInstanceOfType(result.Result, typeof(OkObjectResult));
            var okResult = (OkObjectResult)result.Result;

                Assert.IsTrue((bool)okResult.Value.GetType().GetProperty("Status").GetValue(okResult.Value, null));
            Assert.IsNotNull(okResult.Value.GetType().GetProperty("Data").GetValue(okResult.Value, null));

            var data = (List<Product>)okResult.Value.GetType().GetProperty("Data").GetValue(okResult.Value, null);
            Assert.AreEqual(3, data.Count);
         
        }

        [TestMethod]
        public void Test_GetSellerProductsById()
        {
            // Arrange
            var user = new User
            {
                Id = 1,
                Role = Main.DAL.Helpers.Constants.Role.Seller
            };
            var products = new List<Product>
            {
                new Product { Id = 1, Seller = user, ProductCategory=It.IsAny<ProductCategory>() },
                new Product { Id = 2, Seller = user,  ProductCategory=It.IsAny<ProductCategory>() },
                new Product { Id = 3, Seller = user,  ProductCategory=It.IsAny<ProductCategory>() }
            };
            productRepositoryMock.Setup(x => x.GetById(1)).Returns(products[0]);
            unitOfWorkMock.Setup(x => x.ProductRepository).Returns(productRepositoryMock.Object);

            var userServiceMock = new Mock<IUserService>();
            userServiceMock.Setup(x => x.CurrentUser()).Returns(user);

            var controller = new SellerController(userServiceMock.Object, unitOfWorkMock.Object);

            // Act
            var result = controller.GetProductById(1);

            // Assert
            Assert.IsInstanceOfType(result.Result, typeof(OkObjectResult));
            var okResult = (OkObjectResult)result.Result;

            Assert.IsTrue((bool)okResult.Value.GetType().GetProperty("Status").GetValue(okResult.Value, null));
            Assert.IsNotNull(okResult.Value.GetType().GetProperty("Data").GetValue(okResult.Value, null));

            var data = (Product)okResult.Value.GetType().GetProperty("Data").GetValue(okResult.Value, null);
            Assert.AreEqual(1, data.Id);

        }

    }

    }

