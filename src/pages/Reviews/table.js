
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import 'antd/dist/antd.css';
import { Table, Button, Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { getScores } from '../../redux/actions/scores';
import checkAuth from "../../utils/checkAuth";

import ScoreReview from '../../components/ScoreReview/ScoreReview';

const data = [
    {
      key: '1',
      student: 'John Brown',
      score: 32,
      task: 'aew York',
      date:"2020:09:13",
      reviewer: 'John Brown',
    },
    {
      key: '2',
      student: 'Jim Green',
      score: 42,
      task: 'aondon',
      date:"2020:09:13",
      reviewer: 'My',
    },
    {
      key: '3',
      student: 'Not Expandable',
      score: 29,
      task: 'aiangsu',
      date:"2020:09:13",
      reviewer: 'expandable',
    },
    {
      key: '4',
      student: 'Joe Black',
      score: 32,
      task: 'aidney',
      date:"2020:09:13",
      reviewer: 'Joe Black',
    },
    {
      key: '5',
      student: 'Joe Black',
      score: 32,
      task: 'Sidney',
      date:"2020:09:13",
      reviewer: 'Joe Black',
    },
    {
      key: '6',
      student: 'Joe Black',
      score: 32,
      task: 'Sidney',
      date:"2020:07:13",
      reviewer: 'Joe Black',
    },
    {
      key: '7',
      student: 'John Brown',
      score: 32,
      task: 'New York',
      date:"2020:09:03",
      reviewer: 'John Brown',
    },
    {
      key: '8',
      student: 'Jim Green',
      score: 42,
      task: 'London',
      date:"2020:09:27",
      reviewer: 'My',
    },
    {
      key: '9',
      student: 'Not Expandable',
      score: 29,
      task: 'Jiangsu',
      date:"2020:09:25",
      reviewer: 'expandable',
    },
    {
      key: '10',
      student: 'Joe Black',
      score: 32,
      task: 'Sidney',
      date:"2020:04:20",
      reviewer: 'Joe Black',
    },
    {
      key: '11',
      student: 'Joe Black',
      score: 32,
      task: 'Sidney',
      date:"2018:03:13",
      reviewer: 'Joe Black',
    },
    {
      key: '12',
      student: 'Joe Black',
      score: 32,
      task: 'Sidney',
      date:"2019:09:13",
      reviewer: 'Joe Black',
    },
    {
      key: '13',
      student: 'John Brown',
      score: 32,
      task: 'New York',
      date:"2020:03:13",
      reviewer: 'John Brown',
    },
    {
      key: '14',
      student: 'Jim Green',
      score: 42,
      task: 'London',
      date:"2020:05:13",
      reviewer: 'My',
    },
    {
      key: '15',
      student: 'Jim Green',
      score: 42,
      task: 'London',
      date:"2020:10:13",
      reviewer: 'My',
    },
    {
      key: '16',
      student: 'Jim Green',
      score: 42,
      task: 'London',
      date:"2020:09:23",
      reviewer: 'My',
    },
    {
      key: '17',
      student: 'oim Green',
      score: 12,
      task: 'London',
      date:"2020:09:12",
      reviewer: 'dy',
    },
    {
      key: '18',
      student: 'qwem Green',
      score: 32,
      task: 'London',
      date:"2020:09:14",
      reviewer: 'ay',
    },
    {
      key: '19',
      student: 'sm Green',
      score: 26,
      task: 'London',
      date:"2020:09:11",
      reviewer: 'by',
    },
    
  ];
class TableScore extends React.Component {
  state = {
    searchText: '',
    searchedColumn: '',
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  details = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };
  render() {
    const columns = [
        {
          title: 'Task',
          dataIndex: 'task',
          key: 'task',
          sorter: {
            compare:(a, b) => a.task.localeCompare(b.task),
          },
          width: '20%',
          ...this.getColumnSearchProps('task'),
        },
        {
          title: 'Student',
          dataIndex: 'student',
          key: 'student',
          sorter: (a, b) => a.student.localeCompare(b.student),
          width: '20%',
          ...this.getColumnSearchProps('student'),
        },
        {
          title: 'Reviewer',
          dataIndex: 'reviewer',
          key: 'reviewer',
          sorter: (a, b) => a.reviewer.localeCompare(b.reviewer),
          width: '20%',
          ...this.getColumnSearchProps('check'),
        },
        {
          title: 'Score',
          dataIndex: 'score',
          key: 'score',
          sorter: {
            compare: (a, b) => a.score - b.score,
          },
          width: '5%',
          ...this.getColumnSearchProps('score'),
        },
        {
          title: 'Date',
          dataIndex: 'date',
          key: 'date',
          sorter: (a, b) => a.date.localeCompare(b.date),
          width: '10%',
          ...this.getColumnSearchProps('score'),
        },
        {
          title: 'actions',
          dataIndex: '',
          key: 'x',
          width: '20%',
          render: () => <a onClick={event => this.props.switchLevel()}>View details</a>,
        },
      ];

  return (
    <Table columns={columns} dataSource={data} />
  );
}
}

export default TableScore;