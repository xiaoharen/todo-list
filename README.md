# 需求分析

- 个人页
  - 各组长及组员可以编辑自己的计划
  - 完成计划后可打钩

- 全组总览页
  - 可以看到全部小组,各组全部组员的任务进展

# 技术选型

- 前端:HTML,CSS,JS + React + Vite
- 后端:Java + SpringBoot + MySQL
- 部署:Nginx + CentOS

# 数据库表设计

- 组员表
  - uid
  - 姓名(首字母拼音)
  - 密码
  - 状态(组长/组员)
  - 所属小组编号
  - 逻辑删除
  
  ```sql
  create table user
  (
      uid           bigint auto_increment comment 'uid' primary key,
      username     varchar(256)       null comment '用户昵称',
      userAccount  varchar(256)       null comment '账号',
      userPassword varchar(512)       not null comment '密码',
      userRole     int      default 0 not null comment '用户角色 0 - 组员 1 - 组长 2 - 导师',
      createTime   datetime default CURRENT_TIMESTAMP comment '创建时间',
      updateTime   datetime default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
      isDelete     tinyint  default 0 not null comment '是否删除',
  
  ) comment '用户';
  ```
  
  
  
- 任务表
  - tid
  - 任务信息
  - 任务状态(完成/未完成)
  - uid(哪个成员的任务)
  - 逻辑删除
  
  ```sql
  create table task
  (
      tid           bigint auto_increment comment 'id' primary key,
      taskInfo     varchar(256)       null comment '任务信息',
      taskState  varchar(256)       null comment '任务状态',
      uid           bigint auto_increment comment 'uid',
      createTime   datetime default CURRENT_TIMESTAMP comment '创建时间',
      updateTime   datetime default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
      isDelete     tinyint  default 0 not null comment '是否删除',
  ) comment '任务';
  ```
  



# 前端

- 同页面内容切换

  点击页面不同标签时显示/隐藏对应内容

  ```javascript
  $(function () {
      $(".menu-link").click(function () {
          $(".menu-link").removeClass("is-active");
          $(this).removeClass("notify");
          $(this).addClass("is-active");
          $(this).addClass("notify");
  
          $(".my-script").addClass("invisible");
          let thisClass = $(this).attr('id');
          thisClass = thisClass.substr(2, thisClass.length);
          $("." + thisClass).removeClass("invisible");
      });
  });
  ```

  

# 后端

## 接口设计

- 用户接口
- 任务接口

# 踩坑

## 跨域

- 后端过滤器解决跨域问题

  ```java
  @Configuration
  public class CORSConfig {
      /**
       * 允许跨域调用的过滤器
       */
      @Bean
      public CorsFilter corsFilter() {
          CorsConfiguration config = new CorsConfiguration();
          //允许白名单域名进行跨域调用
          config.addAllowedOriginPattern("*");
          //允许跨越发送cookie
          config.setAllowCredentials(true);
          //放行全部原始头信息
          config.addAllowedHeader("*");
          //允许所有请求方法跨域调用
          config.addAllowedMethod("*");
          UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
          source.registerCorsConfiguration("/**", config);
          return new CorsFilter(source);
      }
  }
  ```

- 其他的试过但是没用

## 不同请求session不同

参考博客:(https://blog.csdn.net/zuodingquan666/article/details/118699286)

- 解决方法:请求设置携带cookie

  fetch:

  ```java
  fetch('http://localhost:7529/api/task/search',{
              credentials: 'include'
          })
              .then(res => res.json())
              .then(data => {
                  setDataSource(data.data);
                  setCount(data.data.length);
              })
              .catch(e => console.log('错误:', e));
  ```

  axios:

  ```javascript
  axios({
          method: 'POST',
          url: 'http://localhost:7529/api/user/login',
          withCredentials: true,
          headers: { 'content-type': 'application/json' },
          data: JSON.stringify(loginData)
      })
  ```

## 打包部署到Nginx后路由失效

只能访问html静态文件.本地运行是没问题的

## 前端样式污染