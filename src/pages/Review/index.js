import { useParams } from 'react-router-dom';

const Review = () => {
  const { id } = useParams();

  return (
    <div>
      Review {`${id}`}
    </div>
  )
}

export default Review;