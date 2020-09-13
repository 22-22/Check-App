
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
      position: 1,
      student: 'John Brown',
      score: 32,
      task: 'New York',
      check: 'John Brown',
    },
    {
      position: 2,
      student: 'Jim Green',
      score: 42,
      task: 'London',
      check: 'My',
    },
    {
      position: 3,
      student: 'Not Expandable',
      score: 29,
      task: 'Jiangsu',
      check: 'expandable',
    },
    {
      position: 4,
      student: 'Joe Black',
      score: 32,
      task: 'Sidney',
      check: 'Joe Black',
    },
    {
      position: 4,
      student: 'Joe Black',
      score: 32,
      task: 'Sidney',
      check: 'Joe Black',
    },
    {
      position: 4,
      student: 'Joe Black',
      score: 32,
      task: 'Sidney',
      check: 'Joe Black',
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

  render() {
    const columns = [
        {
          title: '#',
          dataIndex: 'position',
          key: 'position',
          sorter: {
            compare: (a, b) => a.position - b.position,
            // multiple: ,
          },
          width: '5%',
          ...this.getColumnSearchProps('position'),
        },
        {
          title: 'Task',
          dataIndex: 'task',
          key: 'task',
          sorter: {
            compare: (a, b) => a.task - b.task,
            // multiple: ,
          },
          width: '20%',
          ...this.getColumnSearchProps('task'),
        },
        {
          title: 'Student',
          dataIndex: 'student',
          key: 'student',
          sorter: {
            compare: (a, b) => a.student - b.student,
            // multiple: ,
          },
          width: '20%',
          ...this.getColumnSearchProps('student'),
        },
        {
          title: 'Сheck',
          dataIndex: 'check',
          key: 'check',
          sorter: {
            compare: (a, b) => a.check - b.check,
            // multiple: ,
          },
          width: '20%',
          ...this.getColumnSearchProps('check'),
        },
        {
          title: 'Score',
          dataIndex: 'score',
          key: 'score',
          sorter: {
            compare: (a, b) => a.score - b.score,
            // multiple: ,
          },
          width: '20%',
          ...this.getColumnSearchProps('score'),
        },
        {
          title: 'Description',
          dataIndex: '',
          key: 'x',
          width: '20%',
          render: () => <a>More details</a>,
        },
      ];
    
// function Scores({ history }) {
  // const dispatch = useDispatch();
  // const { authentication, infoUser } = useSelector(({ statesAccount }) => statesAccount);
  // const { scores } = useSelector(({ scores }) => scores);

  // const [searchText, setSearchText] = React.useState("");
  // const [searchedColumn, setSearchedColumn] = React.useState("");

  // const [taskName, setTaskName] = React.useState(null);


  // React.useEffect(() => {
  //   !authentication && checkAuth(history, authentication, dispatch, "/scores");
  //   dispatch(getScores(taskName))
  // }, [taskName]);

  // function handleSearch(selectedKeys, confirm, dataIndex){
  //   confirm();
  //   setSearchText(selectedKeys[0]);
  //   setSearchedColumn(dataIndex);
  // };

  // function handleReset(clearFilters) {
  //   clearFilters();
  //   setSearchText("");
  // };
  
  // getColumnSearchProps = dataIndex => ({
  //   filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
  //     <div style={{ padding: 8 }}>
  //       <Input
  //         ref={node => {
  //           this.searchInput = node;
  //         }}
  //         placeholder={`Search ${dataIndex}`}
  //         value={selectedKeys[0]}
  //         onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
  //         onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
  //         style={{ width: 188, marginBottom: 8, display: 'block' }}
  //       />
  //       <Space>
  //         <Button
  //           type="primary"
  //           onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
  //           icon={<SearchOutlined />}
  //           size="small"
  //           style={{ width: 90 }}
  //         >
  //           Search
  //         </Button>
  //         <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
  //           Reset
  //         </Button>
  //       </Space>
  //     </div>
  //   ),
  //   filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
  //   onFilter: (value, record) =>
  //     record[dataIndex]
  //       ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
  //       : '',
  //   onFilterDropdownVisibleChange: visible => {
  //     if (visible) {
  //       setTimeout(() => this.searchInput.select(), 100);
  //     }
  //   },
  //   render: text =>
  //     searchedColumn === dataIndex ? (
  //       <Highlighter
  //         highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
  //         searchWords={[searchText]}
  //         autoEscape
  //         textToHighlight={text ? text.toString() : ''}
  //       />
  //     ) : (
  //         text
  //       ),
  // });
  return (
    <Table
      columns={columns}
      // expandable={{
      //   expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
      //   rowExpandable: record => record.name !== 'Not Expandable',
      // }}
      dataSource={data}
    />
  );
}
}

export default TableScore;