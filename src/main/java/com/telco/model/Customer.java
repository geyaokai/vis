/**
 * 客户实体类
 * 用于映射数据库中的客户信息
 * 包含客户的所有属性字段
 */
package com.telco.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Customer {
    private String customerId;
    private String gender;
    private int seniorCitizen;
    private String partner;
    private String dependents;
    private int tenure;
    private String phoneService;
    private String multipleLines;
    private String internetService;
    private String onlineSecurity;
    private String onlineBackup;
    private String deviceProtection;
    private String techSupport;
    private String streamingTV;
    private String streamingMovies;
    private String contract;
    private String paperlessBilling;
    private String paymentMethod;
    private double monthlyCharges;
    private double totalCharges;
    private String churn;
} 