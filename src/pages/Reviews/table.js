// eslint-disable-next-line
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Table, Button, Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
// eslint-disable-next-line
import { getScores } from '../../redux/actions/scores';

import ScoreReview from '../../components/ScoreReview/ScoreReview';

let data = [];
class TableScore extends React.Component {


  state = {
    searchText: '',
    searchedColumn: '',
  };


  static getDerivedStateFromProps(props, state) {
    data=[];
    if (props.scores != null) {
      props.scores.map((el, index) =>
      el.status === "published"?
        data.push({
          student: el.student ? el.student : "",
          score: el.score ? el.score : "",
          task: el.task ? el.task : "",
          date: el.sendingDate ? el.sendingDate : "",
          reviewer: el.reviewer ? el.reviewer : "",
          key: index,
          actions: index,
        }):""
      ) 
    }
    return null;
  }

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
          compare: (a, b) => a.task.localeCompare(b.task),
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
        ...this.getColumnSearchProps('date'),
      },
      {
        title: 'Actions',
        dataIndex: "actions",
        key: "actions",
        width: '20%',
        render: (text) =>
          data.length >= 1 ? (
            <ScoreReview description={this.props.scores[text]} />
          ) : null,
      },
    ]
    if (this.props.scores === null) {
      return (<p>no data</p>)
    }
    else {
      return (<Table columns={columns} dataSource={data} />);
    }

  }
}

export default TableScore;