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
import java.util.Collections;
import lombok.extern.slf4j.Slf4j;

@Slf4j
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
    
    // 获取服务关联性数据
    public List<List<Double>> getServiceCorrelation() throws SQLException {
        List<String> services = Arrays.asList(
            "PhoneService", "InternetService", "OnlineSecurity", "OnlineBackup",
            "DeviceProtection", "TechSupport", "StreamingTV", "StreamingMovies"
        );
        
        List<List<Double>> correlation = new ArrayList<>();
        
        for (String service1 : services) {
            List<Double> row = new ArrayList<>();
            for (String service2 : services) {
                String sql = String.format(
                    "SELECT (COUNT(*) * 100.0 / (SELECT COUNT(*) FROM customers)) as correlation " +
                    "FROM customers " +
                    "WHERE %s = 'Yes' AND %s = 'Yes'",
                    service1, service2
                );
                
                try (Connection conn = DBUtil.getConnection();
                     PreparedStatement stmt = conn.prepareStatement(sql);
                     ResultSet rs = stmt.executeQuery()) {
                    
                    if (rs.next()) {
                        row.add(rs.getDouble("correlation"));
                    }
                }
            }
            correlation.add(row);
        }
        return correlation;
    }

    // 获取服务订阅趋势数据
    public Map<String, List<Double>> getServiceTrend() throws SQLException {
        Map<String, List<Double>> trends = new HashMap<>();
        String sql = 
            "SELECT " +
            "CASE " +
                "WHEN tenure <= 6 THEN '0-6' " +
                "WHEN tenure <= 12 THEN '7-12' " +
                "WHEN tenure <= 24 THEN '13-24' " +
                "WHEN tenure <= 36 THEN '25-36' " +
                "WHEN tenure <= 48 THEN '37-48' " +
                "WHEN tenure <= 60 THEN '49-60' " +
                "ELSE '60+' " +
            "END as tenure_group, " +
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
                "WHEN tenure <= 6 THEN '0-6' " +
                "WHEN tenure <= 12 THEN '7-12' " +
                "WHEN tenure <= 24 THEN '13-24' " +
                "WHEN tenure <= 36 THEN '25-36' " +
                "WHEN tenure <= 48 THEN '37-48' " +
                "WHEN tenure <= 60 THEN '49-60' " +
                "ELSE '60+' " +
            "END " +
            "ORDER BY MIN(tenure)";
        
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            
            Map<String, List<Double>> tempData = new HashMap<>();
            List<String> services = Arrays.asList(
                "phone_service", "internet_service", "online_security", "online_backup",
                "device_protection", "tech_support", "streaming_tv", "streaming_movies"
            );
            
            services.forEach(service -> tempData.put(service, new ArrayList<>()));
            
            while (rs.next()) {
                for (String service : services) {
                    tempData.get(service).add(rs.getDouble(service));
                }
            }
            
            // 转换服务名称为中文
            trends.put("电话服务", tempData.get("phone_service"));
            trends.put("互联网", tempData.get("internet_service"));
            trends.put("在线安全", tempData.get("online_security"));
            trends.put("在线备份", tempData.get("online_backup"));
            trends.put("设备保护", tempData.get("device_protection"));
            trends.put("技术支持", tempData.get("tech_support"));
            trends.put("流媒体TV", tempData.get("streaming_tv"));
            trends.put("流媒体电影", tempData.get("streaming_movies"));
        }
        return trends;
    }
    
    // 获取费用散点图数据
    public List<List<Object>> getChargesScatterData() throws SQLException {
        List<List<Object>> scatterData = new ArrayList<>();
        String sql = "SELECT MonthlyCharges, " +
                    "CASE WHEN TotalCharges = '' OR TotalCharges IS NULL THEN 0 " +
                    "ELSE CAST(TotalCharges AS DECIMAL(10,2)) END as TotalCharges, " +
                    "CASE WHEN Churn = 'Yes' THEN 1 ELSE 0 END as is_churn " +
                    "FROM customers " +
                    "WHERE MonthlyCharges IS NOT NULL";
        
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            
            log.info("Starting to fetch charges scatter data");
            
            while (rs.next()) {
                try {
                    double monthlyCharges = rs.getDouble("MonthlyCharges");
                    double totalCharges = rs.getDouble("TotalCharges");
                    boolean isChurn = rs.getBoolean("is_churn");
                    
                    log.debug("Processing row: monthly={}, total={}, churn={}", 
                             monthlyCharges, totalCharges, isChurn);
                    
                    if (!rs.wasNull() && monthlyCharges >= 0 && totalCharges >= 0) {
                        List<Object> point = Arrays.asList(
                            monthlyCharges,
                            totalCharges,
                            isChurn
                        );
                        scatterData.add(point);
                    }
                } catch (SQLException e) {
                    log.error("Error processing row: ", e);
                    continue;
                }
            }
            
            log.info("Finished fetching charges scatter data. Total points: {}", scatterData.size());
        }
        return scatterData;
    }

    // 获取费用箱线图数据
    public Map<String, Object> getChargesBoxplotData() throws SQLException {
        Map<String, Object> result = new HashMap<>();
        List<List<Double>> boxData = new ArrayList<>();
        List<List<Object>> outliers = new ArrayList<>();
        
        String sql = "SELECT Contract, MonthlyCharges " +
                    "FROM customers " +
                    "ORDER BY Contract, MonthlyCharges";
        
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            
            Map<String, List<Double>> contractCharges = new HashMap<>();
            while (rs.next()) {
                String contract = rs.getString("Contract");
                double charge = rs.getDouble("MonthlyCharges");
                contractCharges.computeIfAbsent(contract, k -> new ArrayList<>()).add(charge);
            }
            
            // 计算每种合同类型的箱线图数据
            for (String contract : Arrays.asList("Month-to-month", "One year", "Two year")) {
                List<Double> charges = contractCharges.get(contract);
                if (charges != null && !charges.isEmpty()) {
                    Collections.sort(charges);
                    
                    double q1 = getQuantile(charges, 0.25);
                    double q3 = getQuantile(charges, 0.75);
                    double iqr = q3 - q1;
                    double lowerFence = q1 - 1.5 * iqr;
                    double upperFence = q3 + 1.5 * iqr;
                    
                    // 找出异常值和非异常值
                    List<Double> normalValues = new ArrayList<>();
                    for (Double charge : charges) {
                        if (charge >= lowerFence && charge <= upperFence) {
                            normalValues.add(charge);
                        } else {
                            outliers.add(Arrays.asList(
                                getContractIndex(contract),
                                charge
                            ));
                        }
                    }
                    
                    // 箱线图五个数值点：最小值、Q1、中位数、Q3、最大值
                    boxData.add(Arrays.asList(
                        normalValues.get(0),                    // 最小值
                        q1,                                     // 下四分位
                        getQuantile(normalValues, 0.5),         // 中位数
                        q3,                                     // 上四分位
                        normalValues.get(normalValues.size()-1) // 最大值
                    ));
                }
            }
        }
        
        result.put("boxData", boxData);
        result.put("outliers", outliers);
        return result;
    }

    // 辅助方法：计算分位数
    private double getQuantile(List<Double> data, double quantile) {
        int index = (int) Math.ceil(quantile * data.size()) - 1;
        return data.get(Math.max(0, Math.min(data.size() - 1, index)));
    }

    // 辅助方法：获取合同类型的索引
    private int getContractIndex(String contract) {
        switch (contract) {
            case "Month-to-month": return 0;
            case "One year": return 1;
            case "Two year": return 2;
            default: return -1;
        }
    }

    // 添加更多数据访问方法...
} 