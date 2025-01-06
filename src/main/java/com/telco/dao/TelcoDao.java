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
import java.util.Set;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
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
                "WHEN SeniorCitizen = 1 THEN " +
                "   CASE WHEN tenure >= 24 THEN 'senior_mature' ELSE 'senior_new' END " +
                "ELSE " +
                "   CASE WHEN tenure >= 24 THEN 'young_mature' ELSE 'young_new' END " +
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
                "WHEN SeniorCitizen = 1 THEN " +
                "   CASE WHEN tenure >= 24 THEN 'senior_mature' ELSE 'senior_new' END " +
                "ELSE " +
                "   CASE WHEN tenure >= 24 THEN 'young_mature' ELSE 'young_new' END " +
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
                        rs.getDouble("streaming_movies"));
                usage.put(ageGroup, services);
            }
        }
        return usage;
    }

    // 获取服务关联性数据
    public List<List<Double>> getServiceCorrelation() throws SQLException {
        List<String> services = Arrays.asList(
                "phone", "internet", "security", "backup",
                "protection", "support", "tv", "movies");

        List<List<Double>> correlation = new ArrayList<>();

        String sql = "WITH service_users AS (" +
            "SELECT " +
            "  CASE WHEN PhoneService = 'Yes' THEN 1 ELSE 0 END as phone, " +
            "  CASE WHEN InternetService != 'No' THEN 1 ELSE 0 END as internet, " +
            "  CASE WHEN OnlineSecurity = 'Yes' THEN 1 ELSE 0 END as security, " +
            "  CASE WHEN OnlineBackup = 'Yes' THEN 1 ELSE 0 END as backup, " +
            "  CASE WHEN DeviceProtection = 'Yes' THEN 1 ELSE 0 END as protection, " +
            "  CASE WHEN TechSupport = 'Yes' THEN 1 ELSE 0 END as support, " +
            "  CASE WHEN StreamingTV = 'Yes' THEN 1 ELSE 0 END as tv, " +
            "  CASE WHEN StreamingMovies = 'Yes' THEN 1 ELSE 0 END as movies " +
            "FROM customers" +
            ") " +
            "SELECT " +
            "  (SUM(phone) * 100.0 / COUNT(*)) as phone_usage, " +
            "  (SUM(internet) * 100.0 / COUNT(*)) as internet_usage, " +
            "  (SUM(security) * 100.0 / COUNT(*)) as security_usage, " +
            "  (SUM(backup) * 100.0 / COUNT(*)) as backup_usage, " +
            "  (SUM(protection) * 100.0 / COUNT(*)) as protection_usage, " +
            "  (SUM(support) * 100.0 / COUNT(*)) as support_usage, " +
            "  (SUM(tv) * 100.0 / COUNT(*)) as tv_usage, " +
            "  (SUM(movies) * 100.0 / COUNT(*)) as movies_usage, " +
            "  (SUM(CASE WHEN phone = 1 AND internet = 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) as phone_internet, " +
            "  (SUM(CASE WHEN phone = 1 AND security = 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) as phone_security, " +
            "  (SUM(CASE WHEN phone = 1 AND backup = 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) as phone_backup, " +
            "  (SUM(CASE WHEN phone = 1 AND protection = 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) as phone_protection, " +
            "  (SUM(CASE WHEN phone = 1 AND support = 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) as phone_support, " +
            "  (SUM(CASE WHEN phone = 1 AND tv = 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) as phone_tv, " +
            "  (SUM(CASE WHEN phone = 1 AND movies = 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) as phone_movies, " +
            "  (SUM(CASE WHEN internet = 1 AND security = 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) as internet_security, " +
            "  (SUM(CASE WHEN internet = 1 AND backup = 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) as internet_backup, " +
            "  (SUM(CASE WHEN internet = 1 AND protection = 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) as internet_protection, " +
            "  (SUM(CASE WHEN internet = 1 AND support = 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) as internet_support, " +
            "  (SUM(CASE WHEN internet = 1 AND tv = 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) as internet_tv, " +
            "  (SUM(CASE WHEN internet = 1 AND movies = 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) as internet_movies, " +
            "  (SUM(CASE WHEN security = 1 AND backup = 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) as security_backup, " +
            "  (SUM(CASE WHEN security = 1 AND protection = 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) as security_protection, " +
            "  (SUM(CASE WHEN security = 1 AND support = 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) as security_support, " +
            "  (SUM(CASE WHEN security = 1 AND tv = 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) as security_tv, " +
            "  (SUM(CASE WHEN security = 1 AND movies = 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) as security_movies, " +
            "  (SUM(CASE WHEN backup = 1 AND protection = 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) as backup_protection, " +
            "  (SUM(CASE WHEN backup = 1 AND support = 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) as backup_support, " +
            "  (SUM(CASE WHEN backup = 1 AND tv = 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) as backup_tv, " +
            "  (SUM(CASE WHEN backup = 1 AND movies = 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) as backup_movies, " +
            "  (SUM(CASE WHEN protection = 1 AND support = 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) as protection_support, " +
            "  (SUM(CASE WHEN protection = 1 AND tv = 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) as protection_tv, " +
            "  (SUM(CASE WHEN protection = 1 AND movies = 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) as protection_movies, " +
            "  (SUM(CASE WHEN support = 1 AND tv = 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) as support_tv, " +
            "  (SUM(CASE WHEN support = 1 AND movies = 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) as support_movies, " +
            "  (SUM(CASE WHEN tv = 1 AND movies = 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) as tv_movies, " +
            "  (SUM(CASE WHEN tv = 1 AND movies = 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) as tv_movies, " +
            "  (SUM(CASE WHEN tv = 1 AND movies = 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) as movies_movies " +
            "FROM service_users";

        try (Connection conn = DBUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {

            if (rs.next()) {
                // 创建使用率映射
                Map<String, Double> usageRates = new HashMap<>();
                for (String service : services) {
                    usageRates.put(service, rs.getDouble(service + "_usage"));
                }

                for (String service1 : services) {
                    List<Double> row = new ArrayList<>();
                    for (String service2 : services) {
                        if (service1.equals(service2)) {
                            // 对角线：显示该服务的使用率
                            row.add(usageRates.get(service1));
                        } else {
                            // 非对角线：获取两个服务的关联度
                            String columnName = service1.compareTo(service2) < 0 ?
                                service1 + "_" + service2 :
                                service2 + "_" + service1;
                            try {
                                row.add(rs.getDouble(columnName));
                            } catch (SQLException e) {
                                log.error("Error getting value for column: " + columnName, e);
                                row.add(0.0);
                            }
                        }
                    }
                    correlation.add(row);
                }
            }
        }
        return correlation;
    }

    // 获取服务订阅趋势数据
    public Map<String, List<Double>> getServiceTrend() throws SQLException {
        Map<String, List<Double>> trends = new HashMap<>();
        String sql = "SELECT " +
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
                    "device_protection", "tech_support", "streaming_tv", "streaming_movies");

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
                                isChurn);
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
                                    charge));
                        }
                    }

                    // 箱线图五个数值点：最小值、Q1、中位数、Q3、最大值
                    boxData.add(Arrays.asList(
                            normalValues.get(0), // 最小值
                            q1, // 下四分位
                            getQuantile(normalValues, 0.5), // 中位数
                            q3, // 上四分位
                            normalValues.get(normalValues.size() - 1) // 最大值
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
            case "Month-to-month":
                return 0;
            case "One year":
                return 1;
            case "Two year":
                return 2;
            default:
                return -1;
        }
    }

    // 获取财务统计数据
    public Map<String, Object> getFinancialStats() throws SQLException {
        Map<String, Object> stats = new HashMap<>();

        // 计算月均消费和客单价
        String avgSql = "SELECT " +
                "AVG(MonthlyCharges) as avgMonthly, " +
                "AVG(CASE WHEN TotalCharges != '' THEN CAST(TotalCharges AS DECIMAL(10,2)) ELSE 0 END) as avgTotal, " +
                "COUNT(*) as total " +
                "FROM customers";

        // 计算高消费客户数量（月费用超过平均值1.5倍的客户）
        String highValueSql = "SELECT COUNT(*) as count " +
                "FROM customers " +
                "WHERE MonthlyCharges > (SELECT AVG(MonthlyCharges) * 1.5 FROM customers)";

        // 计算高消费客户的收入贡献率
        String contributionSql = "SELECT " +
                "(SUM(CASE WHEN MonthlyCharges > (SELECT AVG(MonthlyCharges) * 1.5 FROM customers) " +
                "THEN MonthlyCharges ELSE 0 END) * 100.0 / SUM(MonthlyCharges)) as contribution " +
                "FROM customers";

        try (Connection conn = DBUtil.getConnection()) {
            // 获取平均值
            try (PreparedStatement stmt = conn.prepareStatement(avgSql);
                    ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    stats.put("avgMonthlyCharges", rs.getDouble("avgMonthly"));
                    stats.put("avgTotalCharges", rs.getDouble("avgTotal"));
                }
            }

            // 获取高消费客户数量
            try (PreparedStatement stmt = conn.prepareStatement(highValueSql);
                    ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    stats.put("highValueCustomers", rs.getInt("count"));
                }
            }

            // 获取收入贡献率
            try (PreparedStatement stmt = conn.prepareStatement(contributionSql);
                    ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    stats.put("revenueContribution", rs.getDouble("contribution"));
                }
            }
        }

        return stats;
    }

    // 获取客户生命周期分析数据
    public Map<String, Object> getLifeCycleAnalysis() throws SQLException {
        Map<String, Object> result = new HashMap<>();

        // 按在网时长分组统计客户数量和流失情况
        String sql = "SELECT " +
                "CASE " +
                "WHEN tenure <= 6 THEN '0-6月' " +
                "WHEN tenure <= 12 THEN '7-12月' " +
                "WHEN tenure <= 24 THEN '1-2年' " +
                "WHEN tenure <= 36 THEN '2-3年' " +
                "WHEN tenure <= 48 THEN '3-4年' " +
                "WHEN tenure <= 60 THEN '4-5年' " +
                "ELSE '5年以上' " +
                "END as tenure_group, " +
                "COUNT(*) as total, " +
                "SUM(CASE WHEN Churn = 'Yes' THEN 1 ELSE 0 END) as churn_count, " +
                "AVG(MonthlyCharges) as avg_charges " +
                "FROM customers " +
                "GROUP BY CASE " +
                "WHEN tenure <= 6 THEN '0-6月' " +
                "WHEN tenure <= 12 THEN '7-12月' " +
                "WHEN tenure <= 24 THEN '1-2年' " +
                "WHEN tenure <= 36 THEN '2-3年' " +
                "WHEN tenure <= 48 THEN '3-4年' " +
                "WHEN tenure <= 60 THEN '4-5年' " +
                "ELSE '5年以上' " +
                "END " +
                "ORDER BY MIN(tenure)";

        try (Connection conn = DBUtil.getConnection();
                PreparedStatement stmt = conn.prepareStatement(sql);
                ResultSet rs = stmt.executeQuery()) {

            List<String> categories = new ArrayList<>();
            List<Integer> totalCustomers = new ArrayList<>();
            List<Integer> churnCustomers = new ArrayList<>();
            List<Double> avgCharges = new ArrayList<>();
            List<Double> churnRates = new ArrayList<>();

            while (rs.next()) {
                String tenureGroup = rs.getString("tenure_group");
                int total = rs.getInt("total");
                int churn = rs.getInt("churn_count");
                double avgCharge = rs.getDouble("avg_charges");
                double churnRate = (churn * 100.0) / total;

                categories.add(tenureGroup);
                totalCustomers.add(total);
                churnCustomers.add(churn);
                avgCharges.add(avgCharge);
                churnRates.add(churnRate);
            }

            result.put("categories", categories);
            result.put("totalCustomers", totalCustomers);
            result.put("churnCustomers", churnCustomers);
            result.put("avgCharges", avgCharges);
            result.put("churnRates", churnRates);
        }

        return result;
    }

    // 获取流失路径数据
    public Map<String, Object> getChurnPathData() throws SQLException {
        Map<String, Object> result = new HashMap<>();

        String sql = "SELECT " +
                "Contract, " +
                "ChurnReason, " +
                "COUNT(*) as count " +
                "FROM customers " +
                "WHERE Churn = 'Yes' " +
                "GROUP BY Contract, ChurnReason";

        try (Connection conn = DBUtil.getConnection();
                PreparedStatement stmt = conn.prepareStatement(sql);
                ResultSet rs = stmt.executeQuery()) {

            List<Map<String, Object>> links = new ArrayList<>();
            while (rs.next()) {
                String contract = rs.getString("Contract");
                String reason = rs.getString("ChurnReason");
                int count = rs.getInt("count");

                // 转换合同类型名称
                String contractName = "";
                switch (contract) {
                    case "Month-to-month":
                        contractName = "合同类型:月付";
                        break;
                    case "One year":
                        contractName = "合同类型:年付";
                        break;
                    case "Two year":
                        contractName = "合同类型:两年付";
                        break;
                }

                // 添加连接数据
                Map<String, Object> link = new HashMap<>();
                link.put("source", contractName);
                link.put("target", reason);
                link.put("value", count);
                links.add(link);
            }
            result.put("links", links);
        }

        return result;
    }

    // 获取流失漏斗数据
    public Map<String, Object> getChurnFunnelData() throws SQLException {
        Map<String, Object> result = new HashMap<>();

        // 获取总体流失漏斗数据
        String overallSql = "SELECT " +
                "COUNT(*) as total, " +
                "SUM(CASE " +
                "WHEN MonthlyCharges > (SELECT AVG(MonthlyCharges) * 1.2 FROM customers) " + // 月费用超过平均值20%
                "OR (tenure < 6 AND Contract = 'Month-to-month') " + // 新客户且是月付费
                "OR (TechSupport = 'No' AND OnlineSecurity = 'No') " + // 没有技术支持和在线安全服务
                "THEN 1 ELSE 0 END) as high_risk, " +
                "SUM(CASE " +
                "WHEN tenure < 12 " + // 在网时长小于1年
                "AND Contract = 'Month-to-month' " + // 月付费
                "AND (InternetService = 'Fiber optic' OR MonthlyCharges > (SELECT AVG(MonthlyCharges) FROM customers)) "
                + // 使用光纤或高消费
                "THEN 1 ELSE 0 END) as warning, " +
                "SUM(CASE WHEN Churn = 'Yes' THEN 1 ELSE 0 END) as churned " +
                "FROM customers";

        // 获取流失原因分布
        String reasonsSql = "SELECT " +
                "ChurnReason, " +
                "COUNT(*) as count " +
                "FROM customers " +
                "WHERE Churn = 'Yes' " +
                "GROUP BY ChurnReason " +
                "ORDER BY count DESC";

        try (Connection conn = DBUtil.getConnection()) {
            // 获取总体数据
            List<Map<String, Object>> overall = new ArrayList<>();
            try (PreparedStatement stmt = conn.prepareStatement(overallSql);
                    ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    Map<String, Object> item = new HashMap<>();
                    item.put("value", rs.getInt("total"));
                    item.put("name", "全部客户");
                    overall.add(item);

                    item = new HashMap<>();
                    item.put("value", rs.getInt("high_risk"));
                    item.put("name", "高风险客户");
                    overall.add(item);

                    item = new HashMap<>();
                    item.put("value", rs.getInt("warning"));
                    item.put("name", "流失预警");
                    overall.add(item);

                    item = new HashMap<>();
                    item.put("value", rs.getInt("churned"));
                    item.put("name", "确认流失");
                    overall.add(item);
                }
            }

            // 获取原因分布
            List<Map<String, Object>> reasons = new ArrayList<>();
            try (PreparedStatement stmt = conn.prepareStatement(reasonsSql);
                    ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    Map<String, Object> reason = new HashMap<>();
                    reason.put("value", rs.getInt("count"));
                    reason.put("name", rs.getString("ChurnReason"));
                    reasons.add(reason);
                }
            }

            result.put("overall", overall);
            result.put("reasons", reasons);
        }

        return result;
    }

    // 获取年龄-消费-流失气泡图数据
    public List<Map<String, Object>> getAgeBubbleData() throws SQLException {
        List<Map<String, Object>> result = new ArrayList<>();
        String sql = "SELECT " +
                "CASE " +
                "WHEN SeniorCitizen = 1 THEN " +
                "   CASE WHEN tenure >= 24 THEN '老年用户-成熟' ELSE '老年用户-新客' END " +
                "ELSE " +
                "   CASE WHEN tenure >= 24 THEN '年轻用户-成熟' ELSE '年轻用户-新客' END " +
                "END as customer_group, " +
                "AVG(MonthlyCharges) as avg_charges, " +
                "COUNT(*) as customer_count, " +
                "(SUM(CASE WHEN Churn = 'Yes' THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) as churn_rate " +
                "FROM customers " +
                "GROUP BY CASE " +
                "WHEN SeniorCitizen = 1 THEN " +
                "   CASE WHEN tenure >= 24 THEN '老年用户-成熟' ELSE '老年用户-新客' END " +
                "ELSE " +
                "   CASE WHEN tenure >= 24 THEN '年轻用户-成熟' ELSE '年轻用户-新客' END " +
                "END";

        try (Connection conn = DBUtil.getConnection();
                PreparedStatement stmt = conn.prepareStatement(sql);
                ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                Map<String, Object> data = new HashMap<>();
                data.put("name", rs.getString("customer_group"));
                data.put("value", Arrays.asList(
                    rs.getDouble("avg_charges"),
                    rs.getInt("customer_count"),
                    rs.getDouble("churn_rate")
                ));
                result.add(data);
            }
        }
        return result;
    }

    // 获取人口特征与服务选择桑基图数据
    public Map<String, Object> getDemographicSankeyData() throws SQLException {
        Map<String, Object> result = new HashMap<>();
        List<Map<String, Object>> nodes = new ArrayList<>();
        List<Map<String, Object>> links = new ArrayList<>();

        String sql = "SELECT " +
                "CASE " +
                "WHEN SeniorCitizen = 1 THEN " +
                "   CASE WHEN tenure >= 24 THEN '老年用户-成熟' ELSE '老年用户-新客' END " +
                "ELSE " +
                "   CASE WHEN tenure >= 24 THEN '年轻用户-成熟' ELSE '年轻用户-新客' END " +
                "END as customer_group, " +
                "CASE " +
                "WHEN MonthlyCharges <= 50 THEN '基础套餐' " +
                "WHEN MonthlyCharges <= 100 THEN '标准套餐' " +
                "ELSE '高级套餐' END as service_level, " +
                "COUNT(*) as count " +
                "FROM customers " +
                "GROUP BY " +
                "CASE " +
                "WHEN SeniorCitizen = 1 THEN " +
                "   CASE WHEN tenure >= 24 THEN '老年用户-成熟' ELSE '老年用户-新客' END " +
                "ELSE " +
                "   CASE WHEN tenure >= 24 THEN '年轻用户-成熟' ELSE '年轻用户-新客' END " +
                "END, " +
                "CASE " +
                "WHEN MonthlyCharges <= 50 THEN '基础套餐' " +
                "WHEN MonthlyCharges <= 100 THEN '标准套餐' " +
                "ELSE '高级套餐' END";

        try (Connection conn = DBUtil.getConnection();
                PreparedStatement stmt = conn.prepareStatement(sql);
                ResultSet rs = stmt.executeQuery()) {

            // 添加节点
            Set<String> nodeNames = new HashSet<>();
            while (rs.next()) {
                String ageGroup = rs.getString("customer_group");
                String serviceLevel = rs.getString("service_level");
                int count = rs.getInt("count");

                if (!nodeNames.contains(ageGroup)) {
                    Map<String, Object> node = new HashMap<>();
                    node.put("name", ageGroup);
                    nodes.add(node);
                    nodeNames.add(ageGroup);
                }
                if (!nodeNames.contains(serviceLevel)) {
                    Map<String, Object> node = new HashMap<>();
                    node.put("name", serviceLevel);
                    nodes.add(node);
                    nodeNames.add(serviceLevel);
                }

                Map<String, Object> link = new HashMap<>();
                link.put("source", ageGroup);
                link.put("target", serviceLevel);
                link.put("value", count);
                links.add(link);
            }
        }

        result.put("nodes", nodes);
        result.put("links", links);
        return result;
    }

    // 添加更多数据访问方法...
}