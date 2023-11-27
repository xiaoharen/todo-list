package com.xhr.project.model.request;

import lombok.Data;

import java.io.Serializable;

@Data
public class TaskCreatRequest implements Serializable {
    private static final long serialVersionUID = 3191241716373120793L;

    private String taskInfo;
}
