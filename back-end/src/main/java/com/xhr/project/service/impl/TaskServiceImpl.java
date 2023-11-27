package com.xhr.project.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.xhr.project.constant.UserConstant;
import com.xhr.project.mapper.UserMapper;
import com.xhr.project.model.entity.Task;
import com.xhr.project.model.entity.User;
import com.xhr.project.service.TaskService;
import com.xhr.project.mapper.TaskMapper;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @author Administrator
 * @description 针对表【task(任务)】的数据库操作Service实现
 * @createDate 2023-11-21 19:55:35
 */
@Service
public class TaskServiceImpl extends ServiceImpl<TaskMapper, Task>
        implements TaskService {

    @Resource
    private TaskMapper TaskMapper;

    @Override
    public long createTask(String taskInfo, HttpServletRequest request) {
        // 1. 校验
        if (StringUtils.isAnyBlank(taskInfo)) {
            return -1;
        }
        // 2. 根据用户登录态任务分配uid
        Object obj = request.getSession().getAttribute(UserConstant.USER_LOGIN_STATE);
        User user = (User) obj;
        Task task = new Task();
        task.setTaskInfo(taskInfo);
        task.setUid(user.getUid());
        task.setTaskState("0");
        boolean saveResult = this.save(task);
        if (!saveResult) {
            return -1;
        }
        return task.getTid();
    }

    @Override
    public long deleteTask(String taskInfo) {
        return 0;
    }

    @Override
    public boolean updateTaskState(int taskState) {
        return false;
    }
}




