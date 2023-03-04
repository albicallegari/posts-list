import { setNumOfPosts, setPosts } from "../../store/postsSlice/postsSlice";
import { VariantButton } from "../../components/Button/Button.models";
import { hideDialog } from "../../store/dialogSlice/dialogSlice";
import { getTranslatedLabel } from "../../common/labels/utils";
import generateClassName from "../../utils/generateClassName";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useReducer, useState } from "react";
import isNullOrEmpty from "../../utils/isNullOrEmpty";
import formReducer from "../../services/formReducer";
import Button from "../../components/Button/Button";
import Posts from "../../components/Posts/Posts";
import { initialFormState } from "./Home.utils";
import { Post } from "../../common/common.models";
import { RootState } from "../../store";
import style from "./Home.module.css";
import {
  Dialog,
  DialogActions,
  FormControl,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";

const Home = () => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(`(max-width:768px)`);
  const [formState, dispatchAction] = useReducer(formReducer, initialFormState);
  const numOfPosts = useSelector((state: RootState) => state.posts.numOfPosts);
  const postsList = useSelector((state: RootState) => state.posts.postsList);
  const { open: isDialogOpen } = useSelector(
    (state: RootState) => state.dialog
  );
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?userId=1")
      .then((response) => response.json())
      .then((json) => {
        dispatch(setNumOfPosts(json.length));
        dispatch(setPosts(json));
      });
  }, []);

  const handleClose = () => {
    dispatch(hideDialog());
    setIsSubmitted(false);
  };

  const handleCancel = () => {
    dispatchAction({
      type: "RESET_FORM",
      payload: initialFormState,
    });
    dispatch(hideDialog());
    setIsSubmitted(false);
  };

  const handleInputTextChange = (value: string, field: string) => {
    setIsSubmitted(false);
    dispatchAction({
      type: "HANDLE_INPUT_TEXT",
      field: field,
      payload: value,
    });
  };

  const isValidForm = useMemo(() => {
    return (
      !isNullOrEmpty(formState.title) &&
      !isNullOrEmpty(formState.body) &&
      !isNullOrEmpty(formState.userId)
    );
  }, [formState]);

  const handleSubmit = () => {
    setIsSubmitted(true);
    if (isValidForm) {
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify({
          title: formState.title,
          body: formState.body,
          userId: formState.userId,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((newPost) => {
          dispatch(setNumOfPosts(numOfPosts + 1));
          const newList: Post[] = [...postsList, newPost];
          dispatch(setPosts(newList));
          handleCancel();
        });
    }
  };

  return (
    <div
      className={generateClassName({
        "bg-slate-200 min-h-screen h-full relative": true,
        [style.home_container]: true,
      })}
    >
      <div className="bg-slate-200 flex justify-center p-6 fixed top-0 left-0 right-0 z-10">
        <h1 className="sm:text-3xl font-bold text-centre text-blue-600">
          {getTranslatedLabel("home.title")}
        </h1>
      </div>
      <div className="absolute top-24 md:top-20">
        <Posts />
      </div>
      <Dialog
        fullScreen={isMobile}
        open={isDialogOpen}
        onClose={handleClose}
        sx={{
          ".MuiPaper-root": { width: isMobile ? "100%" : "80%" },
        }}
      >
        <Typography
          sx={{
            padding: isMobile ? "12px 16px" : "16px 24px",
            fontWeight: "700",
          }}
          id="form-dialog-title"
        >
          {getTranslatedLabel("home.formMessage")}
        </Typography>
        <FormControl
          sx={{
            padding: isMobile ? "16px" : "24px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <label className="text-xs mt-4 font-semibold" htmlFor="title">
            {getTranslatedLabel("home.formTitleDesc")}
          </label>
          <TextField
            required
            id="title"
            label="Post title"
            type="text"
            value={formState.title}
            onChange={(e) => handleInputTextChange(e.target.value, "title")}
            error={isSubmitted && isNullOrEmpty(formState.title)}
          />
          <label className="text-xs mt-4 font-semibold" htmlFor="title">
            {getTranslatedLabel("home.formContentDesc")}
          </label>
          <TextField
            id="body"
            required
            label="Content"
            placeholder="Lorem ipsum..."
            maxRows={5}
            rows={3}
            multiline
            value={formState.body}
            onChange={(e) => handleInputTextChange(e.target.value, "body")}
            error={isSubmitted && isNullOrEmpty(formState.body)}
          />
          {/** User ID field: This field is usually not editable as it is automatically filled based on the logged-in user */}
          <label className="text-xs mt-4 font-semibold" htmlFor="title">
            {getTranslatedLabel("home.formUserIdDesc")}
          </label>
          <TextField
            id="userId"
            required
            label="User ID"
            type="number"
            defaultValue={formState.userId}
            error={isSubmitted && isNullOrEmpty(formState.userId)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
        {!isValidForm && isSubmitted && (
          <p className="text-red-500 text-sm px-6">
            {getTranslatedLabel("home.formError")}
          </p>
        )}
        <DialogActions
          sx={{
            gap: "8px",
            padding: "16px",
            justifyContent: isMobile ? "space-between" : "flex-end",
          }}
        >
          <Button
            color={VariantButton.OUTLINE}
            label={getTranslatedLabel("home.formCancel")}
            action={handleCancel}
          />
          <Button
            color={
              !isValidForm && isSubmitted
                ? VariantButton.DISABLE
                : VariantButton.ENABLE
            }
            label={getTranslatedLabel("home.formSubmit")}
            action={handleSubmit}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Home;
