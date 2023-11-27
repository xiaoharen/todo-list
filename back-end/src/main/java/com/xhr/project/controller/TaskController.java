package com.xhr.project.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.xhr.project.common.BaseResponse;
import com.xhr.project.common.ErrorCode;
import com.xhr.project.common.ResultUtils;
import com.xhr.project.constant.UserConstant;
import com.xhr.project.exception.BusinessException;
import com.xhr.project.model.entity.Task;
import com.xhr.project.model.entity.User;
import com.xhr.project.model.request.TaskCreatRequest;
import com.xhr.project.model.request.TaskUpdateRequest;
import com.xhr.project.model.request.UserRegisterRequest;
import com.xhr.project.service.TaskService;
import com.xhr.project.service.UserService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/task")
public class TaskController {
    @Resource
    private TaskService taskService;

    @PostMapping("/create")
    public BaseResponse<Long> creatTask(@RequestBody TaskCreatRequest taskCreatRequest, HttpServletRequest request) {
        if (taskCreatRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        String taskInfo = taskCreatRequest.getTaskInfo();
        if (StringUtils.isAnyBlank(taskInfo)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        long result = taskService.createTask(taskInfo, request);
        return ResultUtils.success(result);
    }

    @GetMapping("/search")
    public BaseResponse<List<Task>> searchTaskByUid(HttpServletRequest request) {
        Object obj = request.getSession().getAttribute(UserConstant.USER_LOGIN_STATE);
        User user = (User) obj;
        long uid = user.getUid();

        QueryWrapper<Task> queryWrapper = new QueryWrapper<>();
        queryWrapper.like("uid", uid);
        List<Task> taskList = taskService.list(queryWrapper);

        return ResultUtils.success(taskList);
    }

    @GetMapping("/all")
    public BaseResponse<List<Task>> getAllTask() {
        QueryWrapper<Task> queryWrapper = new QueryWrapper<>();
        List<Task> taskList = taskService.list(queryWrapper);
        return ResultUtils.success(taskList);
    }

    @GetMapping("/delete")
    public BaseResponse<Boolean> deleteTask(@RequestParam Long tid) {
        if (tid <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        boolean result = taskService.removeById(tid);
        return ResultUtils.success(result);
    }

    @PostMapping("/update")
    public BaseResponse<Boolean> updateTask(@RequestBody TaskUpdateRequest taskUpdateRequest) {
        if (taskUpdateRequest == null || taskUpdateRequest.getTid() <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Long tid = taskUpdateRequest.getTid();
        String taskInfo = taskUpdateRequest.getTaskInfo();
        String taskState = taskUpdateRequest.getTaskState();
        Task task = taskService.getById(tid);
        // 判断是否存在
        if (task == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR);
        }
        task.setTaskInfo(taskInfo);
        task.setTaskState(taskState);
        boolean result = taskService.updateById(task);
        return ResultUtils.success(result);
    }
}
