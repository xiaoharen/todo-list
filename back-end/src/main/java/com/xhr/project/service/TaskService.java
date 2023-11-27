package com.xhr.project.service;

import com.xhr.project.model.entity.Task;
import com.baomidou.mybatisplus.extension.service.IService;

import javax.servlet.http.HttpServletRequest;

/**
 * @author Administrator
 * @description 针对表【task(任务)】的数据库操作Service
 * @createDate 2023-11-21 19:55:35
 */
public interface TaskService extends IService<Task> {

    long createTask(String taskInfo, HttpServletRequest request);

    long deleteTask(String taskInfo);

    boolean updateTaskState(int taskState);

}
