package com.xhr.project.model.request;

import lombok.Data;

import java.io.Serializable;

@Data
public class TaskUpdateRequest implements Serializable {
    private static final long serialVersionUID = 3191241716373120793L;

    private Long tid;

    private String taskInfo;

    private String taskState;
}
