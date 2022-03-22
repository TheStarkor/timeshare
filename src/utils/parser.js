module.exports = {
  statusParser: (status) => {
    if (status === 0) return '확인중';
    else if (status === 1) return '진행중';
    else return '완료';
  },
  postTypeParser: (type) => {
    if (type === 1) return '공유하고 싶어요';
    else return ' 만나고 싶어요';
  },
  requestStatusParser: (status) => {
    if (status === 0) return '대기중';
    else if (status === 1) return '승락됨';
    else if (status === 2) return '거절됨';
    else return '에러'
  },
  genderParser: (gender) => {
    if (gender === 'female') return '여';
    else return '남';
  }
}