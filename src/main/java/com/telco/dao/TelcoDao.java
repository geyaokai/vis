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

public class TelcoDao {
    
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
    
    // 添加更多数据访问方法...
} 