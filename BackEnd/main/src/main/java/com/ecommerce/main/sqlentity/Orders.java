package com.ecommerce.main.sqlentity;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "orders")
public class Orders {

    private enum OrderStatus {
        PENDING,
        PAID,
        SHIPPED,
        DELIVERED,
        CANCELLED
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    @OneToOne
    @JoinColumn(name = "cart_id", nullable = false)
    private Cart cart;
    private BigDecimal total;
    @Enumerated(EnumType.STRING)
    private OrderStatus status;
    @Column(name = "shipping_address")
    private String shippingAddress;
    @Column(name = "payment_method")
    private String paymentMethod;
    private LocalDateTime createdAt = LocalDateTime.now();

    public Orders(int id, String paymentMethod, String shippingAddress, OrderStatus status, BigDecimal total,
            User user) {
        this.id = id;
        this.paymentMethod = paymentMethod;
        this.shippingAddress = shippingAddress;
        this.status = status;
        this.total = total;
        this.user = user;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public String getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(String shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 71 * hash + this.id;
        hash = 71 * hash + Objects.hashCode(this.user);
        hash = 71 * hash + Objects.hashCode(this.total);
        hash = 71 * hash + Objects.hashCode(this.status);
        hash = 71 * hash + Objects.hashCode(this.shippingAddress);
        hash = 71 * hash + Objects.hashCode(this.paymentMethod);
        hash = 71 * hash + Objects.hashCode(this.createdAt);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Orders other = (Orders) obj;
        if (this.id != other.id) {
            return false;
        }
        if (!Objects.equals(this.shippingAddress, other.shippingAddress)) {
            return false;
        }
        if (!Objects.equals(this.paymentMethod, other.paymentMethod)) {
            return false;
        }
        if (!Objects.equals(this.user, other.user)) {
            return false;
        }
        if (!Objects.equals(this.total, other.total)) {
            return false;
        }
        if (this.status != other.status) {
            return false;
        }
        return Objects.equals(this.createdAt, other.createdAt);
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("Orders{");
        sb.append("id=").append(id);
        sb.append(", user=").append(user);
        sb.append(", total=").append(total);
        sb.append(", status=").append(status);
        sb.append(", shippingAddress=").append(shippingAddress);
        sb.append(", paymentMethod=").append(paymentMethod);
        sb.append(", createdAt=").append(createdAt);
        sb.append('}');
        return sb.toString();
    }

}
