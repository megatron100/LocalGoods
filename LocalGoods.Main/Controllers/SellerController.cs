using LocalGoods.Main.DAL;
using LocalGoods.Main.DAL.Models;
using LocalGoods.Main.DAL.UnitOfWork;
using LocalGoods.Main.Model.BussinessModels;
using LocalGoods.Main.Services;
using LocalGoods.Main.Services.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace LocalGoods.Main.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "seller")]
    public class SellerController : ControllerBase
    {

        private IUserService _customerService;
        private IUnitOfWork _unitOfWork;

        public SellerController
            (

            IUserService customerService,
            IUnitOfWork unitOfWork

            )
        {

            _unitOfWork = unitOfWork;
            _customerService = customerService;

        }
        [HttpGet("GetSellerProducts")]
        public async Task<ActionResult> GetSellerProducts()
        {
            var user = _customerService.CurrentUser();
            var products = _unitOfWork.ProductRepository.GetAll().Where(x => x.Seller.Id == user.Id).ToList();
            if (products == null)
            {
                return Ok(new ResponseModel { Message = "No products found" });
            }

            return Ok(new ResponseModel
            {
                Status = true,
                Message = "Products found",
                Data = products

            });

        }

        [HttpGet("GetProductById/{id:int}")]
        public async Task<IActionResult> GetProductById(int id)
        {

            var response = new ResponseModel();
            var user = _customerService.CurrentUser();

            var product = _unitOfWork.ProductRepository.GetById(id);
            product = product.Seller.Id == user.Id ? product : null;
            if (product == null)
            {
                response.Status = false;
                response.Message = "Product not found";
                return StatusCode(StatusCodes.Status404NotFound, response);
            }
            response.Status = true;
            response.Message = "Product found";

            response.Data = product;
            return Ok(response);
        }

        [HttpPost("AddProduct")]

        public async Task<ActionResult<ResponseModel>> AddProduct([FromBody] AddProductModel request)
        {
            try
            {
                ResponseModel response = new ResponseModel();
                var category = _unitOfWork.ProductCategoryRepository.GetAll().Where(x => x.ProductCategoryName == request.Category).FirstOrDefault();
                var user = _customerService.CurrentUser();

                if (user == null || user.Address == null || user.Certification == null)
                {

                    return StatusCode(StatusCodes.Status403Forbidden, new { Message = "Seller is required to have Certification/Address to sell products" });
                }
                if (category == null)
                {
                    category = new ProductCategory
                    {
                        ProductCategoryName = request.Category,

                    };
                    _unitOfWork.ProductCategoryRepository.Add(category);
                    await _unitOfWork.SaveAsync();
                }

                if (string.IsNullOrEmpty(request.Photo))
                {
                    request.Photo = "https://localgoodsstorage.blob.core.windows.net/productimage/a6644208-ef20-4034-8f99-a03a9b614080.jpg";
                }
                Product product = new Product()
                {
                    Seller = user,
                    ProductTitle = request.Name,
                    ProductCategory = category,
                    ImageLink = request.Photo,
                    Price = request.Price,
                    ShortDescription = request.ShortDesc,
                    LongDescription = request.LongDescription

                };
                var result = await _unitOfWork.ProductRepository.AddAsync(product);
                _unitOfWork.Save();
                var products = _unitOfWork.ProductRepository.GetAll().Where(x => x.Seller.Id == user.Id && x.IsAvailable && x.IsPublished).Select(a => a).ToList();

                response.Status = true;
                response.Data = products;
                response.Message = "Product Added Successfully";

                return Ok(response);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPut("EditProduct")]
        public async Task<ActionResult<ResponseModel>> EditProduct([FromBody] EditProductRequest request)
        {
            try
            {
                ResponseModel response = new ResponseModel();
                var user = _customerService.CurrentUser();
                var product = _unitOfWork.ProductRepository.GetAll().Where(x => x.Id == request.ProductId && x.Seller.Id == user.Id).FirstOrDefault();
                if (product == null)
                {
                    return StatusCode(StatusCodes.Status404NotFound, new { Message = "Product Not Found" });
                }

                if (request.Name != null)
                {
                    product.ProductTitle = request.Name;
                }
                if (request.Category != null)
                {
                    var category = _unitOfWork.ProductCategoryRepository.GetAllAsync().Result.Where(x => x.ProductCategoryName == request.Category).FirstOrDefault();
                    if (category == null)
                    {
                        category = new ProductCategory
                        {
                            ProductCategoryName = request.Category,

                        };
                        _unitOfWork.ProductCategoryRepository.Add(category);
                        _unitOfWork.Save();
                    }

                    product.ProductCategory = category;
                }

                product.Price = request.Price;
                if (!string.IsNullOrEmpty(request.ShortDesc))

                { product.ShortDescription = request.ShortDesc; }
                if (!string.IsNullOrEmpty(request.LongDescription))
                {
                    product.LongDescription = request.LongDescription;

                }
                if (!string.IsNullOrEmpty(request.Photo))

                { product.ImageLink = request.Photo; }

                _unitOfWork.ProductRepository.Update(product);
                await _unitOfWork.SaveAsync();
                var products = _unitOfWork.ProductRepository.GetAll().Where(x => x.Seller.Id == user.Id && x.IsAvailable && x.IsPublished).Select(a => a).ToList();

                response.Status = true;

                response.Message = "ProductDetails Updated Successfully";
                response.Data = products;

                return Ok(response);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpDelete("DeleteProduct/{id:int}")]
        public async Task<ActionResult<ResponseModel>> DeleteProduct(int? id)
        {
            try
            {
                var user = _customerService.CurrentUser();
                var product = _unitOfWork.ProductRepository.GetAll().Where(x => x.Id == id && x.Seller.Id == user.Id).FirstOrDefault();
                if (product == null)
                {
                    return NotFound(new ResponseModel { Status = false, Message = "Product Not Found" });
                }
                _unitOfWork.ProductRepository.Delete(product);
                await _unitOfWork.SaveAsync();
                var products = _unitOfWork.ProductRepository.GetAll().Where(x => x.Seller.Id == user.Id && x.IsAvailable && x.IsPublished).Select(a => a).ToList();

                return Ok(new ResponseModel
                {
                    Status = true,
                    Message = "Product Deleted Success",
                    Data = products
                });
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPost("AddCertificate")]
        public async Task<ActionResult<ResponseModel>> AddCertificate([FromBody] AddCertificateModel request)
        {
            try
            {
                ResponseModel response = new ResponseModel();
                var seller = _customerService.CurrentUser();

                if (seller == null)
                {
                    return StatusCode(StatusCodes.Status400BadRequest);
                }
                else
                {
                    Certificate certificate = new Certificate()
                    {
                        QualityCertificateTitle = request.QualityCertificateTitle,
                        QualityCertificateDescription = request.QualityCertificateDescription,
                        QualityCertificateLink = request.QualityCertificateLink,
                        QualityCertificateDeleteLink = "",
                        TaxNumber = request.TaxNumber,

                    };
                    seller.Certification = certificate;
                    var result = await _unitOfWork.CertificateRepository.AddAsync(certificate);
                    await _unitOfWork.SaveAsync();

                    response.Status = true;
                    response.Data = certificate;
                    response.Message = "Certificate Added Successfully...";

                }

                return Ok(response);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
        [HttpGet("GetPendingOrders")]
        public async Task<ActionResult> GetOrdersToConfirmorReject()
        {
            var user = _customerService.CurrentUser();
            var allorders = _unitOfWork.OrderRepository.GetAll();
            List<Order> orders = new List<Order>();
            var filterorders = new List<Order>();
            foreach (var o in allorders)
            {
                if (o.OrderStatus == OrderStatus.Pending)
                {
                    var product = _customerService.GetProductById(o.OrderItem.Id);
                    var s_id = product.Seller.Id;
                    if (s_id == user.Id)
                    {
                        filterorders.Add(o);
                    }
                }
            }
            if (filterorders.Count == 0)
            {
                return Ok(new
                {
                    Message = "No Orders to Confirm",
                    Status = true,
                    Data = filterorders
                });
            }
            return Ok(new
            {
                Message = "Orders are successfully Fetched...",
                Status = true,
                Data = filterorders
            });
        }

        [HttpGet("Decline/{id:int}")]
        public async Task<ActionResult> DeclineOrder(int id)
        {
            try
            {

                var seller = _customerService.CurrentUser();

                var order = _unitOfWork.OrderRepository.GetAll().Where(x => x.Id == id).FirstOrDefault();
                if (order == null)
                {
                    return BadRequest();
                }

                order.OrderStatus = OrderStatus.Refused;

                _unitOfWork.OrderRepository.Update(order);
                await _unitOfWork.SaveAsync();
                return Ok(new
                {
                    Message = "Order has been Refused",
                    status = true
                });

            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
        [HttpGet("deliver/{id:int}")]

        public async Task<ActionResult> Deliver(int id)
        {
            try
            {

                var seller = _customerService.CurrentUser();
                //get orders in async way from order repository

                var order = _unitOfWork.OrderRepository.GetAll().Where(x => x.Id == id).FirstOrDefault();
                if (order == null)
                {
                    return BadRequest();
                }

                order.OrderStatus = OrderStatus.Confirmed;

                _unitOfWork.OrderRepository.Update(order);
                await _unitOfWork.SaveAsync();
                return Ok(new
                {
                    Message = "Order has been Confirmed",
                    status = true
                });

            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

    }
}