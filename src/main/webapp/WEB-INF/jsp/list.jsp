<!--page是JSP的三个指令(page、include、taglib)之一-->
<!--page指令包含很多属性，contentType表示该jsp文件用字符编码，language指定了jsp的脚步语言，默认是java-->
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%-- 引入jstl--%>
<!--include标签用来使jsp包含其他文件，其他文件可以是JSP文件、HTML文件或者文本文件-->
<%@include file="common/tag.jsp"%>

<!--!DOCTYPE标签用于告诉浏览器该页面使用哪个html版本进行编写，不管在什么情况下，始终都建议使用这个标签进行声明-->
<!DOCTYPE html>
<html>
<head>
    <title>秒杀列表页</title>
    <%@include file="common/header.jsp"%>
</head>
<body>

<%-- 页面显示部分 --%>
<div class="container">
    <!--面板组件-->
    <div class="panel panel-primary">
        <!--不带title的面板标题-->
        <div class="panel-heading text-center">
            <h2>秒杀列表</h2>
        </div>
        <!--面板内容-->
        <div class="panel-body">
            <!--带鼠标悬停类型的表格-->
            <table class="table table-hover">
                <thead>
                <tr>
                    <th>名称</th>
                    <th>库存</th>
                    <th>开始时间</th>
                    <th>结束时间</th>
                    <th>创建时间</th>
                    <th>详情页</th>
                </tr>
                </thead>
                <tbody>
                    <c:forEach var="sk" items="${list}">
                        <tr>
                            <td>${sk.name}</td>
                            <td>${sk.number}</td>
                            <td>
                                <fmt:formatDate value="${sk.startTime}" pattern="yyyy-MM-dd HH:mm:ss"></fmt:formatDate>
                            </td>
                            <td>
                                <fmt:formatDate value="${sk.endTime}" pattern="yyyy-MM-dd HH:mm:ss"></fmt:formatDate>
                            </td>
                            <td>
                                <fmt:formatDate value="${sk.createTime}" pattern="yyyy-MM-dd HH:mm:ss"></fmt:formatDate>
                            </td>
                            <td>
                                <!--target="_blank"表示再新窗口中打开链接-->
                                <a class="btn btn-info" href="/seckill/${sk.seckillId}/detail" target="_blank">link</a>
                            </td>
                        </tr>
                    </c:forEach>
                </tbody>
            </table>
        </div>
    </div>
</div>

</body>
<!-- jQuery文件。务必在bootstrap.min.js 之前引入 -->
<script src="http://cdn.static.runoob.com/libs/jquery/2.1.1/jquery.min.js"></script>
<!-- 最新的 Bootstrap 核心 JavaScript 文件 -->
<script src="http://cdn.static.runoob.com/libs/bootstrap/3.3.7/js/bootstrap.min.js"></script>
</html>
