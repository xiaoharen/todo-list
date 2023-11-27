package com.xhr.project.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.xhr.project.common.BaseResponse;
import com.xhr.project.common.ErrorCode;
import com.xhr.project.common.ResultUtils;
import com.xhr.project.exception.BusinessException;
import com.xhr.project.model.entity.User;
import com.xhr.project.model.request.UserLoginRequest;
import com.xhr.project.model.request.UserRegisterRequest;
import com.xhr.project.service.UserService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 用户接口
 *
 * @author Jaylen
 */
@RestController
@RequestMapping("/user")
public class UserController {

    @Resource
    private UserService userService;

    @PostMapping("/register")
    public BaseResponse<Long> userRegister(@RequestBody UserRegisterRequest userRegisterRequest) {
        if (userRegisterRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        String userAccount = userRegisterRequest.getUserAccount();
        String userPassword = userRegisterRequest.getUserPassword();
        if (StringUtils.isAnyBlank(userAccount, userPassword)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        long result = userService.userRegister(userAccount, userPassword);
        return ResultUtils.success(result);
    }

    @PostMapping("/login")
    public BaseResponse<User> userLogin(@RequestBody UserLoginRequest userLoginRequest, HttpServletRequest request) {
        if (userLoginRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        String userAccount = userLoginRequest.getUserAccount();
        String userPassword = userLoginRequest.getUserPassword();
        if (StringUtils.isAnyBlank(userAccount, userPassword)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        User user = userService.userLogin(userAccount, userPassword, request);
        return ResultUtils.success(user);
    }

    @GetMapping("/logout")
    public BaseResponse<Integer> userLogout(HttpServletRequest request) {
        if (request == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        int result = userService.userLogout(request);
        return ResultUtils.success(result);
    }

    @GetMapping("/current")
    public BaseResponse<User> getCurrentUser(HttpServletRequest request) {
        User loginUser = userService.getLoginUser(request);
        long userUid = loginUser.getUid();
        User user = userService.getById(userUid);
        User safetyUser = userService.getSafetyUser(user);
        return ResultUtils.success(safetyUser);
    }

    @GetMapping("/all")
    public BaseResponse<List<User>> getAllUser() {
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        List<User> userList = userService.list(queryWrapper);
        List<User> list = userList.stream().map(user -> userService.getSafetyUser(user)).collect(Collectors.toList());
        return ResultUtils.success(list);
    }

    //    @GetMapping("/search")
//    public BaseResponse<User> searchUser(@RequestParam Long uid) {
//        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
//        User user = null;
//        if (uid > 0) {
//            user = userService.getById(uid);
//        }else {
//            ResultUtils.error(ErrorCode.PARAMS_ERROR, "参数错误");
//        }
//
//        return ResultUtils.success(user);
//    }

//    @PostMapping("/delete")
//    public BaseResponse<Boolean> deleteUser(@RequestBody long id, HttpServletRequest request) {
//        userService.assertAdmin(request);
//        if (id <= 0) {
//            throw new BusinessException(ErrorCode.PARAMS_ERROR);
//        }
//        boolean b = userService.removeById(id);
//        return ResultUtils.success(b);
//    }

}
