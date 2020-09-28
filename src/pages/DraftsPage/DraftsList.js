import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Tooltip, Table } from 'antd';
import { EditOutlined } from '@ant-design/icons';

function DraftsList({ draftsList, type }) {
    let tasksSet = new Set();
    let tasksFilter = [];
    let studentsSet = new Set();
    let studentsFilter = [];
    let draftsDataForTable = [];

    draftsList.map((draft, idx) => {
        const pathId = type === 'selfCheck' ? draft.id : draft.revReqId;
        draftsDataForTable.push(
            {
                key: idx,
                task: draft.task,
                student: draft.student,
                sendingDate: draft.sendingDate,
                actions:
                    <Link to={`/check-form/${pathId}/${draft.status}`}>
                        <Tooltip title="Return to review">
                            <Button type="primary" shape="circle"
                                icon={<EditOutlined />}
                            />
                        </Tooltip>
                    </Link>,
            })
        tasksSet.add(draft.task);
        studentsSet.add(draft.student);
        return null;
    })
    for (let task of tasksSet) tasksFilter.push({ text: task, value: task });
    for (let student of studentsSet) studentsFilter.push({ text: student, value: student });

    const columns = [
        {
            title: 'Task',
            dataIndex: 'task',
            filters: tasksFilter,
            onFilter: (value, record) => record.task.indexOf(value) === 0,
            sorter: (a, b) => a.task.localeCompare(b.task),
        },
        {
            title: 'Student',
            dataIndex: 'student',
            filters: studentsFilter,
            onFilter: (value, record) => record.student.indexOf(value) === 0,
            sorter: (a, b) => a.student.localeCompare(b.student),
        },
        {
            title: 'Sending Date',
            dataIndex: 'sendingDate',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.sendingDate.localeCompare(b.sendingDate),
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
        }
    ];

    return (
        <Table columns={columns} dataSource={draftsDataForTable} />
    );
}

export default DraftsList;
