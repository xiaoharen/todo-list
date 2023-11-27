# 拉取jdk8作为基础镜像
FROM openjdk:8
# 添加jar到镜像并命名为user.jar
ADD undefined-c-plan-0.0.1-SNAPSHOT.jar plan.jar
# 镜像启动后暴露的端口
EXPOSE 7529
# jar运行命令，参数使用逗号隔开
ENTRYPOINT ["java","-jar","user.jar"]
