/**
 * 数据访问层
 * 负责与数据库的直接交互
 * 包含所有与客户数据相关的SQL查询操作
 */
package com.telco.dao;

import com.telco.model.Customer;
import com.telco.util.DBUtil;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Arrays;

public class TelcoDao {
    // 获取流失分布数据
    public Map<String, Integer> getChurnDistribution() throws SQLException {
        Map<String, Integer> distribution = new HashMap<>();
        String sql = "SELECT Churn, COUNT(*) as count FROM customers GROUP BY Churn";
        
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            
            while (rs.next()) {
                distribution.put(rs.getString("Churn"), rs.getInt("count"));
            }
        }
        return distribution;
    }

    // 获取合同类型流失分析数据
    public Map<String, Map<String, Integer>> getContractChurnAnalysis() throws SQLException {
        Map<String, Map<String, Integer>> analysis = new HashMap<>();
        String sql = "SELECT Contract, Churn, COUNT(*) as count FROM customers GROUP BY Contract, Churn";
        
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            
            while (rs.next()) {
                String contract = rs.getString("Contract");
                String churn = rs.getString("Churn");
                int count = rs.getInt("count");
                
                analysis.computeIfAbsent(contract, k -> new HashMap<>())
                        .put(churn, count);
            }
        }
        return analysis;
    }

    // 获取性别流失分布数据
    public Map<String, Map<String, Integer>> getGenderDistribution() throws SQLException {
        Map<String, Map<String, Integer>> distribution = new HashMap<>();
        String sql = "SELECT gender, Churn, COUNT(*) as count FROM customers GROUP BY gender, Churn";
        
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            
            while (rs.next()) {
                String gender = rs.getString("gender");
                String churn = rs.getString("Churn");
                int count = rs.getInt("count");
                
                distribution.computeIfAbsent(gender.toLowerCase(), k -> new HashMap<>())
                        .put(churn.equals("Yes") ? "churn" : "notChurn", count);
            }
        }
        return distribution;
    }

    // 获取年龄服务使用情况数据
    public Map<String, List<Double>> getAgeServiceUsage() throws SQLException {
        Map<String, List<Double>> usage = new HashMap<>();
        String sql = "SELECT " +
            "CASE " +
                "WHEN SeniorCitizen = 1 THEN 'senior' " +
                "WHEN tenure < 24 THEN 'young' " +
                "ELSE 'middle' " +
            "END as age_group, " +
            "AVG(CASE WHEN PhoneService = 'Yes' THEN 100 ELSE 0 END) as phone_service, " +
            "AVG(CASE WHEN InternetService != 'No' THEN 100 ELSE 0 END) as internet_service, " +
            "AVG(CASE WHEN OnlineSecurity = 'Yes' THEN 100 ELSE 0 END) as online_security, " +
            "AVG(CASE WHEN OnlineBackup = 'Yes' THEN 100 ELSE 0 END) as online_backup, " +
            "AVG(CASE WHEN DeviceProtection = 'Yes' THEN 100 ELSE 0 END) as device_protection, " +
            "AVG(CASE WHEN TechSupport = 'Yes' THEN 100 ELSE 0 END) as tech_support, " +
            "AVG(CASE WHEN StreamingTV = 'Yes' THEN 100 ELSE 0 END) as streaming_tv, " +
            "AVG(CASE WHEN StreamingMovies = 'Yes' THEN 100 ELSE 0 END) as streaming_movies " +
            "FROM customers " +
            "GROUP BY CASE " +
                "WHEN SeniorCitizen = 1 THEN 'senior' " +
                "WHEN tenure < 24 THEN 'young' " +
                "ELSE 'middle' " +
            "END";
        
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            
            while (rs.next()) {
                String ageGroup = rs.getString("age_group");
                List<Double> services = Arrays.asList(
                    rs.getDouble("phone_service"),
                    rs.getDouble("internet_service"),
                    rs.getDouble("online_security"),
                    rs.getDouble("online_backup"),
                    rs.getDouble("device_protection"),
                    rs.getDouble("tech_support"),
                    rs.getDouble("streaming_tv"),
                    rs.getDouble("streaming_movies")
                );
                usage.put(ageGroup, services);
            }
        }
        return usage;
    }
    
    // 添加更多数据访问方法...
} 