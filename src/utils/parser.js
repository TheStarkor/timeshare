module.exports = {
  statusParser: (status) => {
    if (status === 0) return '확인중';
    else if (status === 1) return '진행중';
    else return '완료';
  },
  postTypeParser: (type) => {
    if (type === 1) return '공유하고 싶어요';
    else return ' 만나고 싶어요';
  }
}