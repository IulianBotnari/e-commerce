package com.ecommerce.main.dto.outBoundDTO;

public class CartItemsResponseDto {
    private int productId;
    private String name;
    private String category;
    private String brand;
    private double unitPrice;
    private int quantity;
    private double totalPrice;
    

    public CartItemsResponseDto(){
        
    }

    public CartItemsResponseDto(int productId, String name, String category, String brand, double unitPrice, int quantity,
            double totalPrice) {
        this.productId = productId;
        this.name = name;
        this.category = category;
        this.brand = brand;
        this.unitPrice = unitPrice;
        this.quantity = quantity;
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

    
}
