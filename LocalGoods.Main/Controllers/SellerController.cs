using Castle.DynamicProxy.Generators.Emitters.SimpleAST;
using LocalGoods.Main.DAL;
using LocalGoods.Main.Model;
using LocalGoods.Main.Model.BussinessModels;
using LocalGoods.Main.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

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
        [HttpGet("GetProducts")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            var products = _dbContext.Product.Where(x=>x.IsAvailable==true).ToList();
            if (products == null)
            {
                return StatusCode(StatusCodes.Status401Unauthorized, new {Message="Unauthorize Access Login Again To continue"});
            }
            return products;
        }

        [HttpPost("Addproduct")]

        public async Task<ActionResult<ResponseModel>> AddProduct([FromBody] AddProductModel request)
        {
            try 
            {
                ResponseModel response = new ResponseModel();
                var category = _dbContext.ProductCategory.Where(x => x.ProductCategoryName == request.Category).FirstOrDefault();
                var email = _customerService.CurrentUser().Email;
                var seller=_dbContext.User.Where(x=>x.Email==email).FirstOrDefault();
                if(seller.Certification==null)
                {
                   
                    return StatusCode(StatusCodes.Status403Forbidden, new { Message = "Seller is required to have Certification to sell products" });
                }
                if (category == null || seller==null|| email==null)
                {
                    return StatusCode(StatusCodes.Status400BadRequest);
                }
                else
                {
                    Product product = new Product()
                    {
                        User =seller,
                        CreatedDate = DateTime.UtcNow,
                        ProductTitle = request.Name,
                        ProductCategory = category,
                        Price = request.Price,
                        ShortDescription = request.ShortDesc,
                        
                    };
                    var result = await _dbContext.Product.AddAsync(product);
                    _dbContext.SaveChanges();

                    response.Status = true;
                    response.Data = product;
                    response.Message = "Product Added Successfully";

                }

                return Ok(response);
            }
            catch(Exception)
            {
                return BadRequest();
            }
        }

        [HttpPost("EditProdcuct/{id:int}")]
        public async Task<ActionResult<ResponseModel>> EditProduct([FromBody] AddProductModel request,int? product_id)
        {
            try
            {
                ResponseModel response = new ResponseModel();
                var product=_dbContext.Product.Where(x=>x.Id==product_id).FirstOrDefault();
                if (product == null)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, new {Message= "Product Not Found" });
                }
                else
                {
                    Product newproduct = new Product()
                    {
                        CreatedDate = DateTime.UtcNow,
                        ProductTitle = request.Name,
                        Price = request.Price,
                        ShortDescription = request.ShortDesc
                    };
                    _dbContext.Product.Update(newproduct);
                    await _dbContext.SaveChangesAsync();

                    response.Status = true;
                    response.Data = product;
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
        public async Task<ActionResult<ResponseModel>> DeleteProduct( int? id)
        {
            try
            {
                var product = _dbContext.Product.Where(x => x.Id == id).FirstOrDefault();
                if(product==null)
                {
                    return NotFound($"Productwith Id = {id} not found");
                }
                _dbContext.Product.Remove(product);
                await _dbContext.SaveChangesAsync();
                return Ok(new {Message="Product Deleted Successfully.."});
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
                var email = _customerService.CurrentUser().Email;
                var seller = _dbContext.User.Where(x => x.Email == email).FirstOrDefault();
                if (email==null || seller==null)
                {
                    return StatusCode(StatusCodes.Status400BadRequest);
                }
                else
                {
                    Certificate certificate = new Certificate()
                    {
                       QualityCertificateTitle=request.QualityCertificateTitle,
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
