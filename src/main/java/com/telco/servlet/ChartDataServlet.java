/**
 * 图表数据控制器
 * 处理前端的HTTP请求
 * 接收请求参数并返回JSON格式的图表数据
 */
package com.telco.servlet;

import com.telco.service.ChartService;
import lombok.extern.slf4j.Slf4j;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@WebServlet("/api/chart-data")
public class ChartDataServlet extends HttpServlet {
    private ChartService chartService = new ChartService();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) 
            throws ServletException, IOException {
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        
        // 添加CORS头
        resp.setHeader("Access-Control-Allow-Origin", "*");
        resp.setHeader("Access-Control-Allow-Methods", "GET");
        
        String type = req.getParameter("type");
        log.info("Received request for type: {}", type);
        
        try {
            String jsonData = "";
            if ("churn".equals(type)) {
                jsonData = chartService.getChurnDistributionData();
                log.info("Churn data: {}", jsonData);
            } else if ("contract".equals(type)) {
                jsonData = chartService.getContractChurnAnalysis();
                log.info("Contract data: {}", jsonData);
            } else {
                log.warn("Invalid type parameter: {}", type);
                resp.setStatus(400);
                jsonData = "{\"error\": \"Invalid type parameter\"}";
            }
            resp.getWriter().write(jsonData);
        } catch (Exception e) {
            log.error("Error processing request", e);
            resp.setStatus(500);
            resp.getWriter().write("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }
} 