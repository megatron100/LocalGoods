using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LocalGoods.Main.Migrations
{
    public partial class clean1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Certificate",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    QualityCertificateTitle = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    QualityCertificateDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TaxNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Certificate", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Seller",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AddressId = table.Column<int>(type: "int", nullable: true),
                    CardDetailId = table.Column<int>(type: "int", nullable: true),
                    Role = table.Column<int>(type: "int", nullable: false),
                    CertificationId = table.Column<int>(type: "int", nullable: true),
                    SellerRating = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Seller", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Seller_Address_AddressId",
                        column: x => x.AddressId,
                        principalTable: "Address",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Seller_CardDetails_CardDetailId",
                        column: x => x.CardDetailId,
                        principalTable: "CardDetails",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Seller_Certificate_CertificationId",
                        column: x => x.CertificationId,
                        principalTable: "Certificate",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Seller_AddressId",
                table: "Seller",
                column: "AddressId");

            migrationBuilder.CreateIndex(
                name: "IX_Seller_CardDetailId",
                table: "Seller",
                column: "CardDetailId");

            migrationBuilder.CreateIndex(
                name: "IX_Seller_CertificationId",
                table: "Seller",
                column: "CertificationId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Seller");

            migrationBuilder.DropTable(
                name: "Certificate");
        }
    }
}
