import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import './index.css';
import BackURL from '../../contants/backURL.js';
import LoginCheck from "../../contants/loginCheck.js";
import FrontURL from "../../contants/frontURL.js";

const columns = [{
    title: '任务', dataIndex: 'taskInfo', width: '30%',
}, {
    title: '完成人', dataIndex: 'username', width: '20%',
}, {
    title: '是否完成', dataIndex: 'taskState', width: '20%',
}, {
    title: '创建时间', dataIndex: 'createTime',
},];

const Group = () => {
    LoginCheck();

    const [dataSource1, setDataSource1] = useState([]);
    const [dataSource2, setDataSource2] = useState([]);
    const [dataSource3, setDataSource3] = useState([]);
    const [dataSource4, setDataSource4] = useState([]);
    const [dataSource5, setDataSource5] = useState([]);

    const FJL = () => {
        if (dataSource1.length != 0) {
            return (
                <>
                    <h2 className="table-heading">
                        <span className="fa-regular fa-calendar-days" />
                        FJL Group
                    </h2>
                    <Table
                        dataSource={dataSource1}
                        columns={columns}
                    />
                </>
            )
        }
    };

    const WSH = () => {
        if (dataSource2.length != 0) {
            return (
                <>
                    <h2 className="table-heading">
                        <span className="fa-regular fa-calendar-days" />
                        WSH Group
                    </h2>
                    <Table
                        dataSource={dataSource2}
                        columns={columns}
                    />
                </>
            )
        }
    };

    const WWJ = () => {
        if (dataSource3.length != 0) {
            return (
                <>
                    <h2 className="table-heading">
                        <span className="fa-regular fa-calendar-days" />
                        WWJ Group
                    </h2>
                    <Table
                        dataSource={dataSource3}
                        columns={columns}
                    />
                </>
            )
        }
    };

    const SYW = () => {
        if (dataSource4.length != 0) {
            return (
                <>
                    <h2 className="table-heading">
                        <span className="fa-regular fa-calendar-days" />
                        SYW Group
                    </h2>
                    <Table
                        dataSource={dataSource4}
                        columns={columns}
                    />
                </>
            )
        }
    };

    const ZHC = () => {
        if (dataSource5.length != 0) {
            return (
                <>
                    <h2 className="table-heading">
                        <span className="fa-regular fa-calendar-days" />
                        ZHC Group
                    </h2>
                    <Table
                        dataSource={dataSource5}
                        columns={columns}
                    />
                </>
            )
        }
    };

    useEffect(() => {
        fetch(BackURL + 'task/all', {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                let d1 = [];
                let d2 = [];
                let d3 = [];
                let d4 = [];
                let d5 = [];
                let dataList = data.data;
                let usernames = {
                    1: "傅小乐",
                    2: "施鸿锦",
                    3: "Echo",
                    6: "吴世鸿",
                    7: "三个椰子",
                    8: "林悦",
                    11: "吴炜杰",
                    12: "小番薯",
                    13: "王珂",
                    16: "苏悦雯",
                    17: "韦佳杏",
                    18: "胡安琪",
                    21: "张浩成",
                    22: "王鸿宇",
                    23: "朱颖"
                };
                for (let i = 0; i < dataList.length; i++) {
                    let temp = dataList[i];
                    if (temp.uid >= 1 && temp.uid <= 5) {
                        temp["username"] = usernames[temp.uid];
                        d1.push(temp);
                    }
                    else if (temp.uid >= 6 && temp.uid <= 10) {
                        temp["username"] = usernames[temp.uid];
                        d2.push(temp);
                    }
                    else if (temp.uid >= 11 && temp.uid <= 15) {
                        temp["username"] = usernames[temp.uid];
                        d3.push(temp);
                    }
                    else if (temp.uid >= 16 && temp.uid <= 20) {
                        temp["username"] = usernames[temp.uid];
                        d4.push(temp);
                    }
                    else {
                        temp["username"] = usernames[temp.uid];
                        d5.push(temp);
                    }
                }
                setDataSource1(d1);
                setDataSource2(d2);
                setDataSource3(d3);
                setDataSource4(d4);
                setDataSource5(d5);
            })
            .catch(e => console.log('错误:', e));
    }, []);

    return (
        <>
            <div className="dashboard">
                <div className="profile">
                    <h1>Undefined C</h1>
                    <p>Group Schedule👍👍👍</p>
                    <a href={FrontURL + "person.html"} className="arrow-button button1">
                        <div className="arrow-left">返回</div></a>
                </div>
                <hr />
                <div className="schedule-table">
                    <FJL />
                    <WSH />
                    <WWJ />
                    <SYW />
                    <ZHC />
                </div>
            </div>
        </>
    )
}

export default Group;