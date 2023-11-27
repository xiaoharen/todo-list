import React, {useContext, useEffect, useRef, useState} from 'react';
import {Popconfirm, Table} from 'antd';
import {Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space} from 'antd';
import axios from 'axios';
import './index.css';
import BackURL from '../../contants/backURL.js';
import Logout from '../../contants/logout.js'
import LoginCheck from "../../contants/loginCheck.js";
import FrontURL from "../../contants/frontURL.js";

const {Option} = Select;

const EditableContext = React.createContext(null);
const EditableRow = ({index, ...props}) => {
    const [form] = Form.useForm();
    return (<Form form={form} component={false}>
        <EditableContext.Provider value={form}>
            <tr {...props} />
        </EditableContext.Provider>
    </Form>);
};
const EditableCell = ({
                          title, editable, children, dataIndex, record, handleSave, ...restProps
                      }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);
    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };
    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({
                ...record, ...values,
            });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };
    let childNode = children;
    if (editable) {
        childNode = editing ? (<Form.Item
            style={{
                margin: 0,
            }}
            name={dataIndex}
            rules={[{
                required: true, message: `${title} is required.`,
            },]}
        >
            <Input ref={inputRef} onPressEnter={save} onBlur={save}/>
        </Form.Item>) : (<div
            className="editable-cell-value-wrap"
            style={{
                paddingRight: 24,
            }}
            onClick={toggleEdit}
        >
            {children}
        </div>);
    }
    return <td {...restProps}>{childNode}</td>;
};
const App = () => {
    LoginCheck();
    const [dataSource, setDataSource] = useState();
    const searchData = () => {
        fetch(BackURL + 'task/search', {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                setDataSource(data.data);
            })
            .catch(e => console.log('错误:', e));
    }
    // fetch data
    useEffect(() => {
        searchData();
    }, []);
    const handleDelete = (tid) => {
        let url = BackURL + 'task/delete?tid=' + tid;
        fetch(url, {
            credentials: 'include'
        })
            .then(() => {
                searchData();
            })
            .catch(e => console.log('错误:', e));
    };
    const defaultColumns = [{
        title: '任务编号', dataIndex: 'tid',
    }, {
        title: '任务', dataIndex: 'taskInfo', width: '30%', editable: true,
    }, {
        title: '任务状态', dataIndex: 'taskState', width: '20%', editable: true,
    }, {
        title: '创建时间', dataIndex: 'createTime',
    }, {
        title: '操作',
        dataIndex: 'operation',
        render: (_, record) => dataSource.length >= 1 ? (
            <Popconfirm title="确定要删除啦???" onConfirm={() => handleDelete(record.tid)}>
                <a>删除</a>
            </Popconfirm>) : null,
    },];

    const handleAdd = () => {
        let inputTaskInfo = document.getElementById("taskInfo");
        let taskInfo = inputTaskInfo.value;
        axios({
            method: 'POST',
            url: BackURL + 'task/create',
            withCredentials: true,
            headers: {'content-type': 'application/json'},
            data: JSON.stringify({
                taskInfo: taskInfo
            })
        })
            .then(res => {
                console.log(res);
                inputTaskInfo.value = "";
                searchData();
            }, error => {
                console.log('错误', error.message)
            })
    };
    const handleSave = (row) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.tid === item.tid);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item, ...row,
        });

        console.log(row.tid)
        console.log(typeof row.tid)
        const saveData = {
            tid: row.tid,
            taskInfo: row.taskInfo,
            taskState: row.taskState
        };
        axios({
            method: 'POST',
            url: BackURL + 'task/update',
            withCredentials: true,
            headers: {'content-type': 'application/json'},
            data: JSON.stringify(saveData)
        })
            .then(res => {
                setDataSource(newData);
            }, error => {
                console.log('错误', error.message)
            })
    };
    const components = {
        body: {
            row: EditableRow, cell: EditableCell,
        },
    };
    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col, onCell: (record) => ({
                record, editable: col.editable, dataIndex: col.dataIndex, title: col.title, handleSave,
            }),
        };
    });
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    return (<div>
        <Drawer
            title="Create a new task"
            width={420}
            onClose={onClose}
            open={open}
            styles={{
                body: {
                    paddingBottom: 80,
                },
            }}
            extra={<Space>
                <Button onClick={onClose}>取消</Button>
                <Button onClick={handleAdd} type="primary">
                    提交
                </Button>
            </Space>}
        >
            <Form layout="vertical" hideRequiredMark>
                <Row gutter={16}>
                    <Col span={18}>
                        <Form.Item
                            name="Task"
                            label="Task"
                            rules={[{
                                required: true, message: 'Please input your task',
                            },]}
                        >
                            <Input id="taskInfo" placeholder="Please input your task"/>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Drawer>
        <div className="dashboard">
            <div className="profile">
                <h1>Todo list</h1>
                {/*<p onClick={showDrawer}></p>*/}
                <a onClick={Logout} className="arrow-button button3"><span
                    className="arrow-left">退出登入</span></a>
                <p className="arrow-button button2" onClick={showDrawer}><span
                    className="arrow-none">Create you todo<br/>👍👍👍</span></p>
                <a href={FrontURL + "group.html"} className="arrow-button button1">
                    <span className="arrow-right">小组任务</span></a>
            </div>
            <hr/>
            <div className="schedule-table">
                <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                />
            </div>
        </div>
    </div>);
};
export default App;