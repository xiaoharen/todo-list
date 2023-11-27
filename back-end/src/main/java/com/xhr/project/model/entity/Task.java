package com.xhr.project.model.entity;

import com.baomidou.mybatisplus.annotation.*;

import java.io.Serializable;
import java.util.Date;
import lombok.Data;

/**
 * 任务
 * @TableName task
 */
@TableName(value ="task")
@Data
public class Task implements Serializable {
    /**
     * tid
     */
    @TableId(type = IdType.AUTO)
    private Long tid;

    /**
     * 任务信息
     */
    private String taskInfo;

    /**
     * 任务状态
     */
    private String taskState;

    /**
     * uid
     */
    private Long uid;

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 
     */
    private Date updateTime;

    /**
     * 是否删除
     */
    @TableLogic
    private Integer isDelete;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}