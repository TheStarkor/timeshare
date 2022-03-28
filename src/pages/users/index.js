import { useEffect, useState } from 'react';
import axios from 'axios';

import { Table } from 'antd';

const columns = [
  {
    title: '이름',
    dataIndex: 'name',
  },
  {
    title: '학과',
    dataIndex: 'dept',
  },
  {
    title: '학번',
    dataIndex: 'studentId',
  },
  {
    title: '성별',
    dataIndex: 'gender',
  },
  {
    title: '이메일',
    dataIndex: 'email',
  },
  {
    title: '전화번호',
    dataIndex: 'honeNumber',
  },
  {
    title: '소개',
    dataIndex: 'description',
  },
];

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/admin/users') 
      .then(res => {
        setUsers(res.data);
      })
  }, [])

  return (
    <>
      <Table columns={columns} dataSource={users} />
    </>
  )
}

export default UserList;