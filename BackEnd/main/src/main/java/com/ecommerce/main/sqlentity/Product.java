package com.ecommerce.main.sqlentity;

import java.util.Arrays;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;

@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String category;
    private String brand;
    private String name;
    private String description;
    private double price;
    @Lob
    @Column(columnDefinition = "MEDIUMBLOB")
    private byte[] image;
    private String productcode;
    private boolean discount;
    private int discountvalue;



    public Product() {

    }

    public Product(int id, String category, String brand, String name, String description, double price, byte[] image,
            String productcode, boolean discount, int discountvalue) {
        this.id = id;
        this.category = category;
        this.brand = brand;
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
        this.productcode = productcode;
        this.discount = discount;
        this.discountvalue = discountvalue;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getProductcode() {
        return productcode;
    }

    public void setProductcode(String productcode) {
        this.productcode = productcode;
    }

    public boolean isDiscount() {
        return discount;
    }

    public void setDiscount(boolean discount) {
        this.discount = discount;
    }

    public int getDiscountvalue() {
        return discountvalue;
    }

    public void setDiscountvalue(int discountvalue) {
        this.discountvalue = discountvalue;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + id;
        result = prime * result + ((category == null) ? 0 : category.hashCode());
        result = prime * result + ((brand == null) ? 0 : brand.hashCode());
        result = prime * result + ((name == null) ? 0 : name.hashCode());
        result = prime * result + ((description == null) ? 0 : description.hashCode());
        long temp;
        temp = Double.doubleToLongBits(price);
        result = prime * result + (int) (temp ^ (temp >>> 32));
        result = prime * result + Arrays.hashCode(image);
        result = prime * result + ((productcode == null) ? 0 : productcode.hashCode());
        result = prime * result + (discount ? 1231 : 1237);
        result = prime * result + discountvalue;
       
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Product other = (Product) obj;
        if (id != other.id)
            return false;
        if (category == null) {
            if (other.category != null)
                return false;
        } else if (!category.equals(other.category))
            return false;
        if (brand == null) {
            if (other.brand != null)
                return false;
        } else if (!brand.equals(other.brand))
            return false;
        if (name == null) {
            if (other.name != null)
                return false;
        } else if (!name.equals(other.name))
            return false;
        if (description == null) {
            if (other.description != null)
                return false;
        } else if (!description.equals(other.description))
            return false;
        if (Double.doubleToLongBits(price) != Double.doubleToLongBits(other.price))
            return false;
        if (!Arrays.equals(image, other.image))
            return false;
        if (productcode == null) {
            if (other.productcode != null)
                return false;
        } else if (!productcode.equals(other.productcode))
            return false;
        if (discount != other.discount)
            return false;
        if (discountvalue != other.discountvalue)
            return false;

        return true;
    }

    @Override
    public String toString() {
        return "Product [id=" + id + ", category=" + category + ", brand=" + brand + ", name=" + name + ", description="
                + description + ", price=" + price + ", image=" + Arrays.toString(image) + ", productcode="
                + productcode + ", discount=" + discount + ", discountvalue=" + discountvalue
                + "]";
    }

}