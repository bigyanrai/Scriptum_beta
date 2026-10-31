import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import BlogLayout from "../../components/layouts/BlogLayout/BlogLayout";
import BlogPostSummaryCard from "../Blog/components/BlogPostSummaryCard";
import BlogPostSummaryCardSkeleton from "../../components/Loader/BlogPostSummaryCardSkeleton";

import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import BackButton from "../../components/BackButton";
import TrendingPostCard from "./components/TrendingPostCard";
import TrendingPostCardSkeleton from "../../components/Loader/TrendingPostSkeleton";

const TrendingPage = () => {
  const navigate = useNavigate();

  const [trendingPosts, setTrendingPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getTrendingPosts = async () => {
    try {
      setIsLoading(true);

      const response = await axiosInstance.get(
        `${API_PATHS.POSTS.GET_TRENDING_POSTS}?limit=10`,
      );
      console.log(response.data);
      setTrendingPosts(response.data);
    } catch (error) {
      console.error("Error fetching trending posts", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTrendingPosts();
  }, []);

  const handleClick = (post) => navigate(`/${post.slug}`);

  return (
    <BlogLayout activeMenu="Trending">
      <BackButton />
      <div className="">
        <div className="mb-10">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
            Discover
          </p>

          <h1 className="text-4xl font-bold text-gray-900 mt-1">
            Trending Posts
          </h1>

          <p className="text-gray-500 mt-3">
            The top 10 most popular articles based on reader engagement.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {isLoading
            ? [...Array(6)].map((_, index) => (
                <TrendingPostCardSkeleton key={index} />
              ))
            : trendingPosts.map((item, index) => (
                <TrendingPostCard
                  rank={index + 1}
                  comments={item.commentCount}
                  key={item._id}
                  title={item.title}
                  coverImageUrl={item.coverImageUrl}
                  description={item.content}
                  tags={item.tags}
                  views={item.views}
                  likes={item.likes}
                  updatedOn={
                    item.updatedAt
                      ? moment(item.updatedAt).format("Do MMM YYYY")
                      : "-"
                  }
                  authorName={
                    item.author?.name || item.authorName || "Deleted User"
                  }
                  authProfileImg={
                    item.author?.profileImageUrl ||
                    "http://localhost:8000/uploads/avatar/avatar.svg"
                  }
                  isDeletedAuthor={!item.author}
                  onClick={() => handleClick(item)}
                />
              ))}
        </div>
      </div>
    </BlogLayout>
  );
};

export default TrendingPage;
