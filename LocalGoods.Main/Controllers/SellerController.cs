using LocalGoods.Main.DAL;
using LocalGoods.Main.Model;
using LocalGoods.Main.Model.BussinessModels;
using LocalGoods.Main.Services;
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

        private LocalGoodsDbContext _dbContext;
        private UserService _customerService;

        public SellerController
            (
            LocalGoodsDbContext _localgoodsdbcontext,
            UserService customerService
            )
        {
            _dbContext = _localgoodsdbcontext;

            _customerService = customerService;

        }
        [HttpGet("GetSellerProducts")]
        public async Task<ActionResult> GetSellerProducts()
        {
            var user = _customerService.CurrentUser();
            var products = await _dbContext.Product.Where(x => x.Seller.Id == user.Id && x.IsAvailable && x.IsPublished).Select(a => a).ToListAsync();
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

            var product = _dbContext.Product.Where(x => x.Id == id && x.Seller.Id == user.Id).Select(y => y).FirstOrDefault();
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
                var category = await _dbContext.ProductCategory.Where(x => x.ProductCategoryName == request.Category).FirstOrDefaultAsync();
                var user = _customerService.CurrentUser();

                if (user == null || user.Address == null)
                {

                    return StatusCode(StatusCodes.Status403Forbidden, new { Message = "Seller is required to have Certification/Address to sell products" });
                }
                if (category == null)
                {
                    category = new ProductCategory
                    {
                        ProductCategoryName = request.Category,

                    };
                    _dbContext.ProductCategory.Add(category);
                    _dbContext.SaveChanges();
                }

                Product product = new Product()
                {
                    Seller = user,
                    ProductTitle = request.Name,
                    ProductCategory = category,
                    ImageLink=request.Photo,
                    Price = request.Price,
                    ShortDescription = request.ShortDesc,
                    LongDescription = request.LongDescription

                };
                var result = await _dbContext.Product.AddAsync(product);
                _dbContext.SaveChanges();
                var products = await _dbContext.Product.Where(x => x.Seller.Id == user.Id && x.IsAvailable && x.IsPublished).Select(a => a).ToListAsync();

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
                var product = _dbContext.Product.Where(x => x.Id == request.ProductId && x.Seller.Id == user.Id).FirstOrDefault();
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
                    var category = await _dbContext.ProductCategory.Where(x => x.ProductCategoryName == request.Category).FirstOrDefaultAsync();
                    if (category == null)
                    {
                        category = new ProductCategory
                        {
                            ProductCategoryName = request.Category,

                        };
                        _dbContext.ProductCategory.Add(category);
                        _dbContext.SaveChanges();
                    }

                      product.ProductCategory = category;  
                }

                product.Price = request.Price;

                _dbContext.Product.Update(product);
                await _dbContext.SaveChangesAsync();
                var products = await _dbContext.Product.Where(x => x.Seller.Id == user.Id && x.IsAvailable && x.IsPublished).Select(a => a).ToListAsync();

                response.Status = true;

                response.Message = "ProductDetails Updated Successfully";
                response.Data = products;

                return Ok(response);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpDelete("DeleteProduct/{id:int}")]
        public async Task<ActionResult<ResponseModel>> DeleteProduct(int? id)
        {
            try
            {
                var user = _customerService.CurrentUser();
                var product = _dbContext.Product.Where(x => x.Id == id && x.Seller.Id == user.Id).FirstOrDefault();
                if (product == null)
                {
                    return NotFound(new ResponseModel { Status = false, Message = "Product Not Found" });
                }
                _dbContext.Product.Remove(product);
                await _dbContext.SaveChangesAsync();
                var products = await _dbContext.Product.Where(x => x.Seller.Id == user.Id && x.IsAvailable && x.IsPublished).Select(a => a).ToListAsync();

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
                        QualityCertificateDeleteLink = request.QualityCertificateLink,
                        TaxNumber = request.TaxNumber,

                    };
                    seller.Certification = certificate;
                    var result = await _dbContext.Certificate.AddAsync(certificate);
                    _dbContext.SaveChanges();

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

    }
}
