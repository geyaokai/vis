/**
 * 数据库连接测试类
 */
package com.telco.test;

import com.telco.util.DBUtil;
import com.telco.dao.TelcoDao;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Map;

public class DBConnectionTest {
    public static void main(String[] args) {
        try {
            // 测试数据库连接
            Connection conn = DBUtil.getConnection();
            if (conn != null) {
                System.out.println("数据库连接成功！");
                
                // 测试查询总记录数
                java.sql.Statement stmt = conn.createStatement();
                java.sql.ResultSet rs = stmt.executeQuery("SELECT COUNT(*) as total FROM customers");
                if (rs.next()) {
                    System.out.println("customers表中共有 " + rs.getInt("total") + " 条记录");
                }
                
                // 测试TelcoDao的方法
                TelcoDao dao = new TelcoDao();
                Map<String, Integer> distribution = dao.getChurnDistribution();
                System.out.println("\n客户流失分布数据：");
                distribution.forEach((key, value) -> 
                    System.out.println(key + ": " + value + "人"));
                
                conn.close();
            }
        } catch (SQLException e) {
            System.err.println("数据库连接失败！错误信息：");
            e.printStackTrace();
            System.err.println("请检查以下配置：");
            System.err.println("1. 数据库URL是否正确");
            System.err.println("2. 用户名是否正确");
            System.err.println("3. 密码是否正确");
            System.err.println("4. MySQL服务是否启动");
            System.err.println("5. 数据库和表是否已创建");
        }
    }
} 