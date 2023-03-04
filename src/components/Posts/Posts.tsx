import { setNumOfPosts, setPosts } from "../../store/postsSlice/postsSlice";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import { showDialog } from "../../store/dialogSlice/dialogSlice";
import { getTranslatedLabel } from "../../common/labels/utils";
import { VariantButton } from "../Button/Button.models";
import { useDispatch, useSelector } from "react-redux";
import isNullOrEmpty from "../../utils/isNullOrEmpty";
import { RootState } from "../../store";
import Button from "../Button/Button";

const Posts = () => {
  const dispatch = useDispatch();
  const numOfPosts = useSelector((state: RootState) => state.posts.numOfPosts);
  const postsList = useSelector((state: RootState) => state.posts.postsList);

  const handleNewPost = () => {
    dispatch(showDialog());
  };

  const handleDeletePost = (idPost: number) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${idPost}`, {
      method: "DELETE",
    }).then(() => {
      dispatch(setNumOfPosts(numOfPosts - 1));
      const newList = postsList.filter((post) => post.id !== idPost);
      dispatch(setPosts(newList));
    });
  };

  return (
    <div className="w-full p-4 relative bg-slate-200">
      <div className="bg-slate-200 flex items-center text-base justify-between sticky top-16 sm:top-20 py-2">
        <span className="flex items-center space-x-2">
          <h4 className="font-semibold text-slate-900">
            {getTranslatedLabel("posts.title")}
          </h4>
          <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
            {numOfPosts}
          </span>
        </span>
        <span>
          <Button
            color={VariantButton.ENABLE}
            label={getTranslatedLabel("posts.addPost")}
            action={handleNewPost}
          />
        </span>
      </div>
      <div className="overflow-auto">
        {!isNullOrEmpty(postsList) &&
          postsList.map((post, i) => (
            <div
              key={`${post.userId}-${i}`}
              className="rounded-md bg-white my-5 p-4"
            >
              <p className="text-xs text-gray-500 mb-2">{`Post n.${post.id}`}</p>
              <h3 className="font-bold text-base mb-2">
                {capitalizeFirstLetter(post.title)}
              </h3>
              <p className="text-sm">{post.body}</p>
              <p className="text-xs text-gray-500 my-2">{`Text by: User ${post.userId}`}</p>
              <div className="flex flex-row justify-end">
                <Button action={() => handleDeletePost(post.id)}>
                  <p className="underline text-blue-600 text-sm">
                    {getTranslatedLabel("posts.delete")}
                  </p>
                </Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Posts;
