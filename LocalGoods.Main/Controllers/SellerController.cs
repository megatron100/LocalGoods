using LocalGoods.Main.DAL;
using LocalGoods.Main.Model;
using LocalGoods.Main.Model.BussinessModels;
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
        public LocalGoodsDbContext localgoodsdbcontext;

        public SellerController(LocalGoodsDbContext _localgoodsdbcontext)
        {
            localgoodsdbcontext = _localgoodsdbcontext;
            
        }
        [HttpPost("/")]

        public async Task<ActionResult<ResponseModel>> AddProduct([FromBody] AddProductModel request)
        {
            try 
            {
                ResponseModel response = new ResponseModel();
                var category = localgoodsdbcontext.ProductCategory.Where(x => x.ProductCategoryName == request.Category).FirstOrDefault();
                var email=HttpContext.User.FindFirst(ClaimTypes.Email)?.Value;
                var seller=localgoodsdbcontext.User.Where(x=>x.Email==email).FirstOrDefault();
                
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
                        ShortDescription = request.ShortDesc
                    };
                    var result = await localgoodsdbcontext.Product.AddAsync(product);
                    localgoodsdbcontext.SaveChanges();

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

        [HttpPost("EditProdcuct")]
        public async Task<ActionResult<ResponseModel>> EditProduct([FromBody] AddProductModel request,int? product_id)
        {
            try
            {
                ResponseModel response = new ResponseModel();
                var product=localgoodsdbcontext.Product.Where(x=>x.Id==product_id).FirstOrDefault();
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
                    localgoodsdbcontext.Product.Update(newproduct);
                    await localgoodsdbcontext.SaveChangesAsync();

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

        [HttpDelete("{id:int}")]
        public async Task<ActionResult<ResponseModel>> DeleteProduct( int? id)
        {
            try
            {
                var product = localgoodsdbcontext.Product.Where(x => x.Id == id).FirstOrDefault();
                if(product==null)
                {
                    return NotFound($"Productwith Id = {id} not found");
                }
                localgoodsdbcontext.Product.Remove(product);
                await localgoodsdbcontext.SaveChangesAsync();
                return Ok(new {Message="Product Deleted Successfully.."});
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPost("/AddCertificate")]
        public async Task<ActionResult<ResponseModel>> AddCertificate([FromBody] AddCertificateModel request)
        {
            try
            {
                ResponseModel response = new ResponseModel();
                var email = HttpContext.User.FindFirst(ClaimTypes.Email)?.Value;
                var seller = localgoodsdbcontext.User.Where(x => x.Email == email).FirstOrDefault();
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
                    var result = await localgoodsdbcontext.Certificate.AddAsync(certificate);
                    localgoodsdbcontext.SaveChanges();

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

        [HttpPost("/AddPaymentCard")]
        public async Task<ActionResult<ResponseModel>> AddPaymentCard([FromBody] AddCardModel request)
        {
            try
            {
                ResponseModel response = new ResponseModel();
                var email = HttpContext.User.FindFirst(ClaimTypes.Email)?.Value;
                var seller = localgoodsdbcontext.User.Where(x => x.Email == email).FirstOrDefault();
                if (email == null || seller == null)
                {
                    return StatusCode(StatusCodes.Status400BadRequest);
                }
                else
                {
                    CardDetail card = new CardDetail()
                    {
                        CardProvider = request.CardProvider,
                        Expiry = request.Expiry,
                        CardNumber = request.CardNumber

                    };
                    seller.CardDetail = card;
                    var result = await localgoodsdbcontext.CardDetails.AddAsync(card);
                    localgoodsdbcontext.SaveChanges();

                    response.Status = true;
                    response.Data = card;
                    response.Message = "Card Added Successfully...";

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
