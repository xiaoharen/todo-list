# 用户表
create table user
(
    uid           bigint auto_increment comment 'uid' primary key,
    username     varchar(256)       null comment '用户昵称',
    userAccount  varchar(256)       null comment '账号',
    userPassword varchar(512)       not null comment '密码',
    userRole     int      default 0 not null comment '用户角色 0 - 组员 1 - 组长 2 - 导师',
    createTime   datetime default CURRENT_TIMESTAMP comment '创建时间',
    updateTime   datetime default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
    isDelete     tinyint  default 0 not null comment '是否删除'
) comment '用户';

# 任务表
create table task
(
    tid           bigint auto_increment comment 'tid' primary key,
    taskInfo     varchar(256)       null comment '任务信息',
    taskState  varchar(256)       null comment '任务状态',
    uid           bigint comment 'uid',
    createTime   datetime default CURRENT_TIMESTAMP comment '创建时间',
    updateTime   datetime default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
    isDelete     tinyint  default 0 not null comment '是否删除'
) comment '任务';


