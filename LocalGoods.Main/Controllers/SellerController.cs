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
            var products = await _dbContext.Product.Where(x => x.Seller.Id == user.Id && x.IsAvailable  && x.IsPublished).Select(a => a).ToListAsync();
            if (products == null)
            {
                return Ok(new ResponseModel { Message = "No products found" });
            }
            foreach (var product in products)
            {
                product.Seller.Password = "";
            }
            return Ok(new ResponseModel
            {
                Status = true,
                Message = "Products found",
                Data = products

            }) ;

        }

        [HttpGet("GetProductById")]
        public async Task<IActionResult> GetProductById(int id)
        {

            var response = new ResponseModel();
            var user= _customerService.CurrentUser();

            var product = _dbContext.Product.Where(x => x.Id == id && x.Seller.Id==user.Id).Select(y => y).FirstOrDefault();
            if (product == null)
            {
                response.Status = false;
                response.Message = "Product not found";
                return StatusCode(StatusCodes.Status404NotFound, response);
            }
            response.Status = true;
            response.Message = "Product found";
            product.Seller.Password = "";
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
                  
                if (user == null ||   user.Address == null)
                {

                    return StatusCode(StatusCodes.Status403Forbidden, new { Message = "Seller is required to have Certification/Address to sell products" });
                }
                if (category == null)
                {
                    return StatusCode(StatusCodes.Status400BadRequest);
                }
                
                    Product product = new Product()
                    {
                        Seller = user,
                        ProductTitle = request.Name,
                        ProductCategory = category,
                        Price = request.Price,
                        ShortDescription = request.ShortDesc,
                        LongDescription = request.LongDescription

                    };
                    var result = await _dbContext.Product.AddAsync(product);
                    _dbContext.SaveChanges();
                    product.Seller.Password = "";

                    response.Status = true;
                    response.Data = product;
                    response.Message = "Product Added Successfully";

                return Ok(response);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPut("EditProdcuct/{id:int}")]
        public async Task<ActionResult<ResponseModel>> EditProduct([FromBody] AddProductModel request, int? product_id)
        {
            try
            {
                ResponseModel response = new ResponseModel();
                var product = _dbContext.Product.Where(x => x.Id == product_id).FirstOrDefault();
                if (product == null)
                {
                    return StatusCode(StatusCodes.Status404NotFound, new { Message = "Product Not Found" });
                }
                else
                {
                    Product newproduct = new Product();
                    if (request.Name != null)
                    {
                        newproduct.ProductTitle = request.Name;
                    }
                    if (request.Category != null)
                    {
                        var category = await _dbContext.ProductCategory.Where(x => x.ProductCategoryName == request.Category).FirstOrDefaultAsync();
                        if (category != null)

                        { newproduct.ProductCategory = category; }
                    }
                    
                        newproduct.Price = request.Price;

                    _dbContext.Product.Update(newproduct);
                    await _dbContext.SaveChangesAsync();

                    response.Status = true;
                    
                    response.Message = "ProductDetails Updated Successfully";

                }

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
                var product = _dbContext.Product.Where(x => x.Id == id).FirstOrDefault();
                if (product == null)
                {
                    return NotFound(new ResponseModel {Status=false, Message = "Product Not Found" });
                }
                _dbContext.Product.Remove(product);
                await _dbContext.SaveChangesAsync();
                return Ok(new { Message = "Product Deleted Successfully.." });
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
               
                if (  seller == null)
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
