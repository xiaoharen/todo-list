package com.xhr.project.service;

import com.xhr.project.exception.BusinessException;
import com.xhr.project.model.entity.User;
import com.baomidou.mybatisplus.extension.service.IService;

import javax.servlet.http.HttpServletRequest;

public interface UserService extends IService<User> {

    /**
     * 用户注册
     *
     * @param userAccount 用户账户
     * @param userPassword 用户密码
     * @return 新用户 id
     */
    long userRegister(String userAccount, String userPassword);

    /**
     * 用户登录
     *
     * @param userAccount 用户账户
     * @param userPassword 用户密码
     * @param request
     * @return 脱敏后的用户信息
     */
    User userLogin(String userAccount, String userPassword, HttpServletRequest request);

    /**
     * 用户脱敏
     *
     * @param originUser
     * @return
     */
    User getSafetyUser(User originUser);

    /**
     * 用户注销
     *
     * @param request
     * @return
     */
    int userLogout(HttpServletRequest request);

    /**
     * 是否为管理员
     *
     * @param request
     * @return
     */
    boolean isAdmin(HttpServletRequest request);

    /**
     * 是否为管理员
     *
     * @param user
     * @return
     */
    boolean isAdmin(User user);

    /**
     * 断言是管理员
     *
     * @param request
     */
    void assertAdmin(HttpServletRequest request);

    /**
     * 获取登录用户（查缓存）
     *
     * @param request
     * @return
     * @throws BusinessException 未登录则抛异常
     */
    User getLoginUser(HttpServletRequest request);
}
