package com.ecommerce.main.dto.outBoundDTO;

public class CartItemsResponseDto {
    private int productId;
    private int cartItemId;
    private int cartId;
    private String productCode;
    private String name;
    private String category;
    private String description;
    private String brand;
    private double unitPrice;
    private int quantity;
    private byte[] image;
    private double totalPrice;
    

    public CartItemsResponseDto(){
        
    }

    public CartItemsResponseDto(int productId, int cartItemId, int cartId, String productCode, String name, String category,String description, String brand, double unitPrice, int quantity, byte[] image,
            double totalPrice) {
        this.productId = productId;
        this.cartItemId = cartItemId;
        this.cartId = cartId;
        this.productCode = productCode;
        this.name = name;
        this.category = category;
        this.description = description;
        this.brand = brand;
        this.unitPrice = unitPrice;
        this.quantity = quantity;
        this.image = image;
        this.totalPrice = totalPrice;
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public String getName() {
        return name;
    }

    public int getCartId() {
        return cartId;
    }

    public void setCartId(int cartId) {
        this.cartId = cartId;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public double getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(double unitPrice) {
        this.unitPrice = unitPrice;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getProductCode() {
        return productCode;
    }

    public void setProductCode(String productCode) {
        this.productCode = productCode;
    }

    public int getCartItemId() {
        return cartItemId;
    }

    public void setCartItemId(int cartItemId) {
        this.cartItemId = cartItemId;
    }

    
}
