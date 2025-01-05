/**
 * 图表服务类
 * 处理业务逻辑层
 * 负责数据的处理和转换，为前端提供图表所需的数据格式
 */
package com.telco.service;

import com.telco.dao.TelcoDao;
import com.google.gson.Gson;
import java.sql.SQLException;
import java.util.Map;
import java.util.List;

public class ChartService {
    private TelcoDao telcoDao = new TelcoDao();
    private Gson gson = new Gson();

    public String getChurnDistributionData() throws SQLException {
        Map<String, Integer> distribution = telcoDao.getChurnDistribution();
        return gson.toJson(distribution);
    }

    public String getContractChurnAnalysis() throws SQLException {
        Map<String, Map<String, Integer>> analysis = telcoDao.getContractChurnAnalysis();
        return gson.toJson(analysis);
    }

    public String getGenderDistributionData() throws SQLException {
        Map<String, Map<String, Integer>> distribution = telcoDao.getGenderDistribution();
        return gson.toJson(distribution);
    }

    public String getAgeServiceData() throws SQLException {
        Map<String, List<Double>> usage = telcoDao.getAgeServiceUsage();
        return gson.toJson(usage);
    }
    
    // 添加更多服务方法...
} 